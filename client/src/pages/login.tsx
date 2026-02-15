import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

export default function Login() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("teste@artflow.com");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email === "teste@artflow.com" && senha === "123456") {
      setErro("");
      navigate("/dashboard");
    } else {
      setErro("Credenciais inválidas. Use teste@artflow.com / 123456");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/">
          <button
            className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6 cursor-pointer"
            data-testid="button-back-home-login"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para a Home
          </button>
        </Link>

        <Card className="p-8">
          <h1
            className="text-2xl font-semibold text-foreground text-center"
            data-testid="text-login-title"
          >
            Acesse seu Acervo
          </h1>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                placeholder="Sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                data-testid="input-senha"
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-2"
              data-testid="button-entrar"
            >
              Entrar
            </Button>

            {erro && (
              <p
                className="text-sm text-destructive text-center"
                data-testid="text-erro-login"
              >
                {erro}
              </p>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Ainda não tem conta?{" "}
            <Link href="/cadastro">
              <span
                className="text-primary font-medium cursor-pointer"
                data-testid="link-ir-cadastro"
              >
                Cadastre-se
              </span>
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
