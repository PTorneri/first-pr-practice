# -*- coding: utf-8 -*-
"""Adapta o banco-1500-questoes-fgv-insper.pdf ao esquema do app.

O que este script conserta, por familia (ver a auditoria em analisa*.py):

  D  "Assinale a associacao conceitualmente correta sobre X"  — 148 itens em que
     as cinco alternativas traziam a MESMA definicao com o rotulo trocado e o
     rotulo certo estava escrito no enunciado. Vira "qual definicao corresponde
     a X", com as definicoes dos quatro conceitos vizinhos como distratores.
  F  "Em qual contexto historico ou analitico..." — mantida so quando a resposta
     e de fato uma datacao/contexto (Historia, escolas literarias). Nos conceitos
     de linguagem a pergunta tinha mais de uma resposta defensavel.
  EN/PT de compreensao — 150 itens cujos quatro distratores falavam de OUTRA
     passagem. Recebem distratores escritos para a propria passagem (pools.py).
  Exatas — 470 itens numericos: cada um e RESOLVIDO aqui e so entra se a conta
     bater com o gabarito do PDF. A explicacao sai da propria conta.
  Todos — o PDF nao tem explicacao nenhuma; o app exige. E o rodape de pagina
     ("BANCO DE 1.500 QUESTOES...") grudou em 203 alternativas na extracao.
"""
import json, re, math, os, collections, unicodedata, random
import sys
from fractions import Fraction
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pools import POOLS, ESTRATEGIAS
from pools_longos import POOLS_LONGOS

AQUI = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(AQUI, "fonte-1500.txt")
OUT = os.path.join(AQUI, "..", "data", "banco-extra.js")
rng = random.Random(20260808)

# ------------------------------------------------------------------ parsing
raw = open(RAW, encoding="utf-8").read()
raw = re.sub(r"^\s*p\.\s*\d+\s*$", "", raw, flags=re.M)
LIXO = re.compile(r"\s*BANCO DE 1\.500 QUEST(?:Õ|O)ES[^\n]*")
raw = LIXO.sub("", raw)
corpo, gabtxt = raw.split("\nGabarito\n", 1)
GAB = {int(m.group(1)): m.group(2) for m in re.finditer(r"\b(\d{3,4})\s+([A-E])\b", gabtxt)}

DISC = [("mat", 1, 260), ("port", 261, 500), ("ing", 501, 620), ("hist", 621, 820),
        ("geo", 821, 980), ("bio", 981, 1110), ("fis", 1111, 1240), ("qui", 1241, 1370),
        ("filo", 1371, 1450), ("art", 1451, 1500)]
def disc_of(n):
    for d, a, b in DISC:
        if a <= n <= b: return d
    return "?"

QRE = re.compile(r"QUESTÃO\s+(\d{4})\s+(.*?)\s*\|\s*(\w+)\s*\n(.*?)(?=\n\s*QUESTÃO\s+\d{4}|\Z)", re.S)
Q = {}
for m in QRE.finditer(corpo):
    num, sub, niv, bloco = int(m.group(1)), m.group(2).strip(), m.group(3).strip(), m.group(4)
    enun, alts, atual = [], {}, None
    for ln in bloco.split("\n"):
        am = re.match(r"\s*([A-E])\)\s+(.*)$", ln)
        if am:
            atual = am.group(1); alts[atual] = am.group(2).strip()
        elif atual and ln.strip(): alts[atual] += " " + ln.strip()
        elif not atual and ln.strip(): enun.append(ln.strip())
    Q[num] = dict(num=num, sub=sub, niv=niv, enun=" ".join(enun).strip(),
                  alts={k: LIXO.sub("", v).strip() for k, v in alts.items()},
                  disc=disc_of(num), resp=GAB.get(num))
assert len(Q) == 1500 and all(len(q["alts"]) == 5 and q["resp"] for q in Q.values())

# --------------------------------------------------------------- frentes
FRENTE_POR_DISC = {"mat": "matematica-rlm", "ing": "ingles", "bio": "ciencias-natureza",
                   "fis": "ciencias-natureza", "qui": "ciencias-natureza",
                   "filo": "filosofia-sociologia", "hist": "historia-geral",
                   "geo": "geografia", "art": "artes-cultura", "port": "interpretacao-texto"}
GRAMATICA = {"concordância verbal", "concordância nominal", "regência verbal", "uso da crase",
             "colocação pronominal", "pontuação", "coordenação e subordinação",
             "classes de palavras", "formação de palavras", "correlação verbal",
             "ortografia e acentuação", "Variação linguística"}
LITERATURA = {"Barroco", "Arcadismo", "Romantismo", "Realismo", "Naturalismo", "Parnasianismo",
              "Simbolismo", "Pré-Modernismo", "Modernismo de 1922", "Romance de 1930",
              "Prosa de Clarice Lispector", "Prosa de Guimarães Rosa"}
HIST_BRASIL = {"Colonização portuguesa na América", "Escravidão atlântica", "Resistência indígena",
               "Independência do Brasil", "Primeiro Reinado e Regências", "Segundo Reinado",
               "Abolição da escravidão no Brasil", "Proclamação da República", "Primeira República",
               "Era Vargas", "Ditadura civil-militar brasileira",
               "Redemocratização e Constituição de 1988"}
GEOPOL = {"Globalização econômica", "Divisão internacional do trabalho", "Empresas transnacionais",
          "Blocos econômicos", "Multipolaridade", "BRICS", "Migrações internacionais"}
AMBIENTE = {"Mudanças climáticas", "Biomas brasileiros", "Bacias hidrográficas",
            "Degradação dos solos", "Desmatamento", "Desenvolvimento sustentável",
            "Acordos ambientais internacionais"}
def frente_de(q):
    s, d = q["sub"], q["disc"]
    if d == "port":
        if s in GRAMATICA: return "gramatica"
        if s in LITERATURA: return "literatura"
        return "interpretacao-texto"
    if d == "hist": return "historia-brasil" if s in HIST_BRASIL else "historia-geral"
    if d == "geo":
        if s in GEOPOL: return "atualidades-geopolitica"
        if s in AMBIENTE: return "atualidades-meioambiente"
        if s == "Indicadores sociais": return "atualidades-politica"
        return "geografia"
    if d == "art":
        if s == "Racismo, sexismo e interseccionalidade": return "direitos-humanos"
        if s in ("Totalitarismo", "Modernidade e pós-modernidade"): return "filosofia-sociologia"
        return "artes-cultura"
    return FRENTE_POR_DISC[d]

# ---------------------------------------------------------------- numeros
def fmt(v, casas=None):
    if isinstance(v, Fraction): return f"{v.numerator}/{v.denominator}"
    if casas is None:
        casas = 0 if abs(v - round(v)) < 1e-9 else 2
    s = f"{v:,.{casas}f}".replace(",", "\x00").replace(".", ",").replace("\x00", ".")
    return s
def num(s):
    s = str(s).replace("R$", "").strip()
    m = re.search(r"-?\d[\d. ]*(?:,\d+)?|-?\d+(?:\.\d+)?", s)
    if not m: return None
    t = m.group().replace(" ", "")
    if "," in t: t = t.replace(".", "").replace(",", ".")
    elif re.match(r"^-?\d{1,3}(\.\d{3})+$", t): t = t.replace(".", "")
    try: return float(t)
    except ValueError: return None
def valor_resp(q):
    t = q["alts"][q["resp"]]
    fr = re.match(r"^\s*(\d+)\s*/\s*(\d+)\s*$", t)
    if fr: return Fraction(int(fr.group(1)), int(fr.group(2)))
    return num(t)

def moeda(v): return "R$ " + fmt(v, 2)

# tabela de solvers: (regex, funcao -> (valor, explicacao))
SOLVERS = []
def solver(rx):
    def deco(fn): SOLVERS.append((re.compile(rx), fn)); return fn
    return deco

@solver(r"custava R\$ ([\d.,]+)\..*?aumento de ([\d.,]+)%.*?desconto de ([\d.,]+)%")
def _s(g):
    p, a, d = g
    m1 = p * (1 + a / 100); v = m1 * (1 - d / 100)
    return v, (f"O aumento leva o preço a {moeda(p)} × {fmt(1+a/100,2)} = {moeda(m1)}. "
               f"O desconto incide sobre esse novo valor: {moeda(m1)} × {fmt(1-d/100,2)} = {moeda(v)}. "
               f"Aumento e desconto não se cancelam porque incidem sobre bases diferentes.")
@solver(r"capital de R\$ ([\d.,]+) foi aplicado a juros compostos de ([\d.,]+)%.*?durante (\d+) per")
def _s(g):
    c, i, n = g; v = c * (1 + i / 100) ** n
    return v, (f"Juros compostos: M = C(1+i)ⁿ = {moeda(c)} × {fmt(1+i/100,2)}^{int(n)} = {moeda(v)}. "
               f"No regime simples o montante seria {moeda(c*(1+i*n/100))} — a diferença é o juro sobre juro.")
@solver(r"verba de R\$ ([\d.,]+) será dividida entre dois projetos na razão (\d+):(\d+)")
def _s(g):
    t, a, b = g; v = t * a / (a + b)
    return v, (f"A razão {int(a)}:{int(b)} divide a verba em {int(a+b)} partes iguais de "
               f"{moeda(t/(a+b))}. O primeiro termo recebe {int(a)} delas: {moeda(v)}.")
@solver(r"x \+ y = ([\d.,]+) e x - y = ([\d.,]+)")
def _s(g):
    s, d = g; v = (s + d) / 2
    return v, (f"Somando as duas equações, 2x = {fmt(s)} + {fmt(d)} = {fmt(s+d)}, logo x = {fmt(v)} "
               f"(e y = {fmt((s-d)/2)}).")
@solver(r"progressão aritmética, o primeiro termo é ([\d.,]+) e a razão é ([\d.,]+).*?(\d+)º termo")
def _s(g):
    a, r, n = g; v = a + (n - 1) * r
    return v, f"PA: aₙ = a₁ + (n−1)r = {fmt(a)} + {int(n-1)} × {fmt(r)} = {fmt(v)}."
@solver(r"progressão geométrica, o primeiro termo é ([\d.,]+) e a razão é ([\d.,]+).*?(\d+)º termo")
def _s(g):
    a, r, n = g; v = a * r ** (n - 1)
    return v, f"PG: aₙ = a₁·r^(n−1) = {fmt(a)} × {fmt(r)}^{int(n-1)} = {fmt(v)}."
@solver(r"urna contém (\d+) bolas vermelhas e (\d+) azuis\. Uma bola")
def _s(g):
    v_, a = int(g[0]), int(g[1]); f = Fraction(v_, v_ + a)
    return f, (f"São {v_} casos favoráveis em {v_+a} bolas: P = {v_}/{v_+a} = {f.numerator}/{f.denominator}.")
@solver(r"urna contém (\d+) bolas vermelhas e (\d+) azuis\. Duas bolas")
def _s(g):
    v_, a = int(g[0]), int(g[1]); n = v_ + a
    f = Fraction(v_, n) * Fraction(v_ - 1, n - 1)
    return f, (f"Sem reposição a segunda retirada muda o espaço amostral: "
               f"P = {v_}/{n} × {v_-1}/{n-1} = {f.numerator}/{f.denominator}.")
@solver(r"grupo de (\d+) estudantes, serão escolhidos (\d+) para formar uma comissão sem cargos")
def _s(g):
    n, k = int(g[0]), int(g[1]); v = math.comb(n, k)
    return v, (f"Comissão sem cargos: a ordem não importa, então é combinação. "
               f"C({n},{k}) = {n}!/({k}!·{n-k}!) = {v}.")
@solver(r"Entre (\d+) finalistas, serão atribuídos (\d+) cargos distintos")
def _s(g):
    n, k = int(g[0]), int(g[1]); v = math.perm(n, k)
    return v, (f"Cargos distintos: a ordem importa, então é arranjo. "
               f"A({n},{k}) = {n}!/{n-k}! = {v}.")
@solver(r"Considere os valores ([\d.,\s]+)\. Qual é a média aritmética")
def _s(g): return None, None      # tratado abaixo (lista variavel)
@solver(r"caixa retangular mede ([\d.,]+) cm por ([\d.,]+) cm por ([\d.,]+) cm")
def _s(g):
    a, b, c = g; v = a * b * c
    return v, f"Volume do paralelepípedo: V = a·b·c = {fmt(a)} × {fmt(b)} × {fmt(c)} = {fmt(v)} cm³."
@solver(r"cilindro tem raio ([\d.,]+) cm e altura ([\d.,]+) cm\. Adotando π = ([\d.,]+)")
def _s(g):
    r, h, pi = g; v = pi * r * r * h
    return v, f"Volume do cilindro: V = πr²h = {fmt(pi)} × {fmt(r)}² × {fmt(h)} = {fmt(v)} cm³."
@solver(r"f\(x\) = ([\d.,]+)x \+ ([\d.,]+)\. Qual é o valor de f\((\d+)\)")
def _s(g):
    a, b, x = g; v = a * x + b
    return v, (f"Basta substituir x por {int(x)} na lei da função: f({int(x)}) = "
               f"{fmt(a)}×{int(x)} + {fmt(b)} = {fmt(a*x)} + {fmt(b)} = {fmt(v)}. "
               f"Numa função afim, {fmt(a)} é a taxa de variação e {fmt(b)} é o valor inicial.")
@solver(r"f\(x\) = x\^2 - ([\d.,]+)x, qual é o valor de f\((\d+)\)")
def _s(g):
    a, x = g; v = x * x - a * x
    return v, (f"Substituindo x por {int(x)}: f({int(x)}) = {int(x)}² − {fmt(a)}×{int(x)} = "
               f"{fmt(x*x)} − {fmt(a*x)} = {fmt(v)}. O erro comum é somar em vez de subtrair "
               f"o segundo termo, o que daria {fmt(x*x+a*x)}.")
@solver(r"população de bactérias começa com ([\d.,]+) indivíduos e dobra a cada hora.*?após (\d+) horas")
def _s(g):
    n0, h = g; v = n0 * 2 ** h
    return v, (f"Crescimento exponencial de razão 2: N = N₀·2ᵗ = {fmt(n0)} × 2^{int(h)} = {fmt(v)}.")
@solver(r"log na base ([\d.,]+) de ([\d.,]+)")
def _s(g):
    b, x = g; v = math.log(x, b)
    return v, (f"log_{fmt(b)}({fmt(x)}) pergunta o expoente: {fmt(b)}^{fmt(v)} = {fmt(x)}, logo o valor é {fmt(v)}.")
@solver(r"distância entre os pontos \((-?[\d.,]+), (-?[\d.,]+)\) e \((-?[\d.,]+), (-?[\d.,]+)\)")
def _s(g):
    x1, y1, x2, y2 = g; dx, dy = x2 - x1, y2 - y1; v = math.hypot(dx, dy)
    return v, (f"d = √((x₂−x₁)² + (y₂−y₁)²) = √({fmt(dx)}² + {fmt(dy)}²) = "
               f"√{fmt(dx*dx+dy*dy)} = {fmt(v)}.")
@solver(r"hipotenusa mede ([\d.,]+) cm e o seno de um ângulo agudo é ([\d.,]+)")
def _s(g):
    h, s = g; v = h * s
    return v, (f"O seno é cateto oposto sobre hipotenusa: sen θ = co/h, então "
               f"co = {fmt(h)} × {fmt(s,1)} = {fmt(v)} cm.")
@solver(r"terreno triangular tem base de ([\d.,]+) m e altura de ([\d.,]+) m")
def _s(g):
    b, h = g; v = b * h / 2
    return v, f"Área do triângulo: A = b·h/2 = {fmt(b)} × {fmt(h)} / 2 = {fmt(v)} m²."
@solver(r"praça quadrada tem lado de ([\d.,]+) m")
def _s(g):
    l = g[0]; v = l * l
    return v, f"Área do quadrado: A = l² = {fmt(l)}² = {fmt(v)} m²."
@solver(r"trapézio possui bases de ([\d.,]+) cm e ([\d.,]+) cm e altura de ([\d.,]+) cm")
def _s(g):
    B, b, h = g; v = (B + b) * h / 2
    return v, f"Área do trapézio: A = (B+b)·h/2 = ({fmt(B)}+{fmt(b)}) × {fmt(h)} / 2 = {fmt(v)} cm²."
@solver(r"região circular tem raio de ([\d.,]+) m\. Usando π = ([\d.,]+)")
def _s(g):
    r, pi = g; v = pi * r * r
    return v, f"Área do círculo: A = πr² = {fmt(pi)} × {fmt(r)}² = {fmt(v)} m²."
# ---- fisica
@solver(r"velocidade constante de ([\d.,]+) m/s durante ([\d.,]+) s")
def _s(g):
    v_, t = g; d = v_ * t
    return d, f"Movimento uniforme: Δs = v·Δt = {fmt(v_)} × {fmt(t)} = {fmt(d)} m."
@solver(r"velocidade de ([\d.,]+) m/s e aceleração constante de ([\d.,]+) m/s\^2 durante ([\d.,]+) s")
def _s(g):
    v0, a, t = g; v = v0 + a * t
    return v, f"MUV: v = v₀ + a·t = {fmt(v0)} + {fmt(a)} × {fmt(t)} = {fmt(v)} m/s."
@solver(r"aceleração de ([\d.,]+) m/s\^2 em um corpo de massa ([\d.,]+) kg")
def _s(g):
    a, m = g; f = m * a
    return f, f"2ª lei de Newton: F = m·a = {fmt(m)} × {fmt(a)} = {fmt(f)} N."
@solver(r"objeto de ([\d.,]+) kg está a ([\d.,]+) m de altura.*?g = ([\d.,]+) m/s\^2")
def _s(g):
    m, h, gr = g; e = m * gr * h
    return e, f"Energia potencial gravitacional: E = m·g·h = {fmt(m)} × {fmt(gr)} × {fmt(h)} = {fmt(e)} J."
@solver(r"corpo de massa ([\d.,]+) kg desloca-se a ([\d.,]+) m/s")
def _s(g):
    m, v = g; p = m * v
    return p, f"Quantidade de movimento: Q = m·v = {fmt(m)} × {fmt(v)} = {fmt(p)} kg·m/s."
@solver(r"peso aproximado de um corpo de massa ([\d.,]+) kg.*?g = ([\d.,]+) m/s\^2")
def _s(g):
    m, gr = g; p = m * gr
    return p, (f"Peso é força: P = m·g = {fmt(m)} × {fmt(gr)} = {fmt(p)} N. "
               f"Massa ({fmt(m)} kg) e peso ({fmt(p)} N) têm grandezas e unidades diferentes.")
@solver(r"força de ([\d.,]+) N atua perpendicularmente sobre uma área de ([\d.,]+) m\^2")
def _s(g):
    f, a = g; p = f / a
    return p, f"Pressão: p = F/A = {fmt(f)} / {fmt(a)} = {fmt(p)} Pa."
@solver(r"elevar em ([\d.,]+) °C a temperatura de ([\d.,]+) kg de água.*?c = ([\d.,]+) J")
def _s(g):
    dt, m, c = g; q = m * c * dt
    return q, f"Calor sensível: Q = m·c·ΔT = {fmt(m)} × {fmt(c)} × {fmt(dt)} = {fmt(q)} J."
@solver(r"isotérmica: inicialmente P = ([\d.,]+) atm e V = ([\d.,]+) L; ao final, P = ([\d.,]+) atm")
def _s(g):
    p1, v1, p2 = g; v2 = p1 * v1 / p2
    return v2, (f"Lei de Boyle (T constante): P₁V₁ = P₂V₂, então "
                f"V₂ = {fmt(p1)}×{fmt(v1)}/{fmt(p2)} = {fmt(v2)} L.")
@solver(r"onda tem frequência de ([\d.,]+) Hz e comprimento de onda de ([\d.,]+) m")
def _s(g):
    f, l = g; v = f * l
    return v, f"Equação fundamental da ondulatória: v = λ·f = {fmt(l)} × {fmt(f)} = {fmt(v)} m/s."
@solver(r"resistor de ([\d.,]+) Ω é ligado a uma tensão de ([\d.,]+) V")
def _s(g):
    r, u = g; i = u / r
    return i, f"1ª lei de Ohm: i = U/R = {fmt(u)} / {fmt(r)} = {fmt(i)} A."
@solver(r"massa inicial ([\d.,]+) mg tem meia-vida de ([\d.,]+) anos.*?após ([\d.,]+) anos")
def _s(g):
    m0, T, t = g; n = t / T; v = m0 / 2 ** n
    return v, (f"Em {fmt(t)} anos cabem {fmt(n)} meias-vidas: m = m₀/2ⁿ = "
               f"{fmt(m0)}/2^{fmt(n)} = {fmt(v)} mg.")
# ---- quimica
@solver(r"([\d.,]+) mol de .*?massa molar é ([\d.,]+) g/mol")
def _s(g):
    n, M = g; m = n * M
    return m, f"m = n·M = {fmt(n)} mol × {fmt(M)} g/mol = {fmt(m)} g."
@solver(r"([\d.,]+) g de soluto em ([\d.,]+) L de solução")
def _s(g):
    m, v = g; c = m / v
    return c, f"Concentração comum: C = m/V = {fmt(m)} g / {fmt(v)} L = {fmt(c)} g/L."
@solver(r"\[H\+\] = 1 × 10\^-(\d+) mol/L")
def _s(g):
    p = g[0]
    return p, (f"pH = −log[H⁺] = −log(10^−{int(p)}) = {int(p)}. "
               f"Como está abaixo de 7, a solução é ácida.")
@solver(r"gás ideal com ([\d.,]+) mol ocupa ([\d.,]+) L a ([\d.,]+) K.*?R = ([\d.,]+)")
def _s(g):
    n, v, t, R = g; p = n * R * t / v
    return p, (f"Equação de Clapeyron: PV = nRT, então P = nRT/V = "
               f"{fmt(n)}×{fmt(R,3)}×{fmt(t)}/{fmt(v)} = {fmt(p,2)} atm.")
@solver(r"([\d.,]+) g de água recebe calor.*?variar sua temperatura em ([\d.,]+) °C.*?c = ([\d.,]+) J")
def _s(g):
    m, dt, c = g; q = m * c * dt
    return q, f"Q = m·c·ΔT = {fmt(m)} × {fmt(c,1)} × {fmt(dt)} = {fmt(q)} J."
@solver(r"corrente constante de ([\d.,]+) A atravessa uma célula eletrolítica durante ([\d.,]+) s")
def _s(g):
    i, t = g; qc = i * t
    return qc, f"Carga: Q = i·t = {fmt(i)} A × {fmt(t)} s = {fmt(qc)} C."

def resolver(q):
    """Devolve (valor, explicacao) ou (None, None)."""
    e = q["enun"]
    m = re.search(r"Considere os valores ([\d,\s]+)\. Qual é a (média aritmética|mediana)", e)
    if m:
        vals = [float(x) for x in re.findall(r"\d+", m.group(1))]
        if m.group(2).startswith("média"):
            v = sum(vals) / len(vals)
            return v, (f"Média: ({' + '.join(fmt(x) for x in vals)}) / {len(vals)} = "
                       f"{fmt(sum(vals))} / {len(vals)} = {fmt(v)}.")
        s = sorted(vals); n = len(s)
        v = s[n // 2] if n % 2 else (s[n // 2 - 1] + s[n // 2]) / 2
        return v, (f"Mediana: em ordem, {', '.join(fmt(x) for x in s)}; com {n} valores o termo "
                   f"central é {fmt(v)}. A média seria {fmt(sum(vals)/n)} — as duas não coincidem.")
    m = re.search(r"número atômico (\d+) e número de massa (\d+)", e)
    if m:
        z, a = int(m.group(1)), int(m.group(2))
        return (z, z, a - z), (f"O número atômico dá os prótons (Z = {z}); o átomo é neutro, "
                               f"logo tem {z} elétrons; os nêutrons saem de A − Z = {a} − {z} = {a-z}.")
    for rx, fn in SOLVERS:
        mm = rx.search(e)
        if not mm: continue
        try: g = [num(x) for x in mm.groups()]
        except Exception: continue
        if any(x is None for x in g): continue
        try: v, exp = fn(g)
        except Exception: continue
        if v is not None: return v, exp
    return None, None

# ------------------------------------------------------- comandos das bancas
#
# O PDF usa comandos de apostila ("Qual e sua ideia central?"). Os dois estudos
# do projeto documentam os comandos que as bancas de fato escrevem, e trocar a
# frase e barato — nao muda a questao, muda o que o aluno treina ler.
#
#  - "E correto afirmar que" / "Depreende-se do texto que": as duas formas do
#    comando de Portugues da FGV (estudo de formulacao, Parte D, Portugues FGV).
#  - "most likely": 13 das 15 questoes de Ingles da FGV 2026.1 (anatomia, §3.3).
#    O comando "quase nunca pede o que o texto diz; pede o que ele mais
#    provavelmente sustenta".
#  - Norma-padrao: a FGV escreve "Assinale a alternativa em que a norma culta
#    foi respeitada", SEM nomear o fenomeno (formulacao, Parte D, Gramatica
#    FGV). Nomear, como o PDF fazia, entrega metade do trabalho: o aluno ja sabe
#    onde olhar. O fenomeno continua na explicacao, que e onde ele serve.
# ------------------------------------------------ o que sobe ao banco principal
#
# A maior parte deste banco e treino por assunto e fica so na busca. Tres
# familias, porem, passam no checklist das bancas item a item, e essas sobem
# para data/questions/ — entram no cronograma, no simulado, no caderno de erros
# e no progresso, como qualquer questao do banco principal.
#
# INTERPRETACAO (60). O cookbook de Portugues da FGV pede, nesta ordem:
# "texto-base curto (1 paragrafo ou ate uma unica frase densa), nunca um texto
# longo"; "tema contemporaneo de debate social, politico ou cultural"; comando
# "E correto afirmar que" ou "Depreende-se do texto que"; "distratores que
# extrapolem indevidamente uma afirmacao pontual para uma tese geral, ou que
# invertam sutilmente uma relacao de causa/consequencia"; cinco alternativas.
# As 20 passagens tem uma a duas frases, sao sobre biblioteca publica,
# arborizacao, mobilidade, transparencia de dados, acessibilidade em museu,
# mapa de risco — e os distratores dos pools sao exatamente inversao e
# extrapolacao. Bate nos cinco pontos.
#
# INGLES (60 dos 120). Sobem "main idea" e o item de inferencia, que ja usa o
# comando "most likely" — 13 das 15 questoes de Ingles da FGV 2026.1 (anatomia
# §3.3), e a forma que o ingles do banco principal ja usa ("The text most likely
# supports which of the following claims?"). NAO sobem os 30 de "detail", porque
# perguntam o que o texto DIZ, que e justamente o comando que a banca evita, nem
# os 30 de vocabulario: a FGV glosa em portugues as palavras dificeis dentro do
# texto, removendo vocabulario como variavel de proposito.
#
# MATEMATICA (120 dos 240). Sobem so as familias com situacao a modelar. O
# cookbook pede "enunciado autocontido e direto, sem texto-base externo, apenas
# dados numericos e uma situacao a modelar", tema-ancora em
# combinatoria/probabilidade/funcoes, e "distratores de erro de execucao (...)
# trocar combinacao por arranjo" — que os dez itens de comissao trazem. Fica de
# fora o calculo seco (sistema x+y, log, media/mediana, formula de area, PA/PG,
# distancia entre pontos, trigonometria): a anatomia §3.1 registra que na FGV
# "nenhuma questao apresenta uma formula pronta para resolver".
MAT_PROMOVER = re.compile(r"custava R\$|capital de R\$|verba de R\$|urna contém|"
                          r"grupo de \d+ estudantes|Entre \d+ finalistas|"
                          r"população de bactérias|tarifa é modelada")

COMANDOS = {
    "Qual é sua ideia central?":
        "É correto afirmar que a ideia central do texto é:",
    "A partir do texto, é possível inferir que:":
        "Depreende-se do texto que:",
    "What can reasonably be inferred from the passage?":
        "Which of the following is most likely supported by the passage?",
}

def escolher_distratores(pool, certa, giro_item):
    """Quatro distratores do bolo da passagem, sem deixar a certa como a maior.

    A cascata: rotaciona o bolo pelo indice do item (para as tres perguntas da
    mesma passagem nao receberem o mesmo conjunto), pega quatro, e — se a certa
    ficou sozinha como a mais comprida — troca o menor selecionado pelo maior
    disponivel. Sem esse ultimo passo o indice de chutabilidade em Ingles ficava
    em 36,7%, contra o alvo de 30% do projeto.
    """
    cand = [p for p in pool if p != certa]
    if len(cand) < 4: return None
    # Passo 3 e nao 1: com sete candidatos e quatro escolhidos, girar de um em um
    # faz as tres perguntas da mesma passagem dividirem tres distratores. As
    # bancas nao repetem distrator entre itens do mesmo texto; com passo 3 a
    # sobreposicao cai para um.
    k = (giro_item * 3) % len(cand)
    cand = cand[k:] + cand[:k]
    sel = cand[:4]
    if max(len(x) for x in sel) <= len(certa):
        maior = max(cand, key=len)
        if len(maior) > len(certa) and maior not in sel:
            sel[sel.index(min(sel, key=len))] = maior
    return sel if len(set(sel)) == 4 else None

def bate(valor, q):
    """A conta confere com o gabarito do PDF?"""
    if isinstance(valor, tuple):
        got = re.findall(r"\d+", q["alts"][q["resp"]])
        return [int(x) for x in got] == list(valor)
    dado = valor_resp(q)
    if dado is None: return False
    if isinstance(valor, Fraction) or isinstance(dado, Fraction):
        return Fraction(valor).limit_denominator(10**6) == Fraction(dado).limit_denominator(10**6)
    return abs(float(dado) - float(valor)) <= max(0.02, abs(float(valor)) * 0.005)

# ------------------------------------------------------- montagem das questoes
LETRAS = "abcde"
saida = collections.defaultdict(list)
descartes = collections.Counter()
seq = collections.Counter()
vistos = {}                      # enunciado normalizado -> id ja emitido
giro = collections.Counter()     # rodizio da posicao da resposta, por frente

ALT_NUM = re.compile(r"^\s*(R\$\s*)?(-?[\d][\d.]*(?:,\d+)?)(\s*[^\d]*)$")

def normalizar_casas(alts):
    """Iguala as casas decimais das alternativas puramente numericas.

    O PDF escreve a resposta certa com centavos e os distratores redondos —
    "R$ 188,10" contra "R$ 198", "R$ 171", "R$ 180". Isso deixa a certa como a
    unica mais comprida, e "marque a maior" e o tell que o verify-banco.ps1
    mede: a frente de matematica subiu de 3,3% para 7,4% de chutabilidade so
    por causa disso, e a catraca reprovou o lote — corretamente.

    Igualar as casas nao mexe em valor nenhum: R$ 198 e R$ 198,00 sao o mesmo
    numero. E o que a prova impressa faz, alias, justamente para as opcoes nao
    se denunciarem pelo tamanho.
    """
    casados = [ALT_NUM.match(t) for t in alts]
    if not all(casados): return alts
    if len({m.group(3).strip() for m in casados}) != 1: return alts   # unidades diferentes
    casas = max(len(m.group(2).split(",")[1]) if "," in m.group(2) else 0 for m in casados)
    if casas == 0: return alts
    saida = []
    for m in casados:
        inteiro = m.group(2).replace(".", "").replace(",", ".")
        try: v = float(inteiro)
        except ValueError: return alts
        milhar = f"{v:,.{casas}f}".replace(",", "\x00").replace(".", ",").replace("\x00", ".")
        saida.append(f"{(m.group(1) or '').strip()}{' ' if m.group(1) else ''}{milhar}"
                     f"{(' ' + m.group(3).strip()) if m.group(3).strip() else ''}")
    return saida if len(set(saida)) == 5 else alts

def emitir(q, enun, alts_txt, certa_txt, explicacao, texto_apoio=None, promo=None):
    """alts_txt: lista de 5 strings; certa_txt tem que estar nela."""
    alts_txt = [re.sub(r"\s+", " ", t).strip() for t in alts_txt]
    certa_txt = re.sub(r"\s+", " ", certa_txt).strip()
    # O ponto final so cai quando e artefato. Nas questoes de norma-padrao as
    # cinco alternativas sao frases completas e TODAS terminam em ponto — tirar
    # dali deixava "Faltam duas paginas no relatorio" sem pontuacao, e ainda
    # fazia a explicacao (montada antes) citar a frase com um ponto que a
    # alternativa na tela nao tinha.
    if not all(t.endswith(".") for t in alts_txt):
        alts_txt = [t.rstrip(".") for t in alts_txt]
        certa_txt = certa_txt.rstrip(".")

    i_certa = alts_txt.index(certa_txt) if certa_txt in alts_txt else -1
    if i_certa >= 0:
        novas = normalizar_casas(alts_txt)
        if novas is not alts_txt:
            alts_txt, certa_txt = novas, novas[i_certa]
    if len(set(alts_txt)) != 5 or certa_txt not in alts_txt:
        descartes["alternativa duplicada ou certa ausente"] += 1; return

    # Clone exato: o PDF repete a mesma questao em "Serie 6..10" (etanol aparece
    # como Serie 1 e Serie 6, [H+]=10^-2 como Serie 1 e Serie 7). Depois de tirar
    # o sufixo de serie, o enunciado e o mesmo — e um item so.
    #
    # A chave inclui o texto de apoio e a resposta, e nao so o enunciado: nos
    # itens de compreensao o enunciado E o comando ("What is the main idea of the
    # passage?"), identico nas 30 passagens. Deduplicar so por ele apagaria 29
    # questoes boas — foi o que aconteceu na primeira versao desta trava.
    chave = unicodedata.normalize(
        "NFKD", (enun + "|" + (texto_apoio or "") + "|" + certa_txt).lower()).strip()
    if chave in vistos:
        descartes["clone exato de outro item"] += 1; return
    vistos[chave] = True

    # A posicao da resposta vai por rodizio dentro da frente, e nao por sorteio:
    # com 1.400 sorteios independentes o gabarito fecha em 16%/24% por puro
    # acaso, e o app avisa fora da faixa de 12-28%. O rodizio fecha em 20% exatos
    # sem criar padrao previsivel, porque a ORDEM dos distratores continua
    # embaralhada e as frentes se intercalam.
    fr = frente_de(q)
    pos = giro[fr] % 5; giro[fr] += 1
    distr = [t for t in alts_txt if t != certa_txt]; rng.shuffle(distr)
    ordem = distr[:pos] + [certa_txt] + distr[pos:]
    letra = LETRAS[pos]
    seq[q["disc"]] += 1

    # O selo de dificuldade do app tem DOIS estados: app.js:3524 escreve
    # "Difícil" para 'dificil' e "Média" para qualquer outro valor. Um
    # 'facil' sairia com o rotulo "Média" e a classe .q-difficulty-facil, que
    # nao existe no CSS. As questoes antigas simplesmente nao tem o campo, e e
    # esse o estado certo para as basicas.
    #
    # E o nivel nao vem do rotulo do PDF: a auditoria mostrou que ele e
    # decorativo (75% "Intermediária"). Vem do proprio item — conta de duas ou
    # mais etapas, ou item de inferencia, e 'dificil'.
    etapas = len(re.findall(r"[×÷+−/^]|√", explicacao))
    if promo == "inferencia" or etapas >= 3: dif = "dificil"
    elif q["niv"] == "Básica": dif = None
    else: dif = "media"

    item = {"id": f"xtr-{q['disc']}-{seq[q['disc']]:04d}",
            "enunciado": enun.strip(),
            "alternativas": {LETRAS[i]: ordem[i] for i in range(5)},
            "resposta": letra,
            "explicacao": explicacao.strip(),
            "formato": "direta",
            "origem": "banco-extra"}
    if dif: item["dificuldade"] = dif
    if texto_apoio: item["texto_apoio"] = texto_apoio
    if promo: item["_promo"] = promo
    saida[fr].append(item)

# -- mapa subtema -> definicao (familia A) e -> rotulos vizinhos
DEFIN = {}
for q in Q.values():
    m = re.search(r"descrito por esta formulação:\s*(.+?)\?\s*$", q["enun"])
    if m: DEFIN[q["sub"]] = m.group(1).strip()

CHRONO = re.compile(r"século|séc\.|a\.C\.|d\.C\.|\b1[0-9]{3}\b|\b20[0-9]{2}\b|Antiguidade|"
                    r"medieval|moderna|milênio|a partir de|entre \d|Idade M", re.I)

for n in sorted(Q):
    q = Q[n]; e = q["enun"]; sub = q["sub"]; certa = q["alts"][q["resp"]]
    outras = [t for l, t in q["alts"].items() if l != q["resp"]]

    # ---------- A: definicao -> conceito
    m = re.search(r"descrito por esta formulação:\s*(.+?)\?\s*$", e)
    if m:
        d = m.group(1).strip()
        emitir(q, f"Qual conceito ou processo corresponde a esta definição: {d}?",
               list(q["alts"].values()), certa,
               f"A definição descreve {certa}: {d}. As demais alternativas nomeiam conceitos "
               f"vizinhos da mesma frente, com definição distinta.")
        continue

    # ---------- D: associacao (LEAK) -> conceito -> definicao
    m = re.search(r"Assinale a associação conceitualmente correta sobre (.+?)\.\s*$", e)
    if m:
        alvo = m.group(1).strip()
        vizinhos = [t.split(":")[0].strip() for t in outras if ":" in t]
        defs = [DEFIN[v] for v in vizinhos if v in DEFIN and DEFIN[v] != DEFIN.get(alvo)]
        if alvo not in DEFIN or len(set(defs)) < 4:
            descartes["D sem definições vizinhas suficientes"] += 1; continue
        escolhidas = list(dict.fromkeys(defs))[:4] + [DEFIN[alvo]]
        emitir(q, f"Qual definição corresponde corretamente a {alvo}?",
               escolhidas, DEFIN[alvo],
               f"{alvo} é {DEFIN[alvo]}. Os distratores são as definições de conceitos vizinhos "
               f"da mesma frente — o erro típico é reconhecer o campo temático sem distinguir o conceito.")
        continue

    # ---------- B e C: conceito -> funcao / condicao
    m = re.search(r"Qual (consequência, função ou importância|condição) .*?(?:associada a|caracterizar) (.+?)\?\s*$", e)
    if m:
        alvo = m.group(2).strip()
        funcao = m.group(1).startswith("consequência")
        emitir(q, (f"Qual consequência ou função se associa corretamente a {alvo}?" if funcao
                   else f"Qual condição ajuda a caracterizar {alvo}?"),
               list(q["alts"].values()), certa,
               f"{alvo}: {certa}. As outras alternativas descrevem "
               f"{'funções e consequências' if funcao else 'condições'} de conceitos vizinhos "
               f"da mesma frente.")
        continue

    # ---------- F: contexto (so quando a resposta e datacao/contexto)
    m = re.search(r"Em qual contexto histórico ou analítico o tema (.+?) deve ser situado\?", e)
    if m:
        alvo = m.group(1).strip()
        if not CHRONO.search(certa):
            descartes["F sem datação (resposta ambígua)"] += 1; continue
        emitir(q, f"Em que contexto histórico deve ser situado o tema {alvo}?",
               list(q["alts"].values()), certa,
               f"{alvo} se situa em: {certa}. Os distratores são recortes de tempo e espaço de temas "
               f"vizinhos da mesma frente; a datação é o que separa um do outro.")
        continue

    # ---------- E: norma-padrao
    m = re.search(r"Assinale a alternativa adequada à norma-padrão quanto a (.+?)\.(?:\s*Conjunto \d+\.)?\s*$", e)
    if m:
        tema = m.group(1).strip()
        emitir(q, "Assinale a alternativa em que a norma-padrão foi respeitada.",
               list(q["alts"].values()), certa,
               f"O fenômeno em jogo é {tema}. A única construção que o respeita é «{certa}»; "
               f"as outras quatro apresentam desvio no mesmo ponto — compare-as par a par com "
               f"a correta.")
        continue

    # ---------- compreensao (PT e EN) e vocabulario
    mp = re.findall(r"“(.+?)”", e)
    passagem = mp[0] if mp and len(mp[0]) > 60 else None
    if passagem:
        chave = passagem[:42]
        pool = (POOLS.get(chave) or []) + (POOLS_LONGOS.get(chave) or [])
        # O comando sem a passagem colada: ela vai para texto_apoio, que e como
        # o app ja renderiza texto compartilhado. Tirar so as aspas deixava
        # "qual estrategia de construcao se destaca?" comecando em minuscula.
        comando = e.replace("“" + passagem + "”", "")
        comando = re.sub(r"^\s*(Leia o texto|Read the passage)\s*:?\s*", "", comando)
        comando = re.sub(r"\s+", " ", comando).strip()
        comando = re.sub(r"^[,.:;]\s*", "", comando).strip()
        comando = re.sub(r"\s+([,.:;?])", r"\1", comando)
        if comando and comando[0].islower(): comando = comando[0].upper() + comando[1:]
        comando = COMANDOS.get(comando, comando) or e
        item_giro = seq[q["disc"]]

        if "closest in meaning" in e:                       # vocabulario: mantido
            mw = re.search(r"the word “?([\w'-]+)”? is closest", e)
            palavra = mw.group(1) if mw else "the word"
            emitir(q, comando, list(q["alts"].values()), certa,
                   f"In this passage, “{palavra}” means “{certa}”. The other options are plausible "
                   f"dictionary senses of the word that do not fit this context.",
                   texto_apoio=passagem)
            continue
        if q["sub"] == "Organização textual":
            distr = escolher_distratores(ESTRATEGIAS, certa, item_giro)
            emitir(q, comando, distr + [certa], certa,
                   f"A estratégia empregada é: {certa}. As demais alternativas nomeiam recursos de "
                   f"construção que não aparecem neste trecho.", texto_apoio=passagem,
                   promo="estrategia")
            continue
        distr = escolher_distratores(pool, certa, item_giro) if pool else None
        if not distr:
            descartes["compreensão sem pool de distratores"] += 1; continue
        pt = q["disc"] == "port"
        exp = (f"O trecho sustenta: {certa}. As outras alternativas falam do mesmo texto, mas "
               f"afirmam o que ele não diz ou contrariam o que ele diz."
               if pt else
               f"The passage supports: {certa}. The other options refer to the same text but state "
               f"what it does not support or contradict what it says.")
        # "Detail" (o que o texto DIZ) nao sobe ao banco principal: e justamente
        # o comando que a FGV evita (anatomia §3.3).
        promo = None
        if q["sub"] in ("Interpretação de texto", "Main idea"): promo = "ideia-central"
        elif q["sub"] in ("Inferência textual", "Inference"): promo = "inferencia"
        emitir(q, comando or e, distr + [certa], certa, exp, texto_apoio=passagem, promo=promo)
        continue

    # ---------- numericas
    valor, exp = resolver(q)
    if valor is not None:
        if not bate(valor, q):
            descartes["conta não bate com o gabarito"] += 1; continue
        emitir(q, re.sub(r"\s*(Série|Conjunto) \d+\.\s*$", "", e),
               list(q["alts"].values()), certa, exp,
               promo=("modelagem" if (q["disc"] == "mat" and MAT_PROMOVER.search(e)) else None))
        continue

    # ---------- quimica organica: composto -> funcao
    m = re.search(r"A qual função orgânica pertence o composto (.+?)\?", e)
    if m:
        comp = m.group(1).strip()
        emitir(q, f"A qual função orgânica pertence o composto {comp}?",
               list(q["alts"].values()), certa,
               f"{comp[0].upper()}{comp[1:]} pertence à função {certa}, identificada pelo grupo "
               f"funcional característico. As demais alternativas nomeiam outras funções da química "
               f"orgânica, cada uma com grupo funcional próprio.")
        continue

    # ---------- conceituais de exatas (cinetica, equilibrio, inducao, tabela periodica...)
    if q["disc"] in ("fis", "qui") and len(certa) > 25:
        emitir(q, re.sub(r"\s*(Série|Conjunto|experimento|caso) ?\d*\.?\s*$", "", e).strip(),
               list(q["alts"].values()), certa,
               f"A afirmação correta é: {certa}. As demais invertem o sentido do fenômeno ou "
               f"atribuem a ele uma causa que não se sustenta.")
        continue
    descartes[f"sem tratamento ({q['disc']})"] += 1

# ------------------------------------------------------------------ relatorio
total = sum(len(v) for v in saida.values())
print(f"IMPORTADAS: {total} de 1500")
for k in sorted(saida, key=lambda k: -len(saida[k])):
    print(f"   {k:26s} {len(saida[k]):4d}")
print(f"\nDESCARTADAS: {sum(descartes.values())}")
for k, v in descartes.most_common(): print(f"   {v:4d}  {k}")

# tells de forma, medidos no resultado
def tell(items):
    longa = keys = collections.Counter(); n = 0; nl = 0
    keys = collections.Counter()
    for it in items:
        n += 1; keys[it["resposta"]] += 1
        mx = max(len(t) for t in it["alternativas"].values())
        cand = [l for l, t in it["alternativas"].items() if len(t) == mx]
        if len(cand) == 1 and cand[0] == it["resposta"]: nl += 1
    return n, nl, keys
todas = [it for v in saida.values() for it in v]
n, nl, keys = tell(todas)
print(f"\nmais-longa = certa: {100*nl/n:.1f}%  (acaso 20%)")
print("gabarito: " + " ".join(f"{l}={100*keys[l]/n:.1f}%" for l in LETRAS))

# ------------------------------------------------------------------ saida .js
SUB_EXTRA = [
    ("interpretacao-texto", "Linguagens", "Interpretação de Texto"),
    ("literatura", "Linguagens", "Literatura Brasileira"),
    ("gramatica", "Linguagens", "Gramática e Norma Culta"),
    ("ingles", "Linguagens", "Inglês: Reading Comprehension"),
    ("matematica-rlm", "Exatas", "Matemática Básica e Raciocínio Lógico"),
    ("ciencias-natureza", "Exatas", "Ciências da Natureza (Noções Gerais)"),
    ("historia-geral", "Ciências Humanas", "História Geral"),
    ("historia-brasil", "Ciências Humanas", "História do Brasil"),
    ("geografia", "Ciências Humanas", "Geografia Humana e Física"),
    ("filosofia-sociologia", "Ciências Humanas", "Filosofia e Sociologia"),
    ("artes-cultura", "Ciências Humanas", "Artes e Cultura Contemporânea"),
    ("direitos-humanos", "Ciências Humanas", "Direitos Humanos e Cidadania"),
    ("atualidades-geopolitica", "Atualidades", "Atualidades: Geopolítica e Relações Internacionais"),
    ("atualidades-meioambiente", "Atualidades", "Atualidades: Meio Ambiente e Sustentabilidade"),
    ("atualidades-politica", "Atualidades", "Atualidades: Política e Economia do Brasil"),
]
subs = [{"id": i, "area": a, "nome": nm} for i, a, nm in SUB_EXTRA if saida.get(i)]
cab = '''// Banco complementar — 1.500 questões autorais adaptadas do PDF
// "banco-1500-questoes-fgv-insper" (edição de 08/08/2026), gerado por
// adaptar-banco-extra.py.
//
// POR QUE ELE NÃO ESTÁ EM data/questions/ COMO OS OUTROS: este banco só pode
// aparecer na aba Buscar. Ele não passou pelo mesmo crivo do banco principal —
// é material de treino por assunto, sem texto-base longo, sem escada de
// asserções e sem atualidades datadas, então não serve de simulado nem de dia
// de estudo. Ficar fora de window.QUESTION_BANKS é o que garante isso: o
// schedule.js lê aquele global e só aquele, e assim nenhuma questão daqui pode
// vazar para o cronograma, para o simulado, para o caderno de erros ou para o
// progresso por frente, sem depender de ninguém lembrar de filtrar.
//
// O que foi adaptado em relação ao PDF (auditoria completa no relatório):
//   - 148 itens "assinale a associação correta" traziam a resposta escrita no
//     próprio enunciado; viraram "qual definição corresponde a X".
//   - 150 itens de compreensão tinham os quatro distratores falando de OUTRA
//     passagem; ganharam distratores escritos para a própria passagem.
//   - as 470 questões numéricas foram resolvidas uma a uma e só entraram as
//     que batem com o gabarito do PDF; a explicação é a conta.
//   - o PDF não traz explicação nenhuma, e o app exige o campo.
'''
# ---------------------------------------------- separacao: busca x principal
#
# O que tem _promo sai daqui e vai para promovidas.json, que o
# promover-para-banco-principal.ps1 costura em data/questions/. As duas saidas
# sao disjuntas de proposito: uma questao no banco principal JA aparece na busca
# (ela vem de window.QUESTION_BANKS), e deixa-la tambem no banco complementar a
# faria aparecer duas vezes na mesma tela.
promovidas = collections.defaultdict(list)
for fr in list(saida):
    fica = []
    for it in saida[fr]:
        p = it.pop("_promo", None)
        if p:
            it["tipoItem"] = p
            promovidas[fr].append(it)
        else:
            fica.append(it)
    saida[fr] = fica

npro = sum(len(v) for v in promovidas.values())
print(f"\nSOBEM AO BANCO PRINCIPAL: {npro}")
for fr in sorted(promovidas, key=lambda f: -len(promovidas[f])):
    tipos = collections.Counter(it["tipoItem"] for it in promovidas[fr])
    print(f"   {fr:26s} {len(promovidas[fr]):4d}  ({', '.join(f'{k}={v}' for k, v in sorted(tipos.items()))})")
print(f"FICAM SÓ NA BUSCA: {sum(len(v) for v in saida.values())}")

json.dump({k: v for k, v in promovidas.items()},
          open(os.path.join(AQUI, "promovidas.json"), "w", encoding="utf-8", newline="\n"),
          ensure_ascii=False, indent=2)

# Sem virgula sobrando: o objeto sai de um json.dumps unico. JS tolera a virgula
# final, mas o validador (e qualquer leitor JSON) nao — e e o validador que
# precisa conseguir abrir este arquivo.
bancos = {i: saida[i] for i, _, _ in SUB_EXTRA if saida.get(i)}
js = [cab,
      "window.SUBTOPICS_EXTRA = " + json.dumps(subs, ensure_ascii=False, indent=2) + ";",
      "",
      "window.QUESTION_BANKS_EXTRA = " + json.dumps(bancos, ensure_ascii=False, indent=2) + ";"]
open(OUT, "w", encoding="utf-8", newline="\n").write("\n".join(js) + "\n")
print(f"\ngravado: {OUT}")
