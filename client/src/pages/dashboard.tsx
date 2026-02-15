import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  ImageOff,
  Upload,
} from "lucide-react";

const perfilLabels: Record<string, string> = {
  artista: "Artista",
  colecionador: "Colecionador",
  galeria: "Galeria",
};

const menuItems = [
  { title: "Meu Acervo", icon: Image, active: true },
  { title: "Certificados", icon: Award, active: false },
  { title: "Configurações", icon: Settings, active: false },
];

function AppSidebar({ onSair }: { onSair: () => void }) {
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
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={item.active}
                    data-testid={`button-menu-${item.title.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
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

  function handleSalvar() {
    alert("Obra salva com sucesso!");
    setTitulo("");
    setTecnica("");
    setAno("");
    setDimensoes("");
    setPreco("");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg" data-testid="modal-nova-obra">
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
              <Label htmlFor="dimensoes">Dimensões</Label>
              <Input
                id="dimensoes"
                placeholder="Ex: 100x100 cm"
                value={dimensoes}
                onChange={(e) => setDimensoes(e.target.value)}
                data-testid="input-dimensoes"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="preco">Preço / Valor Estimado (R$)</Label>
            <Input
              id="preco"
              placeholder="Ex: 5.000,00"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              data-testid="input-preco"
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

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [perfil, setPerfil] = useState<string>("artista");
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("artflow_profile");
    if (saved) setPerfil(saved);
  }, []);

  function handleSair() {
    localStorage.removeItem("artflow_profile");
    navigate("/");
  }

  const sidebarStyle = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={sidebarStyle as React.CSSProperties}>
      <div className="flex h-screen w-full bg-muted/30">
        <AppSidebar onSair={handleSair} />

        <div className="flex flex-col flex-1 min-w-0">
          <header className="flex items-center justify-between gap-4 flex-wrap border-b bg-background px-6 py-4">
            <div className="flex items-center gap-3 flex-wrap">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <h1
                className="text-2xl font-semibold text-foreground"
                data-testid="text-dashboard-title"
              >
                Meu Acervo
              </h1>
              <Badge variant="secondary" data-testid="badge-perfil">
                Perfil: {perfilLabels[perfil] || perfil}
              </Badge>
            </div>

            <Button
              onClick={() => setModalAberto(true)}
              data-testid="button-nova-obra"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nova Obra
            </Button>
          </header>

          <main className="flex-1 flex items-center justify-center p-6">
            <div className="text-center max-w-md">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-md bg-muted">
                <ImageOff className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2
                className="mt-6 text-xl font-semibold text-foreground"
                data-testid="text-empty-title"
              >
                Seu acervo está vazio
              </h2>
              <p
                className="mt-2 text-muted-foreground leading-relaxed"
                data-testid="text-empty-subtitle"
              >
                Clique em &lsquo;+ Nova Obra&rsquo; para começar a catalogar
                sua coleção.
              </p>
            </div>
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
