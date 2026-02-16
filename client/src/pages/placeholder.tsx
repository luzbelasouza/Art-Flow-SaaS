import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Construction } from "lucide-react";

const titulos: Record<string, string> = {
  exposicoes: "Exposições",
  agenda: "Agenda",
  colecoes: "Coleções / Séries",
  producao: "Produção e Tiragem",
  localizacao: "Localização",
  contatos: "Contatos",
  vendas: "Vendas",
  documentos: "Documentos",
  certificados: "Certificados (COA)",
};

export default function Placeholder({ page }: { page: string }) {
  const [, navigate] = useLocation();
  const titulo = titulos[page] || page;

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-8">
      <Card className="flex flex-col items-center gap-6 p-10 max-w-md w-full text-center">
        <Construction className="h-12 w-12 text-muted-foreground" />
        <h1
          className="text-2xl font-semibold text-foreground"
          data-testid={`text-titulo-${page}`}
        >
          {titulo}
        </h1>
        <p className="text-muted-foreground" data-testid={`text-dev-${page}`}>
          Em desenvolvimento
        </p>
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard")}
          data-testid={`button-voltar-${page}`}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao Acervo
        </Button>
      </Card>
    </div>
  );
}
