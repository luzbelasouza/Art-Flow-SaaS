import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, LayoutDashboard } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <h1
        className="text-5xl md:text-6xl font-light tracking-tight text-foreground mb-3"
        data-testid="text-home-title"
      >
        Art Flow
      </h1>
      <p
        className="text-muted-foreground text-lg mb-12"
        data-testid="text-home-subtitle"
      >
        Gestão de Acervo de Arte
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/login">
          <Button variant="default" data-testid="button-go-login">
            <LogIn className="mr-2 h-4 w-4" />
            Entrar
          </Button>
        </Link>

        <Link href="/cadastro">
          <Button variant="outline" data-testid="button-go-cadastro">
            <UserPlus className="mr-2 h-4 w-4" />
            Cadastrar
          </Button>
        </Link>

        <Link href="/dashboard">
          <Button variant="secondary" data-testid="button-go-dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
