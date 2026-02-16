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
import { Plus, Search, Gavel, Calendar, MapPin } from "lucide-react";

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

interface LocalInfo {
  id: string;
  nome: string;
  endereco: string;
  tipo: string;
  detalhe: string;
}

export interface RegistroLeilao {
  id: string;
  obraId: number;
  obraTitulo: string;
  obraInventarioId: string;
  obraImagem: string;
  localDestino: string;
  data: string;
}

export default function LeiloesPublicosAcervo({ obras, locais, onRegistroSalvo, onRegistrosChange }: { obras: Obra[]; locais?: LocalInfo[]; onRegistroSalvo?: (obraId: number, localNome: string) => void; onRegistrosChange?: (registros: RegistroLeilao[]) => void }) {
  const [registros, setRegistros] = useState<RegistroLeilao[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [busca, setBusca] = useState("");
  const [obraSelecionada, setObraSelecionada] = useState<Obra | null>(null);
  const [localDestino, setLocalDestino] = useState("");

  const sugestoes = useMemo(() => {
    if (!busca.trim()) return [];
    const termo = busca.toLowerCase();
    return obras.filter(
      (o) =>
        o.titulo.toLowerCase().includes(termo) ||
        o.inventarioId.toLowerCase().includes(termo)
    ).slice(0, 6);
  }, [busca, obras]);

  const locaisFiltrados = useMemo(() => {
    if (!locais) return [];
    return locais.filter((l) => l.tipo === "leilao");
  }, [locais]);

  function handleSelecionarObra(obra: Obra) {
    setObraSelecionada(obra);
    setBusca(obra.titulo);
  }

  function handleSalvar() {
    if (!obraSelecionada || !localDestino) return;
    const novo: RegistroLeilao = {
      id: `leilao-${Date.now()}`,
      obraId: obraSelecionada.id,
      obraTitulo: obraSelecionada.titulo,
      obraInventarioId: obraSelecionada.inventarioId,
      obraImagem: obraSelecionada.imagem,
      localDestino,
      data: new Date().toLocaleDateString("pt-BR"),
    };
    const novosRegistros = [...registros, novo];
    setRegistros(novosRegistros);
    onRegistroSalvo?.(obraSelecionada.id, localDestino);
    onRegistrosChange?.(novosRegistros);

    const envio = {
      id: `envio-leilao-${Date.now()}`,
      tipo: "Leilão" as const,
      destinatarios: [localDestino],
      catalogo: obraSelecionada.titulo,
      catalogoId: "",
      data: new Date().toLocaleDateString("pt-BR"),
      hora: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      qtd: 1,
    };
    try {
      const raw = localStorage.getItem("artflow_envios_realizados");
      const envios = raw ? JSON.parse(raw) : [];
      envios.unshift(envio);
      localStorage.setItem("artflow_envios_realizados", JSON.stringify(envios));
    } catch {}

    setBusca("");
    setObraSelecionada(null);
    setLocalDestino("");
    setModalAberto(false);
  }

  function handleAbrir() {
    setBusca("");
    setObraSelecionada(null);
    setLocalDestino("");
    setModalAberto(true);
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
          <div className="flex items-center gap-2">
            <Gavel className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground" data-testid="text-titulo-leiloes-acervo">
              Leilões Públicos
            </h2>
            <Badge variant="secondary">{registros.length}</Badge>
          </div>
          <Button
            onClick={handleAbrir}
            style={{ backgroundColor: "#16a34a", borderColor: "#16a34a", color: "#fff" }}
            data-testid="button-novo-registro-leilao"
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Registro
          </Button>
        </div>

        {registros.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <Gavel className="h-12 w-12 mb-3 opacity-30" />
            <p className="text-sm" data-testid="text-leiloes-vazio">Nenhum registro de leilão público.</p>
            <p className="text-xs text-muted-foreground mt-1">Clique em "Novo Registro" para enviar uma obra.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {registros.map((reg) => (
              <Card
                key={reg.id}
                className="p-5"
                data-testid={`card-registro-leilao-${reg.id}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md flex-shrink-0 bg-violet-500/10">
                    <Gavel className="h-5 w-5 text-violet-500" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground" data-testid={`text-leilao-titulo-${reg.id}`}>
                        {reg.obraTitulo}
                      </h3>
                      <Badge style={{ backgroundColor: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6", borderColor: "rgba(139, 92, 246, 0.3)" }}>
                        Em Leilão
                      </Badge>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground">{reg.obraInventarioId}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      <span data-testid={`text-leilao-destino-${reg.id}`}>{reg.localDestino}</span>
                    </p>
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
        <DialogContent className="sm:max-w-md" data-testid="modal-novo-leilao">
          <DialogHeader>
            <DialogTitle data-testid="text-modal-leilao-title">Novo Registro – Leilão Público</DialogTitle>
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
                  data-testid="input-busca-obra-leilao"
                />
              </div>
              {busca.trim() && !obraSelecionada && sugestoes.length > 0 && (
                <div className="rounded-md border border-border bg-background shadow-sm max-h-48 overflow-y-auto" data-testid="lista-sugestoes-leilao">
                  {sugestoes.map((obra) => (
                    <button
                      key={obra.id}
                      className="w-full text-left px-3 py-2.5 text-sm hover-elevate flex items-center gap-3"
                      onClick={() => handleSelecionarObra(obra)}
                      data-testid={`sugestao-leilao-obra-${obra.id}`}
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
                <p className="text-xs text-muted-foreground mt-1" data-testid="text-nenhuma-sugestao-leilao">Nenhuma obra encontrada.</p>
              )}
              {obraSelecionada && (
                <div className="flex items-center gap-3 rounded-md bg-muted/50 px-3 py-2 mt-1" data-testid="obra-selecionada-preview-leilao">
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
              <div className="rounded-md bg-muted/50 px-3 py-2.5 flex items-center gap-2">
                <Gavel className="h-4 w-4 text-violet-500" />
                <span className="text-sm text-foreground font-medium">Leilão Público</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Local de Destino (Leiloeiro)</Label>
              {locaisFiltrados.length > 0 ? (
                <Select value={localDestino} onValueChange={setLocalDestino}>
                  <SelectTrigger data-testid="select-local-destino-leilao">
                    <SelectValue placeholder="Selecione o leiloeiro" />
                  </SelectTrigger>
                  <SelectContent>
                    {locaisFiltrados.map((loc) => (
                      <SelectItem key={loc.id} value={loc.nome} data-testid={`option-local-leilao-${loc.id}`}>
                        <span className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                          {loc.nome}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-xs text-muted-foreground rounded-md bg-muted/50 px-3 py-2.5" data-testid="text-sem-leiloeiros">
                  Nenhum leiloeiro cadastrado. Adicione um na aba Localização com o tipo "Leilão Público".
                </p>
              )}
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setModalAberto(false)} data-testid="button-cancelar-leilao">Cancelar</Button>
            <Button onClick={handleSalvar} disabled={!obraSelecionada || !localDestino} data-testid="button-salvar-leilao">Salvar Registro</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
