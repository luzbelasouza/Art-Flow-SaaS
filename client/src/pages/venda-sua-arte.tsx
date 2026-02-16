import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Store,
  Search,
  Gavel,
  Plus,
  Trash2,
  Send,
  AlertCircle,
  ShieldCheck,
  CheckCircle,
  Clock,
  FileText,
} from "lucide-react";

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

interface SubmissaoLeilao {
  id: string;
  obraId: number;
  obraTitulo: string;
  obraImagem: string;
  obraInventarioId: string;
  status: "em-avaliacao" | "aprovada" | "reprovada";
  dataEnvio: string;
  verificada: boolean;
}

const STORAGE_KEY = "artflow_submissoes_leilao";
const VERIFICADAS_KEY = "artflow_obras_verificadas";
const LEILAO_MENSAGENS_KEY = "artflow_leilao_mensagens";

function carregarSubmissoes(): SubmissaoLeilao[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function salvarSubmissoes(subs: SubmissaoLeilao[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
}

function carregarVerificadas(): number[] {
  try {
    const raw = localStorage.getItem(VERIFICADAS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function salvarVerificadas(ids: number[]) {
  localStorage.setItem(VERIFICADAS_KEY, JSON.stringify(ids));
}

function salvarMensagemLeilao(mensagem: { obraTitulo: string; status: string; data: string }) {
  const msgs = carregarMensagensLeilao();
  msgs.unshift(mensagem);
  localStorage.setItem(LEILAO_MENSAGENS_KEY, JSON.stringify(msgs));
}

export function carregarMensagensLeilao(): Array<{ obraTitulo: string; status: string; data: string }> {
  try {
    const raw = localStorage.getItem(LEILAO_MENSAGENS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function carregarObrasVerificadas(): number[] {
  return carregarVerificadas();
}

const statusLabels: Record<string, string> = {
  "em-avaliacao": "Em Avaliação",
  "aprovada": "Aprovada",
  "reprovada": "Reprovada",
};

const statusColors: Record<string, { bg: string; color: string; border: string }> = {
  "em-avaliacao": { bg: "rgba(245, 158, 11, 0.1)", color: "#d97706", border: "rgba(245, 158, 11, 0.3)" },
  "aprovada": { bg: "rgba(34, 197, 94, 0.1)", color: "#16a34a", border: "rgba(34, 197, 94, 0.3)" },
  "reprovada": { bg: "rgba(239, 68, 68, 0.1)", color: "#dc2626", border: "rgba(239, 68, 68, 0.3)" },
};

export default function VendaSuaArtePage({ obras }: { obras: Obra[] }) {
  const { toast } = useToast();
  const [busca, setBusca] = useState("");
  const [selecionadas, setSelecionadas] = useState<Obra[]>([]);
  const [submissoes, setSubmissoes] = useState<SubmissaoLeilao[]>(carregarSubmissoes);
  const [modalTermos, setModalTermos] = useState(false);
  const [termosAceitos, setTermosAceitos] = useState(false);

  const obrasJaEnviadas = useMemo(() => new Set(submissoes.map((s) => s.obraId)), [submissoes]);

  const resultadoBusca = useMemo(() => {
    if (!busca.trim()) return [];
    const termo = busca.toLowerCase();
    return obras.filter(
      (o) =>
        !obrasJaEnviadas.has(o.id) &&
        !selecionadas.some((s) => s.id === o.id) &&
        (o.titulo.toLowerCase().includes(termo) || o.inventarioId.toLowerCase().includes(termo))
    );
  }, [busca, obras, obrasJaEnviadas, selecionadas]);

  function adicionarObra(obra: Obra) {
    if (selecionadas.length >= 5) {
      toast({ title: "Limite atingido", description: "Você pode enviar no máximo 5 obras por vez.", variant: "destructive" });
      return;
    }
    setSelecionadas((prev) => [...prev, obra]);
    setBusca("");
  }

  function removerObra(obraId: number) {
    setSelecionadas((prev) => prev.filter((o) => o.id !== obraId));
  }

  function handleEnviarParaAvaliacao() {
    if (selecionadas.length === 0) return;
    setModalTermos(true);
  }

  function confirmarEnvio() {
    const dataHoje = new Date().toLocaleDateString("pt-BR");
    const novasSubmissoes: SubmissaoLeilao[] = selecionadas.map((obra) => ({
      id: `sub-${Date.now()}-${obra.id}`,
      obraId: obra.id,
      obraTitulo: obra.titulo,
      obraImagem: obra.imagem,
      obraInventarioId: obra.inventarioId,
      status: "em-avaliacao",
      dataEnvio: dataHoje,
      verificada: false,
    }));

    const atualizadas = [...novasSubmissoes, ...submissoes];
    setSubmissoes(atualizadas);
    salvarSubmissoes(atualizadas);

    setTimeout(() => {
      const subsAtualizadas = carregarSubmissoes();
      const verificadasAtuais = carregarVerificadas();
      const novasVerificadas = [...verificadasAtuais];

      const resultado = subsAtualizadas.map((sub) => {
        if (novasSubmissoes.some((ns) => ns.id === sub.id) && sub.status === "em-avaliacao") {
          const aprovada = Math.random() > 0.2;
          if (aprovada) {
            novasVerificadas.push(sub.obraId);
            salvarMensagemLeilao({
              obraTitulo: sub.obraTitulo,
              status: "aprovada",
              data: new Date().toLocaleDateString("pt-BR"),
            });
          } else {
            salvarMensagemLeilao({
              obraTitulo: sub.obraTitulo,
              status: "reprovada",
              data: new Date().toLocaleDateString("pt-BR"),
            });
          }
          return { ...sub, status: aprovada ? "aprovada" as const : "reprovada" as const, verificada: aprovada };
        }
        return sub;
      });

      salvarSubmissoes(resultado);
      salvarVerificadas(Array.from(new Set(novasVerificadas)));
      setSubmissoes(resultado);
    }, 5000);

    setSelecionadas([]);
    setModalTermos(false);
    setTermosAceitos(false);
    toast({
      title: "Obras enviadas para avaliação",
      description: `${novasSubmissoes.length} obra(s) enviada(s). O relatório será disponibilizado na Caixa de Entrada em até 24h.`,
    });
  }

  const submissoesEmAvaliacao = submissoes.filter((s) => s.status === "em-avaliacao");
  const submissoesAvaliadas = submissoes.filter((s) => s.status !== "em-avaliacao");

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground" data-testid="text-venda-desc">
            Envie suas obras para avaliação e participe dos leilões oficiais da Art Flow.
          </p>
        </div>

        <section className="space-y-4" data-testid="section-busca-obras">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            Buscar Obra para Avaliação
          </h3>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Busque por nome ou ID da obra..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9"
              data-testid="input-busca-obra"
            />
          </div>

          {busca.trim() && resultadoBusca.length > 0 && (
            <div className="border border-border rounded-md divide-y divide-border max-h-48 overflow-y-auto" data-testid="lista-resultados-busca">
              {resultadoBusca.map((obra) => (
                <div
                  key={obra.id}
                  className="flex items-center gap-3 p-3 hover-elevate cursor-pointer"
                  onClick={() => adicionarObra(obra)}
                  data-testid={`resultado-obra-${obra.id}`}
                >
                  <img src={obra.imagem} alt={obra.titulo} className="w-10 h-10 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{obra.titulo}</p>
                    <p className="text-xs text-muted-foreground">{obra.inventarioId} — {obra.tecnica}, {obra.ano}</p>
                  </div>
                  <Plus className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </div>
              ))}
            </div>
          )}

          {busca.trim() && resultadoBusca.length === 0 && (
            <p className="text-xs text-muted-foreground" data-testid="text-sem-resultados">Nenhuma obra encontrada.</p>
          )}
        </section>

        {selecionadas.length > 0 && (
          <section className="space-y-4" data-testid="section-obras-selecionadas">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Gavel className="h-4 w-4 text-muted-foreground" />
                Obras Selecionadas ({selecionadas.length}/5)
              </h3>
              <Button onClick={handleEnviarParaAvaliacao} data-testid="button-enviar-avaliacao">
                <Send className="mr-2 h-4 w-4" />
                Enviar para Avaliação
              </Button>
            </div>

            <div className="space-y-2">
              {selecionadas.map((obra) => (
                <Card key={obra.id} className="p-3" data-testid={`card-selecionada-${obra.id}`}>
                  <div className="flex items-center gap-3">
                    <img src={obra.imagem} alt={obra.titulo} className="w-12 h-12 rounded-md object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{obra.titulo}</p>
                      <p className="text-xs text-muted-foreground">{obra.inventarioId} — {obra.dimensoes}</p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removerObra(obra.id)}
                      data-testid={`button-remover-${obra.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        <Separator />

        <section className="space-y-3" data-testid="section-termos-resumo">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            Termos do Leilão
          </h3>
          <Card className="p-4 space-y-2">
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Comissão de <span className="font-semibold text-foreground">50%</span> sobre o valor de venda.
                Lance mínimo de <span className="font-semibold text-foreground">R$ 50,00</span> para obras não verificadas,
                ou conforme histórico de mercado para obras verificadas.
                O envio da obra ao comprador é de <span className="font-semibold text-foreground">responsabilidade do artista</span>.
              </p>
            </div>
          </Card>
        </section>

        {submissoesEmAvaliacao.length > 0 && (
          <>
            <Separator />
            <section className="space-y-3" data-testid="section-em-avaliacao">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                Em Avaliação
              </h3>
              <div className="space-y-2">
                {submissoesEmAvaliacao.map((sub) => (
                  <Card key={sub.id} className="p-3" data-testid={`card-avaliacao-${sub.obraId}`}>
                    <div className="flex items-center gap-3">
                      <img src={sub.obraImagem} alt={sub.obraTitulo} className="w-10 h-10 rounded-md object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{sub.obraTitulo}</p>
                        <p className="text-xs text-muted-foreground">{sub.obraInventarioId} — Enviada em {sub.dataEnvio}</p>
                      </div>
                      <Badge
                        className="no-default-hover-elevate no-default-active-elevate text-[10px]"
                        style={{ backgroundColor: statusColors["em-avaliacao"].bg, color: statusColors["em-avaliacao"].color, borderColor: statusColors["em-avaliacao"].border }}
                        data-testid={`badge-status-${sub.obraId}`}
                      >
                        <Clock className="mr-1 h-2.5 w-2.5" />
                        {statusLabels["em-avaliacao"]}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}

        {submissoesAvaliadas.length > 0 && (
          <>
            <Separator />
            <section className="space-y-3" data-testid="section-avaliadas">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                Resultado das Avaliações
              </h3>
              <div className="space-y-2">
                {submissoesAvaliadas.map((sub) => (
                  <Card key={sub.id} className="p-3" data-testid={`card-resultado-${sub.obraId}`}>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={sub.obraImagem} alt={sub.obraTitulo} className="w-10 h-10 rounded-md object-cover" />
                        {sub.verificada && (
                          <div
                            className="absolute -top-1 -right-1 h-4 w-4 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "#D4A843" }}
                            data-testid={`selo-verified-${sub.obraId}`}
                          >
                            <ShieldCheck className="h-2.5 w-2.5 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground truncate">{sub.obraTitulo}</p>
                          {sub.verificada && (
                            <Badge
                              className="no-default-hover-elevate no-default-active-elevate text-[10px]"
                              style={{ backgroundColor: "rgba(212, 168, 67, 0.1)", color: "#D4A843", borderColor: "rgba(212, 168, 67, 0.3)" }}
                              data-testid={`badge-verified-${sub.obraId}`}
                            >
                              <ShieldCheck className="mr-1 h-2.5 w-2.5" />
                              Art Flow Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{sub.obraInventarioId} — Avaliada em {sub.dataEnvio}</p>
                      </div>
                      <Badge
                        className="no-default-hover-elevate no-default-active-elevate text-[10px]"
                        style={{ backgroundColor: statusColors[sub.status].bg, color: statusColors[sub.status].color, borderColor: statusColors[sub.status].border }}
                      >
                        {sub.status === "aprovada" ? <CheckCircle className="mr-1 h-2.5 w-2.5" /> : <AlertCircle className="mr-1 h-2.5 w-2.5" />}
                        {statusLabels[sub.status]}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}

        <Dialog open={modalTermos} onOpenChange={setModalTermos}>
          <DialogContent className="max-w-md" data-testid="modal-termos-leilao">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5" />
                Termos de Envio para Leilão
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-2">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ao enviar suas obras para avaliação, você concorda com os seguintes termos:
              </p>

              <div className="space-y-3 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">1.</span>
                  <p>Comissão de <span className="font-semibold text-foreground">50%</span> sobre o valor final da venda.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">2.</span>
                  <p>Lance mínimo de <span className="font-semibold text-foreground">R$ 50,00</span> para obras não verificadas, ou conforme histórico de mercado para obras verificadas.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">3.</span>
                  <p>O envio da obra ao comprador é de <span className="font-semibold text-foreground">responsabilidade exclusiva do artista</span>.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-semibold text-foreground">4.</span>
                  <p>Um relatório de avaliação será enviado à sua Caixa de Entrada em até <span className="font-semibold text-foreground">24 horas</span>.</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  className="h-5 w-5 rounded-md border border-border flex items-center justify-center cursor-pointer"
                  onClick={() => setTermosAceitos(!termosAceitos)}
                  data-testid="checkbox-termos"
                >
                  {termosAceitos && <CheckCircle className="h-4 w-4" style={{ color: "#D4A843" }} />}
                </button>
                <span className="text-xs text-foreground">Li e concordo com os termos acima</span>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => { setModalTermos(false); setTermosAceitos(false); }} data-testid="button-cancelar-termos">
                Cancelar
              </Button>
              <Button
                disabled={!termosAceitos}
                onClick={confirmarEnvio}
                data-testid="button-confirmar-envio"
              >
                <Send className="mr-2 h-4 w-4" />
                Confirmar Envio ({selecionadas.length} obra{selecionadas.length > 1 ? "s" : ""})
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
