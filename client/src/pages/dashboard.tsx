import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
} from "lucide-react";

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
import MapaObra from "@/pages/mapa-obra";
import Exposicoes from "@/pages/exposicoes";
import Vendas from "@/pages/vendas";
import Agenda from "@/pages/agenda";
import Contatos from "@/pages/contatos";
import Localizacao from "@/pages/localizacao";
import Producao from "@/pages/producao";
import Colecoes from "@/pages/colecoes";
import Documentos from "@/pages/documentos";

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
  titulo: string;
  artistaId: string;
  tecnica: string;
  ano: number;
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
  { id: 1, titulo: "Colheita das Maçãs", artistaId: "pissarro", tecnica: "Óleo sobre tela", ano: 1888, imagem: colheitaImg },
  { id: 2, titulo: "Jovens Camponesas Descansando", artistaId: "pissarro", tecnica: "Óleo sobre tela", ano: 1882, imagem: camponesasImg },
  { id: 3, titulo: "Os Respigadores", artistaId: "pissarro", tecnica: "Óleo sobre tela", ano: 1889, imagem: respigadoresImg },
];

const artistasColecionador: Artista[] = [
  { id: "kirchner", nome: "Ernst Ludwig Kirchner", anos: "1880–1938", foto: kirchnerImg, iniciais: "EK" },
  { id: "cassatt", nome: "Mary Cassatt", anos: "1844–1926", foto: cassattImg, iniciais: "MC" },
];

const obrasColecionador: Obra[] = [
  { id: 10, titulo: "Reclining Girl in White", artistaId: "kirchner", tecnica: "Óleo sobre tela", ano: 1909, imagem: girlImg },
  { id: 11, titulo: "Dancers in Old-Frankfurt", artistaId: "kirchner", tecnica: "Óleo sobre tela", ano: 1904, imagem: dancersImg },
  { id: 12, titulo: "View of Dresden", artistaId: "kirchner", tecnica: "Óleo sobre tela", ano: 1910, imagem: vistaImg },
  { id: 20, titulo: "Under the Horse-Chestnut Tree", artistaId: "cassatt", tecnica: "Óleo sobre tela", ano: 1898, imagem: chestnutImg },
  { id: 21, titulo: "Portrait of a Young Girl", artistaId: "cassatt", tecnica: "Óleo sobre tela", ano: 1899, imagem: portraitImg },
];

interface MenuItem {
  id: string;
  title: string;
  icon: typeof Image;
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

const menuArtista: MenuGroup[] = [
  {
    label: "Perfil",
    items: [
      { id: "bio", title: "Bio", icon: User },
      { id: "exposicoes", title: "Exposições", icon: Calendar },
      { id: "agenda", title: "Agenda", icon: Calendar },
      { id: "mapa-obra", title: "Mapa da Obra", icon: Map },
    ],
  },
  {
    label: "Acervo",
    items: [
      { id: "obras", title: "Obras", icon: Image },
      { id: "colecoes", title: "Coleções / Séries", icon: Layers },
      { id: "producao", title: "Produção e Tiragem", icon: Printer },
    ],
  },
  {
    label: "Logística",
    items: [
      { id: "localizacao", title: "Localização", icon: Navigation },
    ],
  },
  {
    label: "Comercial",
    items: [
      { id: "contatos", title: "Contatos", icon: Users },
      { id: "vendas", title: "Vendas", icon: BarChart3 },
    ],
  },
  {
    label: "Arquivo",
    items: [
      { id: "documentos", title: "Documentos", icon: FileText },
      { id: "certificados", title: "Certificados (COA)", icon: ShieldCheck },
    ],
  },
];

const menuColecionador: MenuGroup[] = [
  {
    label: "Acervo",
    items: [
      { id: "obras", title: "Meu Acervo", icon: Image },
      { id: "certificados", title: "Certificados", icon: Award },
      { id: "configuracoes", title: "Configurações", icon: Settings },
    ],
  },
];

const titulosPagina: Record<string, string> = {
  obras: "Meu Acervo",
  bio: "Bio",
  exposicoes: "Exposições",
  agenda: "Agenda",
  "mapa-obra": "Mapa da Obra",
  colecoes: "Coleções / Séries",
  producao: "Produção e Tiragem",
  localizacao: "Localização",
  contatos: "Contatos",
  vendas: "Vendas",
  documentos: "Documentos",
  certificados: "Certificados (COA)",
  configuracoes: "Configurações",
};

function AppSidebar({
  onSair,
  perfil,
  artistas,
  paginaAtiva,
  onNavegar,
}: {
  onSair: () => void;
  perfil: string;
  artistas: Artista[];
  paginaAtiva: string;
  onNavegar: (id: string) => void;
}) {
  const isColecionador = perfil === "colecionador";
  const grupos = isColecionador ? menuColecionador : menuArtista;

  const sidebarUser = isColecionador
    ? { nome: "Minha Coleção", iniciais: "MC", foto: "" }
    : { nome: artistas[0]?.nome || "Usuário", iniciais: artistas[0]?.iniciais || "U", foto: artistas[0]?.foto || "" };

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
            <SidebarGroupLabel>{grupo.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {grupo.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={paginaAtiva === item.id}
                      onClick={() => onNavegar(item.id)}
                      data-testid={`button-menu-${item.id}`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
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
          <span className="text-sm font-medium text-foreground truncate" data-testid="text-nome-artista">
            {sidebarUser.nome}
          </span>
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

function ObraCard({ obra, artista }: { obra: Obra; artista?: Artista }) {
  const artistaLabel = artista ? `${artista.nome} (${artista.anos})` : "";
  const colecao = colecoesObras[obra.id];

  return (
    <Card className="flex flex-col" data-testid={`card-obra-${obra.id}`}>
      <img
        src={obra.imagem}
        alt={obra.titulo}
        className="h-56 w-full object-cover rounded-t-md"
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

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            data-testid={`button-editar-${obra.id}`}
          >
            <Pencil className="mr-1.5 h-3.5 w-3.5" />
            Editar
          </Button>
          <Button
            size="sm"
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

function NovaObraModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [titulo, setTitulo] = useState("");
  const [tecnica, setTecnica] = useState("");
  const [ano, setAno] = useState("");
  const [dimensoes, setDimensoes] = useState("");
  const [preco, setPreco] = useState("");
  const [status, setStatus] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [medium, setMedium] = useState("");
  const [edicao, setEdicao] = useState("");

  function handleSalvar() {
    alert("Obra salva com sucesso!");
    setTitulo("");
    setTecnica("");
    setAno("");
    setDimensoes("");
    setPreco("");
    setStatus("");
    setLocalizacao("");
    setMedium("");
    setEdicao("");
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
              <Label htmlFor="dimensoes">Tamanho</Label>
              <Input
                id="dimensoes"
                placeholder="Ex: 100x100 cm"
                value={dimensoes}
                onChange={(e) => setDimensoes(e.target.value)}
                data-testid="input-dimensoes"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="edicao">Edição / Tiragem</Label>
              <Input
                id="edicao"
                placeholder="Ex: 1/50, Única"
                value={edicao}
                onChange={(e) => setEdicao(e.target.value)}
                data-testid="input-edicao"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger data-testid="select-status">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="acervo">Acervo</SelectItem>
                <SelectItem value="vendida">Vendida</SelectItem>
                <SelectItem value="consignada">Consignada</SelectItem>
                <SelectItem value="exposicao">Exposição</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="localizacao">Localização</Label>
            <Input
              id="localizacao"
              placeholder="Ex: Galeria Arte SP, São Paulo"
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
              data-testid="input-localizacao"
            />
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
          <Button onClick={handleSalvar} data-testid="button-salvar-obra">
            Salvar Obra
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ArtistaAcervo({
  artistas,
  obras,
  filtro,
}: {
  artistas: Artista[];
  obras: Obra[];
  filtro: string;
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
                <ObraCard key={obra.id} obra={obra} artista={artista} />
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
}: {
  artistas: Artista[];
  obras: Obra[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {obras.map((obra) => {
        const artista = artistas.find((a) => a.id === obra.artistaId);
        return <ObraCard key={obra.id} obra={obra} artista={artista} />;
      })}
    </div>
  );
}

function PaginaObras({
  perfil,
  artistas,
  obras,
  filtro,
  setFiltro,
}: {
  perfil: string;
  artistas: Artista[];
  obras: Obra[];
  filtro: string;
  setFiltro: (f: string) => void;
}) {
  const isColecionador = perfil === "colecionador";

  return (
    <div className="flex-1 overflow-y-auto">
      {isColecionador && (
        <div className="flex items-center gap-2 px-6 pt-5 flex-wrap">
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
        </div>
      )}

      <div className="p-6">
        {isColecionador ? (
          <ArtistaAcervo artistas={artistas} obras={obras} filtro={filtro} />
        ) : (
          <AcervoSimples artistas={artistas} obras={obras} />
        )}
      </div>
    </div>
  );
}

const placeholderPages = [
  "exposicoes", "agenda", "colecoes", "producao",
  "localizacao", "contatos", "vendas", "documentos", "certificados", "configuracoes",
];

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [perfil, setPerfil] = useState<string>("artista");
  const [modalAberto, setModalAberto] = useState(false);
  const [filtro, setFiltro] = useState("todos");
  const [paginaAtiva, setPaginaAtiva] = useState("obras");

  useEffect(() => {
    const saved = localStorage.getItem("artflow_profile");
    if (saved) setPerfil(saved);
  }, []);

  const isColecionador = perfil === "colecionador";
  const artistas = isColecionador ? artistasColecionador : artistasPissarro;
  const obras = isColecionador ? obrasColecionador : obrasPissarro;

  function handleSair() {
    localStorage.removeItem("artflow_profile");
    navigate("/");
  }

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  const tituloPagina = titulosPagina[paginaAtiva] || "Meu Acervo";
  const mostrarBotaoNovaObra = paginaAtiva === "obras";

  function renderConteudo() {
    switch (paginaAtiva) {
      case "obras":
        return (
          <PaginaObras
            perfil={perfil}
            artistas={artistas}
            obras={obras}
            filtro={filtro}
            setFiltro={setFiltro}
          />
        );
      case "bio":
        return <Bio />;
      case "mapa-obra":
        return <MapaObra />;
      case "exposicoes":
        return <Exposicoes />;
      case "vendas":
        return <Vendas />;
      case "agenda":
        return <Agenda />;
      case "contatos":
        return <Contatos />;
      case "localizacao":
        return <Localizacao />;
      case "producao":
        return <Producao />;
      case "colecoes":
        return <Colecoes />;
      case "documentos":
        return <Documentos />;
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
              <Button
                onClick={() => setModalAberto(true)}
                data-testid="button-nova-obra"
              >
                <Plus className="mr-2 h-4 w-4" />
                Nova Obra
              </Button>
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
      />
    </SidebarProvider>
  );
}
