import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Palette,
  BookOpen,
  Building2,
  Check,
  ArrowRight,
} from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/">
          <span
            className="text-xl font-semibold tracking-tight text-foreground cursor-pointer"
            data-testid="text-logo"
          >
            Art Flow
          </span>
        </Link>

        <nav className="flex items-center gap-3 flex-wrap">
          <Link href="/login">
            <Button variant="ghost" data-testid="button-header-login">
              Entrar
            </Button>
          </Link>
          <Link href="/cadastro">
            <Button data-testid="button-header-cadastro">
              Teste Grátis
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 text-center">
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-tight max-w-3xl mx-auto"
          data-testid="text-hero-title"
        >
          Sua Solução Completa de Gestão de Arte
        </h1>
        <p
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          data-testid="text-hero-subtitle"
        >
          Feito para artistas, colecionadores e galerias. Organize seu acervo e
          impulsione suas vendas.
        </p>
        <div className="mt-10">
          <Link href="/cadastro">
            <Button size="lg" data-testid="button-hero-cta">
              Começar Agora
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div
          className="mt-16 mx-auto max-w-4xl rounded-md border bg-muted/40 flex items-center justify-center"
          style={{ aspectRatio: "16/9" }}
          data-testid="placeholder-dashboard-image"
        >
          <span className="text-muted-foreground text-sm">
            Imagem do Dashboard
          </span>
        </div>
      </div>
    </section>
  );
}

const audiences = [
  {
    icon: Palette,
    title: "Para Artistas",
    description:
      "Controle sua produção e gere certificados de autenticidade.",
  },
  {
    icon: BookOpen,
    title: "Para Colecionadores",
    description:
      "Preserve seu patrimônio e rastreie a valorização.",
  },
  {
    icon: Building2,
    title: "Para Galerias",
    description:
      "Gerencie exposições, catálogo de artistas e vendas.",
  },
];

function AudienceSection() {
  return (
    <section className="w-full bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h2
          className="text-3xl md:text-4xl font-semibold tracking-tight text-center text-foreground"
          data-testid="text-audience-title"
        >
          Para quem é o Art Flow?
        </h2>
        <p className="mt-4 text-center text-muted-foreground text-lg max-w-xl mx-auto">
          Uma plataforma pensada para cada perfil do mercado de arte.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {audiences.map((item, idx) => (
            <Card
              key={idx}
              className="p-8 flex flex-col items-center text-center"
              data-testid={`card-audience-${idx}`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const plans = [
  {
    name: "Artista",
    monthlyPrice: 59,
    annualPrice: 39,
    features: [
      "Cadastro de obras ilimitado",
      "Certificados de autenticidade",
      "Portfólio digital",
      "Relatórios básicos",
    ],
  },
  {
    name: "Colecionador",
    monthlyPrice: 129,
    annualPrice: 98,
    popular: true,
    features: [
      "Gestão completa do acervo",
      "Rastreio de valorização",
      "Seguro e proveniência",
      "Relatórios avançados",
      "Suporte prioritário",
    ],
  },
  {
    name: "Galeria",
    monthlyPrice: 198,
    annualPrice: 166,
    features: [
      "Multiusuários",
      "Gestão de exposições",
      "Catálogo de artistas",
      "Controle de vendas",
      "Relatórios completos",
      "Suporte dedicado",
    ],
  },
];

function PricingSection() {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <h2
          className="text-3xl md:text-4xl font-semibold tracking-tight text-center text-foreground"
          data-testid="text-pricing-title"
        >
          Planos e Preços
        </h2>
        <p className="mt-4 text-center text-muted-foreground text-lg max-w-xl mx-auto">
          Escolha o plano ideal para sua necessidade.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => setAnnual(false)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              !annual
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground"
            }`}
            data-testid="button-pricing-monthly"
          >
            Mensal
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              annual
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground"
            }`}
            data-testid="button-pricing-annual"
          >
            Anual
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative p-8 flex flex-col ${
                plan.popular ? "border-primary border-2" : ""
              }`}
              data-testid={`card-plan-${idx}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-md">
                  Mais Popular
                </span>
              )}

              <h3 className="text-xl font-semibold text-foreground">
                {plan.name}
              </h3>

              <div className="mt-5">
                <span
                  className="text-4xl font-bold text-foreground"
                  data-testid={`text-price-${idx}`}
                >
                  R$ {annual ? plan.annualPrice : plan.monthlyPrice}
                </span>
                <span className="text-muted-foreground text-sm ml-1">
                  /mês
                </span>
              </div>

              {annual && (
                <p className="mt-1 text-sm text-muted-foreground">
                  no plano anual
                </p>
              )}

              <ul className="mt-8 space-y-3 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/cadastro">
                <Button
                  className="mt-8 w-full"
                  variant={plan.popular ? "default" : "outline"}
                  data-testid={`button-plan-${idx}`}
                >
                  Assine Agora
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="mx-auto max-w-6xl px-6 py-8 text-center">
        <p
          className="text-sm text-muted-foreground"
          data-testid="text-footer"
        >
          &copy; 2026 Art Flow. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AudienceSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
