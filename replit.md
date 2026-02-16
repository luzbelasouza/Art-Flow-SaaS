# Art Flow - Gestão de Acervo de Arte

## Visão Geral
Sistema web de gestão de acervo de arte. MVP em desenvolvimento por etapas. ERP Cultural completo com modelo freemium, suporte multi-perfil (Artista, Colecionador, Galeria) e Central de Oportunidades Premium.

## Estado Atual
- **Etapa 1 (Concluída):** Estrutura base de rotas configurada com páginas placeholder.
- **Etapas 2-8 (Concluídas):** Landing page, Login/Cadastro, Dashboard com galeria de obras, suporte multi-perfil (Artista/Colecionador), filtros por artista.
- **Etapa 9 (Concluída):** Reestruturação do perfil Artista com menu ERP Cultural, telas Bio, Mapa da Obra, e modal aprimorado.
- **Etapa 10 (Concluída):** 7 novas telas funcionais – Exposições, Vendas, Agenda, Contatos, Localização, Produção, Mapa da Obra interativo com popups.
- **Etapa 11 (Concluída):** Coleções/Séries com "Vida no Campo: A Série de Pontoise", Documentos estilo Drive com busca e 3 arquivos, selos de coleção nos cards de obras. Ajustes de consistência: IDs de Inventário padronizados (ID-M001 a ID-M003), aba Certificados funcional com repositório automático e busca inteligente, dimensões nas obras de Pissarro.
- **Etapa 12 (Concluída):** Gerador de Catálogos Dinâmicos: modo seleção em Obras, modal de criação, repositório de catálogos, documento visual (capa + obras + emissor), catálogo padrão "Vida no Campo".
- **Etapa 13 (Concluída):** Modelo Freemium com limites (5 obras, 1 cert, 1 catálogo), selos PREMIUM dourados na sidebar, UpsellModal (R$49,90/mês), marca d'água diagonal em certificados/catálogos.
- **Etapa 14 (Concluída):** Central de Oportunidades Premium – 7 sub-telas (Expo, Ocupação, Edital com Match, Consignação, Feiras, Avaliação, Caixa de Entrada), coroa dourada na sidebar, landing page upsell.
- **Etapa 15 (Concluída):** Refatoração Global – Unificação de perfis Artista/Colecionador com buildMenu(perfil), ajustes exclusivos Colecionador (Artistas no Acervo, Empréstimo/Doação, Expo sem prazo, sem Ocupação/Edital).
- **Etapa 16 (Concluída):** Logística de Tiragens, Exposições e Representação. Botão "+ Adicionar Exposição" com modal. "Agenda" renomeada para "Representação" com galerias parceiras. Produção separada em Obras Únicas vs Tiragens com modal completo. Nova Obra com associação a tiragem (1/20, P.A. 1/5), exposição e representação. Contador de disponibilidade nas tiragens.
- **Etapa 17 (Concluída):** Visualização Individual e Inteligência de Mercado. Modal ficha técnica completa com impressão A4. "Mercado" renomeado para "Avaliação" com formulário e bloqueio de solicitações simultâneas. Relatório Art Flow Verified na Caixa de Entrada. Leilões Públicos com 4 leilões e envio em massa para captação.
- **Etapa 18 (Concluída):** Reestruturação Leilões Públicos (Colecionador) – módulo movido de Oportunidades para Acervo, nova página LeiloesPublicosAcervo (busca obra, tipo fixo "Leilão Público", dropdown leiloeiros), Localização com tipo "leilao" e 2 seed leiloeiros, Mapa da Obra com Pin Lilás, status automático "Em Leilão" na ficha técnica, notificação Caixa de Entrada.
- **Integração Logística-Mapa (Concluída):** Pins Azul Claro (Empréstimo), Rosa (Doação) e Lilás (Leilão) no Mapa da Obra, geolocalização automática, sincronização instantânea.

## Arquitetura
- **Frontend:** React + Tailwind CSS + shadcn/ui (wouter para rotas)
- **Backend:** Express.js
- **Idioma da interface:** Português do Brasil (pt-BR)
- **Navegação interna:** Dashboard usa estado interno (paginaAtiva) para trocar conteúdo sem mudar de rota
- **Persistência:** localStorage para perfil, envios, preferências

## Estrutura de Rotas
### Área Pública
- `/` - Home (página inicial com navegação)
- `/login` - Login (teste@artflow.com / 123456)
- `/cadastro` - Cadastro (seleciona perfil Artista/Colecionador)

### Área Privada
- `/dashboard` - Dashboard (com navegação interna via sidebar)

### Páginas Internas do Dashboard (Artista)
- **Perfil:** Perfil (dados do emissor), Bio (detalhada), Mapa da Obra (geográfico com Leaflet)
- **Acervo:** Obras (galeria + seleção + catálogos), Coleções/Séries, Catálogo, Exposições, Representação
- **Logística:** Localização, Armazenamento (placeholder), Contatos
- **Comercial:** Vendas (dashboard financeiro), Consignação, Avaliação
- **Oportunidade (Premium):** Feiras, Convocatória, Seja um Tutor
- **Mercado (Premium):** Venda sua Arte, Leilão Art Flow
- **Suporte:** Caixa de Entrada, Tutores Online, Cursos, Suporte

### Páginas Internas do Dashboard (Colecionador)
- **Perfil:** Perfil, Bio, Mapa da Obra
- **Acervo:** Artistas, Obras, Coleções/Séries, Catálogo, Exposições, Representação, Empréstimo/Doação, Leilões Públicos
- **Logística:** Localização, Armazenamento, Contatos
- **Comercial:** Vendas, Consignação, Avaliação
- **Oportunidade (Premium):** Feiras, Convocatória, Seja um Tutor
- **Mercado (Premium):** Venda sua Arte, Leilão Art Flow
- **Suporte:** Caixa de Entrada, Tutores Online, Cursos, Suporte

## Perfis de Usuário
- **Artista:** Vê acervo do Pissarro (3 obras com IDs ID-M001 a ID-M003), sidebar com menu ERP completo, Oportunidades com todas as sub-telas
- **Colecionador:** Sub-aba "Artistas" no Acervo, "Empréstimo / Doação" + "Leilões Públicos" no Acervo (substitui "Produção e Tiragem"), Expo sem prazo de inscrição, sem Ocupação/Edital/Leilões nas Oportunidades. Vê acervo de Kirchner (3 obras) + Cassatt (2 obras), filtros por artista
- **Galeria:** Ainda não implementado

## Modelo Freemium
- **Gratuito:** 5 obras, 1 certificado, 1 catálogo
- **Premium (R$49,90/mês):** Ilimitado, sem marca d'água, acesso a todos os módulos
- Selo dourado discreto (P) nos itens: Mapa da Obra, Representação, Empréstimo/Doação, Leilões Públicos, Armazenamento, Tutores Online, Cursos
- Grupos inteiramente premium (coroa dourada no label): Comercial, Oportunidade, Mercado
- Clique em item (P) ou item de grupo premium → UpsellModal (R$49,90/mês)
- Marca d'água em certificados/catálogos (plano gratuito)

## Visibilidade por Perfil
- **Artista exclusivo:** Representação, Convocatória, Venda sua Arte, Tutores Online, Cursos
- **Colecionador exclusivo:** Empréstimo/Doação
- **Colecionador/Galeria:** Artistas, Leilões Públicos, Avaliação, Seja um Tutor, Leilão Art Flow
- **Oculto para Galeria:** Consignação
- Sidebar adapta instantaneamente ao trocar perfil (localStorage "artflow_profile")

## Preferências do Usuário
- Todo o sistema em pt-BR (interface, botões, código)
- Design minimalista, limpo, fundo claro
- Nunca apagar ou sobrescrever código aprovado em etapas anteriores
- Stack: React + Tailwind CSS

## Arquivos Importantes
- `client/src/pages/dashboard.tsx` - Dashboard principal com sidebar, navegação interna, buildMenu(perfil), VisualizarObraModal, NovaObraModal
- `client/src/pages/home.tsx` - Landing page
- `client/src/pages/login.tsx` - Login (teste@artflow.com / 123456)
- `client/src/pages/cadastro.tsx` - Cadastro com seleção de perfil (salva em localStorage)
- `client/src/pages/bio.tsx` - Tela de biografia do artista
- `client/src/pages/mapa-obra.tsx` - Mapa visual interativo com pins clicáveis (Verde=Acervo, Amarelo=Consignação, Vermelho=Venda, Azul Claro=Empréstimo, Rosa=Doação, Lilás=Leilão)
- `client/src/pages/exposicoes.tsx` - Exposições com imagens, status e botão "+ Adicionar Exposição"
- `client/src/pages/vendas.tsx` - Dashboard financeiro com gráfico e histórico de vendas (R$135k, +15%)
- `client/src/pages/representacao.tsx` - Galerias parceiras e marchands com botão "+ Adicionar Representação"
- `client/src/pages/contatos.tsx` - 3 contatos (João Vicente, Angela Marques, Galeria Graphitte)
- `client/src/pages/localizacao.tsx` - Endereços com tipos: feira, venda, empréstimo, doação, leilão. 2 leiloeiros seed (Bolsa de Arte SP, Soraia Cals RJ)
- `client/src/pages/producao.tsx` - Produção (Obras Únicas) com cronômetros + Tiragens (Múltiplos) com contador de disponibilidade
- `client/src/pages/colecoes.tsx` - Coleção "Vida no Campo" com 2 obras agrupadas, botão "Visualizar" com ficha técnica completa e impressão
- `client/src/pages/documentos.tsx` - Gestão de documentos estilo Drive com busca e categorias
- `client/src/pages/certificado.tsx` - Certificado de Autenticidade em tela cheia com impressão A4
- `client/src/pages/perfil-emissor.tsx` - Formulário do emissor com persistência localStorage
- `client/src/pages/catalogo.tsx` - Repositório de catálogos e visualizador de documento catálogo
- `client/src/pages/oportunidades.tsx` - Central de Oportunidades Premium (Expo, Ocupação, Edital, Consignação, Feiras, Avaliação, Leilões, Caixa de Entrada)
- `client/src/pages/emprestimo-doacao.tsx` - Empréstimo / Doação (Colecionador) com busca dinâmica de obras, Local de Destino filtrado por tipo, atualização automática de localização
- `client/src/pages/leiloes-acervo.tsx` - Leilões Públicos no Acervo (Colecionador): busca obra, tipo fixo "Leilão Público", dropdown leiloeiros, status "Em Leilão", notificação Caixa de Entrada
- `client/src/pages/placeholder.tsx` - Componente placeholder reutilizável
- `client/src/pages/agenda.tsx` - (legado, substituído por representacao.tsx)

## Integrações entre Módulos
- **Empréstimo/Doação → Mapa da Obra:** Pins Azul Claro (empréstimo) e Rosa (doação) com geolocalização automática
- **Leilões → Mapa da Obra:** Pin Lilás com popup "Em Leilão Público – [leiloeiro]"
- **Representação → Mapa da Obra:** Pin Laranja (#f97316) com popup "Representação em: [local]"
- **Armazenamento → Mapa da Obra:** Pin Cinza (#6b7280) com popup "Armazenada em: [local]"
- **Leilões → Ficha Técnica:** statusOverride "Em Leilão" no VisualizarObraModal
- **Representação → Ficha Técnica:** statusOverride "Em Representação" no VisualizarObraModal
- **Armazenamento → Ficha Técnica:** statusOverride "Armazenada" no VisualizarObraModal
- **Leilões → Caixa de Entrada:** Notificação automática via localStorage (artflow_envios_realizados)
- **Localização → Mapa da Obra:** Coordenadas mapeadas para geolocalização de destinos
- **Produção → Nova Obra:** Associação a tiragem com numeração (1/20, P.A. 1/5)
- **Catálogo → Leilões Públicos (Oportunidades):** Envio de catálogo para captação em leilões

## Alterações Recentes
- 2026-02-16: Módulo Comercial Completo – Vendas com "+ Nova Venda" (campo Comprador/Cliente obrigatório vinculado a Contatos, alerta se sem contato), Avaliação com cotas mensais por perfil (Artista=5, Colecionador=10, Galeria=20), contador de consultas restantes, bloqueio automático. Consignação com "+ Nova Consignação" no padrão logístico (busca obra + local filtrado por consignacao/galeria), registros na Caixa de Entrada, integração Mapa da Obra. Contatos refatorado para aceitar estado externo (contatosExternos, onContatosChange).
- 2026-02-16: Logística Unificada – Localização expandida (13 tipos: consignação, leilão, empréstimo, doação, armazenamento, exposição, feira, ocupação, representação, galeria, venda, depósito, outros). Representação e Armazenamento reescritas com padrão logístico (busca obra + dropdown local filtrado). Mapa da Obra com 8 categorias (+ Representação Laranja, Armazenamento Cinza). statusOverride na ficha técnica para representação e armazenamento. Automação de localização ao salvar registro.
- 2026-02-16: Reestruturação da Sidebar - Nova hierarquia com 7 grupos (Perfil, Acervo, Logística, Comercial, Oportunidade, Mercado, Suporte). Exposições/Representação movidos de Perfil para Acervo. Consignação/Avaliação movidos de Oportunidades para Comercial (sem premium). Caixa de Entrada movida para Suporte (sem premium). Mapa da Obra sem premium. Novos placeholders: Armazenamento, Convocatória, Seja um Tutor, Venda sua Arte, Leilão Art Flow, Tutores Online, Cursos, Suporte. Novos grupos premium: Oportunidade e Mercado com coroa dourada.
- 2026-02-16: Etapa 19 - Mapa da Obra geográfico real com Leaflet/OpenStreetMap, pins com coordenadas lat/lng reais, popups com miniatura/título/cidade/status, legenda interativa com filtros por categoria, FitBounds automático.
- 2026-02-16: Etapa 18 - Reestruturação Leilões Públicos (Colecionador): módulo movido de Oportunidades para Acervo (abaixo de Empréstimo/Doação), nova página LeiloesPublicosAcervo seguindo padrão Empréstimo/Doação (busca de obras, tipo fixo "Leilão Público", dropdown de leiloeiros filtrado), Localização com tipo "leilao" e 2 seed leiloeiros (Bolsa de Arte SP, Soraia Cals RJ), Mapa da Obra com Pin Lilás para obras em leilão e popup "Em Leilão Público – [leiloeiro]", status automático "Em Leilão" na ficha técnica, notificação na Caixa de Entrada ao registrar
- 2026-02-16: Integração Logística-Mapa: Pins Azul Claro (Empréstimo) e Rosa (Doação) no Mapa da Obra, mock data "View of Dresden" emprestada ao Museu do Ipiranga para Colecionador, geolocalização automática por coordenadas do Local de Destino, sincronização instantânea entre Empréstimo/Doação e Mapa da Obra
- 2026-02-16: Refinamentos de Logística e Visualização: Empréstimo/Doação com campo obrigatório "Local de Destino" (dropdown dinâmico filtrado por tipo), Coleções com botão "Visualizar" (ficha técnica completa + Imprimir Coleção), Exposições segmentadas por perfil (Colecionador: "Aberta ao Público"/"Em Breve", Artista: "Inscrições Abertas"), atualização automática de localização ao registrar empréstimo
- 2026-02-16: Etapa 17 - Visualização Individual e Inteligência de Mercado
- 2026-02-16: Etapa 16 - Logística de Tiragens, Exposições e Representação
- 2026-02-16: Etapa 15 - Refatoração Global e Unificação de perfis
- 2026-02-16: Etapa 14 - Central de Oportunidades Premium
- 2026-02-16: Etapa 13 - Modelo Freemium
- 2026-02-16: Etapa 12 - Gerador de Catálogos Dinâmicos
- 2026-02-16: Etapa 11 - Coleções/Séries, Documentos, Certificados
- 2026-02-16: Etapa 10 - Exposições, Vendas, Contatos, Localização, Produção, Mapa da Obra
- 2026-02-16: Etapa 9 - Menu ERP Cultural, Bio, Mapa da Obra, modal Nova Obra
- 2026-02-16: Etapa 8 - Suporte multi-perfil Colecionador
- 2026-02-15: Etapa 1 - Rotas base criadas (Home, Login, Cadastro, Dashboard)
