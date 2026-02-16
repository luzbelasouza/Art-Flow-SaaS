import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { X, Eye, BookOpen, Calendar, Printer } from "lucide-react";
import { carregarDadosEmissor, formatarLinhaEmissor } from "@/pages/perfil-emissor";

interface Obra {
  id: number;
  inventarioId: string;
  titulo: string;
  artistaId: string;
  tecnica: string;
  ano: number;
  dimensoes: string;
  imagem: string;
}

export interface CatalogoItem {
  id: string;
  titulo: string;
  descricao: string;
  capa: string;
  obras: Obra[];
  dataCriacao: string;
}

const obrasExtraInfo: Record<string, { preco: string; status: string; localizacao: string; exposicao: string }> = {
  "ID-M001": { preco: "R$ 45.000,00", status: "Acervo Pessoal", localizacao: "Ateliê do Artista", exposicao: "Impressionismo Rural — MASP" },
  "ID-M002": { preco: "R$ 38.000,00", status: "Consignação", localizacao: "Galeria Graphitte, São Paulo", exposicao: "Vida no Campo — Pinacoteca" },
  "ID-M003": { preco: "R$ 52.000,00", status: "Estoque", localizacao: "Jardins, São Paulo", exposicao: "Os Mestres do Campo — MoMA" },
};

function MarcaDaguaCatalogo() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-[1]"
      style={{ opacity: 0.06 }}
      data-testid="marca-dagua-catalogo"
    >
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-16"
        style={{
          transform: "rotate(-35deg)",
          transformOrigin: "center center",
          width: "200%",
          height: "200%",
          left: "-50%",
          top: "-50%",
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex items-center gap-24 whitespace-nowrap">
            {Array.from({ length: 6 }).map((_, j) => (
              <span
                key={j}
                className="text-2xl font-bold tracking-widest text-black select-none"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Art Flow - Versão de Teste
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function CatalogoDocumento({
  catalogo,
  onClose,
  mostrarMarcaDagua,
}: {
  catalogo: CatalogoItem;
  onClose: () => void;
  mostrarMarcaDagua?: boolean;
}) {
  const dadosEmissor = carregarDadosEmissor();
  const emissorLinha = dadosEmissor ? formatarLinhaEmissor(dadosEmissor) : null;

  function handleImprimir() {
    window.print();
  }

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #catalogo-print, #catalogo-print * { visibility: visible !important; }
          #catalogo-print {
            position: fixed !important;
            inset: 0 !important;
            width: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            overflow: visible !important;
            z-index: 99999 !important;
          }
          .catalogo-no-print { display: none !important; }
          .catalogo-capa-print {
            width: 210mm !important;
            min-height: 297mm !important;
            page-break-after: always !important;
            break-after: page !important;
            position: relative !important;
            overflow: hidden !important;
          }
          .catalogo-capa-print img {
            width: 100% !important;
            height: 297mm !important;
            object-fit: cover !important;
          }
          .catalogo-obra-print {
            page-break-before: always !important;
            break-before: page !important;
            padding: 12mm 16mm !important;
          }
          .catalogo-footer-print {
            page-break-before: always !important;
            break-before: page !important;
            padding: 12mm 16mm !important;
          }
        }
      `}</style>

      <div
        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto"
        data-testid="modal-catalogo-doc"
      >
        <div className="catalogo-no-print sticky top-0 z-10 flex items-center justify-between gap-2 bg-background border-b px-6 py-3">
          <h2 className="text-lg font-semibold text-foreground" data-testid="text-catalogo-doc-header">
            {catalogo.titulo}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleImprimir}
              data-testid="button-imprimir-catalogo"
            >
              <Printer className="mr-2 h-4 w-4" />
              Imprimir Catálogo
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              data-testid="button-fechar-catalogo-doc"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div id="catalogo-print" className="max-w-[210mm] mx-auto my-6 sm:my-10 relative">
          {mostrarMarcaDagua && <MarcaDaguaCatalogo />}
          <div
            className="relative w-full overflow-hidden rounded-sm catalogo-capa-print"
            style={{ minHeight: "500px" }}
            data-testid="catalogo-capa"
          >
            <img
              src={catalogo.capa}
              alt={catalogo.titulo}
              className="w-full h-full object-cover absolute inset-0"
              style={{ minHeight: "500px" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="bg-white/90 backdrop-blur-sm px-12 py-10 text-center shadow-lg"
                style={{ maxWidth: "80%" }}
              >
                <h1
                  className="text-3xl sm:text-4xl font-light tracking-wide text-black"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  data-testid="text-catalogo-capa-titulo"
                >
                  {catalogo.titulo}
                </h1>
                {catalogo.descricao && (
                  <p
                    className="mt-3 text-sm text-black/60"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    data-testid="text-catalogo-capa-desc"
                  >
                    {catalogo.descricao}
                  </p>
                )}
              </div>
            </div>
          </div>

          {catalogo.obras.map((obra) => {
            const extra = obrasExtraInfo[obra.inventarioId] || {
              preco: "Sob consulta",
              status: "Acervo",
              localizacao: "—",
              exposicao: "—",
            };
            return (
              <div
                key={obra.id}
                className="bg-white text-black p-8 sm:p-12 mt-1 catalogo-obra-print"
                data-testid={`catalogo-obra-${obra.id}`}
              >

              <img
                src={obra.imagem}
                alt={obra.titulo}
                className="w-full rounded-sm object-cover shadow-sm"
                style={{ maxHeight: "400px" }}
                data-testid={`catalogo-obra-img-${obra.id}`}
              />

              <div className="mt-8 space-y-4">
                <h2
                  className="text-2xl font-serif font-medium"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  data-testid={`catalogo-obra-titulo-${obra.id}`}
                >
                  {obra.titulo}
                </h2>

                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-0.5">
                      ID de Inventário
                    </p>
                    <p className="text-sm font-mono" data-testid={`catalogo-obra-inv-${obra.id}`}>
                      {obra.inventarioId}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-0.5">
                      Técnica
                    </p>
                    <p className="text-sm" data-testid={`catalogo-obra-tec-${obra.id}`}>
                      {obra.tecnica}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-0.5">
                      Ano
                    </p>
                    <p className="text-sm">{obra.ano}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-0.5">
                      Dimensões
                    </p>
                    <p className="text-sm">{obra.dimensoes}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-0.5">
                      Preço
                    </p>
                    <p className="text-sm font-medium" data-testid={`catalogo-obra-preco-${obra.id}`}>
                      {extra.preco}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-0.5">
                      Status
                    </p>
                    <p className="text-sm">{extra.status}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-0.5">
                      Localização
                    </p>
                    <p className="text-sm">{extra.localizacao}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-0.5">
                      Exposição Relacionada
                    </p>
                    <p className="text-sm">{extra.exposicao}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

          <div className="bg-white text-black p-8 sm:p-12 mt-1 catalogo-footer-print">
            <Separator className="bg-black/10 mb-8" />
            <div className="text-center">
              <p
                className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-2"
              >
                Emitido por
              </p>
              {emissorLinha ? (
                <p
                  className="text-[11px] tracking-[0.15em] text-black/50 leading-relaxed"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  data-testid="text-catalogo-emissor"
                >
                  {emissorLinha}
                </p>
              ) : (
                <p
                  className="text-xs text-black/40 italic"
                  data-testid="text-catalogo-emissor-vazio"
                >
                  Complete seus dados na aba Perfil para exibir aqui.
                </p>
              )}
              <p className="text-[10px] text-black/30 mt-4">
                {catalogo.dataCriacao}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function CatalogoPage({
  catalogos,
  onVerCatalogo,
}: {
  catalogos: CatalogoItem[];
  onVerCatalogo: (catalogo: CatalogoItem) => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {catalogos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <BookOpen className="h-12 w-12 mb-3 opacity-30" />
          <p className="text-sm">Nenhum catálogo criado ainda.</p>
          <p className="text-xs mt-1 text-muted-foreground/70">
            Selecione obras na aba "Obras" e clique em "Gerar Catálogo".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogos.map((cat) => (
            <Card
              key={cat.id}
              className="flex flex-col overflow-visible"
              data-testid={`card-catalogo-${cat.id}`}
            >
              <div className="relative h-48 overflow-hidden rounded-t-md">
                <img
                  src={cat.capa}
                  alt={cat.titulo}
                  className="w-full h-full object-cover"
                  data-testid={`img-catalogo-${cat.id}`}
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                  <h3
                    className="text-white font-semibold text-lg leading-tight"
                    data-testid={`text-catalogo-titulo-${cat.id}`}
                  >
                    {cat.titulo}
                  </h3>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                  <Calendar className="h-3 w-3" />
                  <span data-testid={`text-catalogo-data-${cat.id}`}>{cat.dataCriacao}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {cat.obras.length} {cat.obras.length === 1 ? "obra" : "obras"}
                </p>
                {cat.descricao && (
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {cat.descricao}
                  </p>
                )}
                <div className="mt-auto pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => onVerCatalogo(cat)}
                    data-testid={`button-ver-catalogo-${cat.id}`}
                  >
                    <Eye className="mr-1.5 h-3.5 w-3.5" />
                    Visualizar Catálogo
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export { CatalogoDocumento };
