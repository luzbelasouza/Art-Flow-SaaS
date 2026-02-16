import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Clock } from "lucide-react";

import singapureImg from "@assets/2-Singapure_1771204595713.jpg";
import starImg from "@assets/3-star_1771204595714.jpeg";

interface Evento {
  id: string;
  nome: string;
  local: string;
  pais: string;
  data: string;
  mes: string;
  dia: string;
  horario: string;
  imagem: string;
}

const eventos: Evento[] = [
  {
    id: "singapore",
    nome: "Art Stage Singapore",
    local: "Marina Bay",
    pais: "Singapura",
    data: "15 de Junho de 2026",
    mes: "JUN",
    dia: "15",
    horario: "10:00 – 20:00",
    imagem: singapureImg,
  },
  {
    id: "start",
    nome: "START Art Fair",
    local: "Londres",
    pais: "Reino Unido",
    data: "10 de Setembro de 2026",
    mes: "SET",
    dia: "10",
    horario: "11:00 – 19:00",
    imagem: starImg,
  },
];

export default function Agenda() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <CalendarDays className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground" data-testid="text-titulo-agenda">
            Próximos Eventos
          </h2>
          <Badge variant="secondary">{eventos.length}</Badge>
        </div>

        {eventos.map((evento) => (
          <Card
            key={evento.id}
            className="flex flex-col sm:flex-row"
            data-testid={`card-evento-${evento.id}`}
          >
            <div className="flex items-center justify-center sm:w-24 bg-muted/50 rounded-t-md sm:rounded-t-none sm:rounded-l-md p-4 flex-shrink-0">
              <div className="text-center">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {evento.mes}
                </p>
                <p className="text-3xl font-bold text-foreground">{evento.dia}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-1 min-w-0">
              <img
                src={evento.imagem}
                alt={evento.nome}
                className="h-36 sm:h-auto sm:w-44 w-full object-cover flex-shrink-0"
                data-testid={`img-evento-${evento.id}`}
              />
              <div className="p-5 flex flex-col justify-center gap-2 flex-1">
                <h3
                  className="text-lg font-semibold text-foreground"
                  data-testid={`text-nome-evento-${evento.id}`}
                >
                  {evento.nome}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{evento.local}, {evento.pais}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{evento.data}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{evento.horario}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
