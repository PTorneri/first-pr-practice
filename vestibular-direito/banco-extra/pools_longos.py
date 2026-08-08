# -*- coding: utf-8 -*-
"""Distratores longos — dois por passagem.

Existem por dois motivos medidos. (1) So com os cinco distratores curtos de
pools.py, a alternativa certa ficava sozinha como a mais comprida em 34-37% dos
itens, e "marque a maior" e justamente o tell que o verify-banco.ps1 mede.
(2) As tres perguntas de uma mesma passagem recebiam os MESMOS quatro
distratores; com sete no bolo, cada uma recebe um conjunto diferente.
"""

POOLS_LONGOS = {
"A biblioteca ampliou o horário de funciona": [
 "O aumento dos empréstimos foi registrado antes de os moradores participarem da escolha dos títulos",
 "A biblioteca concluiu que a participação do público na escolha do acervo não altera o uso do serviço",
],
"No bairro, as árvores antigas não aparecem": [
 "A temperatura das calçadas se manteve igual nos trechos com e sem árvores antigas do bairro",
 "Os moradores passaram a evitar as ruas arborizadas por causa do sombreamento excessivo das calçadas",
],
"O aplicativo prometia economizar tempo. De": [
 "As atualizações simplificaram tanto a navegação que o retorno ao caderno de papel deixou de fazer sentido",
 "A rejeição do aplicativo veio da falta de atualizações, e não do número de etapas exigidas",
],
"Quando a chuva começou, a praça esvaziou. ": [
 "A praça ficou vazia até o fim da chuva, quando os frequentadores voltaram ao mesmo uso de antes",
 "As condições climáticas daquela tarde eliminaram qualquer possibilidade de uso do espaço público",
],
"O relatório apresentava muitos números, po": [
 "A quantidade de números apresentada foi suficiente para tornar transparente o critério de seleção",
 "A precisão do relatório ficou assegurada pelo grande volume de dados que ele conseguiu reunir",
],
"A feira de ciências premiou um filtro de á": [
 "A banca premiou o protótipo apesar de os estudantes não explicarem como o filtro funcionava",
 "Apontar as limitações do protótipo reduziu as chances de o projeto ser premiado na feira",
],
"Toda semana, o ônibus chegava lotado ao te": [
 "A diminuição da fila só ocorreu depois que a empresa reajustou o preço da passagem no horário de pico",
 "A lotação no terminal não tinha relação com a quantidade de ônibus em circulação no pico",
],
"O museu retirou as legendas técnicas de um": [
 "A troca das legendas por versões em linguagem simples exigiu a substituição de parte das peças expostas",
 "A acessibilidade da sala passou a depender do acervo exposto, e não da forma de apresentá-lo",
],
"Os moradores queriam silêncio, os comercia": [
 "A reunião avançou quando os dois grupos abandonaram suas reivindicações iniciais sobre o uso da praça",
 "Moradores e comerciantes defendiam projetos incompatíveis para o mesmo horário de uso da praça",
],
"A escola instalou painéis solares e reduzi": [
 "A economia na conta de energia foi suficiente para transformar a instalação em atividade pedagógica",
 "O caráter pedagógico do projeto veio da potência instalada, e não do acompanhamento dos dados",
],
"O jornal publicou a correção na página seg": [
 "A publicação da correção na página seguinte encerrou a circulação da versão equivocada da notícia",
 "As capturas de tela funcionaram como forma eficiente de divulgar a correção publicada",
],
"A pesquisadora repetiu o experimento e obt": [
 "A pesquisadora manteve o resultado divergente sem investigá-lo, por considerá-lo variação aceitável",
 "A divergência entre as medidas foi causada por um erro na formulação da hipótese inicial",
],
"O condomínio criou uma horta coletiva. No ": [
 "A adesão à horta foi imediata e a divisão por turnos precisou ser abandonada por falta de necessidade",
 "A baixa participação inicial se explicava pelo desinteresse dos moradores por atividades coletivas",
],
"A ponte encurtou o trajeto entre as cidade": [
 "A ponte distribuiu os benefícios da integração de forma equivalente entre todos os pontos da região",
 "A obra produziu efeitos idênticos nos dois lados da região que ela passou a conectar",
],
"A professora pediu que a turma comparasse ": [
 "A comparação mostrou que as duas notícias diferiam principalmente nos dados numéricos apresentados",
 "O título e a escolha das fontes pouco interferiram na compreensão do fato pelas duas turmas",
],
"O parque proibiu copos descartáveis, mas i": [
 "A proibição dos copos descartáveis reduziu os resíduos independentemente da oferta de pontos de água",
 "Os bebedouros foram dispensados porque o público do parque levava as próprias garrafas",
],
"O grupo ensaiou durante meses e apresentou": [
 "A ausência de cenário foi compensada pela projeção de imagens dos lugares descritos na peça",
 "A construção dos ambientes coube ao público, sem participação do trabalho dos atores em cena",
],
"A cidade divulgou um mapa de risco de ench": [
 "A divulgação do mapa veio acompanhada da sinalização das rotas de saída e dos pontos de abrigo",
 "A identificação das áreas vulneráveis bastou para reduzir o risco de enchentes no bairro",
],
"O atleta reduziu a intensidade dos treinos": [
 "A redução dos treinos indicava que o atleta havia desistido de disputar a competição naquela temporada",
 "A pausa nos treinos foi consequência de uma lesão, e não parte planejada da preparação",
],
"A exposição reuniu objetos cotidianos de d": [
 "O valor atribuído às peças decorria da raridade dos materiais empregados em cada um dos objetos",
 "Os depoimentos foram incluídos apenas para datar os objetos reunidos em cada década",
],
"After the city introduced dedicated bus la": [
 "The surveys indicated that predictability mattered less to drivers than the road space they had lost",
 "The reduction in travel time followed a restriction on the number of buses using the corridor",
],
"Researchers mapped street temperatures and": [
 "The researchers concluded that a uniform planting programme would produce the same cooling everywhere",
 "The measurements showed that shade from buildings was more effective than shade from mature trees",
],
"A government portal released thousands of ": [
 "The agency withdrew the datasets once it recognised that varied file formats could not be standardised",
 "Publishing thousands of files was enough to open the agency's data to public scrutiny",
],
"A company allowed employees to work remote": [
 "The managers scheduled regular meetings because productivity had fallen among employees working remotely",
 "The increase in job applications convinced managers to end the remote-work arrangement",
],
"An artificial intelligence system identifi": [
 "The doctors relied on the alerts as final diagnoses because the training data covered every hospital",
 "A system trained in two hospitals was expected to perform identically in any other setting",
],
"A supermarket discounted food approaching ": [
 "The reduction in waste was achieved without any change to how staff inspected and priced products",
 "The donation of surplus food was the reason staff had to inspect products and update prices",
],
"A rural community built a solar microgrid ": [
 "The community abandoned the microgrid after the storm showed that batteries could not sustain the clinic",
 "Local battery storage removed the community's need for a connection to the national network",
],
"The library stopped charging late fees for": [
 "The end of late fees produced a sharp fall in returns that librarians offset with replacement plans",
 "Penalties proved to be the most effective instrument for restoring access to the library",
],
"Volunteers photographed insects in urban g": [
 "The scientists published the volunteers' records without review in order to speed up data collection",
 "Broad public participation and professional verification proved to be incompatible goals",
],
"Marine biologists attached nursery-grown c": [
 "The higher survival rates were recorded precisely where fishing communities had no role in the decision",
 "The restoration worked as a purely technical operation carried out by the biologists alone",
],
"Students using a language app practiced mo": [
 "The students who relied exclusively on the app developed spoken fluency faster than the other group",
 "Repetition in the app and spontaneous conversation turned out to be the same kind of practice",
],
"A court required an agency to explain how ": [
 "The officials and the advocates agreed that publishing the criteria carried no risk of manipulation",
 "The ranking of benefit applications was a routine decision with no consequences for rights",
],
"A local newspaper replaced daily print del": [
 "The newspaper ended its print edition entirely once online readership began to grow more quickly",
 "Neighborhood reporting was the cost the paper had to cut in order to fund its digital shift",
],
"As the population aged, the town redesigne": [
 "The shop owners' initial fears were confirmed, and the commercial center lost its older customers",
 "The crossings had been redesigned years before the town's population began to grow older",
],
"A delivery company tested reusable contain": [
 "The durability of the containers was enough to guarantee the environmental benefit of the programme",
 "Collection routes and return rates turned out to be irrelevant to the environmental outcome",
],
"A school added counselors after teachers r": [
 "The training given to teachers replaced the counseling service once waiting times had been reduced",
 "Rising anxiety proved to be a problem only specialists inside the office could address",
],
"Newcomers to the city created businesses t": [
 "The shops succeeded by keeping their original recipes unchanged and refusing any local adaptation",
 "The newcomers' shops served only other recently arrived residents of the same neighborhood",
],
"A market accepted only digital payments fo": [
 "The vendors kept digital payment as the only option because customers adapted quickly to the change",
 "The speed of the transactions was reason enough for the market to exclude cash permanently",
],
"Health officials held public meetings abou": [
 "The leaflets proved more persuasive than the nurses because they reached a much larger audience",
 "The low attendance showed that public discussion is an ineffective way to address concerns",
],
"A museum digitized fragile manuscripts so ": [
 "The curators presented the digital copies as a complete substitute for consulting the originals",
 "Paper, ink and binding carry no information beyond the text they were used to record",
],
"Farmers used satellite images to identify ": [
 "The satellite images identified both the fields under stress and the reasons why the plants suffered",
 "Soil inspection became unnecessary once the satellite images were available to the farmers",
],
"During heatwaves, the city opened air-cond": [
 "The buildings were used most in the neighborhoods where no organisation contacted isolated residents",
 "Opening the buildings at night was enough to guarantee that the service reached those at risk",
],
"A region introduced higher water prices on": [
 "The higher tariff applied to every level of consumption, which explains the fall in overall use",
 "The basic household allowance was the part of consumption that became more expensive",
],
"An online course offered recorded lectures": [
 "The recorded lectures were restricted to the students who had joined the live discussion groups",
 "Access to the same video material was enough to equalise completion rates among students",
],
"A repair law required manufacturers to pro": [
 "The companies supported the law because trained repairs would reduce waste without any safety risk",
 "The disagreement came down to a simple choice between allowing and forbidding repairs",
],
"Two forest reserves were connected by a re": [
 "The corridor compensated for the habitat loss occurring in the areas surrounding the two reserves",
 "The recorded animal movement proved that further habitat protection had become unnecessary",
],
"A science podcast linked every episode to ": [
 "The podcast avoided corrections so that its slow audience growth would not be further damaged",
 "The educational value of the programme grew in proportion to the size of its audience",
],
"A firm tested a four-day week without redu": [
 "The teams reached the same output by fitting five days of tasks into the four remaining days",
 "The fall in sick leave resulted from shorter salaries combined with shorter weekly meetings",
],
"Electric buses eliminated exhaust emission": [
 "The absence of exhaust emissions along the routes settled the environmental assessment of the buses",
 "Battery recycling and electricity generation fell outside the scope of the city's evaluation",
],
"A false story spread rapidly because its h": [
 "The corrections spread more widely than the original story because readers had already opened it",
 "The headline had no influence on the speed at which the false story circulated online",
],
}
