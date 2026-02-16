import { useState, useMemo, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { DollarSign, BarChart3, ShoppingBag, Package, Plus, Search, AlertCircle, Gavel } from "lucide-react";

import colheitaImg from "@assets/colheita_1771198582489.png";
import camponesasImg from "@assets/camponesas_1771198582484.png";
import respigadoresImg from "@assets/respigadores_1771198582490.png";

interface Contato {
  id: string;
  nome: string;
  tipo: string;
  email: string;
  telefone: string;
  iniciais: string;
}

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

interface Venda {
  id: string;
  titulo: string;
  comprador: string;
  compradorEmail: string;
  compradorTelefone: string;
  data: string;
  valor: number;
  imagem: string;
  origemLeilao?: boolean;
}

const VENDAS_LEILAO_KEY = "artflow_vendas_leilao";

function carregarVendasLeilao(): Venda[] {
  try {
    const raw = localStorage.getItem(VENDAS_LEILAO_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function registrarVendaLeilao(venda: Venda) {
  const vendas = carregarVendasLeilao();
  vendas.unshift(venda);
  localStorage.setItem(VENDAS_LEILAO_KEY, JSON.stringify(vendas));
}

const vendasIniciais: Venda[] = [
  { id: "v-1", titulo: "Colheita das Maçãs", comprador: "João Vicente", compradorEmail: "joao.vicente@email.com", compradorTelefone: "(21) 99876-5432", data: "Mar 2026", valor: 45000, imagem: colheitaImg },
  { id: "v-2", titulo: "Jovens Camponesas Descansando", comprador: "Angela Marques", compradorEmail: "angela.marques@decor.com", compradorTelefone: "(11) 98765-4321", data: "Jan 2026", valor: 38000, imagem: camponesasImg },
  { id: "v-3", titulo: "Os Respigadores", comprador: "Galeria Graphitte", compradorEmail: "contato@graphitte.com.br", compradorTelefone: "(11) 3456-7890", data: "Nov 2025", valor: 52000, imagem: respigadoresImg },
];

const meses = [
  { label: "Abr", valor: 0 },
  { label: "Mai", valor: 0 },
  { label: "Jun", valor: 0 },
  { label: "Jul", valor: 0 },
  { label: "Ago", valor: 0 },
  { label: "Set", valor: 0 },
  { label: "Out", valor: 0 },
  { label: "Nov", valor: 52000 },
  { label: "Dez", valor: 0 },
  { label: "Jan", valor: 38000 },
  { label: "Fev", valor: 0 },
  { label: "Mar", valor: 45000 },
];

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function Vendas({ contatos = [], obras = [] }: { contatos?: Contato[]; obras?: Obra[] }) {
  const [vendas, setVendas] = useState<Venda[]>(() => {
    const leilaoVendas = carregarVendasLeilao();
    return [...vendasIniciais, ...leilaoVendas];
  });
  const [modalAberto, setModalAberto] = useState(false);
  const [buscaObra, setBuscaObra] = useState("");
  const [obraSelecionada, setObraSelecionada] = useState<Obra | null>(null);
  const [compradorId, setCompradorId] = useState("");
  const [valorVenda, setValorVenda] = useState("");
  const [erroContato, setErroContato] = useState(false);

  const totalVendas = vendas.reduce((acc, v) => acc + v.valor, 0);
  const maxValor = Math.max(...meses.map((m) => m.valor));

  const sugestoesObra = useMemo(() => {
    if (!buscaObra.trim()) return [];
    const termo = buscaObra.toLowerCase();
    return obras.filter(
      (o) => o.titulo.toLowerCase().includes(termo) || o.inventarioId.toLowerCase().includes(termo)
    ).slice(0, 6);
  }, [buscaObra, obras]);

  function handleAbrir() {
    setBuscaObra("");
    setObraSelecionada(null);
    setCompradorId("");
    setValorVenda("");
    setErroContato(false);
    setModalAberto(true);
  }

  function handleSalvar() {
    if (!obraSelecionada) return;
    if (!compradorId) {
      setErroContato(true);
      return;
    }
    const contato = contatos.find((c) => c.id === compradorId);
    if (!contato) {
      setErroContato(true);
      return;
    }
    const valor = parseFloat(valorVenda) || 0;
    const nova: Venda = {
      id: `v-${Date.now()}`,
      titulo: obraSelecionada.titulo,
      comprador: contato.nome,
      compradorEmail: contato.email,
      compradorTelefone: contato.telefone,
      data: new Date().toLocaleDateString("pt-BR", { month: "short", year: "numeric" }),
      valor,
      imagem: obraSelecionada.imagem,
    };
    setVendas([nova, ...vendas]);
    setModalAberto(false);
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-end">
          <Button
            onClick={handleAbrir}
            style={{ backgroundColor: "#16a34a", borderColor: "#16a34a", color: "#fff" }}
            data-testid="button-nova-venda"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nova Venda
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-5" data-testid="card-total-vendas">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/10">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total em Vendas</p>
                <p className="text-xl font-semibold text-foreground" data-testid="text-total-vendas">
                  {formatarMoeda(totalVendas)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5" data-testid="card-obras-vendidas">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-md bg-primary/10">
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Obras Vendidas</p>
                <p className="text-xl font-semibold text-foreground" data-testid="text-qtd-vendidas">
                  {vendas.length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5" data-testid="card-valor-estoque">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-md bg-emerald-500/10">
                <Package className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valor em Estoque</p>
                <p className="text-xl font-semibold text-emerald-600" data-testid="text-valor-estoque">
                  {formatarMoeda(135000)}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6" data-testid="card-grafico-vendas">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Volume de Vendas (12 meses)</h2>
          </div>
          <div className="flex items-end gap-2 h-48" data-testid="grafico-barras">
            {meses.map((mes) => (
              <div key={mes.label} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full flex flex-col items-center justify-end h-36">
                  {mes.valor > 0 && (
                    <span className="text-[10px] text-muted-foreground mb-1">
                      {(mes.valor / 1000).toFixed(0)}k
                    </span>
                  )}
                  <div
                    className={`w-full max-w-8 rounded-t-sm ${mes.valor > 0 ? "bg-primary" : "bg-muted"}`}
                    style={{
                      height: mes.valor > 0 ? `${(mes.valor / maxValor) * 100}%` : "4px",
                      minHeight: "4px",
                    }}
                    data-testid={`barra-${mes.label.toLowerCase()}`}
                  />
                </div>
                <span className="text-[11px] text-muted-foreground">{mes.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6" data-testid="card-historico-vendas">
          <h2 className="text-lg font-semibold text-foreground mb-4">Histórico de Vendas</h2>
          <div className="space-y-4">
            {vendas.map((venda, i) => (
              <div key={venda.id}>
                <div
                  className="flex items-center gap-4"
                  data-testid={`venda-item-${venda.id}`}
                >
                  <img
                    src={venda.imagem}
                    alt={venda.titulo}
                    className="h-14 w-14 rounded-md object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{venda.titulo}</p>
                    <p className="text-sm text-muted-foreground">
                      Comprador: {venda.comprador}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-foreground">{formatarMoeda(venda.valor)}</p>
                    <p className="text-xs text-muted-foreground">{venda.data}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="secondary">Vendida</Badge>
                    {venda.origemLeilao && (
                      <Badge
                        className="no-default-hover-elevate no-default-active-elevate text-[10px]"
                        style={{ backgroundColor: "rgba(212, 168, 67, 0.1)", color: "#D4A843", borderColor: "rgba(212, 168, 67, 0.3)" }}
                        data-testid={`badge-leilao-${venda.id}`}
                      >
                        <Gavel className="mr-1 h-2.5 w-2.5" />
                        Leilão Art Flow
                      </Badge>
                    )}
                  </div>
                </div>
                {i < vendas.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Dialog open={modalAberto} onOpenChange={(v) => !v && setModalAberto(false)}>
        <DialogContent className="sm:max-w-md" data-testid="modal-nova-venda">
          <DialogHeader>
            <DialogTitle data-testid="text-modal-venda-title">Nova Venda</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Obra (busque por Nome ou ID)</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Digite o nome ou ID da obra..."
                  value={buscaObra}
                  onChange={(e) => {
                    setBuscaObra(e.target.value);
                    if (obraSelecionada && e.target.value !== obraSelecionada.titulo) {
                      setObraSelecionada(null);
                    }
                  }}
                  className="pl-10"
                  data-testid="input-busca-obra-venda"
                />
              </div>
              {buscaObra.trim() && !obraSelecionada && sugestoesObra.length > 0 && (
                <div className="rounded-md border border-border bg-background shadow-sm max-h-48 overflow-y-auto" data-testid="lista-sugestoes-venda">
                  {sugestoesObra.map((obra) => (
                    <button
                      key={obra.id}
                      className="w-full text-left px-3 py-2.5 text-sm hover-elevate flex items-center gap-3"
                      onClick={() => { setObraSelecionada(obra); setBuscaObra(obra.titulo); }}
                      data-testid={`sugestao-venda-${obra.id}`}
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
              {obraSelecionada && (
                <div className="flex items-center gap-3 rounded-md bg-muted/50 px-3 py-2 mt-1" data-testid="obra-selecionada-venda">
                  <img src={obraSelecionada.imagem} alt={obraSelecionada.titulo} className="h-10 w-10 rounded-sm object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{obraSelecionada.titulo}</p>
                    <p className="text-xs text-muted-foreground font-mono">{obraSelecionada.inventarioId}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <Label>Comprador / Cliente *</Label>
              {contatos.length > 0 ? (
                <Select value={compradorId} onValueChange={(v) => { setCompradorId(v); setErroContato(false); }}>
                  <SelectTrigger data-testid="select-comprador-venda">
                    <SelectValue placeholder="Selecione o comprador" />
                  </SelectTrigger>
                  <SelectContent>
                    {contatos.map((c) => (
                      <SelectItem key={c.id} value={c.id} data-testid={`option-comprador-${c.id}`}>
                        {c.nome} — {c.tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="rounded-md bg-muted/50 px-3 py-2.5" data-testid="text-sem-contatos-venda">
                  <p className="text-xs text-muted-foreground">Nenhum contato cadastrado.</p>
                </div>
              )}
              {erroContato && (
                <div className="flex items-start gap-2 rounded-md p-2.5" style={{ backgroundColor: "rgba(239, 68, 68, 0.06)", border: "1px solid rgba(239, 68, 68, 0.2)" }} data-testid="alerta-sem-contato">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-red-500" />
                  <p className="text-xs text-red-600">
                    Primeiro você precisa cadastrar o comprador na aba "Contatos" para registrar a venda.
                  </p>
                </div>
              )}
              {compradorId && (() => {
                const c = contatos.find((ct) => ct.id === compradorId);
                if (!c) return null;
                return (
                  <div className="rounded-md bg-muted/50 px-3 py-2 space-y-0.5" data-testid="dados-comprador-venda">
                    <p className="text-xs text-muted-foreground">E-mail: {c.email || "—"}</p>
                    <p className="text-xs text-muted-foreground">Telefone: {c.telefone || "—"}</p>
                  </div>
                );
              })()}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="valor-venda">Valor da Venda (R$)</Label>
              <Input
                id="valor-venda"
                type="number"
                placeholder="Ex: 45000"
                value={valorVenda}
                onChange={(e) => setValorVenda(e.target.value)}
                data-testid="input-valor-venda"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setModalAberto(false)} data-testid="button-cancelar-venda">Cancelar</Button>
            <Button onClick={handleSalvar} disabled={!obraSelecionada} data-testid="button-salvar-venda">Registrar Venda</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
