import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Mail, Phone, Users, Plus } from "lucide-react";

interface Contato {
  id: string;
  nome: string;
  tipo: string;
  email: string;
  telefone: string;
  iniciais: string;
}

const contatosIniciais: Contato[] = [
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

function getIniciais(nome: string) {
  const partes = nome.trim().split(/\s+/);
  if (partes.length >= 2) return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  return nome.slice(0, 2).toUpperCase();
}

export default function Contatos() {
  const [contatos, setContatos] = useState<Contato[]>(contatosIniciais);
  const [modalAberto, setModalAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  function handleSalvar() {
    if (!nome.trim()) return;
    const novo: Contato = {
      id: `ct-${Date.now()}`,
      nome: nome.trim(),
      tipo: tipo || "Outro",
      email: email.trim(),
      telefone: telefone.trim(),
      iniciais: getIniciais(nome),
    };
    setContatos([...contatos, novo]);
    setNome("");
    setTipo("");
    setEmail("");
    setTelefone("");
    setModalAberto(false);
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground" data-testid="text-titulo-contatos">
              Contatos
            </h2>
            <Badge variant="secondary">{contatos.length}</Badge>
          </div>
          <Button
            onClick={() => setModalAberto(true)}
            style={{ backgroundColor: "#16a34a", borderColor: "#16a34a", color: "#fff" }}
            data-testid="button-novo-contato"
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Contato
          </Button>
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
                    {contato.email && (
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                        <span data-testid={`text-email-contato-${contato.id}`}>{contato.email}</span>
                      </div>
                    )}
                    {contato.telefone && (
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                        <span data-testid={`text-tel-contato-${contato.id}`}>{contato.telefone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={modalAberto} onOpenChange={(v) => !v && setModalAberto(false)}>
        <DialogContent className="sm:max-w-md" data-testid="modal-novo-contato">
          <DialogHeader>
            <DialogTitle data-testid="text-modal-contato-title">Novo Contato</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="nome-contato">Nome</Label>
              <Input
                id="nome-contato"
                placeholder='Ex: "Maria Santos"'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                data-testid="input-nome-contato"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Tipo</Label>
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger data-testid="select-tipo-contato">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Colecionador">Colecionador</SelectItem>
                  <SelectItem value="Galerista">Galerista</SelectItem>
                  <SelectItem value="Decoradora">Decoradora</SelectItem>
                  <SelectItem value="Curador">Curador</SelectItem>
                  <SelectItem value="Comercial">Comercial</SelectItem>
                  <SelectItem value="Parceiro">Parceiro</SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email-contato">E-mail</Label>
              <Input
                id="email-contato"
                type="email"
                placeholder="contato@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="input-email-contato"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tel-contato">Telefone</Label>
              <Input
                id="tel-contato"
                placeholder="(11) 99999-9999"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                data-testid="input-tel-contato"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setModalAberto(false)} data-testid="button-cancelar-contato">Cancelar</Button>
            <Button onClick={handleSalvar} disabled={!nome.trim()} data-testid="button-salvar-contato">Salvar Contato</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
