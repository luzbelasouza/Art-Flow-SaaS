import { useState, useMemo } from "react";
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
import { Plus, Search, HandHeart, Gift, Calendar } from "lucide-react";

interface Obra {
  id: number;
  inventarioId: string;
  titulo: string;
  artistaId: string;
  tecnica: string;
  ano: number;
  dimensoes: string;
  imagem: string;
}

interface Registro {
  id: string;
  obraId: number;
  obraTitulo: string;
  obraInventarioId: string;
  tipo: "emprestimo" | "doacao";
  data: string;
}

const tipoLabels: Record<string, string> = {
  emprestimo: "Empréstimo",
  doacao: "Doação",
};

export default function EmprestimoDoacaoPage({ obras }: { obras: Obra[] }) {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [busca, setBusca] = useState("");
  const [obraSelecionada, setObraSelecionada] = useState<Obra | null>(null);
  const [tipo, setTipo] = useState("");

  const sugestoes = useMemo(() => {
    if (!busca.trim()) return [];
    const termo = busca.toLowerCase();
    return obras.filter(
      (o) =>
        o.titulo.toLowerCase().includes(termo) ||
        o.inventarioId.toLowerCase().includes(termo)
    ).slice(0, 6);
  }, [busca, obras]);

  function handleSelecionarObra(obra: Obra) {
    setObraSelecionada(obra);
    setBusca(obra.titulo);
  }

  function handleSalvar() {
    if (!obraSelecionada || !tipo) return;
    const novo: Registro = {
      id: `reg-${Date.now()}`,
      obraId: obraSelecionada.id,
      obraTitulo: obraSelecionada.titulo,
      obraInventarioId: obraSelecionada.inventarioId,
      tipo: tipo as Registro["tipo"],
      data: new Date().toLocaleDateString("pt-BR"),
    };
    setRegistros([...registros, novo]);
    setBusca("");
    setObraSelecionada(null);
    setTipo("");
    setModalAberto(false);
  }

  function handleAbrir() {
    setBusca("");
    setObraSelecionada(null);
    setTipo("");
    setModalAberto(true);
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
          <div className="flex items-center gap-2">
            <HandHeart className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground" data-testid="text-titulo-emprestimo-doacao">
              Empréstimo / Doação
            </h2>
            <Badge variant="secondary">{registros.length}</Badge>
          </div>
          <Button
            onClick={handleAbrir}
            style={{ backgroundColor: "#16a34a", borderColor: "#16a34a", color: "#fff" }}
            data-testid="button-novo-registro"
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Registro
          </Button>
        </div>

        {registros.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <HandHeart className="h-12 w-12 mb-3 opacity-30" />
            <p className="text-sm" data-testid="text-emprestimo-vazio">Nenhum registro de empréstimo ou doação.</p>
            <p className="text-xs text-muted-foreground mt-1">Clique em "Novo Registro" para começar.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {registros.map((reg) => (
              <Card
                key={reg.id}
                className="p-5"
                data-testid={`card-registro-${reg.id}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex items-center justify-center h-10 w-10 rounded-md flex-shrink-0 ${reg.tipo === "emprestimo" ? "bg-blue-500/10" : "bg-purple-500/10"}`}>
                    {reg.tipo === "emprestimo" ? (
                      <HandHeart className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Gift className="h-5 w-5 text-purple-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground" data-testid={`text-registro-titulo-${reg.id}`}>
                        {reg.obraTitulo}
                      </h3>
                      <Badge variant={reg.tipo === "emprestimo" ? "default" : "secondary"}>
                        {tipoLabels[reg.tipo]}
                      </Badge>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground">{reg.obraInventarioId}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Calendar className="h-3 w-3 flex-shrink-0" />
                      Registrado em {reg.data}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={modalAberto} onOpenChange={(v) => !v && setModalAberto(false)}>
        <DialogContent className="sm:max-w-md" data-testid="modal-novo-registro">
          <DialogHeader>
            <DialogTitle data-testid="text-modal-registro-title">Novo Registro</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Obra (busque por Nome ou ID)</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Digite o nome ou ID da obra..."
                  value={busca}
                  onChange={(e) => {
                    setBusca(e.target.value);
                    if (obraSelecionada && e.target.value !== obraSelecionada.titulo) {
                      setObraSelecionada(null);
                    }
                  }}
                  className="pl-10"
                  data-testid="input-busca-obra-registro"
                />
              </div>
              {busca.trim() && !obraSelecionada && sugestoes.length > 0 && (
                <div className="rounded-md border border-border bg-background shadow-sm max-h-48 overflow-y-auto" data-testid="lista-sugestoes-obras">
                  {sugestoes.map((obra) => (
                    <button
                      key={obra.id}
                      className="w-full text-left px-3 py-2.5 text-sm hover-elevate flex items-center gap-3"
                      onClick={() => handleSelecionarObra(obra)}
                      data-testid={`sugestao-obra-${obra.id}`}
                    >
                      <img src={obra.imagem} alt={obra.titulo} className="h-8 w-8 rounded-sm object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">{obra.titulo}</p>
                        <p className="text-xs text-muted-foreground font-mono">{obra.inventarioId}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {busca.trim() && !obraSelecionada && sugestoes.length === 0 && (
                <p className="text-xs text-muted-foreground mt-1" data-testid="text-nenhuma-sugestao">Nenhuma obra encontrada.</p>
              )}
              {obraSelecionada && (
                <div className="flex items-center gap-3 rounded-md bg-muted/50 px-3 py-2 mt-1" data-testid="obra-selecionada-preview">
                  <img src={obraSelecionada.imagem} alt={obraSelecionada.titulo} className="h-10 w-10 rounded-sm object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{obraSelecionada.titulo}</p>
                    <p className="text-xs text-muted-foreground font-mono">{obraSelecionada.inventarioId}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-1.5">
              <Label>Tipo</Label>
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger data-testid="select-tipo-registro">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emprestimo">Empréstimo</SelectItem>
                  <SelectItem value="doacao">Doação</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setModalAberto(false)} data-testid="button-cancelar-registro">Cancelar</Button>
            <Button onClick={handleSalvar} disabled={!obraSelecionada || !tipo} data-testid="button-salvar-registro">Salvar Registro</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
