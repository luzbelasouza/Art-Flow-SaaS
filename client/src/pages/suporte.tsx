import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  HelpCircle,
  MessageSquare,
  Send,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Headphones,
  FileText,
  CreditCard,
  Settings,
  Palette,
} from "lucide-react";

interface Mensagem {
  id: number;
  autor: "usuario" | "suporte";
  texto: string;
  timestamp: string;
}

interface Chamado {
  id: number;
  assunto: string;
  categoria: string;
  status: "aberto" | "respondido" | "resolvido";
  criadoEm: string;
  mensagens: Mensagem[];
}

const CATEGORIAS_SUPORTE = [
  { value: "conta", label: "Minha Conta", icon: Settings },
  { value: "acervo", label: "Acervo e Obras", icon: Palette },
  { value: "pagamento", label: "Pagamentos e Premium", icon: CreditCard },
  { value: "tecnico", label: "Problema Técnico", icon: AlertCircle },
  { value: "outro", label: "Outro Assunto", icon: FileText },
];

const respostasAutomaticas: Record<string, string> = {
  conta: "Olá! Vi que você tem uma dúvida sobre sua conta. Como posso ajudar? Se precisar alterar dados do perfil, acesse o menu Perfil na sidebar.",
  acervo: "Olá! Estou aqui para ajudar com seu acervo. Pode me detalhar o que precisa? Lembre-se que no plano gratuito você tem até 5 obras.",
  pagamento: "Olá! Sobre pagamentos e plano Premium: o Art Flow Premium custa R$ 49,90/mês e oferece acesso ilimitado a todas as funcionalidades.",
  tecnico: "Olá! Vamos resolver esse problema técnico. Por favor, descreva o que está acontecendo com o máximo de detalhes possível.",
  outro: "Olá! Estou aqui para ajudar. Por favor, descreva sua solicitação e retornarei o mais breve possível.",
};

const chamadosIniciais: Chamado[] = [
  {
    id: 1,
    assunto: "Como aumentar o limite de obras?",
    categoria: "pagamento",
    status: "respondido",
    criadoEm: "2026-02-14",
    mensagens: [
      { id: 1, autor: "usuario", texto: "Olá, estou no plano gratuito e queria saber como posso cadastrar mais de 5 obras.", timestamp: "14/02/2026 10:30" },
      { id: 2, autor: "suporte", texto: "Olá! Para cadastrar obras ilimitadas, você pode assinar o Art Flow Premium por R$ 49,90/mês. Além das obras ilimitadas, terá acesso a catálogos sem marca d'água, Mapa da Obra e muito mais. Deseja que eu envie mais informações?", timestamp: "14/02/2026 10:35" },
      { id: 3, autor: "usuario", texto: "Sim, por favor! Como faço para assinar?", timestamp: "14/02/2026 10:40" },
      { id: 4, autor: "suporte", texto: "Ao clicar em qualquer funcionalidade premium (marcada com 'P'), aparecerá a opção para assinar. Você também pode clicar no botão 'Assinar Premium' no rodapé da sidebar. O pagamento aceita cartão de crédito e PIX.", timestamp: "14/02/2026 10:42" },
    ],
  },
];

interface SuportePageProps {
  perfil: string;
  nomeUsuario: string;
}

export default function SuportePage({ perfil, nomeUsuario }: SuportePageProps) {
  const { toast } = useToast();
  const chatRef = useRef<HTMLDivElement>(null);

  const [chamados, setChamados] = useState<Chamado[]>(() => {
    const saved = localStorage.getItem(`artflow_chamados_${perfil}`);
    return saved ? JSON.parse(saved) : chamadosIniciais;
  });
  const [chamadoAtivo, setChamadoAtivo] = useState<Chamado | null>(null);
  const [mensagemInput, setMensagemInput] = useState("");
  const [modalNovo, setModalNovo] = useState(false);
  const [novoAssunto, setNovoAssunto] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("");
  const [novaMensagem, setNovaMensagem] = useState("");

  const salvarChamados = (novos: Chamado[]) => {
    setChamados(novos);
    localStorage.setItem(`artflow_chamados_${perfil}`, JSON.stringify(novos));
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chamadoAtivo?.mensagens.length]);

  const criarChamado = () => {
    if (!novoAssunto.trim() || !novaCategoria || !novaMensagem.trim()) {
      toast({ title: "Campos obrigatórios", description: "Preencha todos os campos.", variant: "destructive" });
      return;
    }

    const agora = new Date();
    const timestamp = `${agora.toLocaleDateString("pt-BR")} ${agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;

    const novoChamado: Chamado = {
      id: Date.now(),
      assunto: novoAssunto,
      categoria: novaCategoria,
      status: "respondido",
      criadoEm: agora.toISOString().split("T")[0],
      mensagens: [
        { id: 1, autor: "usuario", texto: novaMensagem, timestamp },
        { id: 2, autor: "suporte", texto: respostasAutomaticas[novaCategoria] || respostasAutomaticas.outro, timestamp },
      ],
    };

    const atualizados = [novoChamado, ...chamados];
    salvarChamados(atualizados);
    setChamadoAtivo(novoChamado);
    setModalNovo(false);
    setNovoAssunto("");
    setNovaCategoria("");
    setNovaMensagem("");
    toast({ title: "Chamado aberto", description: "Nosso time já está analisando sua solicitação." });
  };

  const enviarMensagem = () => {
    if (!chamadoAtivo || !mensagemInput.trim()) return;

    const agora = new Date();
    const timestamp = `${agora.toLocaleDateString("pt-BR")} ${agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;

    const novaMsgUsuario: Mensagem = {
      id: Date.now(),
      autor: "usuario",
      texto: mensagemInput,
      timestamp,
    };

    const respostaSuporte: Mensagem = {
      id: Date.now() + 1,
      autor: "suporte",
      texto: "Obrigado pela mensagem! Nosso time está analisando e retornará em breve. Caso seja urgente, inclua mais detalhes para agilizar o atendimento.",
      timestamp,
    };

    const chamadoAtualizado = {
      ...chamadoAtivo,
      status: "respondido" as const,
      mensagens: [...chamadoAtivo.mensagens, novaMsgUsuario, respostaSuporte],
    };

    const atualizados = chamados.map((c) => c.id === chamadoAtivo.id ? chamadoAtualizado : c);
    salvarChamados(atualizados);
    setChamadoAtivo(chamadoAtualizado);
    setMensagemInput("");
  };

  const resolverChamado = () => {
    if (!chamadoAtivo) return;
    const atualizado = { ...chamadoAtivo, status: "resolvido" as const };
    const atualizados = chamados.map((c) => c.id === chamadoAtivo.id ? atualizado : c);
    salvarChamados(atualizados);
    setChamadoAtivo(atualizado);
    toast({ title: "Chamado resolvido" });
  };

  const statusConfig: Record<string, { label: string; color: string }> = {
    aberto: { label: "Aberto", color: "text-amber-600" },
    respondido: { label: "Respondido", color: "text-blue-600" },
    resolvido: { label: "Resolvido", color: "text-green-600" },
  };

  return (
    <div className="flex-1 overflow-hidden" data-testid="page-suporte">
      <div className="flex h-full">
        <div className="w-80 border-r border-border flex flex-col bg-background">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between gap-2 mb-3">
              <h2 className="text-sm font-semibold text-foreground" data-testid="text-titulo-suporte">
                Suporte
              </h2>
              <Button size="sm" onClick={() => setModalNovo(true)} data-testid="button-novo-chamado">
                <Plus className="h-3.5 w-3.5 mr-1" /> Novo
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {chamados.length} chamado{chamados.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex-1 overflow-y-auto">
            {chamados.length === 0 ? (
              <div className="p-6 text-center">
                <Headphones className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Nenhum chamado aberto</p>
              </div>
            ) : (
              chamados.map((chamado) => {
                const sc = statusConfig[chamado.status];
                const catInfo = CATEGORIAS_SUPORTE.find((c) => c.value === chamado.categoria);
                const CatIcon = catInfo?.icon || HelpCircle;
                return (
                  <button
                    key={chamado.id}
                    type="button"
                    onClick={() => setChamadoAtivo(chamado)}
                    className={`w-full text-left p-3 border-b border-border transition-colors ${
                      chamadoAtivo?.id === chamado.id ? "bg-muted" : "hover-elevate"
                    }`}
                    data-testid={`btn-chamado-${chamado.id}`}
                  >
                    <div className="flex items-start gap-2">
                      <CatIcon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{chamado.assunto}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] ${sc.color}`}>{sc.label}</span>
                          <span className="text-[10px] text-muted-foreground">{chamado.criadoEm}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                          {chamado.mensagens[chamado.mensagens.length - 1]?.texto}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-muted/20">
          {chamadoAtivo ? (
            <>
              <div className="p-4 border-b border-border bg-background">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate" data-testid="text-chamado-assunto">
                      {chamadoAtivo.assunto}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="outline" className="text-[10px]">
                        {CATEGORIAS_SUPORTE.find((c) => c.value === chamadoAtivo.categoria)?.label}
                      </Badge>
                      <span className={`text-[10px] ${statusConfig[chamadoAtivo.status].color}`}>
                        {statusConfig[chamadoAtivo.status].label}
                      </span>
                    </div>
                  </div>
                  {chamadoAtivo.status !== "resolvido" && (
                    <Button size="sm" variant="outline" onClick={resolverChamado} data-testid="button-resolver-chamado">
                      <CheckCircle className="h-3.5 w-3.5 mr-1" /> Resolver
                    </Button>
                  )}
                </div>
              </div>

              <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3" data-testid="chat-mensagens">
                {chamadoAtivo.mensagens.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.autor === "usuario" ? "justify-end" : "justify-start"}`}
                    data-testid={`msg-${msg.id}`}
                  >
                    <div className={`flex items-end gap-2 max-w-[75%] ${msg.autor === "usuario" ? "flex-row-reverse" : ""}`}>
                      <Avatar className="h-7 w-7 shrink-0">
                        <AvatarFallback className="text-[10px]">
                          {msg.autor === "usuario" ? nomeUsuario.split(" ").map((n) => n[0]).join("").slice(0, 2) : "AF"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div
                          className={`px-3 py-2 rounded-lg text-sm ${
                            msg.autor === "usuario"
                              ? "bg-foreground text-background"
                              : "bg-background border border-border text-foreground"
                          }`}
                        >
                          {msg.texto}
                        </div>
                        <p className={`text-[10px] text-muted-foreground mt-0.5 ${msg.autor === "usuario" ? "text-right" : ""}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {chamadoAtivo.status !== "resolvido" && (
                <div className="p-3 border-t border-border bg-background">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Digite sua mensagem..."
                      value={mensagemInput}
                      onChange={(e) => setMensagemInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
                      data-testid="input-mensagem-suporte"
                    />
                    <Button size="icon" onClick={enviarMensagem} data-testid="button-enviar-mensagem">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <Headphones className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-foreground mb-1">Central de Suporte</p>
              <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
                Selecione um chamado na lista ou abra um novo para conversar com nossa equipe.
              </p>
              <Button onClick={() => setModalNovo(true)} data-testid="button-novo-chamado-center">
                <Plus className="h-4 w-4 mr-2" /> Novo Chamado
              </Button>
            </div>
          )}
        </div>
      </div>

      <Dialog open={modalNovo} onOpenChange={setModalNovo}>
        <DialogContent className="max-w-md" data-testid="modal-novo-chamado">
          <DialogHeader>
            <DialogTitle>Novo Chamado</DialogTitle>
            <DialogDescription>Descreva seu problema ou dúvida e nossa equipe responderá em breve.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="assunto-chamado">Assunto *</Label>
              <Input
                id="assunto-chamado"
                placeholder="Descreva brevemente o assunto..."
                value={novoAssunto}
                onChange={(e) => setNovoAssunto(e.target.value)}
                data-testid="input-assunto-chamado"
              />
            </div>

            <div>
              <Label>Categoria *</Label>
              <Select value={novaCategoria} onValueChange={setNovaCategoria}>
                <SelectTrigger data-testid="select-categoria-chamado">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIAS_SUPORTE.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <span className="flex items-center gap-2">
                        <cat.icon className="h-3.5 w-3.5" />
                        {cat.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="mensagem-chamado">Mensagem *</Label>
              <textarea
                id="mensagem-chamado"
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Descreva seu problema com detalhes..."
                value={novaMensagem}
                onChange={(e) => setNovaMensagem(e.target.value)}
                data-testid="input-mensagem-chamado"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalNovo(false)} data-testid="button-cancelar-chamado">
              Cancelar
            </Button>
            <Button onClick={criarChamado} data-testid="button-criar-chamado">
              <Send className="h-4 w-4 mr-1" /> Abrir Chamado
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
