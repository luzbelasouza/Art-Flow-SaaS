import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Image,
  Award,
  Settings,
  LogOut,
  Plus,
  Upload,
  Pencil,
  User,
  Calendar,
  MapPin,
  Layers,
  Printer,
  Navigation,
  Users,
  BarChart3,
  FileText,
  ShieldCheck,
  Map,
  Search,
  Eye,
  UserCog,
  AlertCircle,
  BookOpen,
  CheckSquare,
  Square,
  Check,
  Lock,
  Crown,
  Sparkles,
  Star,
  Building2,
  Palette,
  Tag,
  Globe,
  ShoppingBag,
  MessageSquare,
  Zap,
  HandHeart,
  Gavel,
  Archive,
  Megaphone,
  GraduationCap,
  Store,
  Video,
  HelpCircle,
} from "lucide-react";
import confetti from "canvas-confetti";

import colheitaImg from "@assets/colheita_1771198582489.png";
import camponesasImg from "@assets/camponesas_1771198582484.png";
import respigadoresImg from "@assets/respigadores_1771198582490.png";
import pissarroImg from "@assets/pissarro_1771198589992.png";

import kirchnerImg from "@assets/1-Kirchner_1771200555851.png";
import girlImg from "@assets/2-Girl_1771200555854.png";
import dancersImg from "@assets/3-Dancers_1771200555855.png";
import vistaImg from "@assets/4-Vista_1771200555856.png";
import cassattImg from "@assets/5-Cassat__1771200555857.png";
import chestnutImg from "@assets/6-chestnut__1771200555857.png";
import portraitImg from "@assets/7-portrait__1771200555858.png";

import Placeholder from "@/pages/placeholder";
import Bio from "@/pages/bio";
import MapaObra, { type RegistroMapa } from "@/pages/mapa-obra";
import Exposicoes, { exposicoesIniciais, type Exposicao } from "@/pages/exposicoes";
import Vendas from "@/pages/vendas";
import RepresentacaoPage, { representacoesIniciais, type Representacao } from "@/pages/representacao";
import Contatos from "@/pages/contatos";
import Localizacao, { locaisIniciais, type Local } from "@/pages/localizacao";
import Producao, { tiragensIniciais, type Tiragem } from "@/pages/producao";
import EmprestimoDoacaoPage, { type Registro as RegistroEmprestimo } from "@/pages/emprestimo-doacao";
import LeiloesPublicosAcervo, { type RegistroLeilao } from "@/pages/leiloes-acervo";
import Colecoes from "@/pages/colecoes";
import Documentos from "@/pages/documentos";
import Certificado from "@/pages/certificado";
import PerfilEmissor, { carregarDadosEmissor, formatarLinhaEmissor } from "@/pages/perfil-emissor";
import CatalogoPage, { CatalogoDocumento, type CatalogoItem } from "@/pages/catalogo";
import {
  OportunidadesUpsell,
  ExpoPage,
  OcupacaoPage,
  EditalPage,
  ConsignacaoPage,
  FeirasPage,
  AvaliacaoPage,
  LeiloesPage,
  CaixaEntradaPage,
} from "@/pages/oportunidades";
import capaCatalogoImg from "@assets/capa-catalogo_1771213791212.png";

const colecoesObras: Record<number, string> = {
  2: "Vida no Campo: A Série de Pontoise",
  3: "Vida no Campo: A Série de Pontoise",
};

const perfilLabels: Record<string, string> = {
  artista: "Artista",
  colecionador: "Colecionador",
  galeria: "Galeria",
};

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

interface Artista {
  id: string;
  nome: string;
  anos: string;
  foto: string;
  iniciais: string;
}

const artistasPissarro: Artista[] = [
  { id: "pissarro", nome: "Camille Pissarro", anos: "1830–1903", foto: pissarroImg, iniciais: "CP" },
];

const obrasPissarro: Obra[] = [
  { id: 1, inventarioId: "ID-M001", titulo: "Colheita das Maçãs", artistaId: "pissarro", tecnica: "Óleo sobre tela", ano: 1888, dimensoes: "73,4 x 60,1 cm", imagem: colheitaImg },
  { id: 2, inventarioId: "ID-M002", titulo: "Jovens Camponesas Descansando", artistaId: "pissarro", tecnica: "Óleo sobre tela", ano: 1882, dimensoes: "81,0 x 65,1 cm", imagem: camponesasImg },
  { id: 3, inventarioId: "ID-M003", titulo: "Os Respigadores", artistaId: "pissarro", tecnica: "Óleo sobre tela", ano: 1889, dimensoes: "65,4 x 81,3 cm", imagem: respigadoresImg },
];

const artistasColecionador: Artista[] = [
  { id: "kirchner", nome: "Ernst Ludwig Kirchner", anos: "1880–1938", foto: kirchnerImg, iniciais: "EK" },
  { id: "cassatt", nome: "Mary Cassatt", anos: "1844–1926", foto: cassattImg, iniciais: "MC" },
];

const obrasColecionador: Obra[] = [
  { id: 10, inventarioId: "ID-M010", titulo: "Reclining Girl in White", artistaId: "kirchner", tecnica: "Óleo sobre tela", ano: 1909, dimensoes: "84,0 x 95,5 cm", imagem: girlImg },
  { id: 11, inventarioId: "ID-M011", titulo: "Dancers in Old-Frankfurt", artistaId: "kirchner", tecnica: "Óleo sobre tela", ano: 1904, dimensoes: "91,5 x 68,0 cm", imagem: dancersImg },
  { id: 12, inventarioId: "ID-M012", titulo: "View of Dresden", artistaId: "kirchner", tecnica: "Óleo sobre tela", ano: 1910, dimensoes: "70,0 x 80,0 cm", imagem: vistaImg },
  { id: 20, inventarioId: "ID-M020", titulo: "Under the Horse-Chestnut Tree", artistaId: "cassatt", tecnica: "Óleo sobre tela", ano: 1898, dimensoes: "100,3 x 81,3 cm", imagem: chestnutImg },
  { id: 21, inventarioId: "ID-M021", titulo: "Portrait of a Young Girl", artistaId: "cassatt", tecnica: "Óleo sobre tela", ano: 1899, dimensoes: "73,0 x 60,0 cm", imagem: portraitImg },
];

const PREMIUM_PAGES = new Set<string>([]);

const LIMITES_FREE = {
  obras: 5,
  certificados: 1,
  catalogos: 1,
};

function carregarContadores(): { certificadosEmitidos: number; catalogosCriados: number } {
  try {
    const raw = localStorage.getItem("artflow_contadores");
    if (raw) return JSON.parse(raw);
  } catch {}
  return { certificadosEmitidos: 0, catalogosCriados: 0 };
}

function salvarContadores(contadores: { certificadosEmitidos: number; catalogosCriados: number }) {
  localStorage.setItem("artflow_contadores", JSON.stringify(contadores));
}

function isPremium(): boolean {
  return localStorage.getItem("artflow_premium") === "true";
}

interface MenuItem {
  id: string;
  title: string;
  icon: typeof Image;
  premium?: boolean;
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
  premiumGroup?: boolean;
}

const menuBase: MenuGroup[] = [
  {
    label: "Perfil",
    items: [
      { id: "perfil-emissor", title: "Perfil", icon: UserCog },
      { id: "bio", title: "Bio", icon: User },
      { id: "mapa-obra", title: "Mapa da Obra", icon: Map, premium: true },
    ],
  },
  {
    label: "Acervo",
    items: [
      { id: "artistas", title: "Artistas", icon: Palette },
      { id: "obras", title: "Obras", icon: Image },
      { id: "colecoes", title: "Coleções / Séries", icon: Layers },
      { id: "catalogos-repo", title: "Catálogo", icon: BookOpen },
      { id: "exposicoes", title: "Exposições", icon: Calendar },
      { id: "representacao", title: "Representação", icon: Building2, premium: true },
      { id: "emprestimo-doacao", title: "Empréstimo / Doação", icon: HandHeart, premium: true },
      { id: "leiloes-acervo", title: "Leilões Públicos", icon: Gavel, premium: true },
    ],
  },
  {
    label: "Logística",
    items: [
      { id: "localizacao", title: "Localização", icon: Navigation },
      { id: "armazenamento", title: "Armazenamento", icon: Archive, premium: true },
      { id: "contatos", title: "Contatos", icon: Users },
    ],
  },
  {
    label: "Comercial",
    premiumGroup: true,
    items: [
      { id: "vendas", title: "Vendas", icon: BarChart3, premium: true },
      { id: "oport-consignacao", title: "Consignação", icon: Tag, premium: true },
      { id: "oport-avaliacao", title: "Avaliação", icon: ShoppingBag, premium: true },
    ],
  },
  {
    label: "Oportunidade",
    premiumGroup: true,
    items: [
      { id: "oport-feiras", title: "Feiras", icon: Globe, premium: true },
      { id: "convocatoria", title: "Convocatória", icon: Megaphone, premium: true },
      { id: "seja-tutor", title: "Seja um Tutor", icon: GraduationCap, premium: true },
    ],
  },
  {
    label: "Mercado",
    premiumGroup: true,
    items: [
      { id: "venda-arte", title: "Venda sua Arte", icon: Store, premium: true },
      { id: "leilao-artflow", title: "Leilão Art Flow", icon: Gavel, premium: true },
    ],
  },
  {
    label: "Suporte",
    items: [
      { id: "oport-caixa", title: "Caixa de Entrada", icon: MessageSquare },
      { id: "tutores-online", title: "Tutores Online", icon: Video, premium: true },
      { id: "cursos", title: "Cursos", icon: GraduationCap, premium: true },
      { id: "suporte", title: "Suporte", icon: HelpCircle },
    ],
  },
];

const artistaOnly = new Set(["representacao", "convocatoria", "venda-arte", "tutores-online", "cursos"]);
const colecionadorOnly = new Set(["emprestimo-doacao"]);
const colecionadorGaleriaOnly = new Set(["artistas", "leiloes-acervo", "oport-avaliacao", "seja-tutor", "leilao-artflow"]);
const hideForGaleria = new Set(["oport-consignacao"]);

function buildMenu(perfil: string): MenuGroup[] {
  return menuBase
    .map((grupo) => ({
      ...grupo,
      items: grupo.items.filter((item) => {
        if (artistaOnly.has(item.id) && perfil !== "artista") return false;
        if (colecionadorOnly.has(item.id) && perfil !== "colecionador") return false;
        if (colecionadorGaleriaOnly.has(item.id) && perfil !== "colecionador" && perfil !== "galeria") return false;
        if (hideForGaleria.has(item.id) && perfil === "galeria") return false;
        return true;
      }),
    }))
    .filter((grupo) => grupo.items.length > 0);
}

const titulosPagina: Record<string, string> = {
  artistas: "Artistas",
  obras: "Meu Acervo",
  "perfil-emissor": "Perfil",
  bio: "Bio",
  exposicoes: "Exposições",
  representacao: "Representação",
  "mapa-obra": "Mapa da Obra",
  colecoes: "Coleções / Séries",
  "catalogos-repo": "Catálogo",
  producao: "Produção e Tiragem",
  "emprestimo-doacao": "Empréstimo / Doação",
  "leiloes-acervo": "Leilões Públicos",
  localizacao: "Localização",
  armazenamento: "Armazenamento",
  contatos: "Contatos",
  vendas: "Vendas",
  documentos: "Documentos",
  certificados: "Certificados (COA)",
  configuracoes: "Configurações",
  "oport-expo": "Expo — Convocatórias",
  "oport-ocupacao": "Ocupação & Residências",
  "oport-edital": "Editais Culturais",
  "oport-consignacao": "Consignação",
  "oport-feiras": "Feiras de Arte",
  "oport-avaliacao": "Avaliação",
  "oport-leiloes": "Leilões Públicos",
  "oport-caixa": "Caixa de Entrada",
  convocatoria: "Convocatória",
  "seja-tutor": "Seja um Tutor",
  "venda-arte": "Venda sua Arte",
  "leilao-artflow": "Leilão Art Flow",
  "tutores-online": "Tutores Online",
  cursos: "Cursos",
  suporte: "Suporte",
};

function UpsellModal({
  open,
  onClose,
  onAssinar,
}: {
  open: boolean;
  onClose: () => void;
  onAssinar: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md" data-testid="modal-upsell">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2" data-testid="text-upsell-title">
            <Crown className="h-5 w-5" style={{ color: "#D4A843" }} />
            <span>Art Flow Premium</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <p className="text-sm text-muted-foreground">
            Desbloqueie todo o potencial do Art Flow com o plano Premium e leve sua gestão de acervo ao próximo nível.
          </p>

          <div className="space-y-3">
            {[
              "Obras ilimitadas no acervo",
              "Certificados e catálogos sem limite",
              "Exposições, Agenda e Mapa da Obra",
              "Certificados e catálogos sem marca d'água",
              "Relatórios avançados de vendas",
              "Suporte prioritário",
            ].map((beneficio) => (
              <div key={beneficio} className="flex items-center gap-2.5">
                <Star className="h-4 w-4 flex-shrink-0" style={{ color: "#D4A843" }} />
                <span className="text-sm text-foreground">{beneficio}</span>
              </div>
            ))}
          </div>

          <div className="rounded-md p-4 text-center" style={{ backgroundColor: "rgba(212, 168, 67, 0.08)", border: "1px solid rgba(212, 168, 67, 0.2)" }}>
            <p className="text-xs text-muted-foreground mb-1">A partir de</p>
            <p className="text-2xl font-semibold" style={{ color: "#D4A843" }}>
              R$ 49,90<span className="text-sm font-normal text-muted-foreground">/mês</span>
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={onClose} data-testid="button-fechar-upsell">
            Agora não
          </Button>
          <Button
            style={{ backgroundColor: "#D4A843", borderColor: "#D4A843", color: "#fff" }}
            onClick={onAssinar}
            data-testid="button-assinar-upsell"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Assinar Premium
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AppSidebar({
  onSair,
  perfil,
  artistas,
  paginaAtiva,
  onNavegar,
  premium,
  onUpsell,
}: {
  onSair: () => void;
  perfil: string;
  artistas: Artista[];
  paginaAtiva: string;
  onNavegar: (id: string) => void;
  premium: boolean;
  onUpsell: () => void;
}) {
  const grupos = buildMenu(perfil);

  const sidebarUser = perfil === "colecionador"
    ? { nome: "Minha Coleção", iniciais: "MC", foto: "" }
    : perfil === "galeria"
    ? { nome: "Minha Galeria", iniciais: "MG", foto: "" }
    : { nome: artistas[0]?.nome || "Usuário", iniciais: artistas[0]?.iniciais || "U", foto: artistas[0]?.foto || "" };

  function handleNavegar(item: MenuItem, isPremiumGroup: boolean) {
    if ((item.premium || isPremiumGroup) && !premium) {
      onUpsell();
    } else {
      onNavegar(item.id);
    }
  }

  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <span
          className="text-lg font-bold tracking-tight text-foreground"
          data-testid="text-sidebar-logo"
        >
          Art Flow
        </span>
      </SidebarHeader>

      <SidebarContent>
        {grupos.map((grupo) => (
          <SidebarGroup key={grupo.label}>
            {grupo.premiumGroup ? (
              <SidebarGroupLabel className="flex items-center gap-1.5" data-testid="label-oportunidades">
                <Crown className="h-3 w-3" style={{ color: "#D4A843" }} />
                <span style={{ color: "#D4A843" }}>{grupo.label}</span>
              </SidebarGroupLabel>
            ) : (
              <SidebarGroupLabel>{grupo.label}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {grupo.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={paginaAtiva === item.id}
                      onClick={() => handleNavegar(item, !!grupo.premiumGroup)}
                      data-testid={`button-menu-${item.id}`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="flex-1">{item.title}</span>
                      {item.premium && !premium && !grupo.premiumGroup && (
                        <span
                          className="text-[10px] font-bold ml-auto"
                          style={{ color: "#D4A843" }}
                          data-testid={`badge-premium-${item.id}`}
                        >
                          P
                        </span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-3 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <Avatar className="h-8 w-8" data-testid="avatar-artista">
            {sidebarUser.foto ? (
              <AvatarImage src={sidebarUser.foto} alt={sidebarUser.nome} />
            ) : null}
            <AvatarFallback>{sidebarUser.iniciais}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-foreground truncate" data-testid="text-nome-artista">
              {sidebarUser.nome}
            </span>
            <span className="text-[10px] text-muted-foreground" data-testid="text-plano-sidebar">
              {premium ? "Premium" : "Plano Gratuito"}
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={onSair}
          data-testid="button-sair"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

function VisualizarObraModal({
  obra,
  artista,
  onClose,
  localizacaoOverride,
  statusOverride,
}: {
  obra: Obra;
  artista?: Artista;
  onClose: () => void;
  localizacaoOverride?: string;
  statusOverride?: string;
}) {
  const artistaLabel = artista ? `${artista.nome} (${artista.anos})` : "";
  const colecao = colecoesObras[obra.id] || "—";

  const statusMap: Record<string, string> = {
    "ID-M001": "Acervo Pessoal",
    "ID-M002": "Consignação",
    "ID-M003": "Estoque",
  };
  const precoMap: Record<string, string> = {
    "ID-M001": "R$ 45.000,00",
    "ID-M002": "R$ 38.000,00",
    "ID-M003": "R$ 52.000,00",
  };
  const locMap: Record<string, string> = {
    "ID-M001": "Ateliê do Artista",
    "ID-M002": "Galeria Graphitte, São Paulo",
    "ID-M003": "Leblon, Rio de Janeiro",
  };

  const statusObra = statusOverride || statusMap[obra.inventarioId] || "Acervo Pessoal";
  const precoObra = precoMap[obra.inventarioId] || "Sob consulta";
  const locObra = localizacaoOverride || locMap[obra.inventarioId] || "—";

  function handleImprimir() {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Ficha Técnica — ${obra.titulo}</title>
        <style>
          @media print { @page { size: A4; margin: 20mm; } }
          body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; max-width: 700px; margin: 0 auto; padding: 40px 20px; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #D4A843; padding-bottom: 15px; }
          .header h1 { font-size: 14px; letter-spacing: 3px; color: #D4A843; margin: 0; }
          .img-container { text-align: center; margin: 20px 0; }
          .img-container img { max-width: 100%; max-height: 400px; object-fit: contain; }
          .titulo-obra { font-size: 22px; font-weight: 600; text-align: center; margin: 20px 0 5px; }
          .artista { text-align: center; color: #666; font-size: 14px; margin-bottom: 25px; }
          table { width: 100%; border-collapse: collapse; }
          td { padding: 10px 12px; font-size: 13px; border-bottom: 1px solid #eee; }
          td:first-child { font-weight: 600; color: #555; width: 160px; }
        </style>
      </head>
      <body>
        <div class="header"><h1>ART FLOW — FICHA TÉCNICA</h1></div>
        <div class="img-container"><img src="${obra.imagem}" alt="${obra.titulo}" /></div>
        <div class="titulo-obra">${obra.titulo}</div>
        <div class="artista">${artistaLabel}</div>
        <table>
          <tr><td>ID de Inventário</td><td>${obra.inventarioId}</td></tr>
          <tr><td>Ano</td><td>${obra.ano}</td></tr>
          <tr><td>Medidas</td><td>${obra.dimensoes}</td></tr>
          <tr><td>Técnica</td><td>${obra.tecnica}</td></tr>
          <tr><td>Médium</td><td>${obra.tecnica}</td></tr>
          <tr><td>Preço</td><td>${precoObra}</td></tr>
          <tr><td>Status</td><td>${statusObra}</td></tr>
          <tr><td>Localização</td><td>${locObra}</td></tr>
          <tr><td>Coleção</td><td>${colecao}</td></tr>
        </table>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 400);
  }

  return (
    <Dialog open={true} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="modal-visualizar-obra">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between gap-2" data-testid="text-visualizar-title">
            <span>Ficha Técnica</span>
            <Button variant="outline" size="sm" onClick={handleImprimir} data-testid="button-imprimir-obra">
              <Printer className="mr-1.5 h-3.5 w-3.5" />
              Imprimir Obra
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="rounded-md overflow-hidden border border-border">
            <img
              src={obra.imagem}
              alt={obra.titulo}
              className="w-full max-h-[400px] object-contain bg-muted/30"
              data-testid="img-visualizar-obra"
            />
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-xl font-semibold text-foreground" data-testid="text-visualizar-titulo">{obra.titulo}</h2>
            <p className="text-sm text-muted-foreground">{artistaLabel}</p>
          </div>

          <div className="rounded-md border border-border divide-y divide-border">
            {[
              { label: "ID de Inventário", value: obra.inventarioId },
              { label: "Ano", value: String(obra.ano) },
              { label: "Medidas", value: obra.dimensoes },
              { label: "Técnica", value: obra.tecnica },
              { label: "Médium", value: obra.tecnica },
              { label: "Preço", value: precoObra },
              { label: "Status", value: statusObra },
              { label: "Localização", value: locObra },
              { label: "Coleção", value: colecao },
            ].map((row) => (
              <div key={row.label} className="flex items-center px-4 py-3 gap-4">
                <span className="text-xs font-medium text-muted-foreground w-36 flex-shrink-0">{row.label}</span>
                <span className="text-sm text-foreground" data-testid={`text-ficha-${row.label.toLowerCase().replace(/\s/g, "-")}`}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose} data-testid="button-fechar-visualizar">
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ObraCard({
  obra,
  artista,
  onCertificado,
  onVisualizar,
  modoSelecao,
  selecionada,
  onToggleSelecao,
}: {
  obra: Obra;
  artista?: Artista;
  onCertificado?: (obra: Obra) => void;
  onVisualizar?: (obra: Obra) => void;
  modoSelecao?: boolean;
  selecionada?: boolean;
  onToggleSelecao?: (id: number) => void;
}) {
  const artistaLabel = artista ? `${artista.nome} (${artista.anos})` : "";
  const colecao = colecoesObras[obra.id];

  return (
    <Card
      className={`flex flex-col relative ${modoSelecao && selecionada ? "ring-2 ring-primary" : ""}`}
      data-testid={`card-obra-${obra.id}`}
    >
      {modoSelecao && (
        <button
          className="absolute top-3 left-3 z-10 flex items-center justify-center h-6 w-6 rounded-sm bg-background/80 backdrop-blur-sm border border-border/50 cursor-pointer"
          onClick={() => onToggleSelecao?.(obra.id)}
          data-testid={`checkbox-obra-${obra.id}`}
        >
          {selecionada ? (
            <Check className="h-4 w-4 text-primary" />
          ) : null}
        </button>
      )}
      <img
        src={obra.imagem}
        alt={obra.titulo}
        className={`h-56 w-full object-cover rounded-t-md ${modoSelecao ? "cursor-pointer" : ""}`}
        onClick={modoSelecao ? () => onToggleSelecao?.(obra.id) : undefined}
        data-testid={`img-obra-${obra.id}`}
      />
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="text-lg font-semibold text-foreground"
          data-testid={`text-titulo-obra-${obra.id}`}
        >
          {obra.titulo}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {artistaLabel}
        </p>

        <p className="mt-0.5 font-mono text-xs text-muted-foreground" data-testid={`text-inventario-${obra.id}`}>
          {obra.inventarioId}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Técnica: {obra.tecnica} | Ano: {obra.ano}
        </p>

        {colecao && (
          <div className="mt-2 flex items-center gap-1.5">
            <Layers className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            <span
              className="text-xs text-muted-foreground truncate"
              data-testid={`text-colecao-obra-${obra.id}`}
            >
              {colecao}
            </span>
          </div>
        )}

        <Separator className="my-4" />

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            data-testid={`button-editar-${obra.id}`}
          >
            <Pencil className="mr-1.5 h-3.5 w-3.5" />
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onVisualizar?.(obra)}
            data-testid={`button-visualizar-${obra.id}`}
          >
            <Eye className="mr-1.5 h-3.5 w-3.5" />
            Visualizar
          </Button>
          <Button
            size="sm"
            onClick={() => onCertificado?.(obra)}
            data-testid={`button-certificado-${obra.id}`}
          >
            <Award className="mr-1.5 h-3.5 w-3.5" />
            Certificado
          </Button>
        </div>
      </div>
    </Card>
  );
}

function gerarIdInventario() {
  const num = Math.floor(100 + Math.random() * 900);
  return `ID-M${String(num).padStart(3, "0")}`;
}

const localizacoesDisponiveis = [
  "Galeria Graphitte, São Paulo",
  "Leblon, Rio de Janeiro",
  "Jardins, São Paulo",
  "Ateliê do Artista",
  "Marina Bay, Singapura",
  "Saatchi Gallery, Londres",
];

const colecoesDisponiveis = [
  "Vida no Campo: A Série de Pontoise",
];

function NovaObraModal({
  open,
  onClose,
  colecoesLista,
  localizacoesLista,
  tiragensLista,
  exposicoesLista,
  representacoesLista,
  artistasLista,
}: {
  open: boolean;
  onClose: () => void;
  colecoesLista: string[];
  localizacoesLista: string[];
  tiragensLista: Tiragem[];
  exposicoesLista: string[];
  representacoesLista: string[];
  artistasLista: Artista[];
}) {
  const [idInventario] = useState(gerarIdInventario);
  const [titulo, setTitulo] = useState("");
  const [artistaSelecionado, setArtistaSelecionado] = useState("");
  const [tecnica, setTecnica] = useState("");
  const [ano, setAno] = useState("");
  const [dimensoes, setDimensoes] = useState("");
  const [preco, setPreco] = useState("");
  const [status, setStatus] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [medium, setMedium] = useState("");
  const [edicao, setEdicao] = useState("");
  const [tiragem, setTiragem] = useState("");
  const [colecao, setColecao] = useState("");
  const [pertenceATiragem, setPertenceATiragem] = useState("nao");
  const [tiragemSelecionada, setTiragemSelecionada] = useState("");
  const [numeracao, setNumeracao] = useState("");
  const [tipoNumeracao, setTipoNumeracao] = useState("edicao");
  const [exposicaoAssociada, setExposicaoAssociada] = useState("");
  const [representacaoAssociada, setRepresentacaoAssociada] = useState("");

  const tiragemAtual = tiragensLista.find((t) => t.id === tiragemSelecionada);

  function handleSalvar() {
    alert("Obra salva com sucesso!" + (tiragemAtual ? ` Certificado gerado automaticamente para ${tiragemAtual.titulo} — ${tipoNumeracao === "pa" ? "P.A." : ""} ${numeracao}.` : ""));
    setTitulo("");
    setArtistaSelecionado("");
    setTecnica("");
    setAno("");
    setDimensoes("");
    setPreco("");
    setStatus("");
    setLocalizacao("");
    setMedium("");
    setEdicao("");
    setTiragem("");
    setColecao("");
    setPertenceATiragem("nao");
    setTiragemSelecionada("");
    setNumeracao("");
    setTipoNumeracao("edicao");
    setExposicaoAssociada("");
    setRepresentacaoAssociada("");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto" data-testid="modal-nova-obra">
        <DialogHeader>
          <DialogTitle data-testid="text-modal-title">
            Cadastrar Nova Obra
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="flex items-center gap-2 rounded-md bg-muted/50 px-4 py-2.5">
            <span className="text-xs text-muted-foreground">ID de Inventário:</span>
            <span className="font-mono text-sm font-semibold text-foreground" data-testid="text-id-inventario">
              {idInventario}
            </span>
          </div>

          <div
            className="flex flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed border-border p-8 cursor-pointer"
            data-testid="area-upload-imagem"
          >
            <Upload className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground text-center">
              Arraste a imagem ou clique para fazer upload
            </span>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="titulo-obra">Título da Obra</Label>
            <Input
              id="titulo-obra"
              placeholder="Ex: Noite Estrelada"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              data-testid="input-titulo-obra"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Artista <span className="text-destructive">*</span></Label>
            <Select value={artistaSelecionado} onValueChange={setArtistaSelecionado}>
              <SelectTrigger data-testid="select-artista-obra">
                <SelectValue placeholder="Selecione o artista" />
              </SelectTrigger>
              <SelectContent>
                {artistasLista.map((a) => (
                  <SelectItem key={a.id} value={a.id}>{a.nome}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tecnica">Técnica</Label>
            <Input
              id="tecnica"
              placeholder="Ex: Óleo sobre tela"
              value={tecnica}
              onChange={(e) => setTecnica(e.target.value)}
              data-testid="input-tecnica"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="medium">Médium</Label>
            <Input
              id="medium"
              placeholder="Ex: Acrílica, Aquarela, Gravura"
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              data-testid="input-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="ano">Ano de Criação</Label>
              <Input
                id="ano"
                placeholder="Ex: 2024"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                data-testid="input-ano"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="dimensoes">Medidas</Label>
              <Input
                id="dimensoes"
                placeholder="Ex: 100x80 cm"
                value={dimensoes}
                onChange={(e) => setDimensoes(e.target.value)}
                data-testid="input-dimensoes"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="preco">Preço (R$)</Label>
            <Input
              id="preco"
              placeholder="Ex: 5.000,00"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              data-testid="input-preco"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger data-testid="select-status">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="estoque">Estoque</SelectItem>
                <SelectItem value="vendido">Vendido</SelectItem>
                <SelectItem value="consignacao">Consignação</SelectItem>
                <SelectItem value="emprestado">Emprestado</SelectItem>
                <SelectItem value="reservado">Reservado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Localização</Label>
            <Select value={localizacao} onValueChange={setLocalizacao}>
              <SelectTrigger data-testid="select-localizacao">
                <SelectValue placeholder="Selecione a localização" />
              </SelectTrigger>
              <SelectContent>
                {localizacoesLista.map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Coleção</Label>
            <Select value={colecao} onValueChange={setColecao}>
              <SelectTrigger data-testid="select-colecao">
                <SelectValue placeholder="Selecione a coleção (opcional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nenhuma">Nenhuma</SelectItem>
                {colecoesLista.map((col) => (
                  <SelectItem key={col} value={col}>{col}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-1.5">
            <Label>Pertence a uma Tiragem?</Label>
            <Select value={pertenceATiragem} onValueChange={(v) => { setPertenceATiragem(v); if (v === "nao") { setTiragemSelecionada(""); setNumeracao(""); } }}>
              <SelectTrigger data-testid="select-pertence-tiragem">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nao">Não (Obra Única)</SelectItem>
                <SelectItem value="sim">Sim (Múltiplo)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {pertenceATiragem === "sim" && (
            <div className="space-y-4 rounded-md border border-border p-4">
              <div className="space-y-1.5">
                <Label>Selecionar Tiragem</Label>
                <Select value={tiragemSelecionada} onValueChange={setTiragemSelecionada}>
                  <SelectTrigger data-testid="select-tiragem-obra">
                    <SelectValue placeholder="Selecione a tiragem" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiragensLista.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.titulo} — {t.tecnicaReproducao}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {tiragemAtual && (
                <div className="text-xs text-muted-foreground rounded-md bg-muted/50 p-3 space-y-1">
                  <p>Edições: {tiragemAtual.quantidadeTotal} + {tiragemAtual.provasArtista} P.A.</p>
                  <p>Técnica: {tiragemAtual.tecnicaReproducao} | {tiragemAtual.suporte} {tiragemAtual.gramatura}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Tipo de Numeração</Label>
                  <Select value={tipoNumeracao} onValueChange={setTipoNumeracao}>
                    <SelectTrigger data-testid="select-tipo-numeracao">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="edicao">Edição (ex: 1/{tiragemAtual?.quantidadeTotal || "N"})</SelectItem>
                      <SelectItem value="pa">P.A. (ex: P.A. 1/{tiragemAtual?.provasArtista || "N"})</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="numeracao-obra">Numeração</Label>
                  <Input
                    id="numeracao-obra"
                    placeholder={tipoNumeracao === "pa" ? `Ex: 1 (de ${tiragemAtual?.provasArtista || "?"})` : `Ex: 1 (de ${tiragemAtual?.quantidadeTotal || "?"})`}
                    value={numeracao}
                    onChange={(e) => setNumeracao(e.target.value)}
                    data-testid="input-numeracao-obra"
                  />
                </div>
              </div>

              {tiragemAtual && numeracao && (
                <div className="text-sm font-medium text-foreground bg-muted/50 rounded-md p-3" data-testid="text-preview-numeracao">
                  Numeração: {tipoNumeracao === "pa" ? `P.A. ${numeracao}/${tiragemAtual.provasArtista}` : `${numeracao}/${tiragemAtual.quantidadeTotal}`}
                </div>
              )}
            </div>
          )}

          <Separator />

          <div className="space-y-1.5">
            <Label>Exposição Associada</Label>
            <Select value={exposicaoAssociada} onValueChange={setExposicaoAssociada}>
              <SelectTrigger data-testid="select-exposicao-obra">
                <SelectValue placeholder="Nenhuma (opcional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nenhuma">Nenhuma</SelectItem>
                {exposicoesLista.map((e) => (
                  <SelectItem key={e} value={e}>{e}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Representação Associada</Label>
            <Select value={representacaoAssociada} onValueChange={setRepresentacaoAssociada}>
              <SelectTrigger data-testid="select-representacao-obra">
                <SelectValue placeholder="Nenhuma (opcional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nenhuma">Nenhuma</SelectItem>
                {representacoesLista.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="ghost"
            onClick={onClose}
            data-testid="button-cancelar-obra"
          >
            Cancelar
          </Button>
          <Button onClick={handleSalvar} disabled={!artistaSelecionado} data-testid="button-salvar-obra">
            Salvar Obra
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ArtistasPage({
  artistas,
  obras,
}: {
  artistas: Artista[];
  obras: Obra[];
}) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <p className="text-sm text-muted-foreground" data-testid="text-artistas-desc">
        Artistas que compõem a sua coleção.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {artistas.map((artista) => {
          const qtd = obras.filter((o) => o.artistaId === artista.id).length;
          return (
            <Card key={artista.id} className="p-5" data-testid={`card-artista-${artista.id}`}>
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14" data-testid={`avatar-artista-${artista.id}`}>
                  {artista.foto ? <AvatarImage src={artista.foto} alt={artista.nome} /> : null}
                  <AvatarFallback>{artista.iniciais}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-foreground truncate" data-testid={`text-nome-artista-${artista.id}`}>
                    {artista.nome}
                  </h3>
                  <p className="text-sm text-muted-foreground">{artista.anos}</p>
                  <p className="text-xs text-muted-foreground mt-1" data-testid={`text-qtd-obras-artista-${artista.id}`}>
                    {qtd} {qtd === 1 ? "obra" : "obras"} no acervo
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function ArtistaAcervo({
  artistas,
  obras,
  filtro,
  onCertificado,
  onVisualizar,
  modoSelecao,
  selecionadas,
  onToggleSelecao,
}: {
  artistas: Artista[];
  obras: Obra[];
  filtro: string;
  onCertificado: (obra: Obra) => void;
  onVisualizar: (obra: Obra) => void;
  modoSelecao?: boolean;
  selecionadas?: Set<number>;
  onToggleSelecao?: (id: number) => void;
}) {
  const artistasFiltrados = filtro === "todos"
    ? artistas
    : artistas.filter((a) => a.id === filtro);

  return (
    <div className="space-y-10">
      {artistasFiltrados.map((artista) => {
        const obrasDoArtista = obras.filter((o) => o.artistaId === artista.id);
        if (obrasDoArtista.length === 0) return null;

        return (
          <section key={artista.id} data-testid={`secao-artista-${artista.id}`}>
            <div className="flex items-center gap-3 mb-6">
              <Avatar className="h-10 w-10" data-testid={`avatar-secao-${artista.id}`}>
                <AvatarImage src={artista.foto} alt={artista.nome} />
                <AvatarFallback>{artista.iniciais}</AvatarFallback>
              </Avatar>
              <div>
                <h2
                  className="text-lg font-semibold text-foreground"
                  data-testid={`text-nome-secao-${artista.id}`}
                >
                  {artista.nome}
                </h2>
                <p className="text-sm text-muted-foreground">{artista.anos}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {obrasDoArtista.map((obra) => (
                <ObraCard
                  key={obra.id}
                  obra={obra}
                  artista={artista}
                  onCertificado={onCertificado}
                  onVisualizar={onVisualizar}
                  modoSelecao={modoSelecao}
                  selecionada={selecionadas?.has(obra.id)}
                  onToggleSelecao={onToggleSelecao}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function AcervoSimples({
  artistas,
  obras,
  onCertificado,
  onVisualizar,
  modoSelecao,
  selecionadas,
  onToggleSelecao,
}: {
  artistas: Artista[];
  obras: Obra[];
  onCertificado: (obra: Obra) => void;
  onVisualizar: (obra: Obra) => void;
  modoSelecao?: boolean;
  selecionadas?: Set<number>;
  onToggleSelecao?: (id: number) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {obras.map((obra) => {
        const artista = artistas.find((a) => a.id === obra.artistaId);
        return (
          <ObraCard
            key={obra.id}
            obra={obra}
            artista={artista}
            onCertificado={onCertificado}
            onVisualizar={onVisualizar}
            modoSelecao={modoSelecao}
            selecionada={selecionadas?.has(obra.id)}
            onToggleSelecao={onToggleSelecao}
          />
        );
      })}
    </div>
  );
}

function NovoCatalogoModal({
  open,
  onClose,
  onSalvar,
}: {
  open: boolean;
  onClose: () => void;
  onSalvar: (titulo: string, descricao: string, capa: string) => void;
}) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [capaPreview, setCapaPreview] = useState<string>("");
  const [capaFile, setCapaFile] = useState<File | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setCapaFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSalvar() {
    onSalvar(titulo, descricao, capaPreview || capaCatalogoImg);
    setTitulo("");
    setDescricao("");
    setCapaPreview("");
    setCapaFile(null);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md" data-testid="modal-novo-catalogo">
        <DialogHeader>
          <DialogTitle data-testid="text-modal-catalogo-title">
            Gerar Catálogo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="titulo-catalogo">Título do Catálogo</Label>
            <Input
              id="titulo-catalogo"
              placeholder='Ex: "Vida no Campo"'
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              data-testid="input-titulo-catalogo"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="descricao-catalogo">Descrição Breve</Label>
            <Input
              id="descricao-catalogo"
              placeholder="Ex: Paisagens rurais e cenas campestres"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              data-testid="input-descricao-catalogo"
            />
          </div>

          <div className="space-y-1.5">
            <Label>Capa do Catálogo</Label>
            <label
              className="flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-border p-6 cursor-pointer"
              data-testid="area-upload-capa"
            >
              {capaPreview ? (
                <img src={capaPreview} alt="Prévia da capa" className="h-32 w-full object-cover rounded-sm" />
              ) : (
                <>
                  <Upload className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground text-center">
                    Clique para enviar a imagem de capa
                  </span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                data-testid="input-file-capa"
              />
            </label>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={onClose} data-testid="button-cancelar-catalogo">
            Cancelar
          </Button>
          <Button
            onClick={handleSalvar}
            disabled={!titulo.trim()}
            data-testid="button-salvar-catalogo"
          >
            Salvar Catálogo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function PaginaObras({
  perfil,
  artistas,
  obras,
  filtro,
  setFiltro,
  onCertificado,
  onVisualizar,
  onGerarCatalogo,
}: {
  perfil: string;
  artistas: Artista[];
  obras: Obra[];
  filtro: string;
  setFiltro: (f: string) => void;
  onCertificado: (obra: Obra) => void;
  onVisualizar: (obra: Obra) => void;
  onGerarCatalogo: (obrasSelecionadas: Obra[]) => void;
}) {
  const hasMultipleArtists = artistas.length > 1;
  const [modoSelecao, setModoSelecao] = useState(false);
  const [selecionadas, setSelecionadas] = useState<Set<number>>(new Set());

  const obrasFiltradas = filtro === "todos" ? obras : obras.filter((o) => o.artistaId === filtro);

  function toggleSelecao(id: number) {
    setSelecionadas((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selecionarTodas() {
    if (selecionadas.size === obrasFiltradas.length) {
      setSelecionadas(new Set());
    } else {
      setSelecionadas(new Set(obrasFiltradas.map((o) => o.id)));
    }
  }

  function handleGerarCatalogo() {
    const obrasSel = obrasFiltradas.filter((o) => selecionadas.has(o.id));
    onGerarCatalogo(obrasSel);
    setModoSelecao(false);
    setSelecionadas(new Set());
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="flex items-center gap-2 px-6 pt-5 flex-wrap">
        {hasMultipleArtists && (
          <>
            {[
              { id: "todos", label: "Ver Todos" },
              ...artistas.map((a) => ({ id: a.id, label: a.nome })),
            ].map((item) => (
              <Button
                key={item.id}
                variant={filtro === item.id ? "default" : "outline"}
                size="sm"
                onClick={() => setFiltro(item.id)}
                data-testid={`button-filtro-${item.id}`}
              >
                {item.label}
              </Button>
            ))}
            <Separator orientation="vertical" className="h-6 mx-1" />
          </>
        )}

        <Button
          variant={modoSelecao ? "default" : "outline"}
          size="sm"
          onClick={() => {
            setModoSelecao(!modoSelecao);
            if (modoSelecao) setSelecionadas(new Set());
          }}
          data-testid="button-modo-selecao"
        >
          <CheckSquare className="mr-1.5 h-3.5 w-3.5" />
          {modoSelecao ? "Cancelar Seleção" : "Selecionar"}
        </Button>

        {modoSelecao && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={selecionarTodas}
              data-testid="button-selecionar-todas"
            >
              {selecionadas.size === obrasFiltradas.length ? (
                <>
                  <Square className="mr-1.5 h-3.5 w-3.5" />
                  Desmarcar Todas
                </>
              ) : (
                <>
                  <CheckSquare className="mr-1.5 h-3.5 w-3.5" />
                  Selecionar Todas
                </>
              )}
            </Button>

            <Button
              size="sm"
              disabled={selecionadas.size === 0}
              onClick={handleGerarCatalogo}
              data-testid="button-gerar-catalogo"
            >
              <BookOpen className="mr-1.5 h-3.5 w-3.5" />
              Gerar Catálogo ({selecionadas.size})
            </Button>
          </>
        )}
      </div>

      <div className="p-6">
        {hasMultipleArtists && filtro === "todos" ? (
          <ArtistaAcervo artistas={artistas} obras={obrasFiltradas} filtro={filtro} onCertificado={onCertificado} onVisualizar={onVisualizar} modoSelecao={modoSelecao} selecionadas={selecionadas} onToggleSelecao={toggleSelecao} />
        ) : (
          <AcervoSimples
            artistas={artistas}
            obras={obrasFiltradas}
            onCertificado={onCertificado}
            onVisualizar={onVisualizar}
            modoSelecao={modoSelecao}
            selecionadas={selecionadas}
            onToggleSelecao={toggleSelecao}
          />
        )}
      </div>
    </div>
  );
}

function CertificadosPage({
  obras,
  onCertificado,
}: {
  obras: Obra[];
  onCertificado: (obra: Obra) => void;
}) {
  const [busca, setBusca] = useState("");

  const obrasFiltradas = obras.filter((obra) => {
    if (!busca.trim()) return true;
    const termo = busca.toLowerCase();
    const colecao = colecoesObras[obra.id] || "";
    return (
      obra.titulo.toLowerCase().includes(termo) ||
      obra.inventarioId.toLowerCase().includes(termo) ||
      obra.ano.toString().includes(termo) ||
      colecao.toLowerCase().includes(termo)
    );
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por título, ano, coleção ou ID de Inventário..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="pl-10"
          data-testid="input-busca-certificados"
        />
      </div>

      {obrasFiltradas.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <ShieldCheck className="h-12 w-12 mb-3 opacity-30" />
          <p className="text-sm">Nenhum certificado encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {obrasFiltradas.map((obra) => (
            <Card
              key={obra.id}
              className="flex flex-row items-center gap-4 p-4"
              data-testid={`card-cert-${obra.id}`}
            >
              <img
                src={obra.imagem}
                alt={obra.titulo}
                className="h-16 w-16 rounded-sm object-cover flex-shrink-0"
                data-testid={`img-cert-thumb-${obra.id}`}
              />
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium text-foreground truncate"
                  data-testid={`text-cert-titulo-${obra.id}`}
                >
                  {obra.titulo}
                </p>
                <p
                  className="text-xs font-mono text-muted-foreground"
                  data-testid={`text-cert-inv-${obra.id}`}
                >
                  {obra.inventarioId}
                </p>
                <p className="text-xs text-muted-foreground">{obra.ano}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onCertificado(obra)}
                data-testid={`button-ver-cert-${obra.id}`}
              >
                <Eye className="mr-1.5 h-3.5 w-3.5" />
                Visualizar
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

const catalogoPadrao: CatalogoItem = {
  id: "cat-vida-no-campo",
  titulo: "Vida no Campo",
  descricao: "Paisagens rurais e cenas campestres de Camille Pissarro",
  capa: capaCatalogoImg,
  obras: [...obrasPissarro],
  dataCriacao: "16 de fevereiro de 2026",
};

function carregarCatalogos(): CatalogoItem[] {
  try {
    const saved = localStorage.getItem("artflow_catalogos");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [catalogoPadrao];
}

function salvarCatalogos(catalogos: CatalogoItem[]) {
  localStorage.setItem("artflow_catalogos", JSON.stringify(catalogos));
}

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [perfil, setPerfil] = useState<string>("artista");
  const [modalAberto, setModalAberto] = useState(false);
  const [filtro, setFiltro] = useState("todos");
  const [paginaAtiva, setPaginaAtiva] = useState("obras");
  const [obraCertificado, setObraCertificado] = useState<Obra | null>(null);
  const [obraVisualizar, setObraVisualizar] = useState<Obra | null>(null);
  const [catalogos, setCatalogos] = useState<CatalogoItem[]>(carregarCatalogos);
  const [catalogoVisualizado, setCatalogoVisualizado] = useState<CatalogoItem | null>(null);
  const [modalCatalogoAberto, setModalCatalogoAberto] = useState(false);
  const [obrasSelecionadasCatalogo, setObrasSelecionadasCatalogo] = useState<Obra[]>([]);
  const [upsellAberto, setUpsellAberto] = useState(false);
  const [premium, setPremium] = useState(isPremium);
  const [contadores, setContadores] = useState(carregarContadores);
  const { toast } = useToast();

  const [colecoesLista, setColecoesLista] = useState<string[]>([...colecoesDisponiveis]);
  const [localizacoesLista, setLocalizacoesLista] = useState<string[]>([...localizacoesDisponiveis]);
  const [locaisCompletos, setLocaisCompletos] = useState<Local[]>([...locaisIniciais]);
  const [localizacaoObras, setLocalizacaoObras] = useState<Record<number, string>>(() => {
    if (perfil === "colecionador") return { 12: "Museu do Ipiranga" } as Record<number, string>;
    return {} as Record<number, string>;
  });

  const registrosInicialEmprestimo: RegistroEmprestimo[] = perfil === "colecionador" ? [
    {
      id: "reg-inicial-dresden",
      obraId: 12,
      obraTitulo: "View of Dresden",
      obraInventarioId: "ID-M012",
      obraImagem: vistaImg,
      tipo: "emprestimo",
      localDestino: "Museu do Ipiranga",
      data: new Date().toLocaleDateString("pt-BR"),
    },
  ] : [];

  const [registrosEmprestimo, setRegistrosEmprestimo] = useState<RegistroEmprestimo[]>(registrosInicialEmprestimo);
  const [registrosLeilao, setRegistrosLeilao] = useState<RegistroLeilao[]>([]);

  const registrosMapa: RegistroMapa[] = [
    ...registrosEmprestimo.map((r) => ({
      id: r.id,
      obraId: r.obraId,
      obraTitulo: r.obraTitulo,
      obraImagem: r.obraImagem,
      tipo: r.tipo as RegistroMapa["tipo"],
      localNome: r.localDestino,
      localEndereco: "",
    })),
    ...registrosLeilao.map((r) => ({
      id: r.id,
      obraId: r.obraId,
      obraTitulo: r.obraTitulo,
      obraImagem: r.obraImagem,
      tipo: "leilao" as RegistroMapa["tipo"],
      localNome: r.localDestino,
      localEndereco: "",
    })),
  ];
  const [tiragensLista, setTiragensLista] = useState<Tiragem[]>([...tiragensIniciais]);
  const [exposicoesLista, setExposicoesLista] = useState<string[]>(exposicoesIniciais.map((e) => e.nome));
  const [representacoesLista, setRepresentacoesLista] = useState<string[]>(representacoesIniciais.map((r) => r.nome));

  const handleAtivarPremium = useCallback(() => {
    localStorage.setItem("artflow_premium", "true");
    setPremium(true);
    setUpsellAberto(false);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#D4A843", "#FFD700", "#FFA500", "#FFFFFF", "#E8C55A"],
    });
    toast({
      title: "Parabéns!",
      description: "Você agora tem acesso ilimitado ao Art Flow.",
    });
  }, [toast]);

  useEffect(() => {
    const saved = localStorage.getItem("artflow_profile");
    if (saved) setPerfil(saved);
  }, []);

  useEffect(() => {
    if (perfil === "colecionador") {
      setRegistrosEmprestimo([{
        id: "reg-inicial-dresden",
        obraId: 12,
        obraTitulo: "View of Dresden",
        obraInventarioId: "ID-M012",
        obraImagem: vistaImg,
        tipo: "emprestimo",
        localDestino: "Museu do Ipiranga",
        data: new Date().toLocaleDateString("pt-BR"),
      }]);
      setLocalizacaoObras({ 12: "Museu do Ipiranga" } as Record<number, string>);
    } else {
      setRegistrosEmprestimo([]);
      setLocalizacaoObras({} as Record<number, string>);
    }
    setRegistrosLeilao([]);
  }, [perfil]);

  const isColecionador = perfil === "colecionador";
  const artistas = isColecionador ? artistasColecionador : artistasPissarro;
  const obras = isColecionador ? obrasColecionador : obrasPissarro;

  const limiteObrasAtingido = !premium && obras.length >= LIMITES_FREE.obras;
  const limiteCertificadosAtingido = !premium && contadores.certificadosEmitidos >= LIMITES_FREE.certificados;
  const limiteCatalogosAtingido = !premium && contadores.catalogosCriados >= LIMITES_FREE.catalogos;

  function handleSair() {
    localStorage.removeItem("artflow_profile");
    navigate("/");
  }

  function handleGerarCatalogo(obrasSel: Obra[]) {
    if (limiteCatalogosAtingido) {
      setUpsellAberto(true);
      return;
    }
    setObrasSelecionadasCatalogo(obrasSel);
    setModalCatalogoAberto(true);
  }

  function handleSalvarCatalogo(titulo: string, descricao: string, capa: string) {
    const novo: CatalogoItem = {
      id: `cat-${Date.now()}`,
      titulo,
      descricao,
      capa,
      obras: obrasSelecionadasCatalogo,
      dataCriacao: new Date().toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
    const updated = [...catalogos, novo];
    setCatalogos(updated);
    salvarCatalogos(updated);
    const novosContadores = { ...contadores, catalogosCriados: contadores.catalogosCriados + 1 };
    setContadores(novosContadores);
    salvarContadores(novosContadores);
    setObrasSelecionadasCatalogo([]);
    setPaginaAtiva("catalogos-repo");
  }

  function handleCertificado(obra: Obra) {
    if (limiteCertificadosAtingido) {
      setUpsellAberto(true);
      return;
    }
    setObraCertificado(obra);
    if (!premium) {
      const novosContadores = { ...contadores, certificadosEmitidos: contadores.certificadosEmitidos + 1 };
      setContadores(novosContadores);
      salvarContadores(novosContadores);
    }
  }

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  const tituloPagina = titulosPagina[paginaAtiva] || "Meu Acervo";
  const mostrarBotaoNovaObra = paginaAtiva === "obras";

  function renderConteudo() {
    switch (paginaAtiva) {
      case "artistas":
        return <ArtistasPage artistas={artistas} obras={obras} />;
      case "obras":
        return (
          <PaginaObras
            perfil={perfil}
            artistas={artistas}
            obras={obras}
            filtro={filtro}
            setFiltro={setFiltro}
            onCertificado={handleCertificado}
            onVisualizar={setObraVisualizar}
            onGerarCatalogo={handleGerarCatalogo}
          />
        );
      case "perfil-emissor":
        return <PerfilEmissor perfilUsuario={perfil} premium={premium} onAssinar={handleAtivarPremium} />;
      case "bio":
        return <Bio />;
      case "mapa-obra":
        return <MapaObra registros={registrosMapa} />;
      case "exposicoes":
        return <Exposicoes onNovaExposicao={(nome) => setExposicoesLista((prev) => [...prev, nome])} perfil={perfil} />;
      case "vendas":
        return <Vendas />;
      case "representacao":
        return <RepresentacaoPage onNovaRepresentacao={(nome) => setRepresentacoesLista((prev) => [...prev, nome])} />;
      case "contatos":
        return <Contatos />;
      case "localizacao":
        return <Localizacao onNovaLocalizacao={(nome, tipo) => {
          setLocalizacoesLista((prev) => [...prev, nome]);
          if (tipo) {
            setLocaisCompletos((prev) => [...prev, { id: `loc-${Date.now()}`, nome, endereco: "", tipo: tipo as Local["tipo"], detalhe: "" }]);
          }
        }} />;
      case "producao":
        return <Producao onNovaTiragem={(tir) => setTiragensLista((prev) => [...prev, tir])} />;
      case "emprestimo-doacao":
        return <EmprestimoDoacaoPage obras={obras} locais={locaisCompletos} registrosIniciais={registrosInicialEmprestimo} onRegistroSalvo={(obraId: number, localNome: string) => {
          setLocalizacaoObras((prev) => ({ ...prev, [obraId]: localNome }));
          toast({ title: "Localização atualizada", description: `A obra foi movida para "${localNome}".` });
        }} onRegistrosChange={(novos) => setRegistrosEmprestimo(novos)} />;
      case "leiloes-acervo":
        return <LeiloesPublicosAcervo obras={obras} locais={locaisCompletos} onRegistroSalvo={(obraId: number, localNome: string) => {
          setLocalizacaoObras((prev) => ({ ...prev, [obraId]: localNome }));
          toast({ title: "Status atualizado", description: `Obra enviada para leilão em "${localNome}". Status: Em Leilão.` });
        }} onRegistrosChange={(novos) => setRegistrosLeilao(novos)} />;
      case "colecoes":
        return <Colecoes onNovaColecao={(nome) => setColecoesLista((prev) => [...prev, nome])} />;
      case "documentos":
        return <Documentos />;
      case "certificados":
        return (
          <CertificadosPage
            obras={obras}
            onCertificado={handleCertificado}
          />
        );
      case "catalogos-repo":
        return (
          <CatalogoPage
            catalogos={catalogos}
            onVerCatalogo={setCatalogoVisualizado}
          />
        );
      case "oport-consignacao":
        return <ConsignacaoPage catalogos={catalogos} />;
      case "oport-avaliacao":
        return <AvaliacaoPage />;
      case "oport-caixa":
        return <CaixaEntradaPage onVisualizarCatalogo={(catalogoId) => {
          const cat = catalogos.find(c => c.id === catalogoId);
          if (cat) {
            setCatalogoVisualizado(cat);
            setPaginaAtiva("catalogos-repo");
          }
        }} />;
      case "oport-feiras":
        return premium ? <FeirasPage /> : <OportunidadesUpsell onAssinar={handleAtivarPremium} />;
      case "convocatoria":
        return premium ? <ExpoPage perfil={perfil} /> : <OportunidadesUpsell onAssinar={handleAtivarPremium} />;
      case "seja-tutor":
      case "venda-arte":
      case "leilao-artflow":
        return premium ? <Placeholder page={paginaAtiva} /> : <OportunidadesUpsell onAssinar={handleAtivarPremium} />;
      case "tutores-online":
      case "cursos":
      case "suporte":
      case "armazenamento":
        return <Placeholder page={paginaAtiva} />;
      case "oport-expo":
        return premium ? <ExpoPage perfil={perfil} /> : <OportunidadesUpsell onAssinar={handleAtivarPremium} />;
      case "oport-ocupacao":
        return premium ? <OcupacaoPage /> : <OportunidadesUpsell onAssinar={handleAtivarPremium} />;
      case "oport-edital":
        return premium ? <EditalPage tecnicaArtista="Óleo sobre tela" /> : <OportunidadesUpsell onAssinar={handleAtivarPremium} />;
      case "oport-leiloes":
        return premium ? <LeiloesPage catalogos={catalogos} /> : <OportunidadesUpsell onAssinar={handleAtivarPremium} />;
      default:
        return <Placeholder page={paginaAtiva} />;
    }
  }

  return (
    <SidebarProvider style={sidebarStyle as React.CSSProperties}>
      <div className="flex h-screen w-full bg-muted/30">
        <AppSidebar
          onSair={handleSair}
          perfil={perfil}
          artistas={artistas}
          paginaAtiva={paginaAtiva}
          onNavegar={setPaginaAtiva}
          premium={premium}
          onUpsell={() => setUpsellAberto(true)}
        />

        <div className="flex flex-col flex-1 min-w-0">
          <header className="flex items-center justify-between gap-4 flex-wrap border-b bg-background px-6 py-4">
            <div className="flex items-center gap-3 flex-wrap">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <h1
                className="text-2xl font-semibold text-foreground"
                data-testid="text-dashboard-title"
              >
                {tituloPagina}
              </h1>
              <Badge variant="secondary" data-testid="badge-perfil">
                Perfil: {perfilLabels[perfil] || perfil}
              </Badge>
            </div>

            {mostrarBotaoNovaObra && (
              limiteObrasAtingido ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground" data-testid="text-limite-obras">
                    Limite atingido. Assine o plano Premium para inclusões ilimitadas.
                  </span>
                  <Button
                    style={{ backgroundColor: "#D4A843", borderColor: "#D4A843", color: "#fff" }}
                    onClick={() => setUpsellAberto(true)}
                    data-testid="button-nova-obra-premium"
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Premium
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setModalAberto(true)}
                  data-testid="button-nova-obra"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Obra
                </Button>
              )
            )}
          </header>

          <main className="flex-1 overflow-hidden flex flex-col">
            {renderConteudo()}
          </main>
        </div>
      </div>

      <NovaObraModal
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        colecoesLista={colecoesLista}
        localizacoesLista={localizacoesLista}
        tiragensLista={tiragensLista}
        exposicoesLista={exposicoesLista}
        representacoesLista={representacoesLista}
        artistasLista={artistas}
      />

      <NovoCatalogoModal
        open={modalCatalogoAberto}
        onClose={() => setModalCatalogoAberto(false)}
        onSalvar={handleSalvarCatalogo}
      />

      <UpsellModal
        open={upsellAberto}
        onClose={() => setUpsellAberto(false)}
        onAssinar={handleAtivarPremium}
      />

      {obraCertificado && (() => {
        const dadosEmissor = carregarDadosEmissor();
        const emissorLinha = dadosEmissor ? formatarLinhaEmissor(dadosEmissor) : null;
        return (
          <Certificado
            obra={obraCertificado}
            emissorLinha={emissorLinha}
            onClose={() => setObraCertificado(null)}
            onIrPerfil={() => {
              setObraCertificado(null);
              setPaginaAtiva("perfil-emissor");
            }}
            mostrarMarcaDagua={!premium}
          />
        );
      })()}

      {catalogoVisualizado && (
        <CatalogoDocumento
          catalogo={catalogoVisualizado}
          onClose={() => setCatalogoVisualizado(null)}
          mostrarMarcaDagua={!premium}
        />
      )}

      {obraVisualizar && (
        <VisualizarObraModal
          obra={obraVisualizar}
          artista={artistas.find((a) => a.id === obraVisualizar.artistaId)}
          onClose={() => setObraVisualizar(null)}
          localizacaoOverride={localizacaoObras[obraVisualizar.id]}
          statusOverride={registrosLeilao.some((r) => r.obraId === obraVisualizar.id) ? "Em Leilão" : undefined}
        />
      )}
    </SidebarProvider>
  );
}
