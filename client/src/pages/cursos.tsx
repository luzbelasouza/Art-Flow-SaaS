import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Avatar,
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
  Play,
  Clock,
  Star,
  Search,
  Filter,
  Lock,
  CheckCircle,
  BookOpen,
  Users,
  Video,
  ChevronRight,
  Crown,
} from "lucide-react";

interface Modulo {
  id: number;
  titulo: string;
  duracao: string;
  gratuito: boolean;
}

interface Curso {
  id: number;
  titulo: string;
  instrutor: string;
  descricao: string;
  categoria: string;
  preco: number;
  duracaoTotal: string;
  totalAlunos: number;
  avaliacao: number;
  modulos: Modulo[];
  incluidoPremium: boolean;
  imagem: string;
}

const CATEGORIAS_CURSO = ["Todas", "Técnicas", "História", "Mercado", "Gestão", "Digital"];

const cursosMock: Curso[] = [
  {
    id: 1,
    titulo: "Fundamentos da Pintura a Óleo",
    instrutor: "Maria Clara Santos",
    descricao: "Aprenda desde a preparação da tela até técnicas avançadas de pintura a óleo. Curso completo com 12 módulos práticos.",
    categoria: "Técnicas",
    preco: 197,
    duracaoTotal: "8h 30min",
    totalAlunos: 342,
    avaliacao: 4.8,
    modulos: [
      { id: 1, titulo: "Introdução e Materiais", duracao: "25min", gratuito: true },
      { id: 2, titulo: "Preparação da Tela", duracao: "35min", gratuito: true },
      { id: 3, titulo: "Teoria das Cores em Óleo", duracao: "45min", gratuito: false },
      { id: 4, titulo: "Técnica de Camadas (Glazing)", duracao: "50min", gratuito: false },
      { id: 5, titulo: "Pintura Alla Prima", duracao: "40min", gratuito: false },
      { id: 6, titulo: "Composição e Enquadramento", duracao: "35min", gratuito: false },
    ],
    incluidoPremium: true,
    imagem: "",
  },
  {
    id: 2,
    titulo: "Como Precificar sua Arte",
    instrutor: "Carlos Eduardo Neves",
    descricao: "Estratégias práticas para definir o valor comercial das suas obras. Inclui planilhas e calculadoras de precificação.",
    categoria: "Mercado",
    preco: 147,
    duracaoTotal: "4h 15min",
    totalAlunos: 518,
    avaliacao: 4.9,
    modulos: [
      { id: 1, titulo: "O Mercado de Arte no Brasil", duracao: "30min", gratuito: true },
      { id: 2, titulo: "Fatores de Precificação", duracao: "40min", gratuito: false },
      { id: 3, titulo: "Tabela de Preços Progressiva", duracao: "35min", gratuito: false },
      { id: 4, titulo: "Negociação com Galerias", duracao: "45min", gratuito: false },
    ],
    incluidoPremium: true,
    imagem: "",
  },
  {
    id: 3,
    titulo: "Arte Digital: Do Tradicional ao NFT",
    instrutor: "Juliana Ferreira",
    descricao: "Transição do tradicional para o digital. Ferramentas, técnicas e como criar arte digital comercialmente viável.",
    categoria: "Digital",
    preco: 247,
    duracaoTotal: "10h 45min",
    totalAlunos: 189,
    avaliacao: 4.6,
    modulos: [
      { id: 1, titulo: "Introdução à Arte Digital", duracao: "20min", gratuito: true },
      { id: 2, titulo: "Ferramentas Essenciais", duracao: "45min", gratuito: false },
      { id: 3, titulo: "Pintura Digital Básica", duracao: "55min", gratuito: false },
      { id: 4, titulo: "Ilustração Vetorial", duracao: "50min", gratuito: false },
      { id: 5, titulo: "NFTs e Blockchain para Artistas", duracao: "60min", gratuito: false },
    ],
    incluidoPremium: false,
    imagem: "",
  },
  {
    id: 4,
    titulo: "Gestão de Acervo para Artistas",
    instrutor: "Roberto Machado",
    descricao: "Organize e gerencie seu acervo de forma profissional. Catalogação, documentação e certificados de autenticidade.",
    categoria: "Gestão",
    preco: 97,
    duracaoTotal: "3h 20min",
    totalAlunos: 276,
    avaliacao: 4.7,
    modulos: [
      { id: 1, titulo: "Por que Catalogar?", duracao: "15min", gratuito: true },
      { id: 2, titulo: "Sistema de Inventário", duracao: "30min", gratuito: false },
      { id: 3, titulo: "Certificados de Autenticidade", duracao: "25min", gratuito: false },
      { id: 4, titulo: "Fotografia de Obras", duracao: "35min", gratuito: false },
    ],
    incluidoPremium: true,
    imagem: "",
  },
  {
    id: 5,
    titulo: "História da Arte Moderna Brasileira",
    instrutor: "Prof. Antônio Ribeiro",
    descricao: "Um panorama completo da arte moderna no Brasil, de Anita Malfatti à Bienal de São Paulo. Análise de obras e movimentos.",
    categoria: "História",
    preco: 167,
    duracaoTotal: "6h 50min",
    totalAlunos: 421,
    avaliacao: 4.9,
    modulos: [
      { id: 1, titulo: "Semana de 22", duracao: "40min", gratuito: true },
      { id: 2, titulo: "Modernismo Brasileiro", duracao: "45min", gratuito: false },
      { id: 3, titulo: "Concretismo e Neoconcretismo", duracao: "50min", gratuito: false },
      { id: 4, titulo: "Arte Contemporânea Brasileira", duracao: "55min", gratuito: false },
    ],
    incluidoPremium: true,
    imagem: "",
  },
];

export default function CursosPage() {
  const { toast } = useToast();
  const [busca, setBusca] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
  const [cursoAberto, setCursoAberto] = useState<Curso | null>(null);

  const cursosFiltrados = cursosMock.filter((c) => {
    const matchBusca = c.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      c.instrutor.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria = categoriaFiltro === "Todas" || c.categoria === categoriaFiltro;
    return matchBusca && matchCategoria;
  });

  const comprarCurso = (curso: Curso) => {
    toast({
      title: "Redirecionando para pagamento",
      description: `Curso "${curso.titulo}" — R$ ${curso.preco.toFixed(2).replace(".", ",")}`,
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="page-cursos">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground" data-testid="text-titulo-cursos">
            Cursos
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Aprenda com os melhores profissionais do mercado de arte.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cursos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9"
              data-testid="input-busca-cursos"
            />
          </div>
          <Select value={categoriaFiltro} onValueChange={setCategoriaFiltro}>
            <SelectTrigger className="w-[180px]" data-testid="select-categoria-cursos">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIAS_CURSO.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cursosFiltrados.map((curso) => (
            <Card key={curso.id} className="overflow-hidden flex flex-col" data-testid={`card-curso-${curso.id}`}>
              <div className="h-36 bg-muted flex items-center justify-center relative">
                <GraduationCap className="h-12 w-12 text-muted-foreground/40" />
                {curso.incluidoPremium && (
                  <div
                    className="absolute top-2 right-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{ backgroundColor: "rgba(212, 168, 67, 0.15)", color: "#D4A843" }}
                    data-testid={`badge-premium-curso-${curso.id}`}
                  >
                    <Crown className="h-3 w-3" /> Premium
                  </div>
                )}
                <div className="absolute bottom-2 left-2">
                  <Badge variant="secondary" className="text-[10px]">{curso.categoria}</Badge>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-1" data-testid={`text-curso-titulo-${curso.id}`}>
                  {curso.titulo}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">{curso.instrutor}</p>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">
                  {curso.descricao}
                </p>

                <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{curso.duracaoTotal}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    <span>{curso.modulos.length} módulos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{curso.totalAlunos}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium text-foreground">{curso.avaliacao}</span>
                </div>

                <Separator className="mb-3" />

                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-lg font-semibold text-foreground" data-testid={`text-curso-preco-${curso.id}`}>
                      R$ {curso.preco.toFixed(2).replace(".", ",")}
                    </span>
                    {curso.incluidoPremium && (
                      <p className="text-[10px] text-muted-foreground">ou grátis no Premium</p>
                    )}
                  </div>
                  <Button size="sm" onClick={() => setCursoAberto(curso)} data-testid={`button-ver-curso-${curso.id}`}>
                    Ver Curso
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!cursoAberto} onOpenChange={() => setCursoAberto(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto" data-testid="modal-curso">
          <DialogHeader>
            <DialogTitle>{cursoAberto?.titulo}</DialogTitle>
            <DialogDescription>
              {cursoAberto?.instrutor} — {cursoAberto?.duracaoTotal}
            </DialogDescription>
          </DialogHeader>

          {cursoAberto && (
            <div className="space-y-4 py-2">
              <p className="text-sm text-muted-foreground">{cursoAberto.descricao}</p>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium">{cursoAberto.avaliacao}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{cursoAberto.totalAlunos} alunos</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>{cursoAberto.modulos.length} módulos</span>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-foreground mb-3">Conteúdo do Curso</p>
                <div className="space-y-1.5">
                  {cursoAberto.modulos.map((mod, idx) => (
                    <div
                      key={mod.id}
                      className="flex items-center gap-3 p-2.5 rounded-md border border-border"
                      data-testid={`modulo-${cursoAberto.id}-${mod.id}`}
                    >
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{mod.titulo}</p>
                        <p className="text-[10px] text-muted-foreground">{mod.duracao}</p>
                      </div>
                      {mod.gratuito ? (
                        <Badge variant="outline" className="text-[10px] text-green-600 border-green-200">
                          <Play className="h-2.5 w-2.5 mr-1" /> Grátis
                        </Badge>
                      ) : (
                        <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Card className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-lg font-semibold text-foreground">
                      R$ {cursoAberto.preco.toFixed(2).replace(".", ",")}
                    </p>
                    {cursoAberto.incluidoPremium && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Crown className="h-3 w-3" style={{ color: "#D4A843" }} /> Incluído no plano Premium
                      </p>
                    )}
                  </div>
                  <Button onClick={() => comprarCurso(cursoAberto)} data-testid="button-comprar-curso">
                    Comprar Curso
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
