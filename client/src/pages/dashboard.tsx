import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut } from "lucide-react";

const perfilLabels: Record<string, string> = {
  artista: "Artista",
  colecionador: "Colecionador",
  galeria: "Galeria",
};

export default function Dashboard() {
  const [, navigate] = useLocation();
  const [perfil, setPerfil] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("artflow_profile");
    setPerfil(saved);
  }, []);

  function handleSair() {
    localStorage.removeItem("artflow_profile");
    navigate("/");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <h1
        className="text-4xl font-light tracking-tight text-foreground"
        data-testid="text-dashboard-title"
      >
        Dashboard em construção...
      </h1>

      {perfil && (
        <div className="mt-6 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Perfil:</span>
          <Badge variant="secondary" data-testid="badge-perfil">
            {perfilLabels[perfil] || perfil}
          </Badge>
        </div>
      )}

      <Button
        variant="outline"
        className="mt-10"
        onClick={handleSair}
        data-testid="button-sair"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sair
      </Button>
    </div>
  );
}
