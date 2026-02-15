import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
} from "lucide-react";

import colheitaImg from "@assets/colheita_1771198582489.png";
import camponesasImg from "@assets/camponesas_1771198582484.png";
import respigadoresImg from "@assets/respigadores_1771198582490.png";
import pissarroImg from "@assets/pissarro_1771198589992.png";

const perfilLabels: Record<string, string> = {
  artista: "Artista",
  colecionador: "Colecionador",
  galeria: "Galeria",
};

const obras = [
  {
    id: 1,
    titulo: "Colheita das Maçãs",
    artista: "Camille Pissarro (1830–1903)",
    tecnica: "Óleo sobre tela",
    ano: 1888,
    imagem: colheitaImg,
  },
  {
    id: 2,
    titulo: "Jovens Camponesas Descansando",
    artista: "Camille Pissarro (1830–1903)",
    tecnica: "Óleo sobre tela",
    ano: 1882,
    imagem: camponesasImg,
  },
  {
    id: 3,
    titulo: "Os Respigadores",
    artista: "Camille Pissarro (1830–1903)",
    tecnica: "Óleo sobre tela",
    ano: 1889,
    imagem: respigadoresImg,
  },
];

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

      <SidebarFooter className="p-3 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <Avatar className="h-8 w-8" data-testid="avatar-artista">
            <AvatarImage src={pissarroImg} alt="Camille Pissarro" />
            <AvatarFallback>CP</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground truncate" data-testid="text-nome-artista">
            Camille Pissarro
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

          <main className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {obras.map((obra) => (
                <Card key={obra.id} className="flex flex-col" data-testid={`card-obra-${obra.id}`}>
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
                      {obra.artista}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Técnica: {obra.tecnica} | Ano: {obra.ano}
                    </p>

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
              ))}
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
