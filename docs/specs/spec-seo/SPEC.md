# Technical Specification: Utly SEO Architecture & Strategy

## 1. Contexto e Visão Geral
A Utly é uma plataforma de ferramentas utilitárias focada em privacidade e processamento client-side. Um dos maiores desafios arquitetônicos para sites de utilidades é o paradoxo do "conteúdo ralo" (thin content), onde as páginas possuem alta interatividade mas escassez de texto, o que prejudica severamente a indexação orgânica. Esta especificação técnica detalha a implementação de uma arquitetura de SEO holística para resolver esse paradoxo, melhorar os Core Web Vitals (com foco no INP) e injetar metadados estruturados ricos, baseados nas diretrizes do relatório de SEO de utilidades.

## 2. Objetivos e Não-Objetivos
**Objetivos:**
- Resolver o problema de "thin content" injetando blocos de conteúdo educacional (HowTo, FAQ) abaixo (above the fold) das interfaces das ferramentas.
- Implementar Schema Markup avançado (JSON-LD) para classificar o Utly corretamente perante os motores de busca (SoftwareApplication, WebApplication, FAQPage).
- Garantir alta performance focada em Core Web Vitals, particularmente otimizando o processamento JavaScript para evitar penalizações de Interaction to Next Paint (INP).
- Estruturar a base para ramificações de ferramentas (Topic Clusters e Spoke Pages) para dominar buscas de cauda longa (long-tail keywords).

**Não-Objetivos:**
- Criar e gerenciar blogs isolados das ferramentas. Todo o conteúdo gerado deve orbitar ao redor da "money page" (a ferramenta em si).
- Fazer otimizações "black hat" ou construção de PBNs (Private Blog Networks). Todo o foco técnico é SEO on-page estrutural.
- Deslocar a interface funcional das ferramentas para baixo. A ferramenta sempre deve permanecer na primeira dobra visível.

## 3. Requisitos Funcionais (User Stories)
- **RF1 - Componentes de Conteúdo Rica (FAQ e How-To):** Os desenvolvedores devem ter acesso a componentes React reutilizáveis (ex: `SEOBlock`, `FAQAccordion`) para facilmente inserir texto otimizado, guias passo a passo e perguntas frequentes nas páginas das ferramentas.
- **RF2 - Dados Estruturados (JSON-LD) Dinâmicos:** A plataforma deve gerar e injetar automaticamente as marcações `SoftwareApplication` e `FAQPage` baseadas na configuração de cada ferramenta no `<head>` das páginas. O preço sempre deve constar como "0" para sinalizar ferramentas gratuitas.
- **RF3 - Otimização de Performance (INP):** Ferramentas pesadas (como o Magic Eraser em WASM) devem rodar seu processamento através de Web Workers (ou em chunks utilizando `setTimeout`/`requestAnimationFrame`) para não bloquear a Thread Principal, preservando a métrica INP.
- **RF4 - Topic Clusters (Sub-rotas):** A arquitetura deve permitir a fácil criação de sub-rotas usando os mesmos componentes lógicos centrais. (Ex: `/sorteador/equipes` ou `/sorteador-de-times` deve renderizar o Sorteador pré-configurado no modo equipes, mas ter metadata, H1 e FAQ totalmente independentes e otimizados para essa palavra-chave).
- **RF5 - Metadados de Página e Open Graph:** Todas as rotas de ferramentas devem exportar a função `generateMetadata()` do Next.js, incluindo títulos altamente específicos e descrições ricas, focados em intenção de busca.

## 4. Design Técnico e Arquitetura
- **Framework:** Next.js 16 (App Router) + React 19.
- **Injeção de Metadados JSON-LD:** Utilização da tag `<script type="application/ld+json">` incorporada nativamente nos arquivos `layout.tsx` ou `page.tsx` correspondentes a cada ferramenta.
- **Componentes Estruturais:** 
  - Criação de `components/seo/FAQStructured.tsx`
  - Criação de `components/seo/HowToGuide.tsx`
  - Estes componentes não apenas renderizam o visual, mas opcionalmente geram e anexam seu próprio JSON-LD para a página.
- **Privacidade como Vantagem (E-E-A-T):** Os textos explicativos renderizados via componentes devem, por padrão, destacar a segurança e o processamento local, pois isso age como um forte apelo comercial (diferencial competitivo contra concorrentes baseados em nuvem).

## 5. Estruturação do Schema (SoftwareApplication)
Exemplo do payload base que deverá ser gerado:
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Nome da Ferramenta",
  "applicationCategory": "UtilitiesApplication", // ou MultimediaApplication
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL" // ou USD
  },
  "browserRequirements": "Requer suporte a HTML5 (e WebGL/WASM caso aplicável)"
}
```

## 6. Ramificação (Topic Clusters) - Exemplo Sorteador
A arquitetura do Sorteador será refatorada para suportar hubs de URL:
- `/sorteador` (URL Mãe / Hub) - Foco em "Sorteador online".
- `/sorteador/amigo-secreto` (URL Filha) - Compartilha a lógica do Sorteador, mas possui H1 "Sorteio Amigo Secreto", FAQ focado em regras de presente e limites de preço, além de meta title focado nessa busca específica.
- O componente central `<SorteadorApp />` receberá *props* como `initialMode` para renderizar a interface já no estado desejado pela URL, evitando cliques extras do usuário.

## 7. Critérios de Aceite
- Nenhuma ferramenta quebra a pontuação INP (>200ms) durante uso intenso, validado via Google Lighthouse.
- O Schema Validator oficial do Google reconhece `SoftwareApplication` e `FAQPage` em todas as rotas das ferramentas sem erros estruturais.
- O conteúdo explicativo não empurra a interface útil da ferramenta para fora da primeira dobra visível (above the fold) no desktop.
- As URLs encurtadas (tratadas pelo `proxy.ts`) não sofrem interferência da criação das novas sub-rotas (Topic clusters).
