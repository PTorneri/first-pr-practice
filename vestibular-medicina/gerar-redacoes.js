// Gera data/redacoes.js da trilha de Medicina a partir do arquivo de Direito.
//
// Por que gerar em vez de escrever à mão — mesma razão de gerar-obras.ps1:
//
// As duas trilhas compartilham o repertório INTEIRO de redação. Assunto de
// redação não tem curso: a Unesp 2026 cobrou solidão, a Unifesp 2025 cobrou
// luto, a FGV 2026.1 cobrou liberdade de expressão, o Einstein 2025 cobrou quem
// paga pela preservação da Amazônia. Nenhum desses temas pertence a Direito ou a
// Medicina, e manter duas listas separadas garantiria só uma coisa: que a
// primeira correção feita de um lado nunca chegasse ao outro.
//
// O que MUDA entre as trilhas é o comando, e só ele:
//
//   Direito  -> "redija uma dissertação em prosa, de 20 a 30 linhas, sobre o
//               tema: X" — a fórmula da FGV, medida nos cadernos de 2025.1 e
//               2026.1. O arquivo de lá traz ainda um `comandoInsper`, que não
//               é copiado para cá: é outra banca e outro desenho de prova.
//   Medicina -> a fórmula da VUNESP e da Unifesp, transcrita LETRA POR LETRA
//               dos cadernos: "Com base nos textos apresentados e em seus
//               próprios conhecimentos, escreva um texto dissertativo-
//               argumentativo, empregando a norma-padrão da língua portuguesa,
//               sobre o tema:", com o tema em bloco separado logo abaixo.
//               Idêntica em Unesp 2026.1, Unifesp 2026, Einstein 2025 e 2026.2
//               e Santa Casa 2025 e 2026 — as quatro bancas usam a mesma frase.
//
// A diferença não é estilística. O candidato precisa reconhecer o comando da
// sua banca no dia da prova, e "dissertação em prosa" e "texto dissertativo-
// argumentativo" são os dois nomes com que o mesmo gênero aparece nos cadernos.
//
// O que este script NÃO faz, e por quê:
//
//   1. NÃO pede título. A versão anterior pedia, com a justificativa de que
//      treinar título não custa nota. Os cadernos desmentem a premissa de que
//      isso reproduz o comando: Unesp, Unifesp, Einstein e Santa Casa não pedem
//      título nenhum. Quem pede são a PUC-SP ("Dê um título ao texto") e a
//      FUVEST. Onde o título é exigido, quem avisa é a ficha da aba, não um
//      comando inventado.
//   2. NÃO cita limite de linhas. As quatro bancas também não citam: o limite
//      está na folha de resposta, que tem 33 linhas numeradas em todas elas
//      (32 na PUC-SP). O que zera é o piso — 7 linhas ou menos na Unifesp e na
//      PUC-SP, e menos de 8 linhas autorais contínuas na Unifesp.
//   3. NÃO varia a abertura. A frase é a mesma nos seis cadernos lidos; variar
//      seria estilo meu, não formato da banca.
//
// E uma coisa que ele decide: os IDs são os MESMOS dos de Direito (redacao-NN),
// e não mais "med-redacao-NN". O progresso no localStorage é namespaced por
// trilha (v2_dir_ / v2_med_), então id igual nos dois lados não colide. Manter
// o prefixo antigo seria pior do que perdê-lo: "med-redacao-01" era a proposta
// sobre solidão e hoje seria a sobre transição climática, o que colaria um "já
// treinada" na proposta errada.
//
// Uso:
//   node gerar-redacoes.js            # grava
//   node gerar-redacoes.js --simular  # só relata

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const simular = process.argv.includes("--simular");
const raiz = __dirname;
const origem = path.join(raiz, "..", "vestibular-direito", "data", "redacoes.js");
const destino = path.join(raiz, "data", "redacoes.js");

// ---------- lê a fonte ----------
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(origem, "utf8"), sandbox);
const propostas = sandbox.window.REDACOES;
if (!Array.isArray(propostas) || propostas.length === 0) {
  throw new Error("não achei window.REDACOES em " + origem);
}

// ---------- converte o comando ----------
//
// O tema entra a partir do campo `tema`, e não do comando de Direito: nos
// cadernos da VUNESP e da Unifesp ele aparece em bloco próprio depois dos dois
// pontos, com a capitalização original e sem aspas — exatamente como está no
// campo. Foi assim em "Vivemos hoje uma epidemia da solidão?" (Unesp 2026.1) e
// em "Luto contemporâneo: entre a espetacularização da morte e a manutenção da
// lembrança coletiva" (Unifesp 2026).
const COMANDO_VUNESP =
  "Com base nos textos apresentados e em seus próprios conhecimentos, escreva um texto " +
  "dissertativo-argumentativo, empregando a norma-padrão da língua portuguesa, sobre o tema:";

function converter(p) {
  if (!p.tema || !p.tema.trim()) throw new Error(p.id + ": proposta sem tema");
  return {
    id: p.id,
    tema: p.tema,
    modelo: p.modelo,
    tempoSugerido: p.tempoSugerido,
    texto_apoio: p.texto_apoio,
    comando: COMANDO_VUNESP + "\n\n" + p.tema.trim(),
    pontosEsperados: p.pontosEsperados,
  };
}

const convertidas = propostas.map(converter);

// ---------- critérios de nota zero ----------
//
// Reproduzem a grade da Unifesp, a mais fechada entre as sete bancas de
// Medicina — inclusive o piso de linhas AUTORAIS, que não existe em nenhuma
// outra e que reprova quem monta o texto colando a coletânea. Vivem aqui, e não
// no arquivo de Direito, porque são da banca: a FGV publica lista própria e mais
// curta.
const REDACAO_ZERO = [
  "Fugir ao tema ou ao gênero propostos",
  "Apresentar nome, assinatura ou qualquer marca que identifique o candidato",
  "Deixar a folha em branco",
  "Apresentar texto em forma não articulada verbalmente (só desenhos, números ou palavras soltas)",
  "Escrever em outra língua que não a portuguesa",
  "Apresentar letra ilegível",
  "Escrever o texto definitivo fora do espaço reservado",
  "Apresentar 7 linhas ou menos, sem contar o título",
  "Apresentar menos de 8 linhas AUTORAIS contínuas — trechos copiados da coletânea não contam",
  "Ser composto predominantemente por cópia da coletânea ou de outras partes da prova",
  "Ser idêntico ou muito semelhante a outra redação do mesmo processo seletivo",
  "Apresentar formas propositais de anulação: impropérios, trechos jocosos ou recusa explícita ao tema",
];

const cabecalho = `// GERADO por gerar-redacoes.js — não edite à mão.
//
// Propostas de redação da trilha de Medicina. São ${convertidas.length}, e são as MESMAS da
// trilha de Direito: o repertório é compartilhado e a fonte é
// vestibular-direito/data/redacoes.js, onde estão documentados os oito modelos
// de formulação de tema levantados nos cadernos das bancas.
//
// Só o COMANDO é diferente daqui para lá, e o daqui está transcrito letra por
// letra dos cadernos — a mesma frase aparece em quatro bancas:
//
//   Unesp 2026.1     "Vivemos hoje uma epidemia da solidão?"
//   Unifesp 2026     "Luto contemporâneo: entre a espetacularização da morte e
//                    a manutenção da lembrança coletiva"
//   Einstein 2025    "Quem deve ser responsável pelos recursos financeiros para
//                    a preservação da Amazônia?"
//   Einstein 2026.2  "IA e recursos hídricos: entre a sustentabilidade e o
//                    consumo excessivo"
//   Santa Casa 2025  "Ecoansiedade: entre o impacto emocional e o impulso para
//                    o ativismo ambiental"
//   Santa Casa 2026  "Terapia com IA pode ser alternativa ao tratamento com um
//                    psicólogo?"
//
// Três coisas que os cadernos mostram e que valem mais que qualquer resumo:
//
//   1. O comando NÃO pede título e NÃO cita número de linhas. O limite mora na
//      folha de resposta — 33 linhas numeradas nas quatro bancas acima, 32 na
//      PUC-SP. Título só é exigido pela PUC-SP ("Dê um título ao texto") e pela
//      FUVEST; alguns pontos esperados desta lista pedem título porque valem
//      para as duas trilhas, e nas outras cinco bancas ele é opcional.
//   2. O tema vem em bloco próprio, depois dos dois pontos, sem aspas.
//   3. A coletânea varia de tamanho: PUC-SP 2026 deu três textos, Unifesp 2026
//      deu quatro, Unesp 2026.1 deu cinco mais uma charge. As quatro por
//      proposta usadas aqui ficam na mediana.
//
// A FUVEST foge do conjunto: dá DUAS propostas sobre a mesma coletânea, a
// primeira dissertativo-argumentativa e a segunda de outro gênero (em 2026, uma
// carta), e o comando dela é "Redija um texto dissertativo-argumentativo, no
// qual seja exposto seu ponto de vista sobre o tema: X" — a fórmula que deu
// origem ao modelo tema-afirmação do repertório.
//
// Para consertar qualquer proposta, edite vestibular-direito/data/redacoes.js e
// rode este script de novo.
`;

const saida =
  cabecalho +
  "window.REDACOES = " + JSON.stringify(convertidas, null, 2) + ";\n\n" +
  `// Critérios de nota zero, reproduzidos da grade da Unifesp — a mais fechada
// entre as sete bancas. Ficam aqui para que a aba Redação possa mostrá-los
// junto da proposta: são regras de formato, e quem as desconhece perde a prova
// inteira sem ter escrito nada de errado.
` +
  "window.REDACAO_ZERO = " + JSON.stringify(REDACAO_ZERO, null, 2) + ";\n";

const porModelo = {};
convertidas.forEach((p) => { porModelo[p.modelo] = (porModelo[p.modelo] || 0) + 1; });
console.log("propostas: " + convertidas.length);
Object.keys(porModelo).sort().forEach((m) => console.log("  " + m.padEnd(22) + porModelo[m]));

if (simular) {
  console.log("(--simular: nada foi gravado)");
  process.exit(0);
}

fs.writeFileSync(destino, saida, "utf8");
console.log("gravado " + path.relative(raiz, destino));
