import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, Printer, AlertCircle } from "lucide-react";
import pissarroImg from "@assets/pissarro_1771198589992.png";

interface CertificadoProps {
  obra: {
    id: number;
    inventarioId: string;
    titulo: string;
    tecnica: string;
    ano: number;
    dimensoes: string;
    imagem: string;
  };
  emissorLinha?: string | null;
  onClose: () => void;
  onIrPerfil?: () => void;
  mostrarMarcaDagua?: boolean;
}

function MarcaDaguaCertificado() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-[1]"
      style={{ opacity: 0.06 }}
      data-testid="marca-dagua-certificado"
    >
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-16"
        style={{
          transform: "rotate(-35deg)",
          transformOrigin: "center center",
          width: "200%",
          height: "200%",
          left: "-50%",
          top: "-50%",
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex items-center gap-24 whitespace-nowrap">
            {Array.from({ length: 6 }).map((_, j) => (
              <span
                key={j}
                className="text-2xl font-bold tracking-widest text-black select-none"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Art Flow - Versão de Teste
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const bioTexto =
  "Pintor e gravurista franco-brasileiro, considerado um dos fundadores do Impressionismo. Conhecido por suas paisagens rurais e cenas campestres que capturam a luz natural com maestria. Trabalhou extensivamente em Pontoise e Éragny-sur-Epte, onde desenvolveu técnicas inovadoras de pintura ao ar livre.";

function handleImprimir() {
  window.print();
}

export default function Certificado({ obra, emissorLinha, onClose, onIrPerfil, mostrarMarcaDagua }: CertificadoProps) {
  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #certificado-print, #certificado-print * { visibility: visible !important; }
          #certificado-print {
            position: fixed !important;
            inset: 0 !important;
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0 !important;
            padding: 12mm 16mm !important;
            background: white !important;
            overflow: visible !important;
            z-index: 99999 !important;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      <div
        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto"
        data-testid="modal-certificado"
      >
        <div className="no-print sticky top-0 z-10 flex items-center justify-between gap-2 bg-background border-b px-6 py-3">
          <h2 className="text-lg font-semibold text-foreground" data-testid="text-cert-header">
            Certificado de Autenticidade
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleImprimir}
              data-testid="button-imprimir-cert"
            >
              <Printer className="mr-2 h-4 w-4" />
              Imprimir Certificado
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              data-testid="button-fechar-cert"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!emissorLinha && (
          <div className="no-print max-w-[210mm] mx-auto mt-4 px-8 sm:px-12">
            <div
              className="flex items-start gap-3 rounded-md border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/30"
              data-testid="aviso-perfil-incompleto"
            >
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Por favor, complete seus dados na aba Perfil para emitir certificados com identificação do emissor.
                </p>
                {onIrPerfil && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={onIrPerfil}
                    data-testid="button-ir-perfil"
                  >
                    Ir para Perfil
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        <div
          id="certificado-print"
          className="max-w-[210mm] mx-auto bg-white text-black p-8 sm:p-12 my-6 sm:my-10 relative"
        >
          {mostrarMarcaDagua && <MarcaDaguaCertificado />}
          <div className="text-center mb-8 relative z-[2]">
            <h1
              className="font-serif text-3xl sm:text-4xl tracking-wide font-light"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              data-testid="text-cert-titulo"
            >
              CERTIFICADO <span className="italic">de</span> Autenticidade
            </h1>

            {emissorLinha && (
              <p
                className="mt-3 text-[11px] tracking-[0.15em] text-black/50 leading-relaxed"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                data-testid="text-cert-emissor"
              >
                {emissorLinha}
              </p>
            )}
          </div>

          <Separator className="bg-black/10 mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-1">
                  Título da Obra
                </p>
                <p
                  className="text-xl font-serif font-medium"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  data-testid="text-cert-obra-titulo"
                >
                  {obra.titulo}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-1">
                  ID de Inventário
                </p>
                <p className="text-sm font-mono" data-testid="text-cert-inventario">{obra.inventarioId}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-1">
                    Ano
                  </p>
                  <p className="text-sm" data-testid="text-cert-ano">{obra.ano}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-1">
                    Técnica
                  </p>
                  <p className="text-sm" data-testid="text-cert-tecnica">{obra.tecnica}</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-1">
                  Dimensões
                </p>
                <p className="text-sm" data-testid="text-cert-dimensoes">{obra.dimensoes}</p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-1">
                  Especificações
                </p>
                <p className="text-sm leading-relaxed" data-testid="text-cert-especificacoes">
                  Obra original, assinada pelo artista. Pintura executada com pigmentos de alta qualidade sobre tela de linho preparada.
                </p>
              </div>

              <Separator className="bg-black/10" />

              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-2">
                  Declaração Legal
                </p>
                <p className="text-xs leading-relaxed text-black/70" data-testid="text-cert-declaracao1">
                  Este certificado confirma que a obra de arte identificada neste documento é uma criação genuína e única. Ela traz a assinatura manuscrita do artista, que detém total controle sobre os direitos autorais e de reprodução da obra.
                </p>
                <p className="text-xs leading-relaxed text-black/70 mt-3" data-testid="text-cert-declaracao2">
                  Instruções especiais: Para preservar a obra de arte, evite luz solar direta, alta umidade e temperaturas extremas. Limpe delicadamente com um pano seco e macio, se necessário. Manuseie com cuidado.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <img
                  src={obra.imagem}
                  alt={obra.titulo}
                  className="w-full rounded-sm object-cover shadow-sm"
                  style={{ maxHeight: "320px" }}
                  data-testid="img-cert-obra"
                />
              </div>

              <div className="flex items-start gap-3">
                <img
                  src={pissarroImg}
                  alt="Camille Pissarro"
                  className="h-12 w-12 rounded-full object-cover flex-shrink-0"
                  data-testid="img-cert-artista"
                />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-1">
                    Biografia do Artista
                  </p>
                  <p
                    className="font-serif text-base font-medium"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    data-testid="text-cert-artista-nome"
                  >
                    Camille Pissarro
                  </p>
                  <p className="text-xs text-black/50 mb-1.5">1830 – 1903</p>
                  <p className="text-xs leading-relaxed text-black/70" data-testid="text-cert-bio">
                    {bioTexto}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-black/10 mt-10 mb-6" />

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-6">
                Assinatura
              </p>
              <div className="border-b border-black/30 pb-1" data-testid="linha-assinatura" />
              <p className="text-[10px] text-black/40 mt-1">Assinatura do Artista</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-6">
                Data
              </p>
              <div className="border-b border-black/30 pb-1" data-testid="linha-data" />
              <p className="text-[10px] text-black/40 mt-1">Data de Emissão</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
