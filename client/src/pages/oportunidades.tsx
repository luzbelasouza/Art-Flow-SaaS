import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
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
  Search,
  ShieldCheck,
  Printer,
  Gavel,
  Check,
  AlertCircle,
  Lock,
  Eye,
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
              { icon: ShoppingBag, titulo: "Avaliação de Mercado", desc: "Avaliação profissional baseada em leilões recentes" },
              { icon: Gavel, titulo: "Leilões Públicos", desc: "Envie obras para captação em leiloeiros cadastrados" },
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

export function ExpoPage({ perfil }: { perfil?: string }) {
  const isColecionador = perfil === "colecionador";
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <p className="text-sm text-muted-foreground mb-4" data-testid="text-expo-desc">
          {isColecionador
            ? "Exposições e eventos abertos para colecionadores."
            : "Convocatórias abertas de galerias e espaços expositivos."}
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
                {!isColecionador && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5" data-testid={`text-expo-prazo-${c.id}`}>
                    <Clock className="h-3 w-3 flex-shrink-0" />
                    Prazo: {c.prazo}
                  </p>
                )}
                {isColecionador && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5" data-testid={`text-expo-data-${c.id}`}>
                    <Calendar className="h-3 w-3 flex-shrink-0" />
                    Data: {c.prazo}
                  </p>
                )}
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

export function ConsignacaoPage({ catalogos }: { catalogos: CatalogoItemLeilao[] }) {
  const [galeriasSelecionadas, setGaleriasSelecionadas] = useState<Set<number>>(new Set());
  const [modalCatalogoAberto, setModalCatalogoAberto] = useState(false);
  const [catalogoSelecionado, setCatalogoSelecionado] = useState<CatalogoItemLeilao | null>(null);
  const [termosAceitos, setTermosAceitos] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [catalogoEnviado, setCatalogoEnviado] = useState<string | null>(null);
  const [qtdGaleriasEnviadas, setQtdGaleriasEnviadas] = useState(0);
  const { toast } = useToast();

  function toggleGaleria(id: number) {
    setGaleriasSelecionadas((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selecionarTodas() {
    if (galeriasSelecionadas.size === galerias.length) {
      setGaleriasSelecionadas(new Set());
    } else {
      setGaleriasSelecionadas(new Set(galerias.map((g) => g.id)));
    }
  }

  function handleAbrirModalCatalogo() {
    setCatalogoSelecionado(null);
    setTermosAceitos(false);
    setModalCatalogoAberto(true);
  }

  function handleConfirmarEnvio() {
    if (!catalogoSelecionado || !termosAceitos) return;
    const nomesGalerias = galerias
      .filter((g) => galeriasSelecionadas.has(g.id))
      .map((g) => g.nome);
    const agora = new Date();
    salvarEnvio({
      id: `envio-consignacao-${Date.now()}`,
      tipo: "Consignação",
      destinatarios: nomesGalerias,
      catalogo: catalogoSelecionado.titulo,
      catalogoId: catalogoSelecionado.id,
      data: agora.toLocaleDateString("pt-BR"),
      hora: agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      qtd: galeriasSelecionadas.size,
    });
    setCatalogoEnviado(catalogoSelecionado.titulo);
    setQtdGaleriasEnviadas(galeriasSelecionadas.size);
    setEnviado(true);
    setModalCatalogoAberto(false);
    setGaleriasSelecionadas(new Set());
    toast({
      title: "Catálogo enviado com sucesso!",
      description: "O registro está disponível na sua Caixa de Entrada.",
    });
  }

  const todasSelected = galeriasSelecionadas.size === galerias.length;

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <p className="text-sm text-muted-foreground" data-testid="text-consignacao-desc">
          Diretório de galerias que aceitam acervo consignado. Selecione as galerias e envie seu catálogo.
        </p>

        {enviado && catalogoEnviado && (
          <div className="rounded-md p-3 flex items-center gap-2" style={{ backgroundColor: "rgba(34, 197, 94, 0.08)", border: "1px solid rgba(34, 197, 94, 0.2)" }} data-testid="alert-consignacao-enviada">
            <Check className="h-4 w-4 flex-shrink-0" style={{ color: "#16a34a" }} />
            <span className="text-xs" style={{ color: "#16a34a" }}>
              Catálogo "{catalogoEnviado}" enviado com sucesso para {qtdGaleriasEnviadas} {qtdGaleriasEnviadas === 1 ? "galeria" : "galerias"}!
            </span>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-foreground">Selecione as Galerias</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={selecionarTodas}
              data-testid="button-selecionar-todas-galerias"
            >
              <Check className="mr-1.5 h-3 w-3" />
              {todasSelected ? "Desmarcar Todas" : "Selecionar Todas"}
            </Button>
          </div>

          {galerias.map((g) => {
            const sel = galeriasSelecionadas.has(g.id);
            return (
              <Card
                key={g.id}
                className={`p-5 cursor-pointer ${sel ? "ring-2 ring-primary" : ""}`}
                onClick={() => toggleGaleria(g.id)}
                data-testid={`card-consignacao-${g.id}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`h-5 w-5 rounded-sm border flex items-center justify-center flex-shrink-0 mt-0.5 ${sel ? "bg-primary border-primary" : "border-border"}`}>
                    {sel && <Check className="h-3 w-3 text-primary-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
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
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Separator />

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground" data-testid="text-enviar-consignacao-titulo">
            Enviar para Consignação
          </h3>
          <p className="text-xs text-muted-foreground">
            Selecione as galerias acima e envie um catálogo do seu acervo para avaliação.
          </p>

          <Button
            disabled={galeriasSelecionadas.size === 0}
            onClick={handleAbrirModalCatalogo}
            data-testid="button-enviar-catalogo-consignacao"
          >
            <Send className="mr-2 h-4 w-4" />
            Enviar Catálogo
            {galeriasSelecionadas.size > 0 && ` (${galeriasSelecionadas.size} ${galeriasSelecionadas.size === 1 ? "galeria" : "galerias"})`}
          </Button>
        </div>
      </div>

      {modalCatalogoAberto && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" data-testid="modal-selecao-catalogo-consignacao">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-5">
            <div className="space-y-1">
              <h2 className="text-base font-semibold text-foreground">Selecione um Catálogo</h2>
              <p className="text-xs text-muted-foreground">
                Escolha o catálogo que será enviado para {galeriasSelecionadas.size} {galeriasSelecionadas.size === 1 ? "galeria selecionada" : "galerias selecionadas"}.
              </p>
            </div>

            {catalogos.length === 0 ? (
              <div className="rounded-md p-4 text-center" style={{ backgroundColor: "rgba(212, 168, 67, 0.06)", border: "1px solid rgba(212, 168, 67, 0.2)" }}>
                <p className="text-xs text-muted-foreground">Nenhum catálogo criado ainda. Crie um catálogo na aba Catálogo antes de enviar.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {catalogos.map((cat) => {
                  const sel = catalogoSelecionado?.id === cat.id;
                  return (
                    <Card
                      key={cat.id}
                      className={`p-3 flex items-center gap-3 cursor-pointer ${sel ? "ring-2 ring-primary" : ""}`}
                      onClick={() => setCatalogoSelecionado(cat)}
                      data-testid={`card-catalogo-consignacao-${cat.id}`}
                    >
                      <div className={`h-5 w-5 rounded-full border flex items-center justify-center flex-shrink-0 ${sel ? "bg-primary border-primary" : "border-border"}`}>
                        {sel && <Check className="h-3 w-3 text-primary-foreground" />}
                      </div>
                      <img
                        src={cat.capa}
                        alt={cat.titulo}
                        className="h-14 w-10 object-cover rounded-sm flex-shrink-0 border border-border"
                        data-testid={`img-capa-catalogo-consignacao-${cat.id}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{cat.titulo}</p>
                        <p className="text-xs text-muted-foreground truncate">{cat.descricao}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{cat.obras.length} {cat.obras.length === 1 ? "obra" : "obras"} — {cat.dataCriacao}</p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}

            {catalogoSelecionado && (
              <div className="space-y-3">
                <Separator />

                <div className="rounded-md p-4 space-y-3" style={{ backgroundColor: "rgba(212, 168, 67, 0.04)", border: "1px solid rgba(212, 168, 67, 0.2)" }} data-testid="container-termos-consignacao">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#D4A843" }} />
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-foreground">Termos de Responsabilidade</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        A negociação será feita diretamente entre as partes. O Art Flow não se responsabiliza pelo envio físico, venda, logística ou repasse monetário.
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-2 cursor-pointer pt-1"
                    onClick={() => setTermosAceitos(!termosAceitos)}
                    data-testid="checkbox-aceitar-termos-consignacao"
                  >
                    <div className={`h-4 w-4 rounded-sm border flex items-center justify-center flex-shrink-0 ${termosAceitos ? "bg-primary border-primary" : "border-border"}`}>
                      {termosAceitos && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
                    </div>
                    <span className="text-xs text-foreground">Li e aceito os termos de responsabilidade</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setModalCatalogoAberto(false)} data-testid="button-cancelar-modal-consignacao">
                Cancelar
              </Button>
              <Button
                disabled={!catalogoSelecionado || !termosAceitos}
                onClick={handleConfirmarEnvio}
                data-testid="button-confirmar-envio-consignacao"
              >
                <Send className="mr-2 h-4 w-4" />
                Confirmar Envio
              </Button>
            </div>
          </Card>
        </div>
      )}
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

function carregarAvaliacao(): { artista: string; obra: string; status: string; data: string } | null {
  try {
    const raw = localStorage.getItem("artflow_avaliacao_pendente");
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function salvarAvaliacao(av: { artista: string; obra: string; status: string; data: string }) {
  localStorage.setItem("artflow_avaliacao_pendente", JSON.stringify(av));
}

function limparAvaliacao() {
  localStorage.removeItem("artflow_avaliacao_pendente");
}

export function AvaliacaoPage() {
  const [nomeArtista, setNomeArtista] = useState("");
  const [nomeObra, setNomeObra] = useState("");
  const [pendente, setPendente] = useState(carregarAvaliacao);
  const [enviada, setEnviada] = useState(false);

  function handleSolicitar() {
    if (!nomeArtista.trim()) return;
    const nova = {
      artista: nomeArtista.trim(),
      obra: nomeObra.trim() || "(não especificada)",
      status: "pendente",
      data: new Date().toLocaleDateString("pt-BR"),
    };
    salvarAvaliacao(nova);
    setPendente(nova);
    setEnviada(true);
    setNomeArtista("");
    setNomeObra("");
  }

  function handleCancelar() {
    limparAvaliacao();
    setPendente(null);
    setEnviada(false);
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <p className="text-sm text-muted-foreground" data-testid="text-avaliacao-desc">
          Solicite uma avaliação de mercado para obras de arte. Nossa equipe de especialistas analisará leilões recentes e enviará o resultado na Caixa de Entrada.
        </p>

        {pendente ? (
          <div className="space-y-4">
            <Card className="p-5 space-y-4" data-testid="card-avaliacao-pendente">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" style={{ color: "#D4A843" }} />
                <span className="text-sm font-medium text-foreground">Solicitação em Andamento</span>
              </div>

              <div className="rounded-md bg-muted/50 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-24">Artista:</span>
                  <span className="text-sm font-medium text-foreground" data-testid="text-avaliacao-artista">{pendente.artista}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-24">Obra:</span>
                  <span className="text-sm text-foreground" data-testid="text-avaliacao-obra">{pendente.obra}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-24">Data:</span>
                  <span className="text-sm text-muted-foreground">{pendente.data}</span>
                </div>
              </div>

              <div className="rounded-md p-3" style={{ backgroundColor: "rgba(212, 168, 67, 0.06)", border: "1px solid rgba(212, 168, 67, 0.2)" }}>
                <p className="text-xs text-muted-foreground" data-testid="text-avaliacao-mensagem">
                  Sua avaliação chegará em 24h na Caixa de Entrada por nossa equipe de especialistas.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Novas solicitações bloqueadas até que a atual seja respondida (1 por vez).</span>
              </div>

              <Button variant="ghost" size="sm" onClick={handleCancelar} data-testid="button-cancelar-avaliacao">
                Cancelar Solicitação
              </Button>
            </Card>

            <Separator />

            <Card className="p-5 space-y-3" data-testid="card-pacotes-estrelas">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" style={{ color: "#D4A843" }} />
                <span className="text-sm font-medium text-foreground">Pacotes de Estrelas</span>
                <Badge
                  className="no-default-hover-elevate no-default-active-elevate text-[10px]"
                  style={{ backgroundColor: "rgba(212, 168, 67, 0.1)", color: "#D4A843", borderColor: "rgba(212, 168, 67, 0.3)" }}
                >
                  Em Desenvolvimento
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Em breve você poderá adquirir pacotes de estrelas para solicitar múltiplas avaliações simultaneamente, sem precisar aguardar a resposta da anterior.
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { estrelas: 3, preco: "R$ 29,90" },
                  { estrelas: 5, preco: "R$ 44,90" },
                  { estrelas: 10, preco: "R$ 79,90" },
                ].map((p) => (
                  <div
                    key={p.estrelas}
                    className="rounded-md p-3 text-center opacity-60"
                    style={{ backgroundColor: "rgba(212, 168, 67, 0.06)", border: "1px solid rgba(212, 168, 67, 0.15)" }}
                    data-testid={`card-pacote-${p.estrelas}`}
                  >
                    <div className="flex items-center justify-center gap-0.5 mb-1">
                      {Array.from({ length: Math.min(p.estrelas, 5) }).map((_, i) => (
                        <Star key={i} className="h-3 w-3" style={{ color: "#D4A843", fill: "#D4A843" }} />
                      ))}
                    </div>
                    <p className="text-xs font-medium text-foreground">{p.estrelas} avaliações</p>
                    <p className="text-[10px] text-muted-foreground">{p.preco}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ) : (
          <Card className="p-5 space-y-5" data-testid="card-formulario-avaliacao">
            {enviada && (
              <div className="rounded-md p-3 flex items-center gap-2" style={{ backgroundColor: "rgba(34, 197, 94, 0.08)", border: "1px solid rgba(34, 197, 94, 0.2)" }}>
                <Check className="h-4 w-4 flex-shrink-0" style={{ color: "#16a34a" }} />
                <span className="text-xs" style={{ color: "#16a34a" }}>Solicitação enviada com sucesso!</span>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="nome-artista-avaliacao">Nome do Artista *</Label>
              <Input
                id="nome-artista-avaliacao"
                placeholder="Ex: Camille Pissarro"
                value={nomeArtista}
                onChange={(e) => setNomeArtista(e.target.value)}
                data-testid="input-artista-avaliacao"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="nome-obra-avaliacao">Nome da Obra (opcional)</Label>
              <Input
                id="nome-obra-avaliacao"
                placeholder="Ex: Colheita das Maçãs"
                value={nomeObra}
                onChange={(e) => setNomeObra(e.target.value)}
                data-testid="input-obra-avaliacao"
              />
            </div>

            <div className="rounded-md p-3" style={{ backgroundColor: "rgba(212, 168, 67, 0.06)", border: "1px solid rgba(212, 168, 67, 0.2)" }}>
              <p className="text-xs text-muted-foreground">
                Sua avaliação chegará em 24h na Caixa de Entrada por nossa equipe de especialistas.
              </p>
            </div>

            <Button
              onClick={handleSolicitar}
              disabled={!nomeArtista.trim()}
              data-testid="button-solicitar-avaliacao"
            >
              <Send className="mr-2 h-4 w-4" />
              Solicitar Avaliação
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}

const leiloesAtivos = [
  {
    id: 1,
    titulo: "Leilão de Arte Moderna e Contemporânea",
    leiloeiro: "Bolsa de Arte",
    local: "São Paulo, SP",
    data: "25 a 27 de março de 2026",
    captacao: "Aberta até 10 de março",
    categorias: ["Pintura", "Escultura", "Gravura"],
  },
  {
    id: 2,
    titulo: "Latin American Art Auction",
    leiloeiro: "Christie's",
    local: "Nova York, EUA",
    data: "15 de maio de 2026",
    captacao: "Aberta até 20 de abril",
    categorias: ["Pintura", "Desenho"],
  },
  {
    id: 3,
    titulo: "Leilão de Arte Brasileira",
    leiloeiro: "Escritório de Arte",
    local: "Rio de Janeiro, RJ",
    data: "8 de abril de 2026",
    captacao: "Aberta até 15 de março",
    categorias: ["Pintura", "Fotografia", "Gravura"],
  },
  {
    id: 4,
    titulo: "Impressionist & Modern Art",
    leiloeiro: "Sotheby's",
    local: "Londres, UK",
    data: "20 de junho de 2026",
    captacao: "Aberta até 30 de abril",
    categorias: ["Pintura", "Óleo sobre tela"],
  },
];

interface CatalogoItemLeilao {
  id: string;
  titulo: string;
  descricao: string;
  capa: string;
  obras: Obra[];
  dataCriacao: string;
}

interface EnvioRegistro {
  id: string;
  tipo: "Leilão" | "Consignação";
  destinatarios: string[];
  catalogo: string;
  catalogoId: string;
  data: string;
  hora: string;
  qtd: number;
}

function carregarEnvios(): EnvioRegistro[] {
  try {
    const raw = localStorage.getItem("artflow_envios_realizados");
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function salvarEnvio(envio: EnvioRegistro) {
  const envios = carregarEnvios();
  envios.unshift(envio);
  localStorage.setItem("artflow_envios_realizados", JSON.stringify(envios));
}

export function LeiloesPage({ catalogos }: { catalogos: CatalogoItemLeilao[] }) {
  const [leiloesSelecionados, setLeiloesSelecionados] = useState<Set<number>>(new Set());
  const [modalCatalogoAberto, setModalCatalogoAberto] = useState(false);
  const [catalogoSelecionado, setCatalogoSelecionado] = useState<CatalogoItemLeilao | null>(null);
  const [termosAceitos, setTermosAceitos] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [catalogoEnviado, setCatalogoEnviado] = useState<string | null>(null);
  const [qtdLeiloesEnviados, setQtdLeiloesEnviados] = useState(0);
  const { toast } = useToast();

  function toggleLeilao(id: number) {
    setLeiloesSelecionados((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selecionarTodos() {
    if (leiloesSelecionados.size === leiloesAtivos.length) {
      setLeiloesSelecionados(new Set());
    } else {
      setLeiloesSelecionados(new Set(leiloesAtivos.map((l) => l.id)));
    }
  }

  function handleAbrirModalCatalogo() {
    setCatalogoSelecionado(null);
    setTermosAceitos(false);
    setModalCatalogoAberto(true);
  }

  function handleConfirmarEnvio() {
    if (!catalogoSelecionado || !termosAceitos) return;
    const nomesLeiloes = leiloesAtivos
      .filter((l) => leiloesSelecionados.has(l.id))
      .map((l) => l.leiloeiro);
    const agora = new Date();
    salvarEnvio({
      id: `envio-leilao-${Date.now()}`,
      tipo: "Leilão",
      destinatarios: nomesLeiloes,
      catalogo: catalogoSelecionado.titulo,
      catalogoId: catalogoSelecionado.id,
      data: agora.toLocaleDateString("pt-BR"),
      hora: agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      qtd: leiloesSelecionados.size,
    });
    setCatalogoEnviado(catalogoSelecionado.titulo);
    setQtdLeiloesEnviados(leiloesSelecionados.size);
    setEnviado(true);
    setModalCatalogoAberto(false);
    setLeiloesSelecionados(new Set());
    toast({
      title: "Catálogo enviado com sucesso!",
      description: "O registro está disponível na sua Caixa de Entrada.",
    });
  }

  const todosSelected = leiloesSelecionados.size === leiloesAtivos.length;

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <p className="text-sm text-muted-foreground" data-testid="text-leiloes-desc">
          Leilões ativos captando acervo. Selecione os leilões de interesse e envie seu catálogo para captação.
        </p>

        {enviado && catalogoEnviado && (
          <div className="rounded-md p-3 flex items-center gap-2" style={{ backgroundColor: "rgba(34, 197, 94, 0.08)", border: "1px solid rgba(34, 197, 94, 0.2)" }} data-testid="alert-captacao-enviada">
            <Check className="h-4 w-4 flex-shrink-0" style={{ color: "#16a34a" }} />
            <span className="text-xs" style={{ color: "#16a34a" }}>
              Catálogo "{catalogoEnviado}" enviado com sucesso para {qtdLeiloesEnviados} {qtdLeiloesEnviados === 1 ? "leilão" : "leilões"}!
            </span>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-foreground">Selecione os Leilões</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={selecionarTodos}
              data-testid="button-selecionar-todos-leiloes"
            >
              <Check className="mr-1.5 h-3 w-3" />
              {todosSelected ? "Desmarcar Todos" : "Selecionar Todos"}
            </Button>
          </div>

          {leiloesAtivos.map((l) => {
            const sel = leiloesSelecionados.has(l.id);
            return (
              <Card
                key={l.id}
                className={`p-5 cursor-pointer ${sel ? "ring-2 ring-primary" : ""}`}
                onClick={() => toggleLeilao(l.id)}
                data-testid={`card-leilao-${l.id}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`h-5 w-5 rounded-sm border flex items-center justify-center flex-shrink-0 mt-0.5 ${sel ? "bg-primary border-primary" : "border-border"}`}>
                    {sel && <Check className="h-3 w-3 text-primary-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="space-y-1.5 min-w-0">
                        <h3 className="text-sm font-semibold text-foreground">{l.titulo}</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <Gavel className="h-3 w-3 flex-shrink-0" />
                          {l.leiloeiro} — {l.local}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <Calendar className="h-3 w-3 flex-shrink-0" />
                          {l.data}
                        </p>
                        <div className="flex items-center gap-1.5 flex-wrap mt-1">
                          {l.categorias.map((c) => (
                            <Badge key={c} variant="secondary" className="text-[10px]">{c}</Badge>
                          ))}
                        </div>
                      </div>
                      <Badge
                        className="no-default-hover-elevate no-default-active-elevate text-[10px]"
                        style={{ backgroundColor: "rgba(34, 197, 94, 0.1)", color: "#16a34a", borderColor: "rgba(34, 197, 94, 0.3)" }}
                      >
                        {l.captacao}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Separator />

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground" data-testid="text-enviar-captacao-titulo">
            Enviar para Captação
          </h3>
          <p className="text-xs text-muted-foreground">
            Selecione os leilões acima e envie um catálogo do seu acervo para avaliação dos leiloeiros.
          </p>

          <Button
            disabled={leiloesSelecionados.size === 0}
            onClick={handleAbrirModalCatalogo}
            data-testid="button-enviar-catalogo-captacao"
          >
            <Send className="mr-2 h-4 w-4" />
            Enviar Catálogo para Captação
            {leiloesSelecionados.size > 0 && ` (${leiloesSelecionados.size} ${leiloesSelecionados.size === 1 ? "leilão" : "leilões"})`}
          </Button>
        </div>
      </div>

      {modalCatalogoAberto && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" data-testid="modal-selecao-catalogo">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-5">
            <div className="space-y-1">
              <h2 className="text-base font-semibold text-foreground">Selecione um Catálogo</h2>
              <p className="text-xs text-muted-foreground">
                Escolha o catálogo que será enviado para {leiloesSelecionados.size} {leiloesSelecionados.size === 1 ? "leilão selecionado" : "leilões selecionados"}.
              </p>
            </div>

            {catalogos.length === 0 ? (
              <div className="rounded-md p-4 text-center" style={{ backgroundColor: "rgba(212, 168, 67, 0.06)", border: "1px solid rgba(212, 168, 67, 0.2)" }}>
                <p className="text-xs text-muted-foreground">Nenhum catálogo criado ainda. Crie um catálogo na aba Catálogo antes de enviar.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {catalogos.map((cat) => {
                  const sel = catalogoSelecionado?.id === cat.id;
                  return (
                    <Card
                      key={cat.id}
                      className={`p-3 flex items-center gap-3 cursor-pointer ${sel ? "ring-2 ring-primary" : ""}`}
                      onClick={() => setCatalogoSelecionado(cat)}
                      data-testid={`card-catalogo-leilao-${cat.id}`}
                    >
                      <div className={`h-5 w-5 rounded-full border flex items-center justify-center flex-shrink-0 ${sel ? "bg-primary border-primary" : "border-border"}`}>
                        {sel && <Check className="h-3 w-3 text-primary-foreground" />}
                      </div>
                      <img
                        src={cat.capa}
                        alt={cat.titulo}
                        className="h-14 w-10 object-cover rounded-sm flex-shrink-0 border border-border"
                        data-testid={`img-capa-catalogo-${cat.id}`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{cat.titulo}</p>
                        <p className="text-xs text-muted-foreground truncate">{cat.descricao}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{cat.obras.length} {cat.obras.length === 1 ? "obra" : "obras"} — {cat.dataCriacao}</p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}

            {catalogoSelecionado && (
              <div className="space-y-3">
                <Separator />

                <div className="rounded-md p-4 space-y-3" style={{ backgroundColor: "rgba(212, 168, 67, 0.04)", border: "1px solid rgba(212, 168, 67, 0.2)" }} data-testid="container-termos-responsabilidade">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "#D4A843" }} />
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-foreground">Termos de Responsabilidade</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Cada leilão selecionado será responsável por avaliar e estimar o preço das obras.
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        A negociação será feita diretamente entre as partes. O Art Flow não se responsabiliza pelo envio físico, venda, logística ou repasse monetário das obras.
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-2 cursor-pointer pt-1"
                    onClick={() => setTermosAceitos(!termosAceitos)}
                    data-testid="checkbox-aceitar-termos"
                  >
                    <div className={`h-4 w-4 rounded-sm border flex items-center justify-center flex-shrink-0 ${termosAceitos ? "bg-primary border-primary" : "border-border"}`}>
                      {termosAceitos && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
                    </div>
                    <span className="text-xs text-foreground">Li e aceito os termos de responsabilidade</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setModalCatalogoAberto(false)} data-testid="button-cancelar-modal-catalogo">
                Cancelar
              </Button>
              <Button
                disabled={!catalogoSelecionado || !termosAceitos}
                onClick={handleConfirmarEnvio}
                data-testid="button-confirmar-envio-catalogo"
              >
                <Send className="mr-2 h-4 w-4" />
                Confirmar Envio
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

const mensagensBase = [
  {
    id: 1,
    remetente: "Angela Marques",
    tipo: "Colecionador",
    assunto: "Interesse na obra 'Colheita das Maçãs'",
    preview: "Bom dia! Vi sua obra na exposição e gostaria de saber sobre disponibilidade...",
    data: "Hoje",
    lida: false,
    isRelatorio: false,
  },
  {
    id: 2,
    remetente: "Galeria Graphitte",
    tipo: "Galeria",
    assunto: "Proposta de consignação — 3 obras",
    preview: "Gostaríamos de incluir suas obras na próxima exposição coletiva...",
    data: "Ontem",
    lida: true,
    isRelatorio: false,
  },
  {
    id: 3,
    remetente: "João Vicente",
    tipo: "Colecionador",
    assunto: "Encomenda de obra personalizada",
    preview: "Tenho interesse em uma paisagem rural no estilo da série Pontoise...",
    data: "12 fev",
    lida: true,
    isRelatorio: false,
  },
];

const artistasValidados: Record<string, string> = {
  "camille pissarro": "R$ 42.500,00",
  "ernst ludwig kirchner": "R$ 68.000,00",
  "mary cassatt": "R$ 55.000,00",
  "claude monet": "R$ 120.000,00",
  "pablo picasso": "R$ 250.000,00",
};

function RelatorioAvaliacao({ artista, obra }: { artista: string; obra: string }) {
  const chave = artista.toLowerCase();
  const validado = artistasValidados[chave];

  function handleImprimir() {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Relatório de Avaliação — Art Flow</title>
        <style>
          @media print { @page { size: A4; margin: 20mm; } }
          body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 40px 20px; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #D4A843; padding-bottom: 15px; }
          .header h1 { font-size: 14px; letter-spacing: 3px; color: #D4A843; margin: 0 0 8px; }
          .selo { display: inline-flex; align-items: center; gap: 6px; padding: 6px 16px; border-radius: 99px; border: 2px solid #D4A843; background: rgba(212,168,67,0.05); margin-top: 10px; }
          .selo span { font-size: 11px; font-weight: 600; letter-spacing: 2px; color: #D4A843; }
          .content { margin: 20px 0; }
          .field { padding: 12px 0; border-bottom: 1px solid #eee; display: flex; }
          .field-label { font-weight: 600; color: #555; width: 140px; font-size: 13px; }
          .field-value { font-size: 13px; }
          .resultado { margin: 24px 0; padding: 20px; border-radius: 8px; }
          .resultado.validado { background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.2); }
          .resultado.nao-validado { background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.2); }
          .resultado h3 { font-size: 14px; margin: 0 0 8px; }
          .resultado p { font-size: 12px; color: #555; margin: 0; }
          .preco { font-size: 22px; font-weight: 600; color: #16a34a; margin: 8px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>ART FLOW — RELATÓRIO DE AVALIAÇÃO</h1>
          <div class="selo"><span>ART FLOW VERIFIED</span></div>
        </div>
        <div class="content">
          <div class="field"><span class="field-label">Artista</span><span class="field-value">${artista}</span></div>
          <div class="field"><span class="field-label">Obra</span><span class="field-value">${obra}</span></div>
          <div class="field"><span class="field-label">Data</span><span class="field-value">${new Date().toLocaleDateString("pt-BR")}</span></div>
        </div>
        ${validado ? `
          <div class="resultado validado">
            <h3>Artista Validado no Mercado Secundário</h3>
            <p>Preço estimado baseado em leilões recentes:</p>
            <div class="preco">${validado}</div>
          </div>
        ` : `
          <div class="resultado nao-validado">
            <h3>Artista Não Validado no Mercado Secundário</h3>
            <p>O artista solicitado nunca teve suas obras revendidas em leilões públicos. Isso não diminui o valor artístico da obra, mas indica que ainda não há um histórico de mercado secundário para referência de preço.</p>
          </div>
        `}
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 400);
  }

  return (
    <div className="space-y-4" data-testid="relatorio-avaliacao">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
            style={{ border: "2px solid #D4A843", backgroundColor: "rgba(212, 168, 67, 0.05)" }}
            data-testid="selo-art-flow-verified"
          >
            <ShieldCheck className="h-3.5 w-3.5" style={{ color: "#D4A843" }} />
            <span className="text-[10px] font-semibold tracking-wider" style={{ color: "#D4A843" }}>
              ART FLOW VERIFIED
            </span>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleImprimir} data-testid="button-imprimir-relatorio">
          <Printer className="mr-1.5 h-3.5 w-3.5" />
          Imprimir
        </Button>
      </div>

      <div className="rounded-md bg-muted/50 p-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-20">Artista:</span>
          <span className="text-sm font-medium text-foreground">{artista}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-20">Obra:</span>
          <span className="text-sm text-foreground">{obra}</span>
        </div>
      </div>

      {validado ? (
        <div
          className="rounded-md p-4 space-y-2"
          style={{ backgroundColor: "rgba(34, 197, 94, 0.06)", border: "1px solid rgba(34, 197, 94, 0.2)" }}
          data-testid="resultado-validado"
        >
          <p className="text-sm font-medium text-foreground">Artista Validado no Mercado Secundário</p>
          <p className="text-xs text-muted-foreground">Preço estimado baseado em leilões recentes:</p>
          <p className="text-xl font-semibold" style={{ color: "#16a34a" }} data-testid="text-preco-estimado">{validado}</p>
        </div>
      ) : (
        <div
          className="rounded-md p-4 space-y-3"
          style={{ backgroundColor: "rgba(239, 68, 68, 0.04)", border: "1px solid rgba(239, 68, 68, 0.15)" }}
          data-testid="resultado-nao-validado"
        >
          <p className="text-sm font-medium text-foreground">Artista não validado no mercado secundário</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Isso significa que o artista solicitado nunca teve suas obras revendidas em leilões públicos. Isso não diminui o valor artístico da obra, mas indica que ainda não há um histórico de mercado secundário para referência de preço.
          </p>
          <Button variant="outline" size="sm" data-testid="button-inserir-leilao">
            <Gavel className="mr-1.5 h-3.5 w-3.5" />
            Deseja inserir suas obras em um leilão público?
          </Button>
        </div>
      )}
    </div>
  );
}

export function CaixaEntradaPage({ onVisualizarCatalogo }: { onVisualizarCatalogo?: (catalogoId: string) => void }) {
  const [expandido, setExpandido] = useState<number | null>(null);
  const avaliacao = carregarAvaliacao();
  const envios = carregarEnvios();

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <p className="text-sm text-muted-foreground" data-testid="text-caixa-desc">
          Central de mensagens e registro de envios realizados.
        </p>

        {envios.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground" data-testid="text-envios-realizados-titulo">
              Envios Realizados
            </h3>
            <div className="space-y-2">
              {envios.map((envio, idx) => (
                <Card key={envio.id} className="p-4" data-testid={`card-envio-${idx}`}>
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="min-w-0 space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant="secondary"
                          className="text-[10px]"
                          style={envio.tipo === "Leilão"
                            ? { backgroundColor: "rgba(212, 168, 67, 0.1)", color: "#D4A843", borderColor: "rgba(212, 168, 67, 0.3)" }
                            : { backgroundColor: "rgba(99, 102, 241, 0.1)", color: "#6366f1", borderColor: "rgba(99, 102, 241, 0.3)" }
                          }
                          data-testid={`badge-tipo-envio-${idx}`}
                        >
                          {envio.tipo === "Leilão" ? <Gavel className="mr-1 h-3 w-3" /> : <Tag className="mr-1 h-3 w-3" />}
                          {envio.tipo === "Leilão" ? "Envio para Leilão" : "Envio para Consignação"}
                        </Badge>
                        <Badge
                          className="no-default-hover-elevate no-default-active-elevate text-[10px]"
                          style={{ backgroundColor: "rgba(34, 197, 94, 0.1)", color: "#16a34a", borderColor: "rgba(34, 197, 94, 0.3)" }}
                          data-testid={`badge-status-envio-${idx}`}
                        >
                          <Check className="mr-1 h-2.5 w-2.5" />
                          Enviado
                        </Badge>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-muted-foreground w-20">Destinatário:</span>
                          <span className="text-xs text-foreground" data-testid={`text-destinatario-envio-${idx}`}>
                            {envio.destinatarios.join(", ")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-muted-foreground w-20">Catálogo:</span>
                          <span className="text-xs font-medium text-foreground" data-testid={`text-catalogo-envio-${idx}`}>
                            {envio.catalogo}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-muted-foreground w-20">Data:</span>
                          <span className="text-xs text-muted-foreground" data-testid={`text-data-envio-${idx}`}>
                            {envio.data} às {envio.hora}
                          </span>
                        </div>
                      </div>
                    </div>

                    {onVisualizarCatalogo && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onVisualizarCatalogo(envio.catalogoId)}
                        data-testid={`button-visualizar-detalhes-${idx}`}
                      >
                        <Eye className="mr-1.5 h-3 w-3" />
                        Visualizar Detalhes
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {(envios.length > 0 && (mensagensBase.length > 0 || avaliacao)) && <Separator />}

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground" data-testid="text-mensagens-titulo">
            Mensagens
          </h3>
          <div className="space-y-2">
            {avaliacao && (
              <div>
                <Card
                  className={`p-4 hover-elevate cursor-pointer ${expandido === 100 ? "ring-1 ring-primary/30" : ""}`}
                  style={{ borderLeft: "3px solid #D4A843" }}
                  onClick={() => setExpandido(expandido === 100 ? null : 100)}
                  data-testid="card-mensagem-100"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-foreground">
                          Art Flow — Equipe de Avaliação
                        </span>
                        <Badge
                          variant="secondary"
                          className="text-[10px]"
                          style={{ backgroundColor: "rgba(212, 168, 67, 0.1)", color: "#D4A843", borderColor: "rgba(212, 168, 67, 0.3)" }}
                        >
                          Avaliação
                        </Badge>
                        <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: "#D4A843" }} />
                      </div>
                      <p className="text-xs font-medium text-foreground">
                        Relatório de Avaliação: {avaliacao.artista}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        Resultado da avaliação solicitada para {avaliacao.artista}{avaliacao.obra !== "(não especificada)" ? ` — ${avaliacao.obra}` : ""}
                      </p>
                    </div>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap flex-shrink-0">Hoje</span>
                  </div>
                </Card>

                {expandido === 100 && (
                  <div className="mt-2 ml-3 mr-3 mb-4" data-testid="container-relatorio-expandido">
                    <Card className="p-5">
                      <RelatorioAvaliacao artista={avaliacao.artista} obra={avaliacao.obra} />
                    </Card>
                  </div>
                )}
              </div>
            )}

            {mensagensBase.map((m) => (
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
                      <Badge variant="secondary" className="text-[10px]">
                        {m.tipo}
                      </Badge>
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
      </div>
    </div>
  );
}
