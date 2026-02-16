import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { MapPin, Navigation, Plus } from "lucide-react";

interface Local {
  id: string;
  nome: string;
  endereco: string;
  tipo: "feira" | "venda" | "galeria" | "deposito" | "emprestimo" | "doacao";
  detalhe: string;
}

const locaisIniciais: Local[] = [
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
  {
    id: "museu-ipiranga",
    nome: "Museu do Ipiranga",
    endereco: "Parque da Independência, São Paulo, SP – Brasil",
    tipo: "emprestimo",
    detalhe: "Empréstimo para exposição temporária",
  },
  {
    id: "instituto-cultural",
    nome: "Instituto Cultural Itaú",
    endereco: "Av. Paulista, 149, São Paulo, SP – Brasil",
    tipo: "doacao",
    detalhe: "Doação para acervo permanente",
  },
];

const tipoLabels: Record<string, string> = {
  feira: "Feira",
  venda: "Venda",
  galeria: "Galeria",
  deposito: "Depósito",
  emprestimo: "Empréstimo",
  doacao: "Doação",
};

export { locaisIniciais };
export type { Local };

export default function Localizacao({ onNovaLocalizacao }: { onNovaLocalizacao?: (nome: string, tipo?: string) => void }) {
  const [locais, setLocais] = useState<Local[]>(locaisIniciais);
  const [modalAberto, setModalAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [tipo, setTipo] = useState("");
  const [detalhe, setDetalhe] = useState("");

  function handleSalvar() {
    if (!nome.trim() || !endereco.trim()) return;
    const novo: Local = {
      id: `loc-${Date.now()}`,
      nome: nome.trim(),
      endereco: endereco.trim(),
      tipo: (tipo || "galeria") as Local["tipo"],
      detalhe: detalhe.trim() || "",
    };
    setLocais([...locais, novo]);
    onNovaLocalizacao?.(nome.trim(), novo.tipo);
    setNome("");
    setEndereco("");
    setTipo("");
    setDetalhe("");
    setModalAberto(false);
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
          <div className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground" data-testid="text-titulo-localizacao">
              Localização
            </h2>
            <Badge variant="secondary">{locais.length}</Badge>
          </div>
          <Button
            onClick={() => setModalAberto(true)}
            style={{ backgroundColor: "#16a34a", borderColor: "#16a34a", color: "#fff" }}
            data-testid="button-nova-localizacao"
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Local
          </Button>
        </div>

        <div className="space-y-4">
          {locais.map((local) => (
            <Card
              key={local.id}
              className="p-5"
              data-testid={`card-local-${local.id}`}
            >
              <div className="flex items-start gap-4">
                <div className={`flex items-center justify-center h-10 w-10 rounded-md flex-shrink-0 ${local.tipo === "feira" ? "bg-rose-500/10" : local.tipo === "galeria" ? "bg-blue-500/10" : local.tipo === "deposito" ? "bg-amber-500/10" : local.tipo === "emprestimo" ? "bg-indigo-500/10" : local.tipo === "doacao" ? "bg-purple-500/10" : "bg-emerald-500/10"}`}>
                  <MapPin className={`h-5 w-5 ${local.tipo === "feira" ? "text-rose-500" : local.tipo === "galeria" ? "text-blue-500" : local.tipo === "deposito" ? "text-amber-500" : local.tipo === "emprestimo" ? "text-indigo-500" : local.tipo === "doacao" ? "text-purple-500" : "text-emerald-600"}`} />
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
                      {tipoLabels[local.tipo] || local.tipo}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground" data-testid={`text-endereco-local-${local.id}`}>
                    {local.endereco}
                  </p>
                  {local.detalhe && <p className="text-xs text-muted-foreground">{local.detalhe}</p>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={modalAberto} onOpenChange={(v) => !v && setModalAberto(false)}>
        <DialogContent className="sm:max-w-md" data-testid="modal-nova-localizacao">
          <DialogHeader>
            <DialogTitle data-testid="text-modal-localizacao-title">Novo Local</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="nome-local">Nome</Label>
              <Input
                id="nome-local"
                placeholder='Ex: "Galeria Centro"'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                data-testid="input-nome-local"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="endereco-local">Endereço</Label>
              <Input
                id="endereco-local"
                placeholder="Ex: Rua Augusta, 100 – São Paulo, SP"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                data-testid="input-endereco-local"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Tipo</Label>
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger data-testid="select-tipo-local">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="galeria">Galeria</SelectItem>
                  <SelectItem value="deposito">Depósito</SelectItem>
                  <SelectItem value="feira">Feira</SelectItem>
                  <SelectItem value="venda">Venda</SelectItem>
                  <SelectItem value="emprestimo">Empréstimo</SelectItem>
                  <SelectItem value="doacao">Doação</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="detalhe-local">Detalhes (opcional)</Label>
              <Input
                id="detalhe-local"
                placeholder="Ex: Espaço de 200m²"
                value={detalhe}
                onChange={(e) => setDetalhe(e.target.value)}
                data-testid="input-detalhe-local"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setModalAberto(false)} data-testid="button-cancelar-local">Cancelar</Button>
            <Button onClick={handleSalvar} disabled={!nome.trim() || !endereco.trim()} data-testid="button-salvar-local">Salvar Local</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
