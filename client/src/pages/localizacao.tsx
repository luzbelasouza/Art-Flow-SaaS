import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation } from "lucide-react";

interface Local {
  id: string;
  nome: string;
  endereco: string;
  tipo: "feira" | "venda";
  detalhe: string;
}

const locais: Local[] = [
  {
    id: "miami",
    nome: "CONTEXT Art Miami",
    endereco: "One Herald Plaza, Miami, FL – EUA",
    tipo: "feira",
    detalhe: "Feira de Arte Contemporânea",
  },
  {
    id: "singapore",
    nome: "Art Stage Singapore",
    endereco: "Marina Bay Sands, 10 Bayfront Ave – Singapura",
    tipo: "feira",
    detalhe: "Feira de Arte Asiática",
  },
  {
    id: "londres",
    nome: "START Art Fair",
    endereco: "Saatchi Gallery, Duke of York's HQ, Londres – Reino Unido",
    tipo: "feira",
    detalhe: "Feira de Artistas Emergentes",
  },
  {
    id: "rj",
    nome: "Coleção João Vicente",
    endereco: "Leblon, Rio de Janeiro, RJ – Brasil",
    tipo: "venda",
    detalhe: "Colheita das Maçãs (Vendida)",
  },
  {
    id: "sp-angela",
    nome: "Escritório Angela Marques",
    endereco: "Jardins, São Paulo, SP – Brasil",
    tipo: "venda",
    detalhe: "Jovens Camponesas Descansando (Vendida)",
  },
  {
    id: "sp-graphitte",
    nome: "Galeria Graphitte",
    endereco: "Vila Madalena, São Paulo, SP – Brasil",
    tipo: "venda",
    detalhe: "Os Respigadores (Vendida)",
  },
];

export default function Localizacao() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Navigation className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground" data-testid="text-titulo-localizacao">
            Localização
          </h2>
          <Badge variant="secondary">{locais.length}</Badge>
        </div>

        <div className="space-y-4">
          {locais.map((local) => (
            <Card
              key={local.id}
              className="p-5"
              data-testid={`card-local-${local.id}`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex items-center justify-center h-10 w-10 rounded-md flex-shrink-0 ${local.tipo === "feira" ? "bg-rose-500/10" : "bg-emerald-500/10"}`}>
                  <MapPin className={`h-5 w-5 ${local.tipo === "feira" ? "text-rose-500" : "text-emerald-600"}`} />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3
                      className="font-semibold text-foreground"
                      data-testid={`text-nome-local-${local.id}`}
                    >
                      {local.nome}
                    </h3>
                    <Badge variant={local.tipo === "feira" ? "default" : "secondary"}>
                      {local.tipo === "feira" ? "Feira" : "Venda"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground" data-testid={`text-endereco-local-${local.id}`}>
                    {local.endereco}
                  </p>
                  <p className="text-xs text-muted-foreground">{local.detalhe}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
