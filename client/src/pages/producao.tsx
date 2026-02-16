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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Printer, Play, Pause, RotateCcw, Plus, Layers, Package } from "lucide-react";

interface ObraEmProducao {
  id: string;
  titulo: string;
  tecnica: string;
  progresso: number;
  status: "em_execucao" | "pausada" | "finalizada";
}

export interface Tiragem {
  id: string;
  titulo: string;
  ano: string;
  tecnicaReproducao: string;
  quantidadeTotal: number;
  provasArtista: number;
  suporte: string;
  gramatura: string;
  unidadesVendidas: number;
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

const tiragensIniciais: Tiragem[] = [
  {
    id: "tir-1",
    titulo: "Brasil Colorido",
    ano: "2026",
    tecnicaReproducao: "Serigrafia",
    quantidadeTotal: 20,
    provasArtista: 5,
    suporte: "Papel",
    gramatura: "300g/m²",
    unidadesVendidas: 8,
  },
  {
    id: "tir-2",
    titulo: "Série Noturna",
    ano: "2025",
    tecnicaReproducao: "Fine Art",
    quantidadeTotal: 15,
    provasArtista: 3,
    suporte: "Canva",
    gramatura: "380g/m²",
    unidadesVendidas: 3,
  },
];

const tecnicasReproducao = [
  "Xilogravura",
  "Litogravura",
  "Serigrafia",
  "Monotipia",
  "Cianotipia",
  "Fine Art",
  "Off Set",
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

export default function Producao({ onNovaTiragem }: { onNovaTiragem?: (tiragem: Tiragem) => void }) {
  const [obras, setObras] = useState(obrasIniciais);
  const [tiragens, setTiragens] = useState<Tiragem[]>(tiragensIniciais);
  const [modalProducaoAberto, setModalProducaoAberto] = useState(false);
  const [modalTiragemAberto, setModalTiragemAberto] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [tecnica, setTecnica] = useState("");

  const [tirTitulo, setTirTitulo] = useState("");
  const [tirAno, setTirAno] = useState("");
  const [tirTecnica, setTirTecnica] = useState("");
  const [tirQuantidade, setTirQuantidade] = useState("");
  const [tirProvas, setTirProvas] = useState("");
  const [tirSuporte, setTirSuporte] = useState("Papel");
  const [tirGramatura, setTirGramatura] = useState("");

  function handleSalvarProducao() {
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
    setModalProducaoAberto(false);
  }

  function handleSalvarTiragem() {
    if (!tirTitulo.trim() || !tirTecnica || !tirQuantidade) return;
    const nova: Tiragem = {
      id: `tir-${Date.now()}`,
      titulo: tirTitulo.trim(),
      ano: tirAno.trim() || new Date().getFullYear().toString(),
      tecnicaReproducao: tirTecnica,
      quantidadeTotal: parseInt(tirQuantidade) || 0,
      provasArtista: parseInt(tirProvas) || 0,
      suporte: tirSuporte,
      gramatura: tirGramatura.trim() || "Não informada",
      unidadesVendidas: 0,
    };
    setTiragens([...tiragens, nova]);
    onNovaTiragem?.(nova);
    setTirTitulo("");
    setTirAno("");
    setTirTecnica("");
    setTirQuantidade("");
    setTirProvas("");
    setTirSuporte("Papel");
    setTirGramatura("");
    setModalTiragemAberto(false);
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <div className="flex items-center gap-2">
              <Printer className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground" data-testid="text-titulo-producao">
                Produção (Obras Únicas)
              </h2>
              <Badge variant="secondary">{obras.length}</Badge>
            </div>
            <Button
              onClick={() => setModalProducaoAberto(true)}
              style={{ backgroundColor: "#16a34a", borderColor: "#16a34a", color: "#fff" }}
              data-testid="button-nova-producao"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nova Produção
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

        <Separator />

        <div>
          <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground" data-testid="text-titulo-tiragens">
                Tiragens (Múltiplos)
              </h2>
              <Badge variant="secondary">{tiragens.length}</Badge>
            </div>
            <Button
              onClick={() => setModalTiragemAberto(true)}
              style={{ backgroundColor: "#16a34a", borderColor: "#16a34a", color: "#fff" }}
              data-testid="button-nova-tiragem"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nova Tiragem
            </Button>
          </div>

          <div className="space-y-4">
            {tiragens.map((tir) => {
              const totalEdicoes = tir.quantidadeTotal + tir.provasArtista;
              const disponivel = totalEdicoes - tir.unidadesVendidas;
              const percentDisponivel = totalEdicoes > 0 ? (disponivel / totalEdicoes) * 100 : 0;

              return (
                <Card key={tir.id} className="p-5" data-testid={`card-tiragem-${tir.id}`}>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-foreground" data-testid={`text-titulo-tir-${tir.id}`}>
                            {tir.titulo}
                          </h3>
                          <Badge variant="secondary">{tir.tecnicaReproducao}</Badge>
                          <Badge variant="outline">{tir.ano}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {tir.quantidadeTotal} edições + {tir.provasArtista} P.A. | {tir.suporte} {tir.gramatura}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span
                          className={`text-sm font-medium ${disponivel > 0 ? "text-emerald-600" : "text-destructive"}`}
                          data-testid={`text-disponibilidade-${tir.id}`}
                        >
                          {disponivel} de {totalEdicoes} restantes
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Disponibilidade</span>
                        <span className="text-xs font-medium text-foreground">
                          {Math.round(percentDisponivel)}%
                        </span>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-muted" data-testid={`barra-disponibilidade-${tir.id}`}>
                        <div
                          className={`h-full rounded-full transition-all ${disponivel > 0 ? "bg-emerald-500" : "bg-destructive"}`}
                          style={{ width: `${percentDisponivel}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <Dialog open={modalProducaoAberto} onOpenChange={(v) => !v && setModalProducaoAberto(false)}>
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
            <Button variant="ghost" onClick={() => setModalProducaoAberto(false)} data-testid="button-cancelar-producao">Cancelar</Button>
            <Button onClick={handleSalvarProducao} disabled={!titulo.trim()} data-testid="button-salvar-producao">Iniciar Cronômetro</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={modalTiragemAberto} onOpenChange={(v) => !v && setModalTiragemAberto(false)}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto" data-testid="modal-nova-tiragem">
          <DialogHeader>
            <DialogTitle data-testid="text-modal-tiragem-title">Nova Tiragem</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="titulo-tiragem">Título da Obra</Label>
              <Input
                id="titulo-tiragem"
                placeholder='Ex: "Brasil Colorido"'
                value={tirTitulo}
                onChange={(e) => setTirTitulo(e.target.value)}
                data-testid="input-titulo-tiragem"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ano-tiragem">Ano</Label>
              <Input
                id="ano-tiragem"
                placeholder="Ex: 2026"
                value={tirAno}
                onChange={(e) => setTirAno(e.target.value)}
                data-testid="input-ano-tiragem"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Técnica de Reprodução</Label>
              <Select value={tirTecnica} onValueChange={setTirTecnica}>
                <SelectTrigger data-testid="select-tecnica-tiragem">
                  <SelectValue placeholder="Selecione a técnica" />
                </SelectTrigger>
                <SelectContent>
                  {tecnicasReproducao.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="quantidade-tiragem">Quantidade Total</Label>
                <Input
                  id="quantidade-tiragem"
                  type="number"
                  placeholder="Ex: 20"
                  value={tirQuantidade}
                  onChange={(e) => setTirQuantidade(e.target.value)}
                  data-testid="input-quantidade-tiragem"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="provas-tiragem">Provas do Artista (P.A.)</Label>
                <Input
                  id="provas-tiragem"
                  type="number"
                  placeholder="Ex: 5"
                  value={tirProvas}
                  onChange={(e) => setTirProvas(e.target.value)}
                  data-testid="input-provas-tiragem"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Suporte</Label>
                <Select value={tirSuporte} onValueChange={setTirSuporte}>
                  <SelectTrigger data-testid="select-suporte-tiragem">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Papel">Papel</SelectItem>
                    <SelectItem value="Canva">Canva</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="gramatura-tiragem">Gramatura</Label>
                <Input
                  id="gramatura-tiragem"
                  placeholder="Ex: 300g/m²"
                  value={tirGramatura}
                  onChange={(e) => setTirGramatura(e.target.value)}
                  data-testid="input-gramatura-tiragem"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setModalTiragemAberto(false)} data-testid="button-cancelar-tiragem">Cancelar</Button>
            <Button
              onClick={handleSalvarTiragem}
              disabled={!tirTitulo.trim() || !tirTecnica || !tirQuantidade}
              data-testid="button-salvar-tiragem"
            >
              Salvar Tiragem
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { tiragensIniciais };
