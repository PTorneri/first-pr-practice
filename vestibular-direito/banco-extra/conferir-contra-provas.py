# -*- coding: utf-8 -*-
"""Confere o banco-extra contra os dois estudos das provas reais.

Fontes dos critérios:
  A = estudo-anatomia-provas-fgv-insper-2025-2026.md (leitura dos 7 cadernos)
  F = estudo-formulacao-provas-objetivas-...-2016-2025.pdf (Parte D, cookbook)
"""
import json, re, collections

import os
AQUI = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(AQUI, "..", "data", "banco-extra.js"), encoding="utf-8").read()
B = json.loads(re.search(r"window\.QUESTION_BANKS_EXTRA = (\{.*\});\s*$", src, re.S).group(1))
todas = [(fr, q) for fr, qs in B.items() for q in qs]
N = len(todas)
def pct(k): return f"{100.0*k/N:5.1f}%"

print("=" * 78); print("1. COMPOSIÇÃO vs. PESO REAL NAS DUAS PROVAS"); print("=" * 78)
# FGV objetiva 60 = 15 Mat + 15 LP + 15 Ing + 15 Humanas. Insper 60 = 15 Ling +
# 15 Mat + 15 Hum (Hist 5, Geo 6, Socio 3, Filo 1) + 15 Natureza (5/5/5). [A §2]
REAL = {"matematica-rlm": 30, "interpretacao-texto": 18, "literatura": 6, "gramatica": 6,
        "ingles": 15, "historia-geral": 8, "historia-brasil": 5, "geografia": 11,
        "filosofia-sociologia": 4, "artes-cultura": 0, "direitos-humanos": 0,
        "atualidades-geopolitica": 6, "atualidades-meioambiente": 3, "atualidades-politica": 2,
        "ciencias-natureza": 15}
tot_real = sum(REAL.values())
print(f"{'frente':26s} {'banco':>7} {'%banco':>7} {'%prova':>7}  desvio")
for fr in sorted(B, key=lambda f: -len(B[f])):
    pb = 100.0 * len(B[fr]) / N
    pr = 100.0 * REAL.get(fr, 0) / tot_real
    razao = (pb / pr) if pr else float("inf")
    marca = "  <-- " + ("MUITO acima" if razao > 1.8 else "acima" if razao > 1.3
                        else "abaixo" if razao < 0.7 else "") if (razao > 1.3 or razao < 0.7) else ""
    print(f"{fr:26s} {len(B[fr]):7d} {pb:6.1f}% {pr:6.1f}%{marca}")

print()
print("=" * 78); print("2. FORMATOS QUE AS BANCAS USAM E O BANCO NÃO TEM"); print("=" * 78)
FORM = {
 "escada I/II/III (FGV: 1/3 de Humanas [A §3.5]; cookbook manda em Hist e Geo [F])":
   r"\bI, apenas\b|está correto o que se afirma",
 "item de exceção ('à exceção de uma') [A §3.5]": r"exceção|assinale-a|INCORRET",
 "duas lacunas (assinatura da Insper) [A §4.5]": r"lacuna|preenche corretamente|respectivamente",
 "sequência V/F [A §3.5]": r"\bV\s*[–-]\s*V\b|verdadeiro ou falso",
 "'most likely' (13 de 15 no Inglês da FGV [A §3.3])": r"most likely",
}
for nome, rx in FORM.items():
    k = sum(1 for _, q in todas if re.search(rx, q["enunciado"] + " " + " ".join(q["alternativas"].values()), re.I))
    print(f"  {k:5d} ({pct(k).strip():>6})  {nome}")

print()
print("=" * 78); print("3. TEXTO-BASE: as duas bancas ancoram quase tudo"); print("=" * 78)
com = sum(1 for _, q in todas if q.get("texto_apoio"))
print(f"  com texto de apoio: {com} ({pct(com)})")
print("  [A §3.2] FGV: 9 das 15 de Português saem de DOIS romances; um artigo sustenta 5 itens.")
print("  [F] História FGV: 'documentos primários ou citações de historiadores são o padrão,")
print("      não pergunta solta'. Geografia FGV: gráfico + trecho jornalístico.")
por_frente = collections.Counter(fr for fr, q in todas if q.get("texto_apoio"))
for fr in sorted(B, key=lambda f: -len(B[f])):
    c = por_frente[fr]
    if c == 0: print(f"      {fr:26s} 0 de {len(B[fr])} com texto  <-- perguntas soltas")

print()
print("=" * 78); print("4. O QUE OS ESTUDOS DIZEM PARA NÃO FAZER"); print("=" * 78)
CLASSICOS = r"\b(Karl Marx|Marx|Émile Durkheim|Durkheim|Max Weber|Weber|Sócrates|Platão|Aristóteles|Kant)\b"
k = sum(1 for fr, q in todas if fr == "filosofia-sociologia" and re.search(CLASSICOS, q["enunciado"]))
print(f"  {k:5d}  itens que cobram teórico clássico pelo nome")
print("         [F Sociologia FGV] 'Evite cobrar teóricos clássicos (Durkheim/Marx/Weber) por")
print("         nome — não há evidência de que a banca faça isso.'")
print("         [F Filosofia FGV] 'nunca uma pergunta sobre o filósofo isoladamente.'")
k = sum(1 for fr, q in todas if fr == "ingles" and "closest in meaning" in q["enunciado"])
print(f"  {k:5d}  itens de vocabulário em inglês")
print("         [A §3.3] a FGV glosa em português as palavras difíceis DENTRO do texto: ela")
print("         'remove deliberadamente o vocabulário como variável'. Decorar palavra rende ~0.")
solta = sum(1 for fr, q in todas
            if fr in ("historia-geral", "historia-brasil", "geografia", "filosofia-sociologia",
                      "artes-cultura", "atualidades-geopolitica", "atualidades-meioambiente",
                      "atualidades-politica", "direitos-humanos")
            and not q.get("texto_apoio"))
print(f"  {solta:5d}  itens de Humanas sem nenhuma fonte (pergunta 'solta')")

print()
print("=" * 78); print("5. MATEMÁTICA: o que o cookbook pede da FGV"); print("=" * 78)
mat = [q for fr, q in todas if fr == "matematica-rlm"]
def passos(q):
    # proxy: quantos operadores aritméticos aparecem na explicação (a conta)
    return len(re.findall(r"[×÷+−/^]|√", q["explicacao"]))
duas = sum(1 for q in mat if passos(q) >= 3)
print(f"  {duas} de {len(mat)} ({100.0*duas/len(mat):.0f}%) com 2+ etapas de resolução")
print("  [F Matemática FGV] 'Mire dificuldade média-alta, com questões de 2 ou mais etapas")
print("   (montar a relação antes de calcular)' e 'priorize combinatória/probabilidade,")
print("   geometria analítica, funções e matrizes/determinantes'.")
temas = collections.Counter()
for q in mat:
    e = q["enunciado"]
    for t, rx in [("porcentagem/finanças", r"aumento de|juros|custava"), ("razão", r"razão"),
                  ("sistemas", r"x \+ y"), ("PA/PG", r"progressão"),
                  ("probabilidade", r"probabilidade"), ("combinatória", r"comissão|cargos"),
                  ("estatística", r"média|mediana"), ("geometria", r"área|volume|cilindro|caixa"),
                  ("funções/log/exp", r"f\(x\)|log|bactérias"), ("analítica/trig", r"pontos|hipotenusa")]:
        if re.search(rx, e): temas[t] += 1; break
for t, c in temas.most_common(): print(f"      {t:22s} {c:4d}")
print("      matrizes/determinantes        0  <-- tema-âncora citado pelo cookbook")
# distrator da confusão documentada: combinação x arranjo
import math
conf = ok = 0
for q in mat:
    m = re.search(r"grupo de (\d+) estudantes, serão escolhidos (\d+)", q["enunciado"])
    if not m: continue
    n_, k_ = int(m.group(1)), int(m.group(2)); ok += 1
    vals = {re.sub(r"\D", "", t) for t in q["alternativas"].values()}
    if str(math.perm(n_, k_)) in vals: conf += 1
print(f"  {conf} de {ok} itens de combinação trazem o valor do ARRANJO como distrator")
print("  [F] 'Construa distratores de erro de execução: (...) trocar combinação por arranjo'")

print()
print("=" * 78); print("6. COMANDOS"); print("=" * 78)
CMD_FGV = r"é correto afirmar|depreende-se|está correto o que se afirma|assinale a alternativa"
k = sum(1 for _, q in todas if re.search(CMD_FGV, q["enunciado"], re.I))
print(f"  {k} de {N} ({pct(k)}) usam um comando no formato documentado da FGV")
cmds = collections.Counter()
for _, q in todas:
    cmds[re.sub(r"\b[A-ZÀ-Ú][\wÀ-ú’'-]*\b(?![?.])", "X", q["enunciado"])[:46]] += 1
print("  formas de comando mais frequentes no banco:")
for c, k in cmds.most_common(6): print(f"      {k:5d}  {c}")
