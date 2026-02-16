import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Save,
  CheckCircle,
  Crown,
  Sparkles,
  Camera,
  Globe,
  Phone,
  Mail,
  MapPin,
  User,
  FileText,
  Instagram,
  Link as LinkIcon,
} from "lucide-react";

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
const PERFIL_STORAGE_KEY = "artflow_perfil_dados";

interface DadosPerfil {
  avatar: string;
  nomeArtistico: string;
  bio: string;
  instagram: string;
  portfolio: string;
}

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
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");
  const [email, setEmail] = useState("");
  const [pais, setPais] = useState("Brasil");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [site, setSite] = useState("");

  const [avatar, setAvatar] = useState("");
  const [nomeArtistico, setNomeArtistico] = useState("");
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const [salvo, setSalvo] = useState(false);

  const labelNome = perfilUsuario === "galeria" ? "Nome da Galeria" : "Nome Completo";
  const labelDocumento = perfilUsuario === "artista" ? "CPF" : "CNPJ";
  const labelNomeArtistico = perfilUsuario === "galeria" ? "Nome Fantasia" : perfilUsuario === "colecionador" ? "Nome de Exibição" : "Nome Artístico";

  const iniciais = (nome || nomeArtistico || "U")
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

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
    try {
      const rawPerfil = localStorage.getItem(PERFIL_STORAGE_KEY);
      if (rawPerfil) {
        const dp = JSON.parse(rawPerfil) as DadosPerfil;
        setAvatar(dp.avatar || "");
        setNomeArtistico(dp.nomeArtistico || "");
        setBio(dp.bio || "");
        setInstagram(dp.instagram || "");
        setPortfolio(dp.portfolio || "");
      }
    } catch {}
  }, []);

  function handleSalvar() {
    const dados: DadosEmissor = { nome, documento, email, pais, estado, cidade, telefone, site };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dados));

    const dadosPerfil: DadosPerfil = { avatar, nomeArtistico, bio, instagram, portfolio };
    localStorage.setItem(PERFIL_STORAGE_KEY, JSON.stringify(dadosPerfil));

    setSalvo(true);
    toast({ title: "Perfil salvo", description: "Seus dados foram atualizados com sucesso." });
    setTimeout(() => setSalvo(false), 3000);
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "Arquivo muito grande", description: "O tamanho máximo é 2MB.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result as string);
    reader.readAsDataURL(file);
  }

  const camposObrigatoriosPreenchidos = nome.trim() && documento.trim() && email.trim() && pais.trim() && estado.trim();

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">

        <div className="flex items-center gap-5" data-testid="section-avatar">
          <div className="relative">
            <Avatar className="h-20 w-20 border-2 border-border">
              <AvatarImage src={avatar} alt={nome || "Avatar"} data-testid="img-avatar" />
              <AvatarFallback className="text-lg font-semibold" data-testid="text-avatar-fallback">{iniciais}</AvatarFallback>
            </Avatar>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              data-testid="input-file-avatar"
              onChange={handleAvatarChange}
            />
            <button
              type="button"
              className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-foreground text-background flex items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              data-testid="button-trocar-avatar"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground" data-testid="text-nome-display">
              {nome || "Seu nome"}
            </h2>
            {nomeArtistico && (
              <p className="text-sm text-muted-foreground" data-testid="text-nome-artistico-display">{nomeArtistico}</p>
            )}
            <div className="flex items-center gap-2">
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
                <Badge variant="secondary" data-testid="badge-plano-gratuito">Gratuito</Badge>
              )}
            </div>
          </div>
        </div>

        <Separator />

        <section className="space-y-4" data-testid="section-dados-pessoais">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            Dados Pessoais
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="emissor-nome">{labelNome} *</Label>
              <Input
                id="emissor-nome"
                placeholder={perfilUsuario === "galeria" ? "Ex: Galeria Espaço Arte" : "Ex: Maria Lucia Silva"}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                data-testid="input-emissor-nome"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="perfil-nome-artistico">{labelNomeArtistico}</Label>
              <Input
                id="perfil-nome-artistico"
                placeholder={perfilUsuario === "galeria" ? "Ex: Espaço Arte" : "Ex: Camille P."}
                value={nomeArtistico}
                onChange={(e) => setNomeArtistico(e.target.value)}
                data-testid="input-nome-artistico"
              />
            </div>
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
            <Label htmlFor="perfil-bio">Biografia</Label>
            <Textarea
              id="perfil-bio"
              placeholder="Escreva uma breve descrição sobre você ou sua atuação..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="resize-none min-h-[80px]"
              data-testid="input-bio"
            />
          </div>
        </section>

        <Separator />

        <section className="space-y-4" data-testid="section-contato">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            Contato
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <div className="space-y-1.5">
              <Label htmlFor="perfil-instagram">Instagram</Label>
              <Input
                id="perfil-instagram"
                placeholder="Ex: @meuinstagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                data-testid="input-instagram"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="perfil-portfolio">Portfólio / Link externo</Label>
            <Input
              id="perfil-portfolio"
              placeholder="Ex: https://meuportfolio.com"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              data-testid="input-portfolio"
            />
          </div>
        </section>

        <Separator />

        <section className="space-y-4" data-testid="section-endereco">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Endereço
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
          </div>
        </section>

        <Separator />

        <section className="space-y-4" data-testid="section-assinatura">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-muted-foreground" />
            Assinatura
          </h3>
          <p className="text-xs text-muted-foreground">
            Gerencie seu plano de assinatura do Art Flow.
          </p>

          <div className="flex items-center justify-between gap-4 flex-wrap rounded-md border border-border p-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground" data-testid="text-plano-label">Plano:</span>
                {premium ? (
                  <Badge
                    className="no-default-hover-elevate no-default-active-elevate"
                    style={{ backgroundColor: "#D4A843", color: "#fff", borderColor: "#D4A843" }}
                    data-testid="badge-plano-premium-section"
                  >
                    <Crown className="mr-1 h-3 w-3" />
                    Premium
                  </Badge>
                ) : (
                  <Badge variant="secondary" data-testid="badge-plano-gratuito-section">Gratuito</Badge>
                )}
              </div>
              {!premium && (
                <p className="text-xs text-muted-foreground" data-testid="text-plano-info">
                  Limite de 5 obras, 1 certificado e 1 catálogo
                </p>
              )}
              {premium && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" style={{ color: "#D4A843" }} />
                  <span className="text-xs text-muted-foreground" data-testid="text-premium-ativo">
                    Acesso completo a todos os recursos
                  </span>
                </div>
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
        </section>

        <Separator />

        <div className="flex items-center gap-3 pb-8">
          <Button
            onClick={handleSalvar}
            disabled={!camposObrigatoriosPreenchidos}
            data-testid="button-salvar-emissor"
          >
            <Save className="mr-2 h-4 w-4" />
            Salvar Perfil
          </Button>
          {salvo && (
            <span className="flex items-center gap-1.5 text-sm text-green-600" data-testid="text-salvo-sucesso">
              <CheckCircle className="h-4 w-4" />
              Perfil salvo com sucesso
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
