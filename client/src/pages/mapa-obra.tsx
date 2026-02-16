import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

import colheitaImg from "@assets/colheita_1771198582489.png";
import contextImg from "@assets/1-context_1771204595709.jpg";
import singapureImg from "@assets/2-Singapure_1771204595713.jpg";

interface Pin {
  id: string;
  cidade: string;
  status: string;
  cor: string;
  corBg: string;
  top: string;
  left: string;
  imagem: string;
  descricao: string;
}

const pins: Pin[] = [
  {
    id: "rj",
    cidade: "Rio de Janeiro",
    status: "Obra Vendida",
    cor: "bg-emerald-500",
    corBg: "bg-emerald-500/20",
    top: "58%",
    left: "62%",
    imagem: colheitaImg,
    descricao: "Colheita das Maçãs – Vendida para João Vicente",
  },
  {
    id: "sp",
    cidade: "São Paulo",
    status: "Obra em Exposição",
    cor: "bg-rose-500",
    corBg: "bg-rose-500/20",
    top: "55%",
    left: "52%",
    imagem: contextImg,
    descricao: "Exposição temporária – Galeria Graphitte",
  },
  {
    id: "ctb",
    cidade: "Curitiba",
    status: "Obra Consignada",
    cor: "bg-amber-400",
    corBg: "bg-amber-400/20",
    top: "62%",
    left: "48%",
    imagem: singapureImg,
    descricao: "Jovens Camponesas – Consignada para evento",
  },
];

const legenda = [
  { label: "Vendida", cor: "bg-emerald-500" },
  { label: "Em Exposição", cor: "bg-rose-500" },
  { label: "Consignada", cor: "bg-amber-400" },
];

export default function MapaObra() {
  const [pinSelecionado, setPinSelecionado] = useState<string | null>(null);

  const pinAtivo = pins.find((p) => p.id === pinSelecionado);

  return (
    <div className="flex-1 overflow-hidden relative" data-testid="mapa-container">
      <div className="absolute inset-0 bg-muted/40">
        <svg className="w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[90%] max-w-3xl aspect-[4/3]">
          <svg viewBox="0 0 400 350" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M160 40 L200 35 L240 50 L280 45 L300 60 L320 55 L340 70 L350 100 L345 130 L350 160 L340 190 L320 200 L330 230 L310 250 L280 260 L260 280 L230 290 L200 280 L180 300 L160 310 L140 300 L120 280 L100 260 L90 230 L80 200 L70 170 L75 140 L80 110 L100 80 L120 60 L160 40Z"
              fill="hsl(var(--muted))"
              stroke="hsl(var(--border))"
              strokeWidth="1.5"
              opacity="0.6"
            />
            <text x="200" y="180" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="11" opacity="0.5">
              BRASIL
            </text>
          </svg>

          {pins.map((pin) => (
            <button
              key={pin.id}
              className="absolute flex flex-col items-center cursor-pointer"
              style={{ top: pin.top, left: pin.left, transform: "translate(-50%, -50%)" }}
              onClick={() => setPinSelecionado(pinSelecionado === pin.id ? null : pin.id)}
              data-testid={`pin-${pin.id}`}
            >
              <div className="relative flex items-center justify-center">
                <div className={`absolute h-8 w-8 rounded-full ${pin.corBg} animate-ping`} style={{ animationDuration: "2.5s" }} />
                <div className={`h-4 w-4 rounded-full ${pin.cor} ring-2 ring-background shadow-lg relative z-10`} />
              </div>
              <div className="mt-2 bg-background/90 backdrop-blur-sm rounded-md px-2.5 py-1 shadow-md border border-border">
                <p className="text-xs font-medium text-foreground whitespace-nowrap">{pin.cidade}</p>
                <p className="text-[10px] text-muted-foreground whitespace-nowrap">{pin.status}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {pinAtivo && (
        <Card
          className="absolute top-5 left-5 w-72 bg-background/95 backdrop-blur-sm shadow-lg"
          data-testid="popup-pin"
        >
          <img
            src={pinAtivo.imagem}
            alt={pinAtivo.cidade}
            className="h-36 w-full object-cover rounded-t-md"
            data-testid="popup-pin-img"
          />
          <div className="p-4 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-foreground text-sm" data-testid="popup-pin-cidade">
                {pinAtivo.cidade}
              </h3>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setPinSelecionado(null)}
                data-testid="popup-pin-fechar"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground" data-testid="popup-pin-descricao">
              {pinAtivo.descricao}
            </p>
          </div>
        </Card>
      )}

      <Card
        className="absolute bottom-5 right-5 p-4 space-y-2.5 bg-background/95 backdrop-blur-sm"
        data-testid="legenda-mapa"
      >
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Legenda
        </p>
        {legenda.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5">
            <div className={`h-3 w-3 rounded-full ${item.cor}`} />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
