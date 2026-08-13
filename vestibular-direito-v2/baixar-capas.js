#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════════
   BAIXAR CAPAS DAS OBRAS OBRIGATÓRIAS

   Rode à mão, quando a lista de obras mudar:

       node baixar-capas.js direito
       node baixar-capas.js medicina

   Ele resolve cada obra numa API pública, baixa a imagem para
   assets/obras/<id>.jpg e acrescenta a linha dela em assets/obras/
   PROCEDENCIA.json. É idempotente: o que já está no disco não é buscado de
   novo, então rodar as duas trilhas em seguida só complementa o que falta.

   ─── Por que em tempo de BUILD e não em runtime ────────────────────────────

   O app é estático e abre no 4G do aluno. Buscar 72 imagens em três domínios
   externos toda vez que a aba Obras abre significaria três resoluções de DNS,
   três handshakes e 72 requisições antes da primeira capa aparecer — além de
   deixar uma aba do app dependendo de serviços que podem sair do ar. Baixado
   uma vez, vira arquivo servido junto com o resto.

   ─── Sobre direito autoral ─────────────────────────────────────────────────

   ISTO REPRODUZ ARTE DE TERCEIROS. Das 72 obras de Direito, 3 estão em
   domínio público (Cézanne †1906, David †1825, Manet †1883); as outras 69
   têm capa, cartaz ou pintura ainda protegidos — no Brasil, vida do autor
   + 70 anos (Lei 9.610/98, art. 41). A decisão de exibi-las assim mesmo foi
   tomada pelo dono do produto, ciente disso.

   O PROCEDENCIA.json existe por causa disso: se alguém questionar, ele diz
   exatamente qual arquivo veio de onde e sob qual licença declarada. Sem ele
   não há como responder, nem como remover uma obra específica sob pedido.

   Nenhuma fonte aqui é raspagem de site de editora ou de distribuidora — são
   as três APIs públicas de catálogo, com User-Agent identificado, e o
   MusicBrainz é chamado no limite de 1 requisição por segundo que ele pede.
   ═════════════════════════════════════════════════════════════════════════ */

const fs = require("fs");
const path = require("path");

const UA = "sagax-obras/1.0 ( https://sagaxedu.com.br )";
const TRILHA = process.argv[2] || "direito";
const RAIZ = path.resolve(__dirname, "..", "vestibular-" + TRILHA, "data", "obras.js");
// Pasta COMPARTILHADA, sem subpasta por trilha: as listas de obras de Direito
// e de Medicina são a mesma — os 72 ids batem um a um. Baixar em separado
// custava o dobro do peso e, pior, deu capa DIFERENTE para a mesma obra em
// quatro casos, porque os catálogos devolveram outra edição na segunda
// passada. Indexado pelo id da obra, obra igual tem imagem igual em qualquer
// trilha; e se uma trilha ganhar obra própria, o id dela é próprio também.
const DESTINO = path.resolve(__dirname, "assets", "obras");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function carregarObras() {
  if (!fs.existsSync(RAIZ)) {
    console.error("não achei " + RAIZ);
    process.exit(1);
  }
  const sandbox = { window: {} };
  new Function("window", fs.readFileSync(RAIZ, "utf8")).call(sandbox, sandbox.window);
  return sandbox.window.OBRAS || [];
}

async function pegarJson(url) {
  const r = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!r.ok) throw new Error(r.status + " em " + url);
  return r.json();
}

async function baixar(url, destino) {
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(r.status);
  const buf = Buffer.from(await r.arrayBuffer());
  // Capa "não encontrada" da Open Library é um GIF de poucos bytes; o Cover
  // Art Archive devolve 404 direto. Abaixo de 3 KB não é capa de nada.
  if (buf.length < 3072) throw new Error("resposta pequena demais (" + buf.length + " B)");
  fs.writeFileSync(destino, buf);
  return buf.length;
}

// ─── Livros e ensaios: Open Library ────────────────────────────────────────
async function viaOpenLibrary(obra) {
  const q = encodeURIComponent(obra.titulo + " " + obra.autor);
  const j = await pegarJson(
    `https://openlibrary.org/search.json?q=${q}&limit=3&fields=title,author_name,cover_i,key`
  );
  const doc = (j.docs || []).find((d) => d.cover_i);
  if (!doc) return null;
  return {
    url: `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`,
    fonte: "Open Library",
    ref: "https://openlibrary.org" + (doc.key || ""),
    licenca: "capa da editora, servida pelo catálogo da Open Library",
  };
}

// ─── Música: MusicBrainz + Cover Art Archive ───────────────────────────────
async function viaCoverArt(obra) {
  // O campo `autor` traz "Chico Buarque e Gilberto Gil"; o MusicBrainz casa
  // melhor com um artista só.
  const artista = String(obra.autor).split(/\s+e\s+|,/)[0].trim();
  const q = encodeURIComponent(`release:"${obra.titulo}" AND artist:"${artista}"`);
  // O MusicBrainz pede no máximo 1 requisição por segundo e devolve 503 a quem
  // passa disso — foi o que aconteceu com "Domingo no Parque" e "Disseram que
  // Voltei Americanizada". A espera é ANTES da busca, não só entre releases:
  // sem isso a primeira chamada de cada obra já chegava cedo demais.
  await sleep(1100);
  const j = await pegarJson(`https://musicbrainz.org/ws/2/release/?query=${q}&fmt=json&limit=5`);
  for (const rel of j.releases || []) {
    try {
      const arte = await pegarJson(`https://coverartarchive.org/release/${rel.id}`);
      const img = (arte.images || []).find((i) => i.front) || (arte.images || [])[0];
      if (img) {
        return {
          // O `image` é o ORIGINAL: a capa de "Revolution" veio com 3 MB em
          // PNG, para caber num quadrado de 300px na tela. O endpoint de
          // thumbnail entrega 500px, que já é o dobro do necessário em telas
          // 2x, por uns 40 KB. Se o release não tiver thumb gerado, cai no
          // original — melhor pesado que ausente.
          url: (img.thumbnails && (img.thumbnails["500"] || img.thumbnails.large)) || img.image,
          fonte: "Cover Art Archive",
          ref: "https://musicbrainz.org/release/" + rel.id,
          licenca: "capa da gravadora, servida pelo Cover Art Archive",
        };
      }
    } catch { /* release sem arte: tenta a próxima */ }
    await sleep(1100); // o MusicBrainz pede 1 req/s
  }
  return null;
}

// ─── Artes visuais: Wikimedia Commons ──────────────────────────────────────
//
// A primeira versão desta função aceitava o primeiro resultado da busca
// full-text, e o resultado foi ruim de um jeito PIOR que não achar nada: o
// Abaporu baixou o arquivo do "Manifesto Antropófago" (que é outra obra da
// mesma lista) e o "Bananal" do Segall baixou o thumbnail da primeira página
// de um PDF de anais de museu — uma página de texto onde deveria haver um
// quadro. Num app de estudo, mostrar a obra errada é pior que não mostrar.
//
// Agora: busca por TÍTULO primeiro, recusa o que não for imagem, e só aceita
// o resultado se o nome do arquivo confirmar a obra — pelo título ou pelo
// sobrenome do artista, que é como o Commons costuma nomear ("Les Joueurs de
// cartes, par Paul Cézanne").
const semAcento = (s) =>
  String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ").trim();

function confirmaObra(nomeArquivo, obra) {
  const alvo = semAcento(nomeArquivo);
  const doTitulo = semAcento(obra.titulo).split(" ").filter((w) => w.length > 3);
  const sobrenome = semAcento(obra.autor).split(" ").filter((w) => w.length > 2).pop();
  const casouTitulo = doTitulo.length > 0 && doTitulo.some((w) => alvo.includes(w));
  const casouAutor = sobrenome && alvo.includes(sobrenome);
  return casouTitulo || casouAutor;
}

// Busca de TEXTO no Commons não serve para isto, e a tentativa custou duas
// rodadas: "Abaporu" trouxe uma foto da Rua Sienna no Jardim Abaporu, em
// Goiânia, e "Bananal" trouxe a foto do Córrego Bananal. Nome de obra
// brasileira é também nome de bairro e de córrego, e nenhum casamento por
// palavra separa os dois.
//
// O Wikidata separa, porque lá a obra é uma ENTIDADE: procura-se "Abaporu",
// confirma-se pela descrição ("quadro de Tarsila do Amaral") e lê-se a
// propriedade P18, que é a imagem daquela obra específica. Sem P18, não há
// imagem livre — e isso não é falha da busca, é a resposta certa: repositório
// de imagem livre não hospeda obra protegida. Das dez artes visuais da lista,
// só as três em domínio público (Cézanne, David, Manet) têm P18.
async function viaWikidata(obra) {
  const sobrenome = semAcento(obra.autor).split(" ").filter((w) => w.length > 2).pop();

  // O campo `titulo` do banco às vezes traz a tradução entre parênteses —
  // "Le Déjeuner sur l'herbe (O Almoço na Relva)" — e o parêntese sozinho
  // fazia a busca não achar nada. Tenta o título limpo, depois o de dentro do
  // parêntese, depois título + autor. Em duas línguas, porque metade desta
  // lista é obra estrangeira e a descrição em pt nem sempre existe.
  const semParenteses = obra.titulo.replace(/\s*\([^)]*\)\s*/g, " ").trim();
  const dentroDoParenteses = (obra.titulo.match(/\(([^)]+)\)/) || [])[1];
  const termos = [...new Set([semParenteses, dentroDoParenteses, obra.titulo + " " + obra.autor].filter(Boolean))];

  const candidatas = [];
  for (const termo of termos) {
    for (const lang of ["pt", "en"]) {
      const busca = await pegarJson(
        `https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&origin=*` +
        `&search=${encodeURIComponent(termo)}&language=${lang}&uselang=${lang}&type=item&limit=8`
      );
      // Só entidades cuja DESCRIÇÃO cita o autor. É o filtro que separa o
      // quadro Abaporu do bairro Abaporu sem precisar entender de arte.
      for (const s of busca.search || []) {
        if (!sobrenome || !semAcento(s.description || "").includes(sobrenome)) continue;
        if (!candidatas.some((c) => c.id === s.id)) candidatas.push(s);
      }
    }
    if (candidatas.length) break;
  }
  if (!candidatas.length) return null;

  const ids = candidatas.map((c) => c.id).join("|");
  const ents = await pegarJson(
    `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&origin=*` +
    `&ids=${ids}&props=claims`
  );
  for (const c of candidatas) {
    const claims = ((ents.entities || {})[c.id] || {}).claims || {};
    const p18 = (claims.P18 || [])[0];
    const arquivo = p18 && p18.mainsnak && p18.mainsnak.datavalue && p18.mainsnak.datavalue.value;
    if (!arquivo) continue;

    // Terceira armadilha da mesma família, e a mais sutil: o P18 de um FILME
    // quase nunca é o filme. "Ainda Estou Aqui" trouxe "Fernanda Torres at the
    // 2024 Toronto International Film Festival" — foto de tapete vermelho da
    // atriz, que o Wikidata usa como imagem representativa da obra. Num app de
    // estudo isso é pior que capa vazia: a pessoa memoriza o rosto errado.
    //
    // Para quadro isso não acontece (a imagem do quadro É o quadro), então a
    // exigência vale só para cinema: o nome do arquivo tem que dizer que é
    // cartaz ou fotograma. "Clockwork Orange Trailer poster.png" passa.
    if (obra.categoria === "Cinema" &&
        !/(poster|cartaz|affiche|title.?card|screenshot|still|lobby.?card)/i.test(arquivo)) {
      continue;
    }

    // Metadados de licença vêm do Commons, pelo nome exato do arquivo.
    let licenca = "não declarada", autoria = "";
    try {
      const meta = await pegarJson(
        `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*` +
        `&titles=${encodeURIComponent("File:" + arquivo)}&prop=imageinfo&iiprop=extmetadata`
      );
      const pg = Object.values(meta.query.pages)[0];
      const em = ((pg.imageinfo || [])[0] || {}).extmetadata || {};
      licenca = (em.LicenseShortName && em.LicenseShortName.value) || licenca;
      autoria = (em.Artist && String(em.Artist.value).replace(/<[^>]+>/g, "").trim()) || "";
    } catch { /* sem metadados: segue com o que tem */ }

    return {
      url: `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(arquivo)}?width=900`,
      fonte: "Wikimedia Commons (via Wikidata " + c.id + ")",
      ref: "https://www.wikidata.org/wiki/" + c.id,
      licenca,
      autoria,
      // A licença é da FOTOGRAFIA. Uma reprodução fotográfica fiel de quadro
      // em domínio público entra em domínio público também; de quadro ainda
      // protegido, não — e é por isso que os protegidos simplesmente não têm
      // P18. Registrado para o manifesto não dar confiança falsa.
      ressalva: "licença refere-se à reprodução fotográfica, não à obra retratada",
    };
  }
  return null;
}

const RESOLVEDOR = {
  "Literatura": viaOpenLibrary,
  "Ensaio": viaOpenLibrary,
  "Música": viaCoverArt,
  "Artes visuais": viaWikidata,
  // Cinema pelo mesmo caminho das artes visuais. Cartaz de filme quase nunca
  // é livre, mas a entidade do filme no Wikidata às vezes traz um P18 que É
  // livre — foto de locação, cartaz antigo em domínio público, still cedido.
  // O filtro é o mesmo: a descrição precisa citar o diretor ("filme de 1962
  // dirigido por Anselmo Duarte"), então não há risco de trazer outra coisa.
  // Onde não houver, a capa tipográfica cobre — e ela sustenta a tela sozinha.
  "Cinema": viaWikidata,
};

(async () => {
  const obras = carregarObras();
  fs.mkdirSync(DESTINO, { recursive: true });

  const manifesto = { geradoEm: new Date().toISOString(), itens: {} };
  const caminhoManifesto = path.join(DESTINO, "PROCEDENCIA.json");
  if (fs.existsSync(caminhoManifesto)) {
    Object.assign(manifesto.itens, JSON.parse(fs.readFileSync(caminhoManifesto, "utf8")).itens || {});
  }

  let baixadas = 0, puladas = 0, semFonte = 0, falhas = 0;

  for (const obra of obras) {
    const destino = path.join(DESTINO, obra.id + ".jpg");
    if (fs.existsSync(destino)) { puladas++; continue; }

    const resolver = RESOLVEDOR[obra.categoria];
    if (!resolver) { semFonte++; continue; }

    try {
      const achado = await resolver(obra);
      if (!achado) {
        console.log(`—  ${obra.titulo}: nada encontrado`);
        falhas++;
      } else {
        const bytes = await baixar(achado.url, destino);
        manifesto.itens[obra.id] = {
          titulo: obra.titulo, autor: obra.autor, categoria: obra.categoria,
          ...achado, bytes,
        };
        console.log(`ok ${obra.titulo}  (${achado.fonte}, ${Math.round(bytes / 1024)} KB)`);
        baixadas++;
      }
    } catch (e) {
      console.log(`!  ${obra.titulo}: ${e.message}`);
      falhas++;
    }
    await sleep(350);
  }

  fs.writeFileSync(caminhoManifesto, JSON.stringify(manifesto, null, 2));
  console.log(
    `\n${baixadas} baixadas · ${puladas} já existiam · ${falhas} sem resultado · ` +
    `${semFonte} sem fonte livre (cinema)\nprocedência em ${caminhoManifesto}`
  );
})();
