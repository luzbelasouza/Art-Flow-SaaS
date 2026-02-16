# Art Flow - Gestão de Acervo de Arte

## Visão Geral
Sistema web de gestão de acervo de arte. MVP em desenvolvimento por etapas.

## Estado Atual
- **Etapa 1 (Concluída):** Estrutura base de rotas configurada com páginas placeholder.
- **Etapas 2-8 (Concluídas):** Landing page, Login/Cadastro, Dashboard com galeria de obras, suporte multi-perfil (Artista/Colecionador), filtros por artista.
- **Etapa 9 (Concluída):** Reestruturação do perfil Artista com menu ERP Cultural, telas Bio, Mapa da Obra, e modal aprimorado.
- **Etapa 10 (Concluída):** 7 novas telas funcionais – Exposições, Vendas, Agenda, Contatos, Localização, Produção, Mapa da Obra interativo com popups.
- **Etapa 11 (Concluída):** Coleções/Séries com "Vida no Campo: A Série de Pontoise", Documentos estilo Drive com busca e 3 arquivos, selos de coleção nos cards de obras. Ajustes de consistência: IDs de Inventário padronizados (ID-M001 a ID-M003), aba Certificados funcional com repositório automático e busca inteligente, dimensões nas obras de Pissarro.
- **Etapa 16 (Concluída):** Logística de Tiragens, Exposições e Representação. Botão "+ Adicionar Exposição" com modal. Aba "Agenda" renomeada para "Representação" com galerias parceiras. Produção separada em Obras Únicas vs Tiragens com modal completo (técnica reprodução, quantidade, P.A., suporte, gramatura). Nova Obra com associação a tiragem (numeração ex: 1/20, P.A. 1/5), exposição e representação. Contador visual de disponibilidade nas tiragens.
- **Etapa 17 (Concluída):** Visualização Individual e Inteligência de Mercado. Botão "Visualizar" nos cards de obra com modal ficha técnica completa (foto ampliada, ID, medidas, preço, status, localização) e impressão A4. "Mercado" renomeado para "Avaliação" com formulário (artista obrigatório, obra opcional), bloqueio de solicitações simultâneas, pacotes de estrelas (em dev). Relatório de avaliação na Caixa de Entrada com selo "Art Flow Verified", preço estimado ou aviso de artista não validado. Nova sub-aba "Leilões Públicos" com 4 leilões ativos e função "Enviar para Captação" em massa.

## Arquitetura
- **Frontend:** React + Tailwind CSS + shadcn/ui (wouter para rotas)
- **Backend:** Express.js
- **Idioma da interface:** Português do Brasil (pt-BR)
- **Navegação interna:** Dashboard usa estado interno (paginaAtiva) para trocar conteúdo sem mudar de rota

## Estrutura de Rotas
### Área Pública
- `/` - Home (página inicial com navegação)
- `/login` - Login
- `/cadastro` - Cadastro

### Área Privada
- `/dashboard` - Dashboard (com navegação interna via sidebar)

### Páginas Internas do Dashboard (Artista)
- **Perfil:** Perfil (dados do emissor), Bio (detalhada), Exposições, Representação, Mapa da Obra (detalhada)
- **Acervo:** Obras, Coleções/Séries, Catálogo, Produção e Tiragem
- **Logística:** Localização
- **Comercial:** Contatos, Vendas
- **Arquivo:** Documentos, Certificados (COA)
- **Oportunidades (Premium):** Expo, Ocupação, Edital (com Match), Consignação, Feiras, Avaliação, Leilões Públicos, Caixa de Entrada

### Páginas Internas do Dashboard (Colecionador)
- **Perfil:** Perfil, Bio, Exposições, Representação, Mapa da Obra
- **Acervo:** Artistas, Obras, Coleções/Séries, Catálogo, **Empréstimo / Doação** (substitui Produção e Tiragem)
- **Logística:** Localização (com tipos Empréstimo e Doação)
- **Comercial:** Contatos, Vendas
- **Arquivo:** Documentos, Certificados (COA)
- **Oportunidades (Premium):** Expo (sem prazo de inscrição), Consignação, Feiras, Avaliação, Leilões Públicos, Caixa de Entrada (**sem** Ocupação e Edital)

## Perfis de Usuário
- **Artista:** Vê acervo do Pissarro (3 obras), sidebar com menu ERP completo
- **Colecionador:** Mesma sidebar base do Artista, com ajustes: sub-aba "Artistas" no Acervo, "Empréstimo / Doação" no lugar de "Produção e Tiragem", Expo sem prazo de inscrição, sem Ocupação/Edital nas Oportunidades. Vê acervo de Kirchner (3 obras) + Cassatt (2 obras), filtros por artista, seleção/catálogos/certificados funcionais
- **Galeria:** Ainda não implementado

## Preferências do Usuário
- Todo o sistema em pt-BR (interface, botões, código)
- Design minimalista, limpo, fundo claro
- Nunca apagar ou sobrescrever código aprovado em etapas anteriores
- Stack: React + Tailwind CSS

## Arquivos Importantes
- `client/src/pages/dashboard.tsx` - Dashboard principal com sidebar e navegação interna
- `client/src/pages/bio.tsx` - Tela de biografia do artista
- `client/src/pages/mapa-obra.tsx` - Mapa visual interativo com pins clicáveis e popups
- `client/src/pages/exposicoes.tsx` - Exposições com imagens, status e botão "+ Adicionar Exposição"
- `client/src/pages/vendas.tsx` - Dashboard financeiro com gráfico e histórico de vendas
- `client/src/pages/representacao.tsx` - Galerias parceiras e marchands com botão "+ Adicionar Representação"
- `client/src/pages/contatos.tsx` - 3 contatos (João Vicente, Angela Marques, Galeria Graphitte)
- `client/src/pages/localizacao.tsx` - 8 endereços (3 feiras + 3 vendas + 1 empréstimo + 1 doação)
- `client/src/pages/producao.tsx` - Produção (Obras Únicas) com cronômetros + Tiragens (Múltiplos) com contador de disponibilidade
- `client/src/pages/colecoes.tsx` - Coleção "Vida no Campo" com 2 obras agrupadas, botão "Visualizar" com ficha técnica completa e impressão
- `client/src/pages/documentos.tsx` - Gestão de documentos estilo Drive com busca e categorias
- `client/src/pages/certificado.tsx` - Certificado de Autenticidade em tela cheia com impressão A4
- `client/src/pages/placeholder.tsx` - Componente placeholder reutilizável

## Arquivos Importantes (cont.)
- `client/src/pages/perfil-emissor.tsx` - Formulário do emissor com persistência localStorage
- `client/src/pages/catalogo.tsx` - Repositório de catálogos e visualizador de documento catálogo
- `client/src/pages/oportunidades.tsx` - Central de Oportunidades Premium (Expo, Ocupação, Edital, Consignação, Feiras, Avaliação, Leilões, Caixa de Entrada)
- `client/src/pages/emprestimo-doacao.tsx` - Empréstimo / Doação (exclusivo Colecionador) com busca dinâmica de obras, Local de Destino dinâmico filtrado por tipo, atualização automática de localização da obra
- `client/src/pages/leiloes-acervo.tsx` - Leilões Públicos no Acervo (Colecionador): busca obra, tipo "Leilão Público", dropdown leiloeiros, status "Em Leilão", notificação Caixa de Entrada

## Alterações Recentes
- 2026-02-16: Reestruturação Leilões Públicos (Colecionador): módulo movido de Oportunidades para Acervo (abaixo de Empréstimo/Doação), nova página LeiloesPublicosAcervo seguindo padrão Empréstimo/Doação (busca de obras, tipo fixo "Leilão Público", dropdown de leiloeiros filtrado), Localização com tipo "leilao" e 2 seed leiloeiros (Bolsa de Arte SP, Soraia Cals RJ), Mapa da Obra com Pin Lilás para obras em leilão e popup "Em Leilão Público – [leiloeiro]", status automático "Em Leilão" na ficha técnica, notificação na Caixa de Entrada ao registrar
- 2026-02-16: Integração Logística-Mapa: Pins Azul Claro (Empréstimo) e Rosa (Doação) no Mapa da Obra, mock data "View of Dresden" emprestada ao Museu do Ipiranga para Colecionador, geolocalização automática por coordenadas do Local de Destino, sincronização instantânea entre Empréstimo/Doação e Mapa da Obra
- 2026-02-16: Refinamentos de Logística e Visualização: Empréstimo/Doação com campo obrigatório "Local de Destino" (dropdown dinâmico filtrado por tipo), Coleções com botão "Visualizar" (ficha técnica completa + Imprimir Coleção), Exposições segmentadas por perfil (Colecionador: "Aberta ao Público"/"Em Breve", Artista: "Inscrições Abertas"), atualização automática de localização ao registrar empréstimo
- 2026-02-16: Ajustes exclusivos Colecionador: seleção de obras funcional com checkbox em ArtistaAcervo, "Produção e Tiragem" substituída por "Empréstimo / Doação" com modal + busca dinâmica por nome/ID, Localização com tipos Empréstimo e Doação, Expo sem prazo de inscrição, Ocupação e Edital removidos das Oportunidades
- 2026-02-16: Refatoração Global - Unificação de perfis Artista/Colecionador: mesma sidebar e módulos para ambos, buildMenu(perfil) substitui menus separados, sub-aba "Artistas" no Acervo do Colecionador antes de Obras, PaginaObras unificada com seleção/catálogo para todos, campo "Artista" obrigatório no NovaObraModal (Select), limites freemium e Oportunidades iguais para ambos
- 2026-02-16: Leilões Públicos reformulado - Fluxo por catálogo: seleção de leilões (checkboxes + Selecionar Todos), botão "Enviar Catálogo para Captação", modal de seleção de catálogo com miniatura da capa, termos de responsabilidade obrigatórios, notificação automática na Caixa de Entrada confirmando envio
- 2026-02-16: Etapa 17 - Visualização Individual e Inteligência de Mercado: botão "Visualizar" nos cards de obra com modal ficha técnica (foto ampliada, ID, medidas, preço, status) e impressão A4, "Mercado" renomeado para "Avaliação" com formulário e bloqueio de solicitações simultâneas, Relatório Art Flow Verified na Caixa de Entrada, nova sub-aba "Leilões Públicos" com 4 leilões e envio em massa para captação
- 2026-02-16: Etapa 16 - Logística de Tiragens, Exposições e Representação: botão "+ Adicionar Exposição" com modal, aba "Agenda" renomeada para "Representação" com galerias parceiras, Produção separada em Obras Únicas vs Tiragens com modal completo, Nova Obra com associação a tiragem (numeração 1/20, P.A. 1/5), exposição e representação, contador visual de disponibilidade nas tiragens
- 2026-02-16: Central de Oportunidades Premium - 7 novas telas (Expo, Ocupação, Edital com Match, Consignação, Feiras, Mercado com vitrine, Caixa de Entrada), grupo Oportunidades na sidebar com coroa dourada, landing page upsell "Conecte sua Arte ao Mercado", Match inteligente por técnica
- 2026-02-16: Modelo Freemium - Limites (5 obras, 1 cert, 1 catálogo), selos PREMIUM dourados na sidebar, UpsellModal (R$49,90/mês), marca d'água diagonal em certificados/catálogos, seção Assinatura no Perfil, bloqueio de Nova Obra/certificado/catálogo ao atingir limite
- 2026-02-16: Etapa 12 - Gerador de Catálogos Dinâmicos: modo seleção em Obras, modal de criação, repositório de catálogos, documento visual (capa + obras + emissor), catálogo padrão "Vida no Campo"
- 2026-02-16: Ajustes de personalização - Aba Perfil (emissor) com formulário completo, linha do emissor no cabeçalho do certificado, aviso amigável se perfil incompleto
- 2026-02-16: Etapa 11 - Coleções/Séries (Vida no Campo: Pontoise), Documentos (busca + categorias + 3 arquivos), selos de coleção nos cards de obras
- 2026-02-16: Etapa 10 - Exposições, Vendas (R$135k, +15%), Agenda, Contatos, Localização, Produção com cronômetros, Mapa da Obra com popups
- 2026-02-16: Etapa 9 - Menu ERP Cultural (5 grupos), Bio com avatar/textarea, Mapa da Obra com pins, modal Nova Obra expandido
- 2026-02-16: Etapa 8 - Suporte multi-perfil Colecionador com agrupamento por artista e filtros
- 2026-02-15: Etapa 1 - Rotas base criadas (Home, Login, Cadastro, Dashboard)
