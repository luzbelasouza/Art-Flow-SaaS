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
import { MapPin, CalendarDays, Plus } from "lucide-react";

import contextImg from "@assets/1-context_1771204595709.jpg";
import singapureImg from "@assets/2-Singapure_1771204595713.jpg";
import starImg from "@assets/3-star_1771204595714.jpeg";

export interface Exposicao {
  id: string;
  nome: string;
  local: string;
  pais: string;
  data: string;
  status: "passada" | "futura";
  imagem: string;
}

const exposicoesIniciais: Exposicao[] = [
  {
    id: "context",
    nome: "CONTEXT Art Miami",
    local: "Miami",
    pais: "EUA",
    data: "Dezembro 2025",
    status: "passada",
    imagem: contextImg,
  },
  {
    id: "singapore",
    nome: "Art Stage Singapore",
    local: "Marina Bay",
    pais: "Singapura",
    data: "Junho 2026",
    status: "futura",
    imagem: singapureImg,
  },
  {
    id: "start",
    nome: "START Art Fair",
    local: "Londres",
    pais: "Reino Unido",
    data: "Setembro 2026",
    status: "futura",
    imagem: starImg,
  },
];

export default function Exposicoes({ onNovaExposicao }: { onNovaExposicao?: (nome: string) => void }) {
  const [exposicoes, setExposicoes] = useState<Exposicao[]>(exposicoesIniciais);
  const [modalAberto, setModalAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [local, setLocal] = useState("");
  const [pais, setPais] = useState("");
  const [data, setData] = useState("");
  const [status, setStatus] = useState<"passada" | "futura">("futura");

  function handleSalvar() {
    if (!nome.trim()) return;
    const nova: Exposicao = {
      id: `expo-${Date.now()}`,
      nome: nome.trim(),
      local: local.trim() || "Local não informado",
      pais: pais.trim() || "",
      data: data.trim() || "Data não definida",
      status,
      imagem: "",
    };
    setExposicoes([...exposicoes, nova]);
    onNovaExposicao?.(nova.nome);
    setNome("");
    setLocal("");
    setPais("");
    setData("");
    setStatus("futura");
    setModalAberto(false);
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground" data-testid="text-titulo-exposicoes">
              Exposições
            </h2>
            <Badge variant="secondary">{exposicoes.length}</Badge>
          </div>
          <Button
            onClick={() => setModalAberto(true)}
            style={{ backgroundColor: "#16a34a", borderColor: "#16a34a", color: "#fff" }}
            data-testid="button-nova-exposicao"
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Exposição
          </Button>
        </div>

        {exposicoes.map((expo) => (
          <Card
            key={expo.id}
            className="flex flex-col md:flex-row"
            data-testid={`card-expo-${expo.id}`}
          >
            {expo.imagem ? (
              <img
                src={expo.imagem}
                alt={expo.nome}
                className="h-52 md:h-auto md:w-72 w-full object-cover rounded-t-md md:rounded-t-none md:rounded-l-md flex-shrink-0"
                data-testid={`img-expo-${expo.id}`}
              />
            ) : (
              <div className="h-52 md:h-auto md:w-72 w-full bg-muted/50 rounded-t-md md:rounded-t-none md:rounded-l-md flex-shrink-0 flex items-center justify-center">
                <CalendarDays className="h-12 w-12 text-muted-foreground/30" />
              </div>
            )}
            <div className="p-6 flex flex-col justify-center gap-3 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3
                  className="text-xl font-semibold text-foreground"
                  data-testid={`text-nome-expo-${expo.id}`}
                >
                  {expo.nome}
                </h3>
                <Badge
                  variant={expo.status === "futura" ? "default" : "secondary"}
                  data-testid={`badge-status-expo-${expo.id}`}
                >
                  {expo.status === "futura" ? "Futura" : "Realizada"}
                </Badge>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span data-testid={`text-local-expo-${expo.id}`}>
                  {expo.local}{expo.pais ? `, ${expo.pais}` : ""}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4 flex-shrink-0" />
                <span data-testid={`text-data-expo-${expo.id}`}>{expo.data}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={modalAberto} onOpenChange={(v) => !v && setModalAberto(false)}>
        <DialogContent className="sm:max-w-md" data-testid="modal-nova-exposicao">
          <DialogHeader>
            <DialogTitle data-testid="text-modal-exposicao-title">Nova Exposição</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="nome-exposicao">Nome da Exposição</Label>
              <Input
                id="nome-exposicao"
                placeholder='Ex: "Art Basel Miami"'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                data-testid="input-nome-exposicao"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="local-exposicao">Local</Label>
                <Input
                  id="local-exposicao"
                  placeholder="Ex: Miami"
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                  data-testid="input-local-exposicao"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pais-exposicao">País</Label>
                <Input
                  id="pais-exposicao"
                  placeholder="Ex: EUA"
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                  data-testid="input-pais-exposicao"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="data-exposicao">Data</Label>
              <Input
                id="data-exposicao"
                placeholder="Ex: Dezembro 2026"
                value={data}
                onChange={(e) => setData(e.target.value)}
                data-testid="input-data-exposicao"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as "passada" | "futura")}>
                <SelectTrigger data-testid="select-status-exposicao">
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="futura">Futura</SelectItem>
                  <SelectItem value="passada">Realizada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setModalAberto(false)} data-testid="button-cancelar-exposicao">Cancelar</Button>
            <Button onClick={handleSalvar} disabled={!nome.trim()} data-testid="button-salvar-exposicao">Salvar Exposição</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { exposicoesIniciais };
