#!/usr/bin/env python3
"""Ferramenta de leitura das provas reais em PDF.

Existe por um motivo concreto: `pdftotext -layout` nas provas da FGV devolve as
duas colunas intercaladas, sem numero de questao, sem letra de alternativa e sem
formula. Para transcrever a prova e preciso ver a pagina como ela e.

    python banco-central/provas.py paginas <pdf> <destino> [--dpi 150] [--de N] [--ate N]
    python banco-central/provas.py recortar <pdf> <pagina> <x0,y0,x1,y1> <saida> [--dpi 200]
    python banco-central/provas.py figuras <pdf> [--pagina N]

`paginas` renderiza para leitura (vai no scratchpad, nunca no repo).
`recortar` grava a figura de uma questao (essa sim vai para assets/provas/).
`figuras` lista as imagens embutidas com sua bbox, para descobrir o recorte.

**A extensao da saida decide o peso, e a diferenca e de 7x.** Medido na FGV
2023.1, a 200 dpi: foto/mapa/capa de revista pesa ~313 KB em .png e ~45 KB em
.jpg, com a mesma resolucao. Line art (diagrama, figura geometrica) ja nasce
leve em .png (~25 KB) e nao ganha nada com .jpg, que ainda borraria o traco.

    figura fotografica, mapa colorido, capa, charge  ->  .jpg
    diagrama, grafico de linha, figura geometrica    ->  .png

Com ~300 figuras nessa mistura o repositorio cresce ~11 MB. Salvando tudo em
.png seriam ~65 MB, o que nao cabe num repo servido pelo GitHub Pages.

A bbox e dada em pontos do PDF (72 pt = 1 polegada), no sistema do PyMuPDF:
origem no canto superior esquerdo, y crescendo para baixo. `figuras` imprime
exatamente nesse sistema, entao da para copiar o numero dele direto.
"""

import argparse
import os
import sys

try:
    import pymupdf
except ImportError:  # pragma: no cover
    sys.exit("PyMuPDF nao instalado. Rode: python -m pip install PyMuPDF")


def cmd_paginas(args):
    doc = pymupdf.open(args.pdf)
    os.makedirs(args.destino, exist_ok=True)
    base = os.path.splitext(os.path.basename(args.pdf))[0]
    primeira = (args.de or 1) - 1
    ultima = args.ate or doc.page_count
    escala = args.dpi / 72
    gravados = []
    for n in range(primeira, min(ultima, doc.page_count)):
        pix = doc[n].get_pixmap(matrix=pymupdf.Matrix(escala, escala))
        saida = os.path.join(args.destino, f"{base}-p{n + 1:03d}.png")
        pix.save(saida)
        gravados.append((saida, os.path.getsize(saida)))
    doc.close()
    for caminho, tam in gravados:
        print(f"{tam / 1024:8.0f} KB  {caminho}")
    print(f"-- {len(gravados)} paginas em {args.dpi} dpi")


def cmd_recortar(args):
    doc = pymupdf.open(args.pdf)
    pagina = doc[args.pagina - 1]
    x0, y0, x1, y1 = (float(v) for v in args.bbox.split(","))
    escala = args.dpi / 72
    pix = pagina.get_pixmap(
        matrix=pymupdf.Matrix(escala, escala), clip=pymupdf.Rect(x0, y0, x1, y1)
    )
    os.makedirs(os.path.dirname(os.path.abspath(args.saida)), exist_ok=True)
    ehjpeg = os.path.splitext(args.saida)[1].lower() in (".jpg", ".jpeg")
    pix.save(args.saida, jpg_quality=args.qualidade) if ehjpeg else pix.save(args.saida)
    doc.close()
    tam = os.path.getsize(args.saida)
    aviso = ""
    if not ehjpeg and tam > 120 * 1024:
        aviso = "   <- pesado para .png; se for foto/mapa, salve como .jpg"
    print(f"{tam / 1024:.0f} KB  {pix.width}x{pix.height}  {args.saida}{aviso}")


def cmd_figuras(args):
    doc = pymupdf.open(args.pdf)
    paginas = [args.pagina - 1] if args.pagina else range(doc.page_count)
    total = 0
    for n in paginas:
        pagina = doc[n]
        blocos = [b for b in pagina.get_text("dict")["blocks"] if b["type"] == 1]
        desenhos = pagina.get_drawings()
        if not blocos and not desenhos:
            continue
        print(f"-- pagina {n + 1}  ({pagina.rect.width:.0f}x{pagina.rect.height:.0f} pt)")
        for b in blocos:
            x0, y0, x1, y1 = b["bbox"]
            print(
                f"   imagem  {x0:6.0f},{y0:6.0f},{x1:6.0f},{y1:6.0f}"
                f"   {x1 - x0:5.0f}x{y1 - y0:5.0f} pt"
            )
            total += 1
        if desenhos:
            # Vetor (grafico, figura geometrica) nao aparece como imagem embutida.
            # A uniao das bboxes diz onde a regiao desenhada esta.
            uniao = pymupdf.Rect(desenhos[0]["rect"])
            for d in desenhos[1:]:
                uniao |= pymupdf.Rect(d["rect"])
            print(
                f"   vetor   {uniao.x0:6.0f},{uniao.y0:6.0f},{uniao.x1:6.0f},{uniao.y1:6.0f}"
                f"   {len(desenhos)} tracos (uniao; recorte por questao pede bbox manual)"
            )
    doc.close()
    print(f"-- {total} imagens embutidas")


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)

    a = sub.add_parser("paginas", help="renderiza as paginas em PNG, para leitura")
    a.add_argument("pdf")
    a.add_argument("destino")
    a.add_argument("--dpi", type=int, default=150)
    a.add_argument("--de", type=int, help="primeira pagina (1-based)")
    a.add_argument("--ate", type=int, help="ultima pagina (1-based, inclusiva)")
    a.set_defaults(func=cmd_paginas)

    b = sub.add_parser("recortar", help="recorta a figura de uma questao")
    b.add_argument("pdf")
    b.add_argument("pagina", type=int, help="1-based")
    b.add_argument("bbox", help="x0,y0,x1,y1 em pontos do PDF")
    b.add_argument("saida", help=".jpg para foto/mapa/charge, .png para line art")
    b.add_argument("--dpi", type=int, default=200)
    b.add_argument("--qualidade", type=int, default=82, help="qualidade JPEG (so vale para .jpg)")
    b.set_defaults(func=cmd_recortar)

    c = sub.add_parser("figuras", help="lista as imagens embutidas e suas bboxes")
    c.add_argument("pdf")
    c.add_argument("--pagina", type=int, help="1-based; sem isso varre o PDF inteiro")
    c.set_defaults(func=cmd_figuras)

    args = p.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
