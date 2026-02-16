import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, MapPin, Globe, Plus } from "lucide-react";

export interface Representacao {
  id: string;
  nome: string;
  tipo: string;
  cidade: string;
  pais: string;
  contato: string;
  status: "ativa" | "inativa";
}

const representacoesIniciais: Representacao[] = [
  {
    id: "rep-1",
    nome: "Galeria Graphitte",
    tipo: "Galeria",
    cidade: "São Paulo",
    pais: "Brasil",
    contato: "contato@graphitte.com.br",
    status: "ativa",
  },
  {
    id: "rep-2",
    nome: "Saatchi Gallery",
    tipo: "Galeria",
    cidade: "Londres",
    pais: "Reino Unido",
    contato: "info@saatchigallery.com",
    status: "ativa",
  },
  {
    id: "rep-3",
    nome: "Marchand Pierre Duval",
    tipo: "Marchand",
    cidade: "Paris",
    pais: "França",
    contato: "pierre@duval-art.fr",
    status: "inativa",
  },
];

export default function Representacao({ onNovaRepresentacao }: { onNovaRepresentacao?: (nome: string) => void }) {
  const [representacoes, setRepresentacoes] = useState<Representacao[]>(representacoesIniciais);
  const [modalAberto, setModalAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("Galeria");
  const [cidade, setCidade] = useState("");
  const [pais, setPais] = useState("");
  const [contato, setContato] = useState("");

  function handleSalvar() {
    if (!nome.trim()) return;
    const nova: Representacao = {
      id: `rep-${Date.now()}`,
      nome: nome.trim(),
      tipo,
      cidade: cidade.trim() || "Cidade não informada",
      pais: pais.trim() || "",
      contato: contato.trim() || "",
      status: "ativa",
    };
    setRepresentacoes([...representacoes, nova]);
    onNovaRepresentacao?.(nova.nome);
    setNome("");
    setTipo("Galeria");
    setCidade("");
    setPais("");
    setContato("");
    setModalAberto(false);
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground" data-testid="text-titulo-representacao">
              Representação
            </h2>
            <Badge variant="secondary">{representacoes.length}</Badge>
          </div>
          <Button
            onClick={() => setModalAberto(true)}
            style={{ backgroundColor: "#16a34a", borderColor: "#16a34a", color: "#fff" }}
            data-testid="button-nova-representacao"
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Representação
          </Button>
        </div>

        <div className="space-y-4">
          {representacoes.map((rep) => (
            <Card key={rep.id} className="p-5" data-testid={`card-representacao-${rep.id}`}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-foreground" data-testid={`text-nome-rep-${rep.id}`}>
                      {rep.nome}
                    </h3>
                    <Badge variant="secondary" data-testid={`badge-tipo-rep-${rep.id}`}>
                      {rep.tipo}
                    </Badge>
                    <Badge
                      variant={rep.status === "ativa" ? "default" : "outline"}
                      data-testid={`badge-status-rep-${rep.id}`}
                    >
                      {rep.status === "ativa" ? "Ativa" : "Inativa"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{rep.cidade}{rep.pais ? `, ${rep.pais}` : ""}</span>
                  </div>
                  {rep.contato && (
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Globe className="h-3.5 w-3.5 flex-shrink-0" />
                      <span>{rep.contato}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={modalAberto} onOpenChange={(v) => !v && setModalAberto(false)}>
        <DialogContent className="sm:max-w-md" data-testid="modal-nova-representacao">
          <DialogHeader>
            <DialogTitle data-testid="text-modal-representacao-title">Nova Representação</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="nome-representacao">Nome da Galeria / Marchand</Label>
              <Input
                id="nome-representacao"
                placeholder='Ex: "Galeria XYZ"'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                data-testid="input-nome-representacao"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Tipo</Label>
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger data-testid="select-tipo-representacao">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Galeria">Galeria</SelectItem>
                  <SelectItem value="Marchand">Marchand</SelectItem>
                  <SelectItem value="Curador">Curador</SelectItem>
                  <SelectItem value="Agente">Agente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="cidade-representacao">Cidade</Label>
                <Input
                  id="cidade-representacao"
                  placeholder="Ex: São Paulo"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  data-testid="input-cidade-representacao"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pais-representacao">País</Label>
                <Input
                  id="pais-representacao"
                  placeholder="Ex: Brasil"
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                  data-testid="input-pais-representacao"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contato-representacao">E-mail de Contato</Label>
              <Input
                id="contato-representacao"
                placeholder="Ex: contato@galeria.com"
                value={contato}
                onChange={(e) => setContato(e.target.value)}
                data-testid="input-contato-representacao"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setModalAberto(false)} data-testid="button-cancelar-representacao">Cancelar</Button>
            <Button onClick={handleSalvar} disabled={!nome.trim()} data-testid="button-salvar-representacao">Salvar Representação</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { representacoesIniciais };
