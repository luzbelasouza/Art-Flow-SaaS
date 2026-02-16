import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, Users } from "lucide-react";

interface Contato {
  id: string;
  nome: string;
  tipo: string;
  email: string;
  telefone: string;
  iniciais: string;
}

const contatos: Contato[] = [
  {
    id: "joao",
    nome: "João Vicente",
    tipo: "Colecionador",
    email: "joao.vicente@email.com",
    telefone: "(21) 99876-5432",
    iniciais: "JV",
  },
  {
    id: "angela",
    nome: "Angela Marques",
    tipo: "Decoradora",
    email: "angela.marques@decor.com",
    telefone: "(11) 98765-4321",
    iniciais: "AM",
  },
  {
    id: "graphitte",
    nome: "Galeria Graphitte",
    tipo: "Comercial",
    email: "contato@graphitte.com.br",
    telefone: "(11) 3456-7890",
    iniciais: "GG",
  },
];

export default function Contatos() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground" data-testid="text-titulo-contatos">
            Contatos
          </h2>
          <Badge variant="secondary">{contatos.length}</Badge>
        </div>

        <div className="space-y-4">
          {contatos.map((contato) => (
            <Card
              key={contato.id}
              className="p-5"
              data-testid={`card-contato-${contato.id}`}
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-11 w-11 flex-shrink-0" data-testid={`avatar-contato-${contato.id}`}>
                  <AvatarFallback>{contato.iniciais}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3
                      className="text-base font-semibold text-foreground"
                      data-testid={`text-nome-contato-${contato.id}`}
                    >
                      {contato.nome}
                    </h3>
                    <Badge variant="secondary" data-testid={`badge-tipo-contato-${contato.id}`}>
                      {contato.tipo}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                      <span data-testid={`text-email-contato-${contato.id}`}>{contato.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                      <span data-testid={`text-tel-contato-${contato.id}`}>{contato.telefone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
