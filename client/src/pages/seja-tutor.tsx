import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GraduationCap,
  Plus,
  Clock,
  DollarSign,
  Calendar,
  Video,
  Image,
  Pencil,
  Trash2,
  CheckCircle,
  AlertCircle,
  Star,
  Eye,
} from "lucide-react";

const CATEGORIAS = [
  "Processo criativo",
  "História da arte",
  "Curadoria",
  "Venda e precificação",
  "Outros",
];

const DIAS_SEMANA = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
const HORARIOS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00",
];

export interface Mentoria {
  id: number;
  titulo: string;
  descricao: string;
  precoPorHora: number;
  categoria: string;
  fotoCapa: string;
  videoUrl: string;
  disponibilidade: Record<string, string[]>;
  status: "pendente" | "aprovado" | "rejeitado";
  criadoEm: string;
}

const mentoriasIniciais: Mentoria[] = [
  {
    id: 1,
    titulo: "Irei te ajudar com curadoria de exposições contemporâneas",
    descricao: "Mentoria focada em como selecionar e organizar obras para exposições em galerias e espaços culturais. Abordaremos desde a concepção temática até a montagem.",
    precoPorHora: 150,
    categoria: "Curadoria",
    fotoCapa: "",
    videoUrl: "https://youtube.com/watch?v=example1",
    disponibilidade: {
      "Segunda": ["09:00", "10:00", "14:00"],
      "Quarta": ["10:00", "11:00", "15:00", "16:00"],
      "Sexta": ["09:00", "10:00"],
    },
    status: "aprovado",
    criadoEm: "2026-01-15",
  },
];

function calcularLiquido(bruto: number): string {
  const liquido = bruto * 0.75;
  return liquido.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

interface SejaTutorPageProps {
  perfil: string;
}

export default function SejaTutorPage({ perfil }: SejaTutorPageProps) {
  const { toast } = useToast();
  const [mentorias, setMentorias] = useState<Mentoria[]>(() => {
    const saved = localStorage.getItem(`artflow_mentorias_${perfil}`);
    return saved ? JSON.parse(saved) : mentoriasIniciais;
  });
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState<Mentoria | null>(null);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [precoPorHora, setPrecoPorHora] = useState("");
  const [categoria, setCategoria] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [fotoCapa, setFotoCapa] = useState("");
  const [disponibilidade, setDisponibilidade] = useState<Record<string, string[]>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const salvarMentorias = (novas: Mentoria[]) => {
    setMentorias(novas);
    localStorage.setItem(`artflow_mentorias_${perfil}`, JSON.stringify(novas));
  };

  const abrirNovo = () => {
    setEditando(null);
    setTitulo("Irei te ajudar com ");
    setDescricao("");
    setPrecoPorHora("");
    setCategoria("");
    setVideoUrl("");
    setFotoCapa("");
    setDisponibilidade({});
    setModalAberto(true);
  };

  const abrirEditar = (m: Mentoria) => {
    setEditando(m);
    setTitulo(m.titulo);
    setDescricao(m.descricao);
    setPrecoPorHora(m.precoPorHora.toString());
    setCategoria(m.categoria);
    setVideoUrl(m.videoUrl);
    setFotoCapa(m.fotoCapa);
    setDisponibilidade({ ...m.disponibilidade });
    setModalAberto(true);
  };

  const toggleHorario = (dia: string, horario: string) => {
    setDisponibilidade((prev) => {
      const diaAtual = prev[dia] || [];
      const existe = diaAtual.includes(horario);
      return {
        ...prev,
        [dia]: existe ? diaAtual.filter((h) => h !== horario) : [...diaAtual, horario].sort(),
      };
    });
  };

  const salvar = () => {
    if (!titulo.trim() || !descricao.trim() || !precoPorHora || !categoria) {
      toast({ title: "Campos obrigatórios", description: "Preencha todos os campos obrigatórios.", variant: "destructive" });
      return;
    }
    const preco = parseFloat(precoPorHora);
    if (isNaN(preco) || preco <= 0) {
      toast({ title: "Preço inválido", description: "Informe um preço por hora válido.", variant: "destructive" });
      return;
    }

    const diasComHorario = Object.entries(disponibilidade).filter(([, hs]) => hs.length > 0);
    if (diasComHorario.length === 0) {
      toast({ title: "Disponibilidade", description: "Selecione pelo menos um dia e horário.", variant: "destructive" });
      return;
    }

    if (editando) {
      const atualizadas = mentorias.map((m) =>
        m.id === editando.id
          ? { ...m, titulo, descricao, precoPorHora: preco, categoria, videoUrl, fotoCapa, disponibilidade }
          : m
      );
      salvarMentorias(atualizadas);
      toast({ title: "Mentoria atualizada", description: "Suas alterações foram salvas." });
    } else {
      const nova: Mentoria = {
        id: Date.now(),
        titulo,
        descricao,
        precoPorHora: preco,
        categoria,
        fotoCapa,
        videoUrl,
        disponibilidade,
        status: "pendente",
        criadoEm: new Date().toISOString().split("T")[0],
      };
      salvarMentorias([...mentorias, nova]);
      toast({ title: "Mentoria cadastrada", description: "Sua mentoria foi enviada para aprovação." });
    }
    setModalAberto(false);
  };

  const excluir = (id: number) => {
    salvarMentorias(mentorias.filter((m) => m.id !== id));
    toast({ title: "Mentoria removida" });
  };

  const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle }> = {
    aprovado: { label: "Aprovado", color: "text-green-600", icon: CheckCircle },
    pendente: { label: "Pendente", color: "text-amber-600", icon: Clock },
    rejeitado: { label: "Rejeitado", color: "text-red-600", icon: AlertCircle },
  };

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="page-seja-tutor">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-xl font-semibold text-foreground" data-testid="text-titulo-seja-tutor">
              Seja um Tutor
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Cadastre suas mentorias e compartilhe seu conhecimento com artistas.
            </p>
          </div>
          <Button onClick={abrirNovo} data-testid="button-nova-mentoria">
            <Plus className="h-4 w-4 mr-2" />
            Nova Mentoria
          </Button>
        </div>

        <Card className="p-4" data-testid="card-info-tutor">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-md" style={{ backgroundColor: "rgba(212, 168, 67, 0.1)" }}>
              <GraduationCap className="h-5 w-5" style={{ color: "#D4A843" }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Como funciona</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Cadastre sua mentoria, defina preço e disponibilidade. A plataforma retém 25% como taxa de serviço. 
                Após aprovação, sua mentoria ficará visível para artistas na aba "Tutores Online".
              </p>
            </div>
          </div>
        </Card>

        {mentorias.length === 0 ? (
          <Card className="p-12 text-center" data-testid="card-sem-mentorias">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground">Nenhuma mentoria cadastrada</p>
            <p className="text-sm text-muted-foreground mt-1">
              Clique em "Nova Mentoria" para começar a compartilhar seu conhecimento.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mentorias.map((m) => {
              const sc = statusConfig[m.status];
              const StatusIcon = sc.icon;
              return (
                <Card key={m.id} className="p-5" data-testid={`card-mentoria-${m.id}`}>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">{m.categoria}</Badge>
                    <div className={`flex items-center gap-1 text-xs ${sc.color}`}>
                      <StatusIcon className="h-3.5 w-3.5" />
                      <span>{sc.label}</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-2" data-testid={`text-mentoria-titulo-${m.id}`}>
                    {m.titulo}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-3 mb-3">
                    {m.descricao}
                  </p>

                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm font-semibold text-foreground">
                        R$ {m.precoPorHora.toFixed(2).replace(".", ",")}
                      </span>
                      <span className="text-xs text-muted-foreground">/hora</span>
                    </div>
                    <Separator orientation="vertical" className="h-4" />
                    <div className="text-xs text-muted-foreground">
                      Você recebe: <span className="font-medium text-green-600">{calcularLiquido(m.precoPorHora)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {Object.entries(m.disponibilidade)
                      .filter(([, hs]) => hs.length > 0)
                      .map(([dia]) => (
                        <Badge key={dia} variant="secondary" className="text-[10px]">{dia}</Badge>
                      ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => abrirEditar(m)} data-testid={`button-editar-mentoria-${m.id}`}>
                      <Pencil className="h-3.5 w-3.5 mr-1" /> Editar
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => excluir(m.id)} data-testid={`button-excluir-mentoria-${m.id}`}>
                      <Trash2 className="h-3.5 w-3.5 mr-1" /> Excluir
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="modal-mentoria">
          <DialogHeader>
            <DialogTitle>{editando ? "Editar Mentoria" : "Nova Mentoria"}</DialogTitle>
            <DialogDescription>
              {editando ? "Atualize os dados da sua mentoria." : "Preencha os campos para cadastrar sua mentoria."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="titulo-mentoria">Título da Mentoria *</Label>
              <Input
                id="titulo-mentoria"
                placeholder="Irei te ajudar com..."
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                data-testid="input-titulo-mentoria"
              />
              <p className="text-xs text-muted-foreground mt-1">Ex: "Irei te ajudar com precificação de obras contemporâneas"</p>
            </div>

            <div>
              <Label htmlFor="descricao-mentoria">Descrição da Mentoria *</Label>
              <textarea
                id="descricao-mentoria"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Descreva o que será abordado na mentoria..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                data-testid="input-descricao-mentoria"
              />
            </div>

            <div>
              <Label htmlFor="categoria-mentoria">Categoria *</Label>
              <Select value={categoria} onValueChange={setCategoria}>
                <SelectTrigger data-testid="select-categoria-mentoria">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIAS.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="preco-mentoria">Preço por Hora (R$) *</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="preco-mentoria"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="100.00"
                  value={precoPorHora}
                  onChange={(e) => setPrecoPorHora(e.target.value)}
                  className="max-w-[200px]"
                  data-testid="input-preco-mentoria"
                />
                {precoPorHora && parseFloat(precoPorHora) > 0 && (
                  <div className="flex items-center gap-1.5 text-sm" data-testid="text-valor-liquido">
                    <span className="text-muted-foreground">Você recebe:</span>
                    <span className="font-semibold text-green-600">
                      {calcularLiquido(parseFloat(precoPorHora))}
                    </span>
                    <span className="text-xs text-muted-foreground">(- 25% taxa)</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <Label>Calendário de Disponibilidade *</Label>
              <p className="text-xs text-muted-foreground mb-3">Selecione os dias e horários em que você está disponível.</p>
              <div className="space-y-3">
                {DIAS_SEMANA.map((dia) => (
                  <div key={dia}>
                    <p className="text-xs font-medium text-foreground mb-1.5">{dia}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {HORARIOS.map((h) => {
                        const selecionado = (disponibilidade[dia] || []).includes(h);
                        return (
                          <button
                            key={`${dia}-${h}`}
                            type="button"
                            onClick={() => toggleHorario(dia, h)}
                            className={`px-2 py-1 text-[11px] rounded-md border transition-colors ${
                              selecionado
                                ? "bg-foreground text-background border-foreground"
                                : "bg-background text-muted-foreground border-border hover-elevate"
                            }`}
                            data-testid={`btn-horario-${dia}-${h}`}
                          >
                            {h}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <Label htmlFor="video-mentoria">URL do Vídeo de Apresentação (YouTube)</Label>
              <Input
                id="video-mentoria"
                placeholder="https://youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                data-testid="input-video-mentoria"
              />
              <p className="text-xs text-muted-foreground mt-1">Opcional. Grave um vídeo curto se apresentando.</p>
            </div>

            <div>
              <Label>Foto de Capa</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                data-testid="input-file-foto-capa"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (file.size > 2 * 1024 * 1024) {
                      toast({ title: "Arquivo muito grande", description: "O tamanho máximo é 2MB.", variant: "destructive" });
                      return;
                    }
                    const reader = new FileReader();
                    reader.onloadend = () => setFotoCapa(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {fotoCapa ? (
                <div className="mt-1.5 relative rounded-md overflow-hidden border border-border">
                  <img src={fotoCapa} alt="Capa" className="w-full h-32 object-cover" data-testid="img-foto-capa-preview" />
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => { setFotoCapa(""); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                    data-testid="button-remover-foto-capa"
                  >
                    <Trash2 className="h-3 w-3 mr-1" /> Remover
                  </Button>
                </div>
              ) : (
                <div
                  className="mt-1.5 border-2 border-dashed border-border rounded-md p-6 text-center cursor-pointer hover-elevate"
                  onClick={() => fileInputRef.current?.click()}
                  data-testid="upload-foto-capa"
                >
                  <Image className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Clique para enviar uma imagem</p>
                  <p className="text-[10px] text-muted-foreground mt-1">JPG, PNG até 2MB</p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalAberto(false)} data-testid="button-cancelar-mentoria">
              Cancelar
            </Button>
            <Button onClick={salvar} data-testid="button-salvar-mentoria">
              {editando ? "Salvar Alterações" : "Cadastrar Mentoria"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { mentoriasIniciais };
