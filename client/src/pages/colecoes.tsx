import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Layers, Plus, Upload, Eye, X, Printer } from "lucide-react";

import camponesasImg from "@assets/camponesas_1771198582484.png";
import respigadoresImg from "@assets/respigadores_1771198582490.png";

interface ObraColecao {
  id: number;
  titulo: string;
  ano: number;
  tecnica: string;
  dimensoes?: string;
  inventarioId?: string;
  imagem: string;
}

interface Colecao {
  id: string;
  titulo: string;
  descricao: string;
  capa: string;
  obras: ObraColecao[];
}

const colecoesPadrao: Colecao[] = [
  {
    id: "pontoise",
    titulo: "Vida no Campo: A Série de Pontoise",
    descricao:
      "Uma exploração profunda das rotinas rurais e da luz natural nos campos franceses, capturando a essência do trabalho e repouso campestre.",
    capa: camponesasImg,
    obras: [
      {
        id: 2,
        titulo: "Jovens Camponesas Descansando",
        ano: 1882,
        tecnica: "Óleo sobre tela",
        dimensoes: "81,0 x 65,1 cm",
        inventarioId: "ID-M002",
        imagem: camponesasImg,
      },
      {
        id: 3,
        titulo: "Os Respigadores",
        ano: 1889,
        tecnica: "Óleo sobre tela",
        dimensoes: "65,4 x 81,3 cm",
        inventarioId: "ID-M003",
        imagem: respigadoresImg,
      },
    ],
  },
];

function ColecaoVisualizador({ colecao, onClose }: { colecao: Colecao; onClose: () => void }) {
  function handleImprimir() {
    window.print();
  }

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #colecao-print, #colecao-print * { visibility: visible !important; }
          #colecao-print {
            position: fixed !important;
            inset: 0 !important;
            width: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            overflow: visible !important;
            z-index: 99999 !important;
          }
          .colecao-no-print { display: none !important; }
          .colecao-capa-print {
            width: 210mm !important;
            min-height: 297mm !important;
            page-break-after: always !important;
            break-after: page !important;
            position: relative !important;
            overflow: hidden !important;
          }
          .colecao-capa-print img {
            width: 100% !important;
            height: 297mm !important;
            object-fit: cover !important;
          }
          .colecao-obra-print {
            page-break-before: always !important;
            break-before: page !important;
            padding: 12mm 16mm !important;
          }
        }
      `}</style>

      <div
        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto"
        data-testid="modal-colecao-visualizar"
      >
        <div className="colecao-no-print sticky top-0 z-10 flex items-center justify-between gap-2 bg-background border-b px-6 py-3">
          <h2 className="text-lg font-semibold text-foreground" data-testid="text-colecao-viewer-header">
            {colecao.titulo}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleImprimir}
              data-testid="button-imprimir-colecao"
            >
              <Printer className="mr-2 h-4 w-4" />
              Imprimir Coleção
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              data-testid="button-fechar-colecao-viewer"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div id="colecao-print" className="max-w-[210mm] mx-auto my-6 sm:my-10">
          <div
            className="relative w-full overflow-hidden rounded-sm colecao-capa-print"
            style={{ minHeight: "500px" }}
            data-testid="colecao-capa-viewer"
          >
            <img
              src={colecao.capa}
              alt={colecao.titulo}
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
                  data-testid="text-colecao-capa-titulo"
                >
                  {colecao.titulo}
                </h1>
                {colecao.descricao && (
                  <p
                    className="mt-3 text-sm text-black/60"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    data-testid="text-colecao-capa-desc"
                  >
                    {colecao.descricao}
                  </p>
                )}
              </div>
            </div>
          </div>

          {colecao.obras.map((obra) => (
            <div
              key={obra.id}
              className="bg-white text-black p-8 sm:p-12 mt-1 colecao-obra-print"
              data-testid={`colecao-viewer-obra-${obra.id}`}
            >
              <img
                src={obra.imagem}
                alt={obra.titulo}
                className="w-full rounded-sm object-cover shadow-sm"
                style={{ maxHeight: "400px" }}
              />
              <div className="mt-8 space-y-4">
                <h2
                  className="text-2xl font-medium"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  data-testid={`colecao-viewer-obra-titulo-${obra.id}`}
                >
                  {obra.titulo}
                </h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {obra.inventarioId && (
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-0.5">
                        ID de Inventário
                      </p>
                      <p className="text-sm font-mono">{obra.inventarioId}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-0.5">
                      Técnica
                    </p>
                    <p className="text-sm">{obra.tecnica}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-0.5">
                      Ano
                    </p>
                    <p className="text-sm">{obra.ano}</p>
                  </div>
                  {obra.dimensoes && (
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-0.5">
                        Dimensões
                      </p>
                      <p className="text-sm">{obra.dimensoes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default function Colecoes({ onNovaColecao }: { onNovaColecao?: (nome: string) => void }) {
  const [colecoes, setColecoes] = useState<Colecao[]>(colecoesPadrao);
  const [modalAberto, setModalAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [capaPreview, setCapaPreview] = useState("");
  const [colecaoVisualizar, setColecaoVisualizar] = useState<Colecao | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCapaPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  function handleSalvar() {
    if (!nome.trim()) return;
    const nova: Colecao = {
      id: `col-${Date.now()}`,
      titulo: nome.trim(),
      descricao: descricao.trim(),
      capa: capaPreview || camponesasImg,
      obras: [],
    };
    setColecoes([...colecoes, nova]);
    onNovaColecao?.(nome.trim());
    setNome("");
    setDescricao("");
    setCapaPreview("");
    setModalAberto(false);
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-muted-foreground" />
            <h2
              className="text-lg font-semibold text-foreground"
              data-testid="text-titulo-colecoes"
            >
              Coleções / Séries
            </h2>
            <Badge variant="secondary">{colecoes.length}</Badge>
          </div>
          <Button
            onClick={() => setModalAberto(true)}
            style={{ backgroundColor: "#16a34a", borderColor: "#16a34a", color: "#fff" }}
            data-testid="button-nova-colecao"
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Coleção
          </Button>
        </div>

        {colecoes.map((colecao) => (
          <Card
            key={colecao.id}
            className="flex flex-col"
            data-testid={`card-colecao-${colecao.id}`}
          >
            <img
              src={colecao.capa}
              alt={colecao.titulo}
              className="h-52 w-full object-cover rounded-t-md"
              data-testid={`img-colecao-${colecao.id}`}
            />
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-xl font-semibold text-foreground"
                    data-testid={`text-titulo-col-${colecao.id}`}
                  >
                    {colecao.titulo}
                  </h3>
                  <p
                    className="mt-2 text-sm text-muted-foreground leading-relaxed"
                    data-testid={`text-desc-col-${colecao.id}`}
                  >
                    {colecao.descricao}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setColecaoVisualizar(colecao)}
                  data-testid={`button-visualizar-colecao-${colecao.id}`}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Visualizar
                </Button>
              </div>

              <Separator />

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Obras da Coleção ({colecao.obras.length})
                </p>
                {colecao.obras.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {colecao.obras.map((obra) => (
                      <Card
                        key={obra.id}
                        className="flex flex-row"
                        data-testid={`card-obra-col-${obra.id}`}
                      >
                        <img
                          src={obra.imagem}
                          alt={obra.titulo}
                          className="h-24 w-24 object-cover rounded-l-md flex-shrink-0"
                        />
                        <div className="p-3 flex flex-col justify-center min-w-0">
                          <p
                            className="font-medium text-foreground text-sm truncate"
                            data-testid={`text-obra-col-titulo-${obra.id}`}
                          >
                            {obra.titulo}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {obra.tecnica} · {obra.ano}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhuma obra vinculada ainda.</p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={modalAberto} onOpenChange={(v) => !v && setModalAberto(false)}>
        <DialogContent className="sm:max-w-md" data-testid="modal-nova-colecao">
          <DialogHeader>
            <DialogTitle data-testid="text-modal-colecao-title">Nova Coleção / Série</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="nome-colecao">Nome da Coleção</Label>
              <Input
                id="nome-colecao"
                placeholder='Ex: "Paisagens Urbanas"'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                data-testid="input-nome-colecao"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="desc-colecao">Descrição</Label>
              <Input
                id="desc-colecao"
                placeholder="Breve descrição da série"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                data-testid="input-desc-colecao"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Capa</Label>
              <label
                className="flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-border p-6 cursor-pointer"
                data-testid="area-upload-capa-colecao"
              >
                {capaPreview ? (
                  <img src={capaPreview} alt="Prévia" className="h-28 w-full object-cover rounded-sm" />
                ) : (
                  <>
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground text-center">Clique para enviar a imagem de capa</span>
                  </>
                )}
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} data-testid="input-file-capa-colecao" />
              </label>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setModalAberto(false)} data-testid="button-cancelar-colecao">Cancelar</Button>
            <Button onClick={handleSalvar} disabled={!nome.trim()} data-testid="button-salvar-colecao">Salvar Coleção</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {colecaoVisualizar && (
        <ColecaoVisualizador
          colecao={colecaoVisualizar}
          onClose={() => setColecaoVisualizar(null)}
        />
      )}
    </div>
  );
}
