import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Search, FolderClosed, Table2, Presentation } from "lucide-react";

type TipoDoc = "pasta" | "documento" | "planilha" | "apresentacao";

interface Documento {
  id: string;
  nome: string;
  tipo: TipoDoc;
  tamanho: string;
  data: string;
}

const documentos: Documento[] = [
  {
    id: "doc-1",
    nome: "Contrato_Galeria_Graphitte.docx",
    tipo: "documento",
    tamanho: "245 KB",
    data: "12 Jan 2026",
  },
  {
    id: "doc-2",
    nome: "Inventario_Pontoise_2026.xlsx",
    tipo: "planilha",
    tamanho: "128 KB",
    data: "03 Fev 2026",
  },
  {
    id: "doc-3",
    nome: "Portfolio_Camille_Pissarro.pptx",
    tipo: "apresentacao",
    tamanho: "3.2 MB",
    data: "20 Jan 2026",
  },
];

const categorias: { tipo: TipoDoc; label: string; icon: typeof FileText; corIcone: string; corBg: string }[] = [
  { tipo: "pasta", label: "Pastas", icon: FolderClosed, corIcone: "text-muted-foreground", corBg: "bg-muted/60" },
  { tipo: "documento", label: "Documentos", icon: FileText, corIcone: "text-blue-600", corBg: "bg-blue-500/10" },
  { tipo: "planilha", label: "Planilhas", icon: Table2, corIcone: "text-emerald-600", corBg: "bg-emerald-500/10" },
  { tipo: "apresentacao", label: "Apresentações", icon: Presentation, corIcone: "text-amber-600", corBg: "bg-amber-500/10" },
];

function getDocConfig(tipo: TipoDoc) {
  return categorias.find((c) => c.tipo === tipo) || categorias[0];
}

export default function Documentos() {
  const [busca, setBusca] = useState("");

  const docsFiltrados = documentos.filter((d) =>
    d.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <h2
            className="text-lg font-semibold text-foreground"
            data-testid="text-titulo-documentos"
          >
            Documentos
          </h2>
          <Badge variant="secondary">{documentos.length}</Badge>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar documentos por palavra-chave..."
            className="pl-9"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            data-testid="input-busca-docs"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categorias.map((cat) => {
            const qtd = documentos.filter((d) => d.tipo === cat.tipo).length;
            return (
              <Card
                key={cat.tipo}
                className="p-4 flex flex-col items-center gap-2 text-center"
                data-testid={`card-cat-${cat.tipo}`}
              >
                <div className={`flex items-center justify-center h-12 w-12 rounded-md ${cat.corBg}`}>
                  <cat.icon className={`h-6 w-6 ${cat.corIcone}`} />
                </div>
                <p className="text-sm font-medium text-foreground">{cat.label}</p>
                <p className="text-xs text-muted-foreground">{qtd} {qtd === 1 ? "item" : "itens"}</p>
              </Card>
            );
          })}
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Arquivos ({docsFiltrados.length})
          </p>
          {docsFiltrados.length === 0 && (
            <p className="text-sm text-muted-foreground py-6 text-center" data-testid="text-sem-resultado">
              Nenhum documento encontrado.
            </p>
          )}
          {docsFiltrados.map((doc) => {
            const config = getDocConfig(doc.tipo);
            return (
              <Card
                key={doc.id}
                className="p-4 hover-elevate"
                data-testid={`card-doc-${doc.id}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex items-center justify-center h-10 w-10 rounded-md flex-shrink-0 ${config.corBg}`}>
                    <config.icon className={`h-5 w-5 ${config.corIcone}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-medium text-foreground text-sm truncate"
                      data-testid={`text-nome-doc-${doc.id}`}
                    >
                      {doc.nome}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {doc.tamanho} · {doc.data}
                    </p>
                  </div>
                  <Badge variant="secondary" className="flex-shrink-0" data-testid={`badge-tipo-doc-${doc.id}`}>
                    {config.label.replace(/s$/, "")}
                  </Badge>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
