import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, DollarSign, BarChart3, ShoppingBag } from "lucide-react";

import colheitaImg from "@assets/colheita_1771198582489.png";
import camponesasImg from "@assets/camponesas_1771198582484.png";
import respigadoresImg from "@assets/respigadores_1771198582490.png";

interface Venda {
  id: number;
  titulo: string;
  comprador: string;
  data: string;
  valor: number;
  imagem: string;
}

const vendas: Venda[] = [
  { id: 1, titulo: "Colheita das Maçãs", comprador: "João Vicente", data: "Mar 2026", valor: 45000, imagem: colheitaImg },
  { id: 2, titulo: "Jovens Camponesas Descansando", comprador: "Angela Marques", data: "Jan 2026", valor: 38000, imagem: camponesasImg },
  { id: 3, titulo: "Os Respigadores", comprador: "Galeria Graphitte", data: "Nov 2025", valor: 52000, imagem: respigadoresImg },
];

const totalVendas = vendas.reduce((acc, v) => acc + v.valor, 0);

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

const maxValor = Math.max(...meses.map((m) => m.valor));

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function Vendas() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-5xl mx-auto space-y-6">
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

          <Card className="p-5" data-testid="card-valorizacao">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 rounded-md bg-emerald-500/10">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valorização (12 meses)</p>
                <p className="text-xl font-semibold text-emerald-600" data-testid="text-valorizacao">
                  +15%
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
                  <Badge variant="secondary">Vendida</Badge>
                </div>
                {i < vendas.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
