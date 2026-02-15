import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <h1
        className="text-5xl md:text-6xl font-light tracking-tight text-foreground mb-12"
        data-testid="text-dashboard-title"
      >
        Dashboard
      </h1>

      <Link href="/">
        <Button variant="ghost" data-testid="button-back-home-dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Home
        </Button>
      </Link>
    </div>
  );
}
