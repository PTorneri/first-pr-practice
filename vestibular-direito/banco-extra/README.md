# Banco complementar — como ele é feito e por que fica fora do banco principal

`../data/banco-extra.js` sai daqui. São **1.374 questões** adaptadas de um PDF autoral de 1.500
(*banco-1500-questoes-fgv-insper*, edição de 08/08/2026, gerado fora deste projeto). Elas aparecem
**só na aba Buscar**.

## Por que não entram no banco principal

O PDF foi auditado antes de qualquer importação. O que ele tem de bom: integridade estrutural
perfeita (1.500 gabaritos, cinco alternativas distintas em todas), gabarito equilibrado e
aritmética correta. O que ele não tem — e é o que separa treino de simulado:

| A prova real | O PDF |
|---|---|
| Escada de asserções I/II/III: 5 das 15 de Humanas da FGV | 0 |
| "Most likely": 13 das 15 de Inglês da FGV | 0 |
| Item de exceção, V/F, duas lacunas (Insper) | 0 |
| FGV pendura 6 questões num romance; Insper monta Linguagens sobre 4 textos | 12% dos itens têm texto, de 50 passagens recicladas |
| Obra da lista obrigatória: 9 das 15 de LP da FGV 2026.1 | 0 menções |
| Atualidades com fonte de 1 a 3 meses antes da prova | 1 ocorrência de ano no documento inteiro |
| Charge, tirinha, pintura, mapa: 15 fontes distintas em Humanas | 0 imagens |

Daí o desenho: é material de **repetição por assunto**, não de simulação. Ver o estudo
`../estudo-anatomia-provas-fgv-insper-2025-2026.md` para a anatomia das duas provas.

## O que foi adaptado

| Família | Itens | O que era | O que virou |
|---|---:|---|---|
| "Assinale a associação correta sobre X" | 148 | as cinco alternativas traziam a **mesma** definição com o rótulo trocado, e o rótulo certo estava escrito no enunciado — resolvia por casamento de string | "Qual definição corresponde a X?", com as definições dos quatro conceitos vizinhos como distratores |
| Compreensão (Inglês e Português) | 150 | os quatro distratores falavam de **outra** passagem: a certa era a única no assunto, e o tell lexical acertava 69,7% em Inglês | distratores escritos para a própria passagem (`pools.py`, `pools_longos.py`) |
| "Em qual contexto histórico…" | 148 | boa em História e escolas literárias; ambígua nos conceitos de linguagem ("Denotação" admitia duas respostas defensáveis) | mantidas as 66 cuja resposta é datação; **82 descartadas** |
| Numéricas de Mat/Fís/Quím | 470 | corretas, mas sem explicação | **resolvidas uma a uma** por `SOLVERS`; só entram as que batem com o gabarito do PDF, e a explicação é a conta |
| Clones de "Série N" | 44 | o mesmo item repetido sob rótulo de série diferente | **descartados** |
| Todas | 1.374 | o PDF não traz explicação nenhuma, e o app exige o campo | explicação gerada por família |

Resultado medido: chutabilidade **15,4%** pela heurística do `verify-banco.ps1` (acaso 20%, alvo
do projeto ≤25%), gabarito em 20% exatos por letra em cada frente.

## As 240 que subiram para o banco principal

Três famílias passam no checklist das bancas item a item e **saíram daqui** para
`../data/questions/`, onde valem como qualquer outra questão — entram no cronograma, no simulado,
no caderno de erros e no progresso. As duas saídas são disjuntas: uma questão do banco principal
já aparece na busca, e deixá-la também aqui a mostraria duas vezes na mesma tela.

| Frente | Qtd | Por que passou |
|---|---:|---|
| `matematica-rlm` | 120 | O cookbook da FGV pede "enunciado autocontido e direto, **sem** texto-base externo, apenas dados numéricos e uma situação a modelar", comando direto, e "distratores de erro de execução — trocar combinação por arranjo". Sobem só as famílias com situação (serviço com aumento e desconto, capital aplicado, verba na razão, urna, comissão/cargos, bactérias, tarifa). Fica de fora o cálculo seco — a anatomia §3.1 registra que na FGV "nenhuma questão apresenta uma fórmula pronta para resolver". |
| `interpretacao-texto` | 60 | Bate nos cinco pontos do cookbook de Português da FGV: texto-base de uma a duas frases ("nunca um texto longo"), tema contemporâneo de debate social, comando "É correto afirmar que"/"Depreende-se do texto que", distratores por extrapolação indevida e inversão de causa/consequência, cinco alternativas. Viram 20 clusters de 3 questões por texto. |
| `ingles` | 60 | "Main idea" e o item de inferência, que usa o comando **"most likely"** — 13 das 15 questões de Inglês da FGV 2026.1, e a forma que o `ingles.json` já usava. Viram 30 clusters de 2. **Não sobem** os 30 de *detail* (perguntam o que o texto diz, o comando que a banca evita) nem os 30 de vocabulário (a FGV glosa as palavras difíceis dentro do texto de propósito). |

Efeito medido no `verify-banco.ps1` depois da promoção:

| Frente | antes | depois |
|---|---:|---:|
| `interpretacao-texto` | 27,3% | **19,0%** |
| `ingles` | 26,7% | **19,0%** |
| `matematica-rlm` | 3,3% | **2,2%** |
| global | 20,1% | **12,9%** |

A primeira tentativa **reprovou**: matemática subiu de 3,3% para 7,4%, porque o PDF escreve a
resposta com centavos e os distratores redondos ("R$ 188,10" contra "R$ 198"), deixando a certa
como a única mais comprida. `normalizar_casas()` iguala as casas decimais — não muda valor
nenhum, R$ 198 e R$ 198,00 são o mesmo número — e a frente terminou melhor do que começou.

Um segundo defeito, este introduzido por mim e invisível para o `verify-banco.ps1`: metade dos
distratores longos de `pools_longos.py` era **meta-afirmação** — "O texto sustenta que…",
"The passage presents…". A alternativa certa nunca é assim, então valia a regra "opção que fala
*sobre* o texto está errada", que elimina um distrator de graça. Eram 62 dos 120 itens
promovidos; os 48 foram reescritos como afirmações de primeira ordem e hoje são **0**. É a mesma
família do `$AUTORREF_RX` do `verify-banco.ps1`: forma denunciando conteúdo.

## Como a promessa "só na busca" é garantida

Não por um filtro que alguém possa esquecer de aplicar. O arquivo escreve
`window.QUESTION_BANKS_EXTRA`; `schedule.js` monta o dia e o simulado lendo `window.QUESTION_BANKS`
— **só ele**. A questão não está no lugar de onde o dia é montado. Na busca, ela entra com
`trilha: "extra"`, o que faz `buscaSubtopicId` devolver `xt::extra::<frente>`: um id que não está
em `window.SUBTOPICS` e portanto é invisível para o Caderno de Erros e para o progresso por frente
— o mesmo desenho já usado para a trilha secundária.

`verificar-banco-extra.py` reprova se essa estrutura for desfeita.

## Conferência contra as provas reais

`conferir-contra-provas.py` mede o banco contra os dois estudos —
`../estudo-anatomia-provas-fgv-insper-2025-2026.md` (leitura dos 7 cadernos) e
`../estudo-formulacao-provas-objetivas-fgv-vunesp-enem-fuvest-2016-2025.pdf` (Parte D, cookbook).
Ele **não reprova**: imprime o tamanho da distância, porque a distância é o motivo de o banco
ficar fora do simulado, e não um defeito a corrigir.

O que ele mostra hoje (1.374 itens):

- **Formatos:** 0 escadas I/II/III (a FGV usa em 1/3 de Humanas), 0 itens de exceção, 0 V/F,
  0 itens de duas lacunas da Insper. 30 comandos "most likely", todos vindos da tabela `COMANDOS`.
- **Texto-base:** 13% dos itens. As duas bancas ancoram quase tudo — a FGV pendura 9 das 15 de
  Português em dois romances. **447 itens de Humanas não têm fonte nenhuma**, contra o
  "documentos primários ou citações de historiadores são o padrão, não pergunta solta".
- **Composição:** Ciências da Natureza é 24,7% do banco e 11,6% das duas provas somadas (a FGV
  não cobra Natureza em nenhuma fase); Interpretação de Texto é 7,9% do banco contra 14% das
  provas; Artes objetiva é 2,2% do banco e **não existe** em nenhuma das duas.
- **Contra o documentado:** 27 itens cobram teórico clássico pelo nome ("Evite cobrar
  Durkheim/Marx/Weber por nome"); 30 itens de vocabulário em inglês, competência que a FGV
  neutraliza de propósito glosando as palavras difíceis dentro do texto.
- **Matemática:** 40% com 2+ etapas (o cookbook pede média-alta com 2+), 0 de
  matrizes/determinantes (tema-âncora citado). Mas **10 de 10** itens de combinação trazem o
  valor do arranjo como distrator, que é exatamente o erro de execução que o cookbook manda usar.

O que foi alinhado depois dessa conferência, sem inventar conteúdo (tabela `COMANDOS`):
`"Qual é sua ideia central?"` → `"É correto afirmar que a ideia central do texto é:"`;
`"A partir do texto, é possível inferir que:"` → `"Depreende-se do texto que:"`;
`"What can reasonably be inferred…"` → `"Which of the following is most likely supported…"`;
e a norma-padrão deixou de nomear o fenômeno no comando (`"Assinale a alternativa em que a
norma-padrão foi respeitada."`), que é a forma da banca e devolve ao aluno o trabalho de
descobrir onde olhar — o fenômeno passou para a explicação.

## Rodar

```bash
python gerar-banco-extra.py                    # ../data/banco-extra.js + promovidas.json
powershell -File promover-para-banco-principal.ps1   # costura as 240 em ../data/questions/
cd .. && .\build-bundle.ps1 && .\verify-banco.ps1    # nesta ordem, sempre
cd banco-extra
python verificar-banco-extra.py    # estrutura + isolamento + promoção + chutabilidade
python conferir-contra-provas.py   # distância para as provas reais
node ../../vestibular-direito-v2/auditar-busca.js --trilha direito   # alcance por assunto
```

`promover-para-banco-principal.ps1` é idempotente (apaga as `origem="banco-extra"` antes de
inserir) e tem `-Desfazer`. Se o gerador mudar e o promover não for rodado de novo,
`verificar-banco-extra.py` reprova: ele compara, uma a uma, as promovidas de `promovidas.json`
com as que estão em `../data/questions/`.

`fonte-1500.txt` é o texto extraído do PDF (`pdftotext -layout -enc UTF-8`), guardado aqui para o
gerador ser reproduzível sem o PDF original.
