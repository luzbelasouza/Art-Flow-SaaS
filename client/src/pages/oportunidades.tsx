import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Crown,
  Sparkles,
  Star,
  Calendar,
  MapPin,
  ExternalLink,
  Building2,
  Palette,
  MessageSquare,
  Tag,
  Globe,
  ShoppingBag,
  Send,
  Clock,
  ArrowRight,
  Zap,
} from "lucide-react";

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

export function OportunidadesUpsell({ onAssinar }: { onAssinar: () => void }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="relative overflow-hidden" style={{ backgroundColor: "rgba(212, 168, 67, 0.04)" }}>
        <div className="max-w-3xl mx-auto px-6 py-16 text-center relative z-[2]">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
            style={{ backgroundColor: "rgba(212, 168, 67, 0.12)", border: "1px solid rgba(212, 168, 67, 0.25)" }}
            data-testid="badge-oportunidades-premium"
          >
            <Crown className="h-3.5 w-3.5" style={{ color: "#D4A843" }} />
            <span className="text-xs font-semibold tracking-wider" style={{ color: "#D4A843" }}>
              RECURSO PREMIUM
            </span>
          </div>

          <h1 className="text-3xl font-semibold text-foreground mb-3" data-testid="text-oportunidades-titulo">
            Conecte sua Arte ao Mercado
          </h1>

          <p className="text-base text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
            Acesso exclusivo a editais, chat direto com colecionadores e venda sem intermediários.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left max-w-xl mx-auto">
            {[
              { icon: Calendar, titulo: "Expo & Convocatórias", desc: "Convocatórias abertas de galerias e espaços expositivos" },
              { icon: Building2, titulo: "Residências & Ocupação", desc: "Programas de residência artística e ocupações culturais" },
              { icon: Palette, titulo: "Editais Culturais", desc: "Calendário de editais com match inteligente por técnica" },
              { icon: Tag, titulo: "Consignação", desc: "Diretório de galerias que aceitam acervo consignado" },
              { icon: Globe, titulo: "Feiras de Arte", desc: "Calendário global de feiras nacionais e internacionais" },
              { icon: ShoppingBag, titulo: "Mercado Direto", desc: "Liste obras para venda direta na plataforma" },
              { icon: MessageSquare, titulo: "Caixa de Entrada", desc: "Mensagens diretas entre artistas, galerias e colecionadores" },
              { icon: Zap, titulo: "Match Inteligente", desc: "Sugestões personalizadas com base na sua técnica e estilo" },
            ].map((item) => (
              <Card key={item.titulo} className="p-4 flex items-start gap-3" data-testid={`card-beneficio-${item.titulo.toLowerCase().replace(/\s/g, "-")}`}>
                <div
                  className="rounded-md p-2 flex-shrink-0"
                  style={{ backgroundColor: "rgba(212, 168, 67, 0.1)" }}
                >
                  <item.icon className="h-4 w-4" style={{ color: "#D4A843" }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.titulo}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>

          <div
            className="rounded-md p-5 mb-8 max-w-sm mx-auto"
            style={{ backgroundColor: "rgba(212, 168, 67, 0.08)", border: "1px solid rgba(212, 168, 67, 0.2)" }}
          >
            <p className="text-xs text-muted-foreground mb-1">A partir de</p>
            <p className="text-3xl font-semibold" style={{ color: "#D4A843" }}>
              R$ 49,90<span className="text-sm font-normal text-muted-foreground">/mês</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">Cancele quando quiser</p>
          </div>

          <Button
            size="lg"
            style={{ backgroundColor: "#D4A843", borderColor: "#D4A843", color: "#fff" }}
            onClick={onAssinar}
            data-testid="button-seja-premium"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Seja Premium Agora
          </Button>
        </div>
      </div>
    </div>
  );
}

const convocatorias = [
  {
    id: 1,
    titulo: "Salão de Arte Contemporânea",
    galeria: "Galeria Graphitte",
    local: "São Paulo, SP",
    prazo: "30 de março de 2026",
    tecnicas: ["Pintura", "Óleo sobre tela"],
    status: "Inscrições Abertas",
    link: "#",
  },
  {
    id: 2,
    titulo: "Mostra Coletiva Internacional",
    galeria: "Espaço Cultural Niemeyer",
    local: "Rio de Janeiro, RJ",
    prazo: "15 de abril de 2026",
    tecnicas: ["Pintura", "Escultura", "Fotografia"],
    status: "Inscrições Abertas",
    link: "#",
  },
  {
    id: 3,
    titulo: "Projeto Artista Residente",
    galeria: "SESC Pompeia",
    local: "São Paulo, SP",
    prazo: "20 de maio de 2026",
    tecnicas: ["Todas as linguagens"],
    status: "Em breve",
    link: "#",
  },
];

export function ExpoPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <p className="text-sm text-muted-foreground mb-4" data-testid="text-expo-desc">
          Convocatórias abertas de galerias e espaços expositivos.
        </p>
        {convocatorias.map((c) => (
          <Card key={c.id} className="p-5" data-testid={`card-expo-${c.id}`}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-1.5 min-w-0">
                <h3 className="text-sm font-semibold text-foreground">{c.titulo}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Building2 className="h-3 w-3 flex-shrink-0" />
                  {c.galeria} — {c.local}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Clock className="h-3 w-3 flex-shrink-0" />
                  Prazo: {c.prazo}
                </p>
                <div className="flex items-center gap-1.5 flex-wrap mt-1">
                  {c.tecnicas.map((t) => (
                    <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge
                  className="no-default-hover-elevate no-default-active-elevate text-[10px]"
                  style={c.status === "Inscrições Abertas" ? { backgroundColor: "rgba(34, 197, 94, 0.1)", color: "#16a34a", borderColor: "rgba(34, 197, 94, 0.3)" } : { backgroundColor: "rgba(212, 168, 67, 0.1)", color: "#D4A843", borderColor: "rgba(212, 168, 67, 0.3)" }}
                >
                  {c.status}
                </Badge>
                <Button variant="outline" size="sm" data-testid={`button-expo-ver-${c.id}`}>
                  <ExternalLink className="mr-1.5 h-3 w-3" />
                  Ver Detalhes
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

const residencias = [
  {
    id: 1,
    titulo: "Residência Artística Cité des Arts",
    local: "Paris, França",
    duracao: "3 meses",
    prazo: "10 de abril de 2026",
    tipo: "Residência",
  },
  {
    id: 2,
    titulo: "Programa de Ocupação — Vila Itororó",
    local: "São Paulo, SP",
    duracao: "6 meses",
    prazo: "25 de março de 2026",
    tipo: "Ocupação",
  },
  {
    id: 3,
    titulo: "Bolsa de Residência — Inhotim",
    local: "Brumadinho, MG",
    duracao: "2 meses",
    prazo: "30 de maio de 2026",
    tipo: "Residência",
  },
];

export function OcupacaoPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <p className="text-sm text-muted-foreground mb-4" data-testid="text-ocupacao-desc">
          Programas de residência artística e ocupação cultural.
        </p>
        {residencias.map((r) => (
          <Card key={r.id} className="p-5" data-testid={`card-ocupacao-${r.id}`}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-1.5 min-w-0">
                <h3 className="text-sm font-semibold text-foreground">{r.titulo}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  {r.local}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Clock className="h-3 w-3 flex-shrink-0" />
                  Duração: {r.duracao} — Prazo: {r.prazo}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant="secondary" className="text-[10px]">{r.tipo}</Badge>
                <Button variant="outline" size="sm" data-testid={`button-ocupacao-ver-${r.id}`}>
                  <ExternalLink className="mr-1.5 h-3 w-3" />
                  Saiba Mais
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

const editais = [
  {
    id: 1,
    titulo: "Edital ProAC — Artes Visuais 2026",
    orgao: "Secretaria de Cultura de São Paulo",
    prazo: "15 de abril de 2026",
    valor: "R$ 50.000,00",
    tecnicas: ["Pintura", "Óleo sobre tela", "Gravura"],
    link: "#",
  },
  {
    id: 2,
    titulo: "Prêmio Funarte de Arte Contemporânea",
    orgao: "Funarte / MinC",
    prazo: "30 de maio de 2026",
    valor: "R$ 80.000,00",
    tecnicas: ["Todas as linguagens"],
    link: "#",
  },
  {
    id: 3,
    titulo: "Edital SESI Cultural — Exposições",
    orgao: "SESI Nacional",
    prazo: "20 de março de 2026",
    valor: "R$ 30.000,00",
    tecnicas: ["Pintura", "Escultura", "Instalação"],
    link: "#",
  },
];

export function EditalPage({ tecnicaArtista }: { tecnicaArtista?: string }) {
  function temMatch(tecnicas: string[]) {
    if (!tecnicaArtista) return false;
    const t = tecnicaArtista.toLowerCase();
    return tecnicas.some(
      (tec) => t.includes(tec.toLowerCase()) || tec.toLowerCase().includes("pintura") && t.includes("óleo")
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <p className="text-sm text-muted-foreground mb-4" data-testid="text-edital-desc">
          Editais culturais ativos com match inteligente baseado na sua técnica.
        </p>
        {editais.map((e) => {
          const match = temMatch(e.tecnicas);
          return (
            <Card
              key={e.id}
              className="p-5"
              style={match ? { border: "1px solid rgba(212, 168, 67, 0.4)" } : undefined}
              data-testid={`card-edital-${e.id}`}
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-foreground">{e.titulo}</h3>
                    {match && (
                      <Badge
                        className="no-default-hover-elevate no-default-active-elevate text-[10px]"
                        style={{ backgroundColor: "rgba(212, 168, 67, 0.12)", color: "#D4A843", borderColor: "rgba(212, 168, 67, 0.3)" }}
                        data-testid={`badge-match-edital-${e.id}`}
                      >
                        <Zap className="mr-1 h-3 w-3" />
                        Match
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{e.orgao}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Clock className="h-3 w-3 flex-shrink-0" />
                    Prazo: {e.prazo}
                  </p>
                  <p className="text-xs font-medium text-foreground">Valor: {e.valor}</p>
                  <div className="flex items-center gap-1.5 flex-wrap mt-1">
                    {e.tecnicas.map((t) => (
                      <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                    ))}
                  </div>
                </div>
                <Button variant="outline" size="sm" data-testid={`button-edital-ver-${e.id}`}>
                  <ExternalLink className="mr-1.5 h-3 w-3" />
                  Ver Edital
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

const galerias = [
  {
    id: 1,
    nome: "Galeria Graphitte",
    local: "São Paulo, SP",
    comissao: "40%",
    aceita: ["Pintura", "Gravura"],
    contato: "contato@graphitte.com.br",
  },
  {
    id: 2,
    nome: "Arte Plural Galeria",
    local: "Rio de Janeiro, RJ",
    comissao: "50%",
    aceita: ["Pintura", "Escultura", "Fotografia"],
    contato: "info@arteplural.com.br",
  },
  {
    id: 3,
    nome: "Galeria Lume",
    local: "Curitiba, PR",
    comissao: "45%",
    aceita: ["Pintura", "Instalação"],
    contato: "galeria@lume.art.br",
  },
];

export function ConsignacaoPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <p className="text-sm text-muted-foreground mb-4" data-testid="text-consignacao-desc">
          Diretório de galerias que aceitam acervo consignado.
        </p>
        {galerias.map((g) => (
          <Card key={g.id} className="p-5" data-testid={`card-consignacao-${g.id}`}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-1.5 min-w-0">
                <h3 className="text-sm font-semibold text-foreground">{g.nome}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  {g.local}
                </p>
                <p className="text-xs text-muted-foreground">Comissão: {g.comissao}</p>
                <div className="flex items-center gap-1.5 flex-wrap mt-1">
                  {g.aceita.map((t) => (
                    <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                  ))}
                </div>
              </div>
              <Button variant="outline" size="sm" data-testid={`button-consignacao-contato-${g.id}`}>
                <Send className="mr-1.5 h-3 w-3" />
                Contato
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

const feiras = [
  {
    id: 1,
    titulo: "SP-Arte 2026",
    local: "São Paulo, SP",
    data: "10 a 14 de abril de 2026",
    tipo: "Nacional",
    site: "#",
  },
  {
    id: 2,
    titulo: "ArtRio 2026",
    local: "Rio de Janeiro, RJ",
    data: "18 a 22 de setembro de 2026",
    tipo: "Nacional",
    site: "#",
  },
  {
    id: 3,
    titulo: "Art Basel Miami Beach",
    local: "Miami, EUA",
    data: "4 a 8 de dezembro de 2026",
    tipo: "Internacional",
    site: "#",
  },
  {
    id: 4,
    titulo: "Frieze London",
    local: "Londres, UK",
    data: "15 a 19 de outubro de 2026",
    tipo: "Internacional",
    site: "#",
  },
];

export function FeirasPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <p className="text-sm text-muted-foreground mb-4" data-testid="text-feiras-desc">
          Calendário global de feiras de arte nacionais e internacionais.
        </p>
        {feiras.map((f) => (
          <Card key={f.id} className="p-5" data-testid={`card-feira-${f.id}`}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-1.5 min-w-0">
                <h3 className="text-sm font-semibold text-foreground">{f.titulo}</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 flex-shrink-0" />
                  {f.local}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="h-3 w-3 flex-shrink-0" />
                  {f.data}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge
                  variant="secondary"
                  className="text-[10px]"
                  style={f.tipo === "Internacional" ? { backgroundColor: "rgba(212, 168, 67, 0.1)", color: "#D4A843", borderColor: "rgba(212, 168, 67, 0.3)" } : undefined}
                >
                  <Globe className="mr-1 h-3 w-3" />
                  {f.tipo}
                </Badge>
                <Button variant="outline" size="sm" data-testid={`button-feira-site-${f.id}`}>
                  <ExternalLink className="mr-1.5 h-3 w-3" />
                  Site
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function MercadoPage({ obras }: { obras: Obra[] }) {
  const [publicadas, setPublicadas] = useState<Set<number>>(new Set());

  const obrasEstoque = obras.filter(() => true);

  const statusObra: Record<string, string> = {
    "ID-M001": "Acervo Pessoal",
    "ID-M002": "Consignação",
    "ID-M003": "Estoque",
  };

  const precosObra: Record<string, string> = {
    "ID-M001": "R$ 45.000,00",
    "ID-M002": "R$ 38.000,00",
    "ID-M003": "R$ 52.000,00",
  };

  function handlePublicar(id: number) {
    setPublicadas((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <p className="text-sm text-muted-foreground mb-4" data-testid="text-mercado-desc">
          Vitrine de obras disponíveis para venda direta na plataforma. Obras com status "Estoque" podem ser publicadas.
        </p>
        {obrasEstoque.map((obra) => {
          const status = statusObra[obra.inventarioId] || "Acervo Pessoal";
          const preco = precosObra[obra.inventarioId] || "Sob consulta";
          const isEstoque = status === "Estoque";
          const isPublicada = publicadas.has(obra.id);

          return (
            <Card key={obra.id} className="p-4 flex items-center gap-4" data-testid={`card-mercado-${obra.id}`}>
              <img
                src={obra.imagem}
                alt={obra.titulo}
                className="h-20 w-20 object-cover rounded-sm flex-shrink-0"
              />
              <div className="flex-1 min-w-0 space-y-1">
                <h3 className="text-sm font-semibold text-foreground truncate">{obra.titulo}</h3>
                <p className="text-xs text-muted-foreground">{obra.tecnica}, {obra.ano}</p>
                <p className="text-xs font-medium text-foreground">{preco}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-[10px]">{status}</Badge>
                  {isPublicada && (
                    <Badge
                      className="no-default-hover-elevate no-default-active-elevate text-[10px]"
                      style={{ backgroundColor: "rgba(34, 197, 94, 0.1)", color: "#16a34a", borderColor: "rgba(34, 197, 94, 0.3)" }}
                      data-testid={`badge-publicada-${obra.id}`}
                    >
                      Publicada
                    </Badge>
                  )}
                </div>
              </div>
              <Button
                variant={isPublicada ? "ghost" : "outline"}
                size="sm"
                disabled={!isEstoque && !isPublicada}
                onClick={() => handlePublicar(obra.id)}
                data-testid={`button-publicar-${obra.id}`}
                style={isEstoque && !isPublicada ? { borderColor: "rgba(212, 168, 67, 0.4)", color: "#D4A843" } : undefined}
              >
                {isPublicada ? "Remover" : (
                  <>
                    <ShoppingBag className="mr-1.5 h-3 w-3" />
                    Publicar para Venda
                  </>
                )}
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

const mensagens = [
  {
    id: 1,
    remetente: "Angela Marques",
    tipo: "Colecionador",
    assunto: "Interesse na obra 'Colheita das Maçãs'",
    preview: "Bom dia! Vi sua obra na exposição e gostaria de saber sobre disponibilidade...",
    data: "Hoje",
    lida: false,
  },
  {
    id: 2,
    remetente: "Galeria Graphitte",
    tipo: "Galeria",
    assunto: "Proposta de consignação — 3 obras",
    preview: "Gostaríamos de incluir suas obras na próxima exposição coletiva...",
    data: "Ontem",
    lida: true,
  },
  {
    id: 3,
    remetente: "João Vicente",
    tipo: "Colecionador",
    assunto: "Encomenda de obra personalizada",
    preview: "Tenho interesse em uma paisagem rural no estilo da série Pontoise...",
    data: "12 fev",
    lida: true,
  },
];

export function CaixaEntradaPage() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-2">
        <p className="text-sm text-muted-foreground mb-4" data-testid="text-caixa-desc">
          Central de mensagens entre artistas, galerias e colecionadores.
        </p>
        {mensagens.map((m) => (
          <Card
            key={m.id}
            className="p-4 hover-elevate cursor-pointer"
            style={!m.lida ? { borderLeft: "3px solid #D4A843" } : undefined}
            data-testid={`card-mensagem-${m.id}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-sm ${!m.lida ? "font-semibold" : "font-medium"} text-foreground`}>
                    {m.remetente}
                  </span>
                  <Badge variant="secondary" className="text-[10px]">{m.tipo}</Badge>
                  {!m.lida && (
                    <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: "#D4A843" }} />
                  )}
                </div>
                <p className={`text-xs ${!m.lida ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                  {m.assunto}
                </p>
                <p className="text-xs text-muted-foreground truncate">{m.preview}</p>
              </div>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap flex-shrink-0">{m.data}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
