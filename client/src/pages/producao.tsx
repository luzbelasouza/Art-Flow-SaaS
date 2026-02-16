import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Printer, Play, Pause, RotateCcw, Plus } from "lucide-react";

interface ObraEmProducao {
  id: string;
  titulo: string;
  tecnica: string;
  progresso: number;
  status: "em_execucao" | "pausada" | "finalizada";
}

const obrasIniciais: ObraEmProducao[] = [
  {
    id: "prod-1",
    titulo: "Paisagem ao Entardecer",
    tecnica: "Óleo sobre tela – 120x80 cm",
    progresso: 65,
    status: "em_execucao",
  },
  {
    id: "prod-2",
    titulo: "Retrato de Família",
    tecnica: "Acrílica sobre tela – 90x60 cm",
    progresso: 30,
    status: "pausada",
  },
  {
    id: "prod-3",
    titulo: "Natureza Morta com Frutas",
    tecnica: "Aquarela – 50x40 cm",
    progresso: 100,
    status: "finalizada",
  },
];

function formatarTempo(segundos: number) {
  const h = Math.floor(segundos / 3600);
  const m = Math.floor((segundos % 3600) / 60);
  const s = segundos % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function Cronometro({ obraId, ativo }: { obraId: string; ativo: boolean }) {
  const [segundos, setSegundos] = useState(0);
  const [rodando, setRodando] = useState(ativo);
  const intervaloRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (rodando) {
      intervaloRef.current = setInterval(() => {
        setSegundos((s) => s + 1);
      }, 1000);
    } else if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
    }
    return () => {
      if (intervaloRef.current) clearInterval(intervaloRef.current);
    };
  }, [rodando]);

  return (
    <div className="flex items-center gap-2">
      <span
        className="font-mono text-lg text-foreground tabular-nums"
        data-testid={`cronometro-${obraId}`}
      >
        {formatarTempo(segundos)}
      </span>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setRodando(!rodando)}
        data-testid={`button-play-${obraId}`}
      >
        {rodando ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => { setSegundos(0); setRodando(false); }}
        data-testid={`button-reset-${obraId}`}
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function Producao() {
  const [obras, setObras] = useState(obrasIniciais);
  const [modalAberto, setModalAberto] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [tecnica, setTecnica] = useState("");

  function handleSalvar() {
    if (!titulo.trim()) return;
    const nova: ObraEmProducao = {
      id: `prod-${Date.now()}`,
      titulo: titulo.trim(),
      tecnica: tecnica.trim() || "Técnica não informada",
      progresso: 0,
      status: "em_execucao",
    };
    setObras([nova, ...obras]);
    setTitulo("");
    setTecnica("");
    setModalAberto(false);
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
          <div className="flex items-center gap-2">
            <Printer className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground" data-testid="text-titulo-producao">
              Produção e Tiragem
            </h2>
            <Badge variant="secondary">{obras.length}</Badge>
          </div>
          <Button
            onClick={() => setModalAberto(true)}
            style={{ backgroundColor: "#16a34a", borderColor: "#16a34a", color: "#fff" }}
            data-testid="button-nova-producao"
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Produção
          </Button>
        </div>

        <div className="space-y-4">
          {obras.map((obra) => (
            <Card key={obra.id} className="p-5" data-testid={`card-producao-${obra.id}`}>
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground" data-testid={`text-titulo-prod-${obra.id}`}>
                        {obra.titulo}
                      </h3>
                      <Badge
                        variant={obra.status === "em_execucao" ? "default" : obra.status === "pausada" ? "secondary" : "outline"}
                        data-testid={`badge-status-prod-${obra.id}`}
                      >
                        {obra.status === "em_execucao" ? "Em execução" : obra.status === "pausada" ? "Pausada" : "Finalizada"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{obra.tecnica}</p>
                  </div>

                  {obra.status !== "finalizada" && (
                    <Cronometro obraId={obra.id} ativo={obra.status === "em_execucao"} />
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Progresso</span>
                    <span className="text-xs font-medium text-foreground">{obra.progresso}%</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-muted" data-testid={`barra-progresso-${obra.id}`}>
                    <div
                      className={`h-full rounded-full transition-all ${obra.status === "finalizada" ? "bg-emerald-500" : "bg-primary"}`}
                      style={{ width: `${obra.progresso}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={modalAberto} onOpenChange={(v) => !v && setModalAberto(false)}>
        <DialogContent className="sm:max-w-md" data-testid="modal-nova-producao">
          <DialogHeader>
            <DialogTitle data-testid="text-modal-producao-title">Nova Produção</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="titulo-producao">Título da Obra</Label>
              <Input
                id="titulo-producao"
                placeholder='Ex: "Série Noturna #4"'
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                data-testid="input-titulo-producao"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tecnica-producao">Técnica e Dimensões</Label>
              <Input
                id="tecnica-producao"
                placeholder="Ex: Óleo sobre tela – 100x80 cm"
                value={tecnica}
                onChange={(e) => setTecnica(e.target.value)}
                data-testid="input-tecnica-producao"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setModalAberto(false)} data-testid="button-cancelar-producao">Cancelar</Button>
            <Button onClick={handleSalvar} disabled={!titulo.trim()} data-testid="button-salvar-producao">Iniciar Cronômetro</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
