import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Save, CheckCircle, Crown, Sparkles, Star } from "lucide-react";

export interface DadosEmissor {
  nome: string;
  documento: string;
  email: string;
  pais: string;
  estado: string;
  cidade: string;
  telefone: string;
  site: string;
}

const STORAGE_KEY = "artflow_emissor";

export function carregarDadosEmissor(): DadosEmissor | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const dados = JSON.parse(raw) as DadosEmissor;
    if (!dados.nome || !dados.documento || !dados.email || !dados.pais || !dados.estado) return null;
    return dados;
  } catch {
    return null;
  }
}

export function formatarLinhaEmissor(dados: DadosEmissor): string {
  const partes = [dados.nome];
  const localParts: string[] = [];
  if (dados.cidade) localParts.push(dados.cidade);
  if (dados.estado) localParts.push(dados.estado);
  if (dados.pais) localParts.push(dados.pais);
  if (localParts.length > 0) partes.push(localParts.join(", "));
  if (dados.email) partes.push(dados.email);
  return partes.join(" — ");
}

export default function PerfilEmissor({ perfilUsuario, premium, onAssinar }: { perfilUsuario: string; premium?: boolean; onAssinar?: () => void }) {
  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");
  const [email, setEmail] = useState("");
  const [pais, setPais] = useState("Brasil");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [site, setSite] = useState("");
  const [salvo, setSalvo] = useState(false);

  const labelDocumento = perfilUsuario === "artista" ? "CPF" : "CNPJ";

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const dados = JSON.parse(raw) as DadosEmissor;
        setNome(dados.nome || "");
        setDocumento(dados.documento || "");
        setEmail(dados.email || "");
        setPais(dados.pais || "Brasil");
        setEstado(dados.estado || "");
        setCidade(dados.cidade || "");
        setTelefone(dados.telefone || "");
        setSite(dados.site || "");
      }
    } catch {}
  }, []);

  function handleSalvar() {
    const dados: DadosEmissor = {
      nome,
      documento,
      email,
      pais,
      estado,
      cidade,
      telefone,
      site,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3000);
  }

  const camposObrigatoriosPreenchidos = nome.trim() && documento.trim() && email.trim() && pais.trim() && estado.trim();

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-xl mx-auto space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">
            Preencha seus dados para identificação nos certificados de autenticidade.
          </p>
        </div>

        <Card className="p-6 space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="emissor-nome">Nome / Razão Social *</Label>
            <Input
              id="emissor-nome"
              placeholder="Ex: Maria Lucia Silva"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              data-testid="input-emissor-nome"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="emissor-documento">{labelDocumento} *</Label>
            <Input
              id="emissor-documento"
              placeholder={perfilUsuario === "artista" ? "Ex: 123.456.789-00" : "Ex: 12.345.678/0001-00"}
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              data-testid="input-emissor-documento"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="emissor-email">E-mail *</Label>
            <Input
              id="emissor-email"
              type="email"
              placeholder="Ex: contato@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-testid="input-emissor-email"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="emissor-pais">País *</Label>
              <Input
                id="emissor-pais"
                placeholder="Ex: Brasil"
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                data-testid="input-emissor-pais"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="emissor-estado">Estado *</Label>
              <Input
                id="emissor-estado"
                placeholder="Ex: RJ"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                data-testid="input-emissor-estado"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="emissor-cidade">Cidade</Label>
            <Input
              id="emissor-cidade"
              placeholder="Ex: Rio de Janeiro"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              data-testid="input-emissor-cidade"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="emissor-telefone">Telefone</Label>
              <Input
                id="emissor-telefone"
                placeholder="Ex: (21) 99999-0000"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                data-testid="input-emissor-telefone"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="emissor-site">Site</Label>
              <Input
                id="emissor-site"
                placeholder="Ex: www.exemplo.com"
                value={site}
                onChange={(e) => setSite(e.target.value)}
                data-testid="input-emissor-site"
              />
            </div>
          </div>
        </Card>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleSalvar}
            disabled={!camposObrigatoriosPreenchidos}
            data-testid="button-salvar-emissor"
          >
            <Save className="mr-2 h-4 w-4" />
            Salvar Dados
          </Button>
          {salvo && (
            <span className="flex items-center gap-1.5 text-sm text-green-600" data-testid="text-salvo-sucesso">
              <CheckCircle className="h-4 w-4" />
              Dados salvos com sucesso
            </span>
          )}
        </div>

        <Separator className="my-2" />

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-1" data-testid="text-assinatura-titulo">
            Assinatura
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Gerencie seu plano de assinatura do Art Flow.
          </p>
        </div>

        <Card className="p-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground" data-testid="text-plano-label">Plano:</span>
                {premium ? (
                  <Badge
                    className="no-default-hover-elevate no-default-active-elevate"
                    style={{ backgroundColor: "#D4A843", color: "#fff", borderColor: "#D4A843" }}
                    data-testid="badge-plano-premium"
                  >
                    <Crown className="mr-1 h-3 w-3" />
                    Premium
                  </Badge>
                ) : (
                  <Badge variant="secondary" data-testid="badge-plano-gratuito">
                    Gratuito
                  </Badge>
                )}
              </div>
              {!premium && (
                <p className="text-xs text-muted-foreground" data-testid="text-plano-info">
                  Limite de 5 obras, 1 certificado e 1 catálogo
                </p>
              )}
            </div>

            {!premium && onAssinar && (
              <Button
                style={{ backgroundColor: "#D4A843", borderColor: "#D4A843", color: "#fff" }}
                onClick={onAssinar}
                data-testid="button-assinar-agora"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Assinar Agora
              </Button>
            )}
          </div>

          {premium && (
            <div className="mt-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" style={{ color: "#D4A843" }} />
              <span className="text-xs text-muted-foreground" data-testid="text-premium-ativo">
                Acesso completo a todos os recursos
              </span>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
