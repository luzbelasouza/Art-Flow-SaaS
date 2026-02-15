import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Palette, BookOpen, Building2 } from "lucide-react";

const profiles = [
  { id: "artista", label: "Sou Artista", icon: Palette },
  { id: "colecionador", label: "Sou Colecionador", icon: BookOpen },
  { id: "galeria", label: "Sou Galeria", icon: Building2 },
] as const;

export default function Cadastro() {
  const [, navigate] = useLocation();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/">
          <button
            className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6 cursor-pointer"
            data-testid="button-back-home-cadastro"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para a Home
          </button>
        </Link>

        <Card className="p-8">
          <h1
            className="text-2xl font-semibold text-foreground text-center"
            data-testid="text-cadastro-title"
          >
            Crie sua conta no Art Flow
          </h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                type="text"
                placeholder="Seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                data-testid="input-nome"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="input-email"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                placeholder="Crie uma senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                data-testid="input-senha"
              />
            </div>

            <div className="space-y-2">
              <Label>Selecione seu Perfil</Label>
              <div className="grid grid-cols-3 gap-3">
                {profiles.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPerfil(p.id)}
                    className={`flex flex-col items-center gap-2 rounded-md border p-4 text-sm font-medium transition-colors cursor-pointer ${
                      perfil === p.id
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted-foreground"
                    }`}
                    data-testid={`button-perfil-${p.id}`}
                  >
                    <p.icon className="h-5 w-5" />
                    <span className="text-xs leading-tight text-center">
                      {p.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-2"
              data-testid="button-criar-conta"
            >
              Criar Conta
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/login">
              <span
                className="text-primary font-medium cursor-pointer"
                data-testid="link-ir-login"
              >
                Faça Login
              </span>
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
