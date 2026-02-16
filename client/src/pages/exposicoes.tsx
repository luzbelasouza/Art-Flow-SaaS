import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, CalendarDays } from "lucide-react";

import contextImg from "@assets/1-context_1771204595709.jpg";
import singapureImg from "@assets/2-Singapure_1771204595713.jpg";
import starImg from "@assets/3-star_1771204595714.jpeg";

interface Exposicao {
  id: string;
  nome: string;
  local: string;
  pais: string;
  data: string;
  status: "passada" | "futura";
  imagem: string;
}

const exposicoes: Exposicao[] = [
  {
    id: "context",
    nome: "CONTEXT Art Miami",
    local: "Miami",
    pais: "EUA",
    data: "Dezembro 2025",
    status: "passada",
    imagem: contextImg,
  },
  {
    id: "singapore",
    nome: "Art Stage Singapore",
    local: "Marina Bay",
    pais: "Singapura",
    data: "Junho 2026",
    status: "futura",
    imagem: singapureImg,
  },
  {
    id: "start",
    nome: "START Art Fair",
    local: "Londres",
    pais: "Reino Unido",
    data: "Setembro 2026",
    status: "futura",
    imagem: starImg,
  },
];

export default function Exposicoes() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {exposicoes.map((expo) => (
          <Card
            key={expo.id}
            className="flex flex-col md:flex-row"
            data-testid={`card-expo-${expo.id}`}
          >
            <img
              src={expo.imagem}
              alt={expo.nome}
              className="h-52 md:h-auto md:w-72 w-full object-cover rounded-t-md md:rounded-t-none md:rounded-l-md flex-shrink-0"
              data-testid={`img-expo-${expo.id}`}
            />
            <div className="p-6 flex flex-col justify-center gap-3 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3
                  className="text-xl font-semibold text-foreground"
                  data-testid={`text-nome-expo-${expo.id}`}
                >
                  {expo.nome}
                </h3>
                <Badge
                  variant={expo.status === "futura" ? "default" : "secondary"}
                  data-testid={`badge-status-expo-${expo.id}`}
                >
                  {expo.status === "futura" ? "Futura" : "Realizada"}
                </Badge>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span data-testid={`text-local-expo-${expo.id}`}>
                  {expo.local}, {expo.pais}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4 flex-shrink-0" />
                <span data-testid={`text-data-expo-${expo.id}`}>{expo.data}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
