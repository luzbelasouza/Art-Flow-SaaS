import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Gavel,
  ExternalLink,
  Calendar,
  ShieldCheck,
  Clock,
  ArrowRight,
  Eye,
  Info,
} from "lucide-react";

import colheitaImg from "@assets/colheita_1771198582489.png";
import camponesasImg from "@assets/camponesas_1771198582484.png";
import respigadoresImg from "@assets/respigadores_1771198582490.png";

interface CatalogoLeilao {
  id: string;
  titulo: string;
  imagemCapa: string;
  dataPregao: string;
  status: "em-breve" | "em-andamento" | "em-captacao";
  totalLotes: number;
  descricao: string;
  leiloeiro: string;
  linkExterno: string;
  obrasVerificadas: number;
}

const statusLabels: Record<string, string> = {
  "em-breve": "Em breve",
  "em-andamento": "Em andamento",
  "em-captacao": "Em captação",
};

const statusColors: Record<string, { bg: string; color: string; border: string }> = {
  "em-breve": { bg: "rgba(99, 102, 241, 0.1)", color: "#6366f1", border: "rgba(99, 102, 241, 0.3)" },
  "em-andamento": { bg: "rgba(34, 197, 94, 0.1)", color: "#16a34a", border: "rgba(34, 197, 94, 0.3)" },
  "em-captacao": { bg: "rgba(245, 158, 11, 0.1)", color: "#d97706", border: "rgba(245, 158, 11, 0.3)" },
};

const catalogosLeilao: CatalogoLeilao[] = [
  {
    id: "leilao-1",
    titulo: "Impressionismo & Pós-Impressionismo",
    imagemCapa: colheitaImg,
    dataPregao: "15 de Março de 2026",
    status: "em-andamento",
    totalLotes: 42,
    descricao: "Curadoria especial com obras impressionistas e pós-impressionistas de artistas emergentes e consagrados. Leilão conduzido por leiloeiro público oficial.",
    leiloeiro: "Dr. Carlos Mendes — Leiloeiro Público Oficial",
    linkExterno: "https://www.leiloes.br",
    obrasVerificadas: 28,
  },
  {
    id: "leilao-2",
    titulo: "Arte Contemporânea Brasileira",
    imagemCapa: camponesasImg,
    dataPregao: "28 de Abril de 2026",
    status: "em-captacao",
    totalLotes: 18,
    descricao: "Seleção de obras contemporâneas nacionais, com foco em técnicas mistas e pintura. Recebendo submissões até 10/04.",
    leiloeiro: "Dra. Ana Beatriz Fonseca — Leiloeira Pública Oficial",
    linkExterno: "https://www.leiloes.br",
    obrasVerificadas: 12,
  },
  {
    id: "leilao-3",
    titulo: "Gravuras & Edições Limitadas",
    imagemCapa: respigadoresImg,
    dataPregao: "10 de Junho de 2026",
    status: "em-breve",
    totalLotes: 35,
    descricao: "Leilão dedicado a gravuras, litografias e edições limitadas. Peças raras de artistas modernos e contemporâneos.",
    leiloeiro: "Dr. Roberto Almeida — Leiloeiro Público Oficial",
    linkExterno: "https://www.leiloes.br",
    obrasVerificadas: 20,
  },
];

export default function LeilaoArtFlowPage() {
  const [catalogoDetalhe, setCatalogoDetalhe] = useState<CatalogoLeilao | null>(null);

  function handleAbrirLeilao(catalogo: CatalogoLeilao) {
    setCatalogoDetalhe(catalogo);
  }

  function handleRedirecionarExterno(link: string) {
    window.open(link, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground" data-testid="text-leilao-desc">
            Catálogos de leilões oficiais da Art Flow, conduzidos por leiloeiros públicos.
          </p>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-md border border-border" data-testid="aviso-leilao-oficial">
          <Info className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Todos os leilões são oficiais e realizados por <span className="font-semibold text-foreground">leiloeiro público</span> conforme
            legislação vigente. Ao clicar em um catálogo, você será direcionado ao site oficial do leilão.
          </p>
        </div>

        <section className="space-y-4" data-testid="section-catalogos">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Gavel className="h-4 w-4 text-muted-foreground" />
            Catálogos Disponíveis
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {catalogosLeilao.map((catalogo) => (
              <Card
                key={catalogo.id}
                className="overflow-hidden hover-elevate cursor-pointer"
                onClick={() => handleAbrirLeilao(catalogo)}
                data-testid={`card-catalogo-${catalogo.id}`}
              >
                <div className="relative">
                  <img
                    src={catalogo.imagemCapa}
                    alt={catalogo.titulo}
                    className="w-full h-40 object-cover"
                    data-testid={`img-capa-${catalogo.id}`}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge
                      className="no-default-hover-elevate no-default-active-elevate text-[10px]"
                      style={{
                        backgroundColor: statusColors[catalogo.status].bg,
                        color: statusColors[catalogo.status].color,
                        borderColor: statusColors[catalogo.status].border,
                        backdropFilter: "blur(4px)",
                      }}
                      data-testid={`badge-status-${catalogo.id}`}
                    >
                      {catalogo.status === "em-andamento" && <Clock className="mr-1 h-2.5 w-2.5" />}
                      {statusLabels[catalogo.status]}
                    </Badge>
                  </div>
                  {catalogo.obrasVerificadas > 0 && (
                    <div className="absolute bottom-2 left-2">
                      <Badge
                        className="no-default-hover-elevate no-default-active-elevate text-[10px]"
                        style={{ backgroundColor: "rgba(212, 168, 67, 0.9)", color: "#fff", borderColor: "rgba(212, 168, 67, 1)" }}
                        data-testid={`badge-verified-${catalogo.id}`}
                      >
                        <ShieldCheck className="mr-1 h-2.5 w-2.5" />
                        {catalogo.obrasVerificadas} Verified
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <h4 className="text-sm font-semibold text-foreground" data-testid={`text-titulo-${catalogo.id}`}>
                    {catalogo.titulo}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 flex-shrink-0" />
                    <span data-testid={`text-data-${catalogo.id}`}>Pregão: {catalogo.dataPregao}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{catalogo.totalLotes} lotes</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Dialog open={!!catalogoDetalhe} onOpenChange={() => setCatalogoDetalhe(null)}>
          {catalogoDetalhe && (
            <DialogContent className="max-w-lg" data-testid="modal-detalhe-leilao">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Gavel className="h-5 w-5" />
                  {catalogoDetalhe.titulo}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-2">
                <img
                  src={catalogoDetalhe.imagemCapa}
                  alt={catalogoDetalhe.titulo}
                  className="w-full h-48 object-cover rounded-md"
                  data-testid="img-detalhe-capa"
                />

                <div className="space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      className="no-default-hover-elevate no-default-active-elevate text-[10px]"
                      style={{
                        backgroundColor: statusColors[catalogoDetalhe.status].bg,
                        color: statusColors[catalogoDetalhe.status].color,
                        borderColor: statusColors[catalogoDetalhe.status].border,
                      }}
                    >
                      {statusLabels[catalogoDetalhe.status]}
                    </Badge>
                    {catalogoDetalhe.obrasVerificadas > 0 && (
                      <Badge
                        className="no-default-hover-elevate no-default-active-elevate text-[10px]"
                        style={{ backgroundColor: "rgba(212, 168, 67, 0.1)", color: "#D4A843", borderColor: "rgba(212, 168, 67, 0.3)" }}
                      >
                        <ShieldCheck className="mr-1 h-2.5 w-2.5" />
                        {catalogoDetalhe.obrasVerificadas} Art Flow Verified
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">{catalogoDetalhe.descricao}</p>

                  <Separator />

                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                      <span>Pregão: <span className="font-medium text-foreground">{catalogoDetalhe.dataPregao}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gavel className="h-3.5 w-3.5 flex-shrink-0" />
                      <span>Leiloeiro: <span className="font-medium text-foreground">{catalogoDetalhe.leiloeiro}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-3.5 w-3.5 flex-shrink-0" />
                      <span>Total de lotes: <span className="font-medium text-foreground">{catalogoDetalhe.totalLotes}</span></span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-2 p-3 rounded-md border border-border">
                    <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Este leilão é oficial e realizado por leiloeiro público conforme legislação vigente.
                      Ao acessar, você será redirecionado para o site oficial do leilão.
                    </p>
                  </div>
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setCatalogoDetalhe(null)} data-testid="button-fechar-detalhe">
                  Fechar
                </Button>
                <Button
                  onClick={() => handleRedirecionarExterno(catalogoDetalhe.linkExterno)}
                  data-testid="button-acessar-leilao"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Acessar Leilão Oficial
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
}
