import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [perfil, setPerfil] = useState<string>("artista");

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

            <Button data-testid="button-nova-obra">
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
    </SidebarProvider>
  );
}
