import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Save } from "lucide-react";
import pissarroImg from "@assets/pissarro_1771198589992.png";

export default function Bio() {
  const { toast } = useToast();
  const [bio, setBio] = useState(
    "Pintor e gravurista franco-brasileiro, considerado um dos fundadores do Impressionismo. Conhecido por suas paisagens rurais e cenas campestres que capturam a luz natural com maestria. Trabalhou extensivamente em Pontoise e Éragny-sur-Epte, onde desenvolveu técnicas inovadoras de pintura ao ar livre."
  );

  function handleSalvar() {
    toast({
      title: "Bio atualizada",
      description: "Suas alterações foram salvas com sucesso.",
    });
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-28 w-28" data-testid="avatar-bio">
            <AvatarImage src={pissarroImg} alt="Camille Pissarro" />
            <AvatarFallback className="text-2xl">CP</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h1
              className="text-2xl font-semibold text-foreground"
              data-testid="text-bio-nome"
            >
              Camille Pissarro
            </h1>
            <p
              className="text-muted-foreground mt-1"
              data-testid="text-bio-anos"
            >
              1830 – 1903
            </p>
          </div>
        </div>

        <Card className="p-6 space-y-4">
          <Label htmlFor="bio-texto" className="text-base font-medium">
            Biografia
          </Label>
          <Textarea
            id="bio-texto"
            className="min-h-[180px] resize-none text-base"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Escreva uma breve biografia..."
            data-testid="textarea-bio"
          />
          <div className="flex justify-end">
            <Button onClick={handleSalvar} data-testid="button-salvar-bio">
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
