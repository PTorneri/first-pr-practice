# -*- coding: utf-8 -*-
"""Distratores no assunto, escritos passagem a passagem.

O defeito do banco original nos 150 itens de compreensao: os quatro distratores
falavam de OUTRA passagem, entao a certa era a unica no assunto e a questao se
resolvia sem ler. Aqui cada passagem ganha cinco afirmacoes que sao sobre ELA e
sao falsas — contradizem o texto ou afirmam o que ele nao sustenta.

A chave e o inicio da passagem (40 primeiros caracteres), para nao repetir o
texto inteiro; o adaptador casa por prefixo.
"""

POOLS = {
# ---------------------------------------------------------------- portugues
"A biblioteca ampliou o horário de funciona": [
 "A ampliação do horário foi, sozinha, responsável pelo aumento dos empréstimos",
 "A biblioteca precisou reduzir o horário para atrair novos leitores",
 "Os moradores voltaram à biblioteca depois da reforma do prédio",
 "A escolha dos novos títulos coube exclusivamente aos bibliotecários",
 "O número de empréstimos permaneceu estável durante todo o período",
],
"No bairro, as árvores antigas não aparecem": [
 "As árvores antigas têm valor apenas documental, registrado em fotografias",
 "A permanência nos espaços públicos diminuiu depois do plantio",
 "A temperatura das calçadas depende exclusivamente do tipo de pavimento",
 "As árvores foram removidas para ampliar a circulação de veículos",
 "O calor nas calçadas aumentou nos trechos arborizados",
],
"O aplicativo prometia economizar tempo. De": [
 "As atualizações reduziram o número de etapas de cada tarefa",
 "Os usuários abandonaram o caderno de papel após a terceira atualização",
 "O aplicativo cumpriu integralmente a promessa de economizar tempo",
 "A rejeição decorreu do preço cobrado pelas novas versões",
 "O caderno de papel passou a exigir mais passos que o aplicativo",
],
"Quando a chuva começou, a praça esvaziou. ": [
 "A chuva impediu qualquer uso da praça naquele dia",
 "As crianças deixaram a praça assim que as poças se formaram",
 "A ocupação da praça permaneceu a mesma antes e depois da chuva",
 "O esvaziamento da praça resultou de uma interdição da prefeitura",
 "As corridas nas poças aconteceram antes de a chuva começar",
],
"O relatório apresentava muitos números, po": [
 "O relatório apresentava poucos dados, o que comprometeu sua precisão",
 "A quantidade de números compensou a ausência de critério",
 "O critério de seleção dos dados foi divulgado junto com o relatório",
 "A precisão dos números garantiu a clareza das conclusões",
 "O problema apontado é um erro de cálculo nos dados divulgados",
],
"A feira de ciências premiou um filtro de á": [
 "O prêmio foi atribuído à aparência sofisticada do protótipo",
 "Os estudantes omitiram os limites do filtro na apresentação",
 "O filtro foi construído com materiais caros e de difícil acesso",
 "A premiação desconsiderou a explicação apresentada pelos estudantes",
 "O projeto foi desclassificado por reconhecer as próprias limitações",
],
"Toda semana, o ônibus chegava lotado ao te": [
 "A fila diminuiu porque o preço da passagem foi aumentado",
 "A empresa reduziu a frota para diminuir custos operacionais",
 "A lotação permaneceu inalterada depois da mudança",
 "A frota foi ampliada em todos os horários do dia",
 "O terminal foi transferido para outro bairro",
],
"O museu retirou as legendas técnicas de um": [
 "O museu substituiu os objetos da sala por réplicas mais simples",
 "A retirada das legendas tornou a visita menos acessível",
 "As versões em áudio foram descartadas por falta de público",
 "A acessibilidade dependeu da renovação completa do acervo",
 "As legendas técnicas foram mantidas ao lado das novas versões",
],
"Os moradores queriam silêncio, os comercia": [
 "Os dois grupos concluíram que seus objetivos eram totalmente incompatíveis",
 "A reunião terminou sem que nenhuma divergência fosse identificada",
 "Os comerciantes desistiram de usar a praça",
 "O impasse decorria de discordância sobre a propriedade do terreno",
 "Moradores e comerciantes disputavam exatamente o mesmo horário",
],
"A escola instalou painéis solares e reduzi": [
 "A instalação dos painéis, por si só, garantiu o efeito pedagógico",
 "A conta de energia aumentou depois da instalação",
 "Os estudantes foram impedidos de acompanhar os dados de consumo",
 "O projeto foi encerrado por não gerar economia",
 "O acompanhamento mensal substituiu a geração de energia",
],
"O jornal publicou a correção na página seg": [
 "A correção interrompeu imediatamente a circulação do erro",
 "O jornal se recusou a publicar qualquer correção",
 "As capturas de tela reproduziam a versão já corrigida",
 "A informação equivocada circulou apenas na edição impressa",
 "A correção saiu na mesma página da notícia original",
],
"A pesquisadora repetiu o experimento e obt": [
 "A pesquisadora ocultou a divergência entre os resultados",
 "A repetição confirmou exatamente o primeiro resultado",
 "A falha estava na formulação da hipótese, não no instrumento",
 "A divergência foi atribuída ao acaso e não foi investigada",
 "O experimento foi abandonado depois do resultado divergente",
],
"O condomínio criou uma horta coletiva. No ": [
 "A participação foi alta desde o primeiro dia da horta",
 "A divisão por turnos afastou os moradores de rotinas distintas",
 "A horta foi encerrada por falta de interessados",
 "A baixa participação inicial decorreu do custo das mudas",
 "As tarefas passaram a ser executadas por um único morador",
],
"A ponte encurtou o trajeto entre as cidade": [
 "A ponte beneficiou igualmente todos os pontos da região",
 "O comércio antigo passou a receber mais veículos depois da obra",
 "A obra aumentou a distância entre as duas cidades",
 "A integração regional ocorreu sem qualquer alteração no fluxo",
 "A ponte foi construída para atender exclusivamente o comércio antigo",
],
"A professora pediu que a turma comparasse ": [
 "As diferenças mais importantes estavam nos dados apresentados",
 "As duas notícias tratavam de fatos distintos",
 "Os títulos das duas notícias eram idênticos",
 "A comparação mostrou que as fontes ouvidas eram as mesmas",
 "A atividade concluiu que notícias sobre um mesmo fato se equivalem",
],
"O parque proibiu copos descartáveis, mas i": [
 "A proibição reduziu os resíduos logo depois de anunciada",
 "Os bebedouros existentes já atendiam ao público do parque",
 "A abertura de novos pontos de água aumentou os resíduos",
 "O parque revogou a proibição dos copos descartáveis",
 "A medida dispensou qualquer alteração na infraestrutura",
],
"O grupo ensaiou durante meses e apresentou": [
 "A ausência de cenário comprometeu a compreensão da peça",
 "O grupo montou um cenário detalhado depois de meses de ensaio",
 "O público recebeu descrições escritas dos lugares imaginados",
 "Os atores permaneceram imóveis durante a apresentação",
 "A peça foi apresentada sem ensaios prévios",
],
"A cidade divulgou um mapa de risco de ench": [
 "Os moradores receberam as rotas de saída junto com o mapa",
 "A divulgação do mapa completou a política de prevenção",
 "As áreas vulneráveis não foram identificadas no levantamento",
 "A cidade optou por não divulgar o mapa de risco",
 "Os pontos de abrigo foram instalados antes da divulgação",
],
"O atleta reduziu a intensidade dos treinos": [
 "O atleta abandonou a competição durante a semana de descanso",
 "A redução dos treinos foi determinada pela comissão organizadora",
 "O atleta aumentou a intensidade para evitar lesões",
 "A pausa foi motivada por uma lesão já instalada",
 "A estratégia de recuperação exigia treinos diários mais longos",
],
"A exposição reuniu objetos cotidianos de d": [
 "O valor das peças foi atribuído ao material de que eram feitas",
 "Os depoimentos foram retirados da exposição pelos curadores",
 "A exposição reuniu objetos de uma única década",
 "As histórias associadas às peças contradiziam os depoimentos",
 "As peças foram avaliadas por especialistas em mercado de arte",
],

# ------------------------------------------------------------------ ingles
"After the city introduced dedicated bus la": [
 "The dedicated lanes were removed after drivers complained",
 "Average travel time increased once private cars lost road space",
 "Surveys showed that drivers unanimously opposed the lanes",
 "The city created the lanes in order to reduce the number of buses",
 "Predictable traffic flow was valued only by bus passengers",
],
"Researchers mapped street temperatures and": [
 "Blocks with mature trees recorded the highest temperatures",
 "A single citywide planting formula produced the best results",
 "Shade from buildings made additional tree planting unnecessary",
 "Temperatures were measured only in areas without trees",
 "The cooling effect was identical in every part of the city",
],
"A government portal released thousands of ": [
 "Journalists found the datasets easy to use from the start",
 "The agency withdrew the datasets after receiving complaints",
 "Publishing files in any format is enough to ensure scrutiny",
 "The explanatory notes replaced the datasets themselves",
 "Access to the portal was restricted to a small group of researchers",
],
"A company allowed employees to work remote": [
 "Productivity fell sharply once employees worked from home",
 "Applications for vacant positions declined after the policy",
 "Managers cancelled all meetings in order to protect flexibility",
 "The company required every employee to return to the office full time",
 "Newer workers were the group least exposed to isolation",
],
"An artificial intelligence system identifi": [
 "Doctors accepted the system's output as a final diagnosis",
 "The system was trained on data from every hospital in the country",
 "The alerts removed the need for a second opinion",
 "Unusual patterns in the images were ignored by the doctors",
 "The system was expected to perform equally well in any population",
],
"A supermarket discounted food approaching ": [
 "Food approaching its sell-by date was discarded rather than sold",
 "Waste levels remained unchanged after the discounts",
 "The programme required no adjustment to staff routines",
 "Donations were suspended because of inspection costs",
 "Prices were updated automatically, without any inspection",
],
"A rural community built a solar microgrid ": [
 "The microgrid prevented every outage in the community",
 "The clinic lost refrigeration when the national network failed",
 "The batteries were installed only after the storm",
 "The community relied entirely on the national network during the storm",
 "Essential services were left outside the project",
],
"The library stopped charging late fees for": [
 "Returns declined sharply once late fees were removed",
 "Families continued to avoid the building after the change",
 "Librarians recommended stronger penalties in order to restore access",
 "The library replaced the fees with a higher membership charge",
 "Late fees were removed for every category of book",
],
"Volunteers photographed insects in urban g": [
 "Scientists used the uploaded images without any verification",
 "Volunteers were asked to identify the species themselves",
 "The platform accepted photographs from professionals only",
 "Public participation reduced the quality of the final dataset",
 "The records were collected in rural forests rather than urban gardens",
],
"Marine biologists attached nursery-grown c": [
 "Survival was highest where communities were excluded from the decision",
 "The coral fragments were taken directly from healthy reefs",
 "Fishing communities opposed the choice of protected sites",
 "Ecological restoration depended on technical procedures alone",
 "The damaged reefs recovered without any intervention",
],
"Students using a language app practiced mo": [
 "Students who used only the app improved their speaking fastest",
 "The weekly conversations reduced the amount of practice",
 "Repetition and interaction were found to develop the same skill",
 "The app supplied the uncertainty of real communication",
 "Learners abandoned the app once the discussions began",
],
"A court required an agency to explain how ": [
 "Officials welcomed disclosure as a way to improve security",
 "Advocates argued that automated decisions should not be challenged",
 "The court prohibited the agency from explaining the system",
 "The system ranked applications without affecting any rights",
 "Both sides agreed that transparency involved no trade-off",
],
"A local newspaper replaced daily print del": [
 "The newspaper ended all of its print production",
 "Online readership fell after the weekly edition was introduced",
 "The neighborhood reporters were dismissed to fund the digital shift",
 "Residents with limited internet access became the main online audience",
 "Daily print delivery was expanded alongside the website",
],
"As the population aged, the town redesigne": [
 "Shop owners reported fewer customers after the redesign",
 "The new crossings gave pedestrians less time than before",
 "The redesign was reversed because traffic became slower",
 "Older residents began to avoid the commercial center",
 "The crossings were redesigned before the population aged",
],
"A delivery company tested reusable contain": [
 "The environmental benefit was guaranteed by the material alone",
 "Customers were asked to discard the containers after one use",
 "Collection routes proved irrelevant to the environmental outcome",
 "The packaging lasted for a single delivery cycle",
 "High return rates reduced the benefit of the system",
],
"A school added counselors after teachers r": [
 "Teachers were kept outside the mental health programme",
 "Waiting times for counseling increased after the hiring",
 "Support remained restricted to the counseling office",
 "The counselors were hired before any anxiety was reported",
 "Training teachers removed the need for specialist care",
],
"Newcomers to the city created businesses t": [
 "The shops served recently arrived residents only",
 "Local tastes were rejected in favour of imported recipes",
 "The businesses avoided introducing unfamiliar products",
 "Long-term residents opened the shops for the newcomers",
 "Cultural exchange occurred without any adaptation",
],
"A market accepted only digital payments fo": [
 "Every customer found the digital system easy to use",
 "Transactions became slower under digital payment",
 "All vendors kept digital payment as the only option",
 "Elderly customers asked for the end of cash payments",
 "The market adopted digital payments permanently, without exception",
],
"Health officials held public meetings abou": [
 "Leaflets proved more effective than conversation with nurses",
 "Attendance at the meetings was unusually high",
 "Nurses were absent from the public meetings",
 "Those who spoke with nurses were less willing to schedule appointments",
 "The meetings replaced the distribution of any written material",
],
"A museum digitized fragile manuscripts so ": [
 "The digital copies made the original manuscripts unnecessary",
 "Curators argued that paper and ink carry no information",
 "Digitization reduced the number of visitors to the collection",
 "Visitors were prevented from examining details of the images",
 "The manuscripts were digitized because they were easy to handle",
],
"Farmers used satellite images to identify ": [
 "The satellite images explained why the plants were suffering",
 "Farmers changed irrigation before inspecting the soil",
 "Soil inspections were abandoned in favour of remote data",
 "The images identified fields with an excess of water",
 "Remote data alone was sufficient to guide the decision",
],
"During heatwaves, the city opened air-cond": [
 "Usage was highest where no community contact took place",
 "The buildings were opened during daytime hours only",
 "Isolated residents were the least likely group to use the service",
 "Community groups were asked to keep the buildings closed",
 "Making the service available was enough to guarantee its use",
],
"A region introduced higher water prices on": [
 "The higher price applied to every level of consumption",
 "Low-income families saw the largest increase in their bills",
 "Overall water use rose after the change",
 "The basic household allowance was eliminated",
 "Prices were reduced for consumption above the allowance",
],
"An online course offered recorded lectures": [
 "Only students in the discussion groups could watch the lectures",
 "Completion rates were highest among students who avoided the discussions",
 "The course withdrew its recorded lectures",
 "Access to the same videos produced identical completion rates",
 "The live discussion groups were open to students not enrolled",
],
"A repair law required manufacturers to pro": [
 "Manufacturers were prohibited from selling spare parts",
 "Supporters and companies agreed that repairs carry no risk",
 "The law was defended on safety grounds alone",
 "The debate concerned the price of manuals rather than access",
 "Companies argued that repairs would increase waste",
],
"Two forest reserves were connected by a re": [
 "The corridor eliminated the effects of habitat loss",
 "The cameras recorded no movement between the reserves",
 "Researchers recommended replacing habitat protection with corridors",
 "The two reserves were separated again after the study",
 "The restored strip was built from artificial materials",
],
"A science podcast linked every episode to ": [
 "The podcast avoided publishing corrections in order to protect its guests",
 "Its audience grew rapidly after the first episodes",
 "Teachers rejected the episodes because the sources were hidden",
 "Sources were listed only for episodes without guests",
 "Educational value was measured by the size of the audience",
],
"A firm tested a four-day week without redu": [
 "Salaries were reduced along with the number of working days",
 "Teams compressed five days of work into four",
 "Sick leave increased during the experiment",
 "Meetings became longer under the new schedule",
 "The model succeeded without any change to deadlines",
],
"Electric buses eliminated exhaust emission": [
 "Electric buses removed every environmental impact",
 "The city disregarded how the electricity was generated",
 "Battery recycling was considered irrelevant to the assessment",
 "The buses still produced exhaust emissions along their routes",
 "The evaluation was limited to the vehicles themselves",
],
"A false story spread rapidly because its h": [
 "The false story spread because it contradicted what readers believed",
 "The corrections reached more people than the original story",
 "The platform blocked users from opening the articles",
 "Readers shared the story only after reading it in full",
 "Headlines had no influence on the story's circulation",
],
}

# Rotulos de estrategia textual para os itens de "Organizacao textual".
#
# O defeito la era outro: dois dos quatro distratores descreviam a estrategia de
# OUTRA passagem ("oposicao entre quantidade de numeros e qualidade da
# explicacao"), o que denunciava a certa por eliminacao tematica. Estes sao
# genericos: sao estrategias reais, plausiveis, e nenhuma delas esta presente
# nos textos curtos usados.
ESTRATEGIAS = [
 "enumeração de exemplos em ordem crescente de importância",
 "definição técnica seguida de sua aplicação prática",
 "pergunta retórica respondida no período seguinte",
 "citação de autoridade para sustentar a afirmação",
 "hipótese apresentada e em seguida descartada",
 "alternância entre discurso direto e discurso indireto",
 "paralelismo entre duas estruturas sintáticas idênticas",
 "conclusão anunciada antes dos dados que a sustentam",
 "uso de dados numéricos para dimensionar o problema",
 "descrição de um cenário sem marcas de posicionamento",
 "retomada de um termo por sinônimo ao longo do parágrafo",
 "gradação que intensifica a mesma ideia em três etapas",
]
