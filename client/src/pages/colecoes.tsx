import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Layers } from "lucide-react";

import camponesasImg from "@assets/camponesas_1771198582484.png";
import respigadoresImg from "@assets/respigadores_1771198582490.png";

interface ObraColecao {
  id: number;
  titulo: string;
  ano: number;
  tecnica: string;
  imagem: string;
}

interface Colecao {
  id: string;
  titulo: string;
  descricao: string;
  capa: string;
  obras: ObraColecao[];
}

const colecoes: Colecao[] = [
  {
    id: "pontoise",
    titulo: "Vida no Campo: A Série de Pontoise",
    descricao:
      "Uma exploração profunda das rotinas rurais e da luz natural nos campos franceses, capturando a essência do trabalho e repouso campestre.",
    capa: camponesasImg,
    obras: [
      {
        id: 2,
        titulo: "Jovens Camponesas Descansando",
        ano: 1882,
        tecnica: "Óleo sobre tela",
        imagem: camponesasImg,
      },
      {
        id: 3,
        titulo: "Os Respigadores",
        ano: 1889,
        tecnica: "Óleo sobre tela",
        imagem: respigadoresImg,
      },
    ],
  },
];

export default function Colecoes() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="h-5 w-5 text-muted-foreground" />
          <h2
            className="text-lg font-semibold text-foreground"
            data-testid="text-titulo-colecoes"
          >
            Coleções / Séries
          </h2>
          <Badge variant="secondary">{colecoes.length}</Badge>
        </div>

        {colecoes.map((colecao) => (
          <Card
            key={colecao.id}
            className="flex flex-col"
            data-testid={`card-colecao-${colecao.id}`}
          >
            <img
              src={colecao.capa}
              alt={colecao.titulo}
              className="h-52 w-full object-cover rounded-t-md"
              data-testid={`img-colecao-${colecao.id}`}
            />
            <div className="p-6 space-y-4">
              <div>
                <h3
                  className="text-xl font-semibold text-foreground"
                  data-testid={`text-titulo-col-${colecao.id}`}
                >
                  {colecao.titulo}
                </h3>
                <p
                  className="mt-2 text-sm text-muted-foreground leading-relaxed"
                  data-testid={`text-desc-col-${colecao.id}`}
                >
                  {colecao.descricao}
                </p>
              </div>

              <Separator />

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Obras da Coleção ({colecao.obras.length})
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {colecao.obras.map((obra) => (
                    <Card
                      key={obra.id}
                      className="flex flex-row"
                      data-testid={`card-obra-col-${obra.id}`}
                    >
                      <img
                        src={obra.imagem}
                        alt={obra.titulo}
                        className="h-24 w-24 object-cover rounded-l-md flex-shrink-0"
                      />
                      <div className="p-3 flex flex-col justify-center min-w-0">
                        <p
                          className="font-medium text-foreground text-sm truncate"
                          data-testid={`text-obra-col-titulo-${obra.id}`}
                        >
                          {obra.titulo}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {obra.tecnica} · {obra.ano}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
