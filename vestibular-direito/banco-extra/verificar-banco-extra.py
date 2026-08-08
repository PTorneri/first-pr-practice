# -*- coding: utf-8 -*-
"""Invariantes do data/banco-extra.js.

Duas famílias de checagem, e a segunda é a que importa mais:

  ESTRUTURA  — o mesmo conjunto do verify-banco.ps1 (cinco alternativas, chaves
               a-e, resposta dentro delas, nada duplicado, sem mojibake), mais
               a medida de chutabilidade com a mesma heurística.

  ISOLAMENTO — a promessa deste banco é "só aparece na aba Buscar". Isso não é
               garantido por um filtro que alguém possa esquecer: é garantido
               por ele não estar em window.QUESTION_BANKS, que é o único global
               que schedule.js lê para montar o dia e o simulado. Se um dia
               alguém acrescentar QUESTION_BANKS_EXTRA a schedule.js, ou passar
               a gravar essas questões dentro de data/questions/, este teste
               reprova.

Uso:  python verificar-banco-extra.py        (sai com 1 se algo falhar)
"""
import json, os, re, sys, collections

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.abspath(os.path.join(AQUI, "..", ".."))
BANCO = os.path.join(AQUI, "..", "data", "banco-extra.js")
LET = "abcde"

falhas, avisos = [], []

src = open(BANCO, encoding="utf-8").read()
subs = json.loads(re.search(r"window\.SUBTOPICS_EXTRA = (\[.*?\]);", src, re.S).group(1))
banks = json.loads(re.search(r"window\.QUESTION_BANKS_EXTRA = (\{.*\});\s*$", src, re.S).group(1))

# ---------------------------------------------------------------- estrutura
ids, todas = set(), []
for fr, qs in banks.items():
    for q in qs:
        todas.append(q)
        for campo in ("id", "enunciado", "alternativas", "resposta", "explicacao"):
            if not q.get(campo): falhas.append(f"{fr}/{q.get('id')} : falta '{campo}'")
        if q["id"] in ids: falhas.append(f"id duplicado '{q['id']}'")
        ids.add(q["id"])
        a = q["alternativas"]
        if list(a.keys()) != list(LET): falhas.append(f"{q['id']} : chaves {list(a.keys())}")
        if q["resposta"] not in a: falhas.append(f"{q['id']} : resposta fora das alternativas")
        if len(set(a.values())) != 5: falhas.append(f"{q['id']} : alternativas duplicadas")
        if any(not t.strip() for t in a.values()): falhas.append(f"{q['id']} : alternativa vazia")
        cru = json.dumps(q, ensure_ascii=False)
        if re.search(r"BANCO DE 1\.500|Série \d|Conjunto \d", cru):
            falhas.append(f"{q['id']} : sobrou andaime do PDF")
        if re.search(r"[ÃÂ][-¿]", cru):
            falhas.append(f"{q['id']} : acento corrompido")

declaradas = {s["id"] for s in subs}
for fr in banks:
    if fr not in declaradas: falhas.append(f"frente '{fr}' sem entrada em SUBTOPICS_EXTRA")

# O defeito da família D do PDF: a resposta escrita no próprio enunciado.
vaza = [q["id"] for q in todas
        if len(q["alternativas"][q["resposta"]]) > 12
        and q["alternativas"][q["resposta"]].lower() in q["enunciado"].lower()]
if vaza: falhas.append(f"{len(vaza)} questões com a resposta copiada no enunciado ({vaza[:3]})")

# --------------------------------------------------------------- isolamento
def ler(rel):
    p = os.path.join(RAIZ, rel)
    return open(p, encoding="utf-8").read() if os.path.exists(p) else ""

sched = ler("vestibular-direito-v2/schedule.js")
if not sched:
    falhas.append("não achei schedule.js — sem ele não dá para provar o isolamento")
elif "QUESTION_BANKS_EXTRA" in sched:
    falhas.append("schedule.js menciona QUESTION_BANKS_EXTRA: o banco complementar "
                  "passaria a entrar no cronograma e no simulado")

app = ler("vestibular-direito-v2/app.js")
if app:
    # O único lugar do app que pode ler o global é a montagem dos documentos da
    # busca. Qualquer outro uso é vazamento.
    usos = [ln.strip() for ln in app.split("\n") if "QUESTION_BANKS_EXTRA" in ln]
    if usos: falhas.append(f"app.js lê QUESTION_BANKS_EXTRA direto ({usos[0][:60]}…) — "
                           f"ele deve chegar por parâmetro, via VD_TRILHA.carregarExtra()")
    if "BUSCA_TRILHA_EXTRA" not in app:
        falhas.append("app.js não conhece BUSCA_TRILHA_EXTRA: sem o prefixo 'xt::', as "
                      "respostas entrariam no progresso e no caderno de erros")

# As 240 promovidas vivem nos dois lugares por caminhos diferentes: em
# promovidas.json (o que o gerador decidiu promover) e em data/questions/ (o que
# o promover-para-banco-principal.ps1 costurou). Os dois conjuntos têm que ser o
# MESMO. Divergiram significa uma de duas coisas, e as duas são silenciosas: ou
# alguém despejou questão do banco complementar no principal sem passar pelo
# critério, ou o gerador mudou e o promover não foi rodado de novo — e aí o
# banco principal ficou com uma versão velha das questões.
qdir = os.path.join(RAIZ, "vestibular-direito", "data", "questions")
prom_path = os.path.join(AQUI, "promovidas.json")
if os.path.isdir(qdir) and os.path.exists(prom_path):
    esperadas = {}
    for fr, itens in json.load(open(prom_path, encoding="utf-8")).items():
        for it in itens: esperadas[it["enunciado"] + "|" + it["alternativas"][it["resposta"]]] = fr
    achadas = {}
    for nome in sorted(os.listdir(qdir)):
        if not nome.endswith(".json"): continue
        j = json.load(open(os.path.join(qdir, nome), encoding="utf-8"))
        for q in j["questoes"]:
            if q["id"].startswith("xtr-"):
                falhas.append(f"data/questions/{nome}: id '{q['id']}' mantém o esquema do banco "
                              f"complementar — o promover renumera para o padrão da frente")
            if q.get("origem") == "banco-extra":
                achadas[q["enunciado"] + "|" + q["alternativas"][q["resposta"]]] = j["subtopic"]
    faltam = set(esperadas) - set(achadas)
    sobram = set(achadas) - set(esperadas)
    if faltam:
        falhas.append(f"{len(faltam)} promovidas não estão em data/questions/ "
                      f"— rode banco-extra/promover-para-banco-principal.ps1")
    if sobram:
        falhas.append(f"{len(sobram)} questões com origem='banco-extra' no banco principal que "
                      f"NÃO estão em promovidas.json — promoção fora do critério ou desatualizada")
    for k, fr in esperadas.items():
        if k in achadas and achadas[k] != fr:
            falhas.append(f"promovida caiu na frente errada: esperava {fr}, achei {achadas[k]}")
            break
    print(f"promovidas ao banco principal: {len(achadas)} (esperado {len(esperadas)})")

# ------------------------------------------------------------ chutabilidade
ABS = re.compile(r"\b(sempre|nunca|jamais|todo|todos|toda|todas|qualquer|exclusivamente|"
                 r"unicamente|impossível|garante|em nenhum)\b", re.I)
AUTO = re.compile(r"(,\s*(ignorando|quando|posição|tese|ideia|generalização|equiparação|hipótese|"
                  r"proposta|indiferença|deslocamento|traço|equívoco|confusão|leitura|inversão|"
                  r"atribuição)\b)|diametralmente opost|contradição direta|"
                  r"\bque \w+ (rejeita|recusa|atribui|nega|contraria)\b|\bo que contraria\b", re.I)

def chute(qs):
    n = ch = lo = 0
    for q in qs:
        a, r = q["alternativas"], q["resposta"]; n += 1
        mx = max(len(t) for t in a.values())
        cand = [l for l, t in a.items() if len(t) == mx]
        if len(cand) == 1 and cand[0] == r: lo += 1
        vivas = {l: t for l, t in a.items() if not AUTO.search(t)} or dict(a)
        sob = {l: t for l, t in vivas.items() if not ABS.search(t)} or vivas
        mx = max(len(t) for t in sob.values())
        cand = [l for l, t in sob.items() if len(t) == mx]
        if len(cand) == 1 and cand[0] == r: ch += 1
    return n, 100.0 * ch / n, 100.0 * lo / n

n, idx, lo = chute(todas)
print(f"questões: {n} em {len(banks)} frentes")
print(f"chutabilidade: {idx:.1f}%  (acaso 20%; alvo do projeto <= 25%)")
print(f"  tell 'a certa é a mais longa': {lo:.1f}%")
print(f"\n{'frente':26s} {'n':>5} {'chute%':>7}  gabarito")
for fr, qs in sorted(banks.items(), key=lambda kv: -len(kv[1])):
    k = collections.Counter(q["resposta"] for q in qs)
    nn, ii, _ = chute(qs)
    if nn >= 25:
        fora = [l for l in LET if not (12 <= 100.0 * k[l] / nn <= 28)]
        if fora: avisos.append(f"{fr}: gabarito fora de 12-28% em {','.join(fora)}")
        if ii > 30: avisos.append(f"{fr}: chutabilidade {ii:.1f}% (alvo <= 30%)")
    print(f"{fr:26s} {nn:5d} {ii:7.1f}  " + " ".join(f"{l}={100.0*k[l]/nn:.0f}%" for l in LET))

if idx > 25: avisos.append(f"chutabilidade global em {idx:.1f}% (alvo <= 25%)")
print(f"\ncom texto de apoio: {sum(1 for q in todas if q.get('texto_apoio'))}")

if avisos:
    print(f"\n--- AVISOS ({len(avisos)}) ---")
    for a in avisos: print("  ~ " + a)
if falhas:
    print(f"\n--- FALHAS ({len(falhas)}) ---")
    for f in falhas[:30]: print("  ! " + f)
    print("\nREPROVADO."); sys.exit(1)
print("\nOK.")
