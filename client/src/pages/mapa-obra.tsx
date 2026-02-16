import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import colheitaImg from "@assets/colheita_1771198582489.png";
import contextImg from "@assets/1-context_1771204595709.jpg";
import singapureImg from "@assets/2-Singapure_1771204595713.jpg";

export interface RegistroMapa {
  id: string;
  obraId: number;
  obraTitulo: string;
  obraImagem: string;
  tipo: "emprestimo" | "doacao" | "leilao" | "representacao" | "armazenamento";
  localNome: string;
  localEndereco: string;
}

interface PinMapa {
  id: string;
  lat: number;
  lng: number;
  cidade: string;
  status: string;
  categoria: string;
  cor: string;
  imagem: string;
  titulo: string;
  descricao: string;
}

const coordenadasReais: Record<string, { lat: number; lng: number; cidade: string }> = {
  "Museu do Ipiranga": { lat: -23.5855, lng: -46.6125, cidade: "São Paulo" },
  "Instituto Cultural Itaú": { lat: -23.5710, lng: -46.6440, cidade: "São Paulo" },
  "CONTEXT Art Miami": { lat: 25.7617, lng: -80.1918, cidade: "Miami" },
  "Art Stage Singapore": { lat: 1.2930, lng: 103.8558, cidade: "Singapura" },
  "START Art Fair": { lat: 51.4826, lng: -0.0077, cidade: "Londres" },
  "Coleção João Vicente": { lat: -22.9068, lng: -43.1729, cidade: "Rio de Janeiro" },
  "Escritório Angela Marques": { lat: -23.5505, lng: -46.6340, cidade: "São Paulo" },
  "Galeria Graphitte": { lat: -23.5630, lng: -46.6540, cidade: "São Paulo" },
  "Bolsa de Arte de São Paulo": { lat: -23.5610, lng: -46.6560, cidade: "São Paulo" },
  "Soraia Cals Escritório de Arte": { lat: -22.9650, lng: -43.1780, cidade: "Rio de Janeiro" },
  "Curitiba": { lat: -25.4284, lng: -49.2733, cidade: "Curitiba" },
};

const categorias = [
  { key: "venda", label: "Venda", cor: "#10b981" },
  { key: "exposicao", label: "Em Exposição", cor: "#f43f5e" },
  { key: "consignacao", label: "Consignação", cor: "#f59e0b" },
  { key: "emprestimo", label: "Empréstimo", cor: "#38bdf8" },
  { key: "doacao", label: "Doação", cor: "#f472b6" },
  { key: "leilao", label: "Leilão Público", cor: "#a78bfa" },
  { key: "representacao", label: "Representação", cor: "#f97316" },
  { key: "armazenamento", label: "Armazenamento", cor: "#6b7280" },
];

function criarIcone(cor: string): L.DivIcon {
  return L.divIcon({
    className: "",
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
    html: `<div style="
      width:28px;height:28px;display:flex;align-items:center;justify-content:center;
    ">
      <div style="
        position:absolute;width:28px;height:28px;border-radius:50%;
        background:${cor};opacity:0.25;animation:ping 2.5s cubic-bezier(0,0,0.2,1) infinite;
      "></div>
      <div style="
        width:14px;height:14px;border-radius:50%;background:${cor};
        border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.35);position:relative;z-index:2;
      "></div>
    </div>`,
  });
}

const iconesPorCategoria: Record<string, L.DivIcon> = {};
categorias.forEach((c) => {
  iconesPorCategoria[c.key] = criarIcone(c.cor);
});

const pinsEstaticos: PinMapa[] = [
  {
    id: "rj-venda",
    lat: -22.9068,
    lng: -43.1729,
    cidade: "Rio de Janeiro",
    status: "Obra Vendida",
    categoria: "venda",
    cor: "#10b981",
    imagem: colheitaImg,
    titulo: "Colheita das Maçãs",
    descricao: "Vendida para João Vicente – Rio de Janeiro",
  },
  {
    id: "sp-expo",
    lat: -23.5630,
    lng: -46.6540,
    cidade: "São Paulo",
    status: "Obra em Exposição",
    categoria: "exposicao",
    cor: "#f43f5e",
    imagem: contextImg,
    titulo: "Exposição temporária",
    descricao: "Galeria Graphitte – São Paulo",
  },
  {
    id: "ctb-consig",
    lat: -25.4284,
    lng: -49.2733,
    cidade: "Curitiba",
    status: "Obra Consignada",
    categoria: "consignacao",
    cor: "#f59e0b",
    imagem: singapureImg,
    titulo: "Jovens Camponesas",
    descricao: "Consignada para evento – Curitiba",
  },
];

function registroToPin(reg: RegistroMapa): PinMapa {
  const coords = coordenadasReais[reg.localNome];
  const lat = coords?.lat ?? -15.7801;
  const lng = coords?.lng ?? -47.9292;
  const cidade = coords?.cidade ?? reg.localNome;

  const info: Record<string, { categoria: string; cor: string; status: string; desc: string }> = {
    emprestimo: { categoria: "emprestimo", cor: "#38bdf8", status: "Empréstimo", desc: `Emprestada para: ${reg.localNome}` },
    doacao: { categoria: "doacao", cor: "#f472b6", status: "Doação", desc: `Doada para: ${reg.localNome}` },
    leilao: { categoria: "leilao", cor: "#a78bfa", status: "Em Leilão Público", desc: `Em Leilão Público – ${reg.localNome}` },
    representacao: { categoria: "representacao", cor: "#f97316", status: "Em Representação", desc: `Representação em: ${reg.localNome}` },
    armazenamento: { categoria: "armazenamento", cor: "#6b7280", status: "Armazenada", desc: `Armazenada em: ${reg.localNome}` },
  };
  const i = info[reg.tipo];

  return {
    id: `reg-${reg.id}`,
    lat,
    lng,
    cidade,
    status: i.status,
    categoria: i.categoria,
    cor: i.cor,
    imagem: reg.obraImagem,
    titulo: reg.obraTitulo,
    descricao: i.desc,
  };
}

function FitBounds({ pins }: { pins: PinMapa[] }) {
  const map = useMap();
  useEffect(() => {
    if (pins.length === 0) return;
    const bounds = L.latLngBounds(pins.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 6 });
  }, [pins, map]);
  return null;
}

export default function MapaObra({ registros = [] }: { registros?: RegistroMapa[] }) {
  const [filtroAtivo, setFiltroAtivo] = useState<string | null>(null);

  const pinsDinamicos = registros.map(registroToPin);
  const todosOsPins = [...pinsEstaticos, ...pinsDinamicos];

  const pinsFiltrados = filtroAtivo
    ? todosOsPins.filter((p) => p.categoria === filtroAtivo)
    : todosOsPins;

  return (
    <div className="flex-1 relative" style={{ minHeight: "500px" }} data-testid="mapa-container">
      <MapContainer
        center={[-15.78, -47.93]}
        zoom={4}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%", position: "absolute", inset: 0, borderRadius: "0.5rem" }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds pins={pinsFiltrados.length > 0 ? pinsFiltrados : todosOsPins} />

        {pinsFiltrados.map((pin) => (
          <Marker
            key={pin.id}
            position={[pin.lat, pin.lng]}
            icon={iconesPorCategoria[pin.categoria] || criarIcone(pin.cor)}
          >
            <Popup maxWidth={260} minWidth={220}>
              <div style={{ margin: "-8px -12px -14px", fontFamily: "inherit" }}>
                <img
                  src={pin.imagem}
                  alt={pin.titulo}
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "6px 6px 0 0",
                    display: "block",
                  }}
                  data-testid={`popup-img-${pin.id}`}
                />
                <div style={{ padding: "10px 12px 8px" }}>
                  <p
                    style={{ fontWeight: 600, fontSize: "13px", margin: "0 0 2px", color: "#1a1a1a" }}
                    data-testid={`popup-titulo-${pin.id}`}
                  >
                    {pin.titulo}
                  </p>
                  <p style={{ fontSize: "11px", color: "#666", margin: "0 0 6px" }} data-testid={`popup-cidade-${pin.id}`}>
                    {pin.cidade}
                  </p>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "10px",
                    fontWeight: 600,
                    color: pin.cor,
                    background: `${pin.cor}18`,
                    padding: "3px 8px",
                    borderRadius: "999px",
                    letterSpacing: "0.02em",
                  }}>
                    <span style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: pin.cor,
                      flexShrink: 0,
                    }} />
                    {pin.status}
                  </div>
                  <p style={{ fontSize: "11px", color: "#888", margin: "6px 0 0", lineHeight: 1.4 }} data-testid={`popup-desc-${pin.id}`}>
                    {pin.descricao}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div
        className="absolute bottom-4 right-4 z-[1000] rounded-lg shadow-lg border border-border bg-background/95 backdrop-blur-sm"
        style={{ minWidth: "180px" }}
        data-testid="legenda-mapa"
      >
        <div className="px-3.5 py-2.5 border-b border-border">
          <p className="text-[11px] font-semibold text-foreground uppercase tracking-widest">
            Legenda
          </p>
        </div>
        <div className="py-1.5">
          {categorias.map((cat) => {
            const ativo = filtroAtivo === cat.key;
            const temPins = todosOsPins.some((p) => p.categoria === cat.key);
            return (
              <button
                key={cat.key}
                onClick={() => setFiltroAtivo(ativo ? null : cat.key)}
                disabled={!temPins && !ativo}
                className={`w-full flex items-center gap-2.5 px-3.5 py-1.5 text-left transition-colors cursor-pointer
                  ${ativo ? "bg-accent/60" : "hover-elevate"}
                  ${!temPins && !ativo ? "opacity-40 cursor-default" : ""}
                `}
                data-testid={`filtro-${cat.key}`}
              >
                <span
                  className="flex-shrink-0 rounded-full"
                  style={{
                    width: "10px",
                    height: "10px",
                    background: cat.cor,
                    boxShadow: ativo ? `0 0 0 3px ${cat.cor}33` : "none",
                  }}
                />
                <span className={`text-xs ${ativo ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                  {cat.label}
                </span>
                {ativo && (
                  <span className="ml-auto text-[10px] text-muted-foreground">
                    {pinsFiltrados.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {filtroAtivo && (
          <div className="px-3.5 py-2 border-t border-border">
            <button
              onClick={() => setFiltroAtivo(null)}
              className="text-[11px] text-primary font-medium cursor-pointer"
              data-testid="filtro-mostrar-todos"
            >
              Mostrar Todos
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        .leaflet-popup-content-wrapper {
          padding: 0 !important;
          border-radius: 8px !important;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15) !important;
        }
        .leaflet-popup-content {
          margin: 8px 12px 14px !important;
          line-height: 1.4 !important;
        }
        .leaflet-popup-tip-container {
          margin-top: -1px;
        }
      `}</style>
    </div>
  );
}
