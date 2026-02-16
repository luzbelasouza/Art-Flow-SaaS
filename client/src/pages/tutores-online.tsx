import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
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
  Star,
  Clock,
  DollarSign,
  Calendar,
  Video,
  Search,
  CheckCircle,
  MapPin,
  Filter,
} from "lucide-react";

interface TutorCard {
  id: number;
  nome: string;
  avatar: string;
  titulo: string;
  descricao: string;
  categoria: string;
  precoPorHora: number;
  avaliacao: number;
  totalAulas: number;
  disponibilidade: Record<string, string[]>;
  videoUrl: string;
}

const CATEGORIAS_FILTRO = ["Todas", "Processo criativo", "História da arte", "Curadoria", "Venda e precificação", "Outros"];

const tutoresMock: TutorCard[] = [
  {
    id: 1,
    nome: "Marina Costa",
    avatar: "",
    titulo: "Curadoria de exposições contemporâneas",
    descricao: "Especialista em curadoria com 15 anos de experiência em galerias de São Paulo e Rio de Janeiro. Mentora de jovens curadores no MAM-SP.",
    categoria: "Curadoria",
    precoPorHora: 150,
    avaliacao: 4.8,
    totalAulas: 47,
    disponibilidade: {
      "Segunda": ["09:00", "10:00", "14:00"],
      "Quarta": ["10:00", "11:00", "15:00", "16:00"],
      "Sexta": ["09:00", "10:00"],
    },
    videoUrl: "https://youtube.com/watch?v=example1",
  },
  {
    id: 2,
    nome: "Ricardo Almeida",
    avatar: "",
    titulo: "Precificação e venda de obras de arte",
    descricao: "Galerista e consultor de mercado de arte com atuação em leilões internacionais. Ajudo artistas a entender o valor comercial de suas obras.",
    categoria: "Venda e precificação",
    precoPorHora: 200,
    avaliacao: 4.9,
    totalAulas: 83,
    disponibilidade: {
      "Terça": ["14:00", "15:00", "16:00"],
      "Quinta": ["10:00", "11:00"],
    },
    videoUrl: "",
  },
  {
    id: 3,
    nome: "Ana Beatriz Silva",
    avatar: "",
    titulo: "Processo criativo e desbloqueio artístico",
    descricao: "Artista visual e terapeuta de arte. Trabalho com técnicas de desbloqueio criativo e desenvolvimento de linguagem artística pessoal.",
    categoria: "Processo criativo",
    precoPorHora: 120,
    avaliacao: 4.7,
    totalAulas: 125,
    disponibilidade: {
      "Segunda": ["08:00", "09:00"],
      "Terça": ["08:00", "09:00"],
      "Quarta": ["08:00", "09:00"],
      "Quinta": ["08:00", "09:00"],
      "Sexta": ["08:00", "09:00"],
    },
    videoUrl: "https://youtube.com/watch?v=example3",
  },
  {
    id: 4,
    nome: "Prof. Fernando Lopes",
    avatar: "",
    titulo: "História da arte moderna e contemporânea",
    descricao: "Professor de história da arte na USP. Especialista em arte moderna brasileira e movimentos contemporâneos. Publiquei 3 livros sobre o tema.",
    categoria: "História da arte",
    precoPorHora: 180,
    avaliacao: 5.0,
    totalAulas: 210,
    disponibilidade: {
      "Sábado": ["09:00", "10:00", "11:00", "14:00", "15:00"],
    },
    videoUrl: "https://youtube.com/watch?v=example4",
  },
];

export default function TutoresOnlinePage() {
  const { toast } = useToast();
  const [busca, setBusca] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
  const [modalAgendamento, setModalAgendamento] = useState(false);
  const [tutorSelecionado, setTutorSelecionado] = useState<TutorCard | null>(null);
  const [diaSelecionado, setDiaSelecionado] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");

  const tutoresFiltrados = tutoresMock.filter((t) => {
    const matchBusca = t.nome.toLowerCase().includes(busca.toLowerCase()) ||
      t.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      t.categoria.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoriaFiltro === "Todas" || t.categoria === categoriaFiltro;
    return matchBusca && matchCategoria;
  });

  const abrirAgendamento = (tutor: TutorCard) => {
    setTutorSelecionado(tutor);
    setDiaSelecionado("");
    setHorarioSelecionado("");
    setModalAgendamento(true);
  };

  const diasDisponiveis = tutorSelecionado
    ? Object.entries(tutorSelecionado.disponibilidade).filter(([, hs]) => hs.length > 0).map(([dia]) => dia)
    : [];

  const horariosDisponiveis = tutorSelecionado && diaSelecionado
    ? tutorSelecionado.disponibilidade[diaSelecionado] || []
    : [];

  const confirmarAgendamento = () => {
    if (!diaSelecionado || !horarioSelecionado) {
      toast({ title: "Selecione dia e horário", variant: "destructive" });
      return;
    }
    toast({
      title: "Agendamento confirmado!",
      description: `Sessão com ${tutorSelecionado?.nome} agendada para ${diaSelecionado} às ${horarioSelecionado}.`,
    });
    setModalAgendamento(false);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="page-tutores-online">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground" data-testid="text-titulo-tutores">
            Tutores Online
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Conecte-se com mentores especializados em arte e desenvolva suas habilidades.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar tutores..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9"
              data-testid="input-busca-tutores"
            />
          </div>
          <Select value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
            <SelectTrigger className="w-[200px]" data-testid="select-categoria-filtro">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIAS_FILTRO.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {tutoresFiltrados.length === 0 ? (
          <Card className="p-12 text-center" data-testid="card-sem-tutores">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground">Nenhum tutor encontrado</p>
            <p className="text-sm text-muted-foreground mt-1">Tente ajustar os filtros de busca.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tutoresFiltrados.map((tutor) => (
              <Card key={tutor.id} className="p-5" data-testid={`card-tutor-${tutor.id}`}>
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={tutor.avatar} />
                    <AvatarFallback className="text-sm font-medium">
                      {tutor.nome.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground" data-testid={`text-tutor-nome-${tutor.id}`}>
                      {tutor.nome}
                    </p>
                    <Badge variant="outline" className="text-[10px] mt-1">{tutor.categoria}</Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-foreground">{tutor.avaliacao}</span>
                    <span className="text-muted-foreground">({tutor.totalAulas})</span>
                  </div>
                </div>

                <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-1.5" data-testid={`text-tutor-titulo-${tutor.id}`}>
                  {tutor.titulo}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                  {tutor.descricao}
                </p>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm font-semibold text-foreground" data-testid={`text-tutor-preco-${tutor.id}`}>
                      R$ {tutor.precoPorHora.toFixed(2).replace(".", ",")}
                    </span>
                    <span className="text-xs text-muted-foreground">/hora</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{Object.entries(tutor.disponibilidade).filter(([, h]) => h.length > 0).length} dias disponíveis</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {Object.entries(tutor.disponibilidade)
                    .filter(([, hs]) => hs.length > 0)
                    .map(([dia]) => (
                      <Badge key={dia} variant="secondary" className="text-[10px]">{dia}</Badge>
                    ))}
                </div>

                <Button className="w-full" onClick={() => abrirAgendamento(tutor)} data-testid={`button-contratar-${tutor.id}`}>
                  Contratar
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={modalAgendamento} onOpenChange={setModalAgendamento}>
        <DialogContent className="max-w-md" data-testid="modal-agendamento">
          <DialogHeader>
            <DialogTitle>Agendar Mentoria</DialogTitle>
            <DialogDescription>
              Selecione o dia e horário para sua sessão com {tutorSelecionado?.nome}.
            </DialogDescription>
          </DialogHeader>

          {tutorSelecionado && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-xs font-medium">
                    {tutorSelecionado.nome.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">{tutorSelecionado.nome}</p>
                  <p className="text-xs text-muted-foreground">{tutorSelecionado.titulo}</p>
                </div>
              </div>

              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Valor da sessão</span>
                  <span className="text-lg font-semibold text-foreground" data-testid="text-valor-sessao">
                    R$ {tutorSelecionado.precoPorHora.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </Card>

              <div>
                <Label>Dia da semana</Label>
                <Select value={diaSelecionado} onValueChange={(v) => { setDiaSelecionado(v); setHorarioSelecionado(""); }}>
                  <SelectTrigger data-testid="select-dia-agendamento">
                    <SelectValue placeholder="Selecione o dia" />
                  </SelectTrigger>
                  <SelectContent>
                    {diasDisponiveis.map((dia) => (
                      <SelectItem key={dia} value={dia}>{dia}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {diaSelecionado && (
                <div>
                  <Label>Horário</Label>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    {horariosDisponiveis.map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setHorarioSelecionado(h)}
                        className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                          horarioSelecionado === h
                            ? "bg-foreground text-background border-foreground"
                            : "bg-background text-muted-foreground border-border hover-elevate"
                        }`}
                        data-testid={`btn-horario-agendamento-${h}`}
                      >
                        <Clock className="h-3 w-3 inline-block mr-1" />
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {diaSelecionado && horarioSelecionado && (
                <Card className="p-3" style={{ backgroundColor: "rgba(34, 197, 94, 0.05)" }}>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-foreground">
                      {diaSelecionado} às {horarioSelecionado} — 1 hora de mentoria
                    </span>
                  </div>
                </Card>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalAgendamento(false)} data-testid="button-cancelar-agendamento">
              Cancelar
            </Button>
            <Button onClick={confirmarAgendamento} data-testid="button-confirmar-agendamento">
              <DollarSign className="h-4 w-4 mr-1" /> Confirmar e Pagar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
