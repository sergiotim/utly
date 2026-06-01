# Plano de Implementação de SEO - Utly

## Visão Geral
Este plano implementa a estratégia de SEO definida em `docs/specs/spec-seo/SPEC.md` em **todas** as ferramentas do Utly (Home, Sorteador, Magic Eraser, Encurtador), evitando focar em uma única vertical. Toda a camada de SEO é genérica e reutilizável, sem criar rotas com nomes que restringem a utilidade de uma ferramenta (ex: evitar `/sorteador/amigo-secreto`).

## Fase 1: Componentes de Base para SEO
Objetivo: Reconstruir os 3 componentes estruturais, fazendo os testes pré-existentes (`__tests__/seo/`) passarem. Os testes NÃO serão alterados.

1.  **Reconstruir `components/seo/FAQStructured.tsx`**
    *   Renderizar UI de acordeão com as perguntas/respostas recebidas via prop.
    *   Injetar `<script type="application/ld+json">` com `@type: "FAQPage"`.
    *   Aderente ao teste: `__tests__/seo/FAQStructured.test.tsx`.

2.  **Reconstruir `components/seo/HowToGuide.tsx`**
    *   Renderizar UI com lista de passos (título + descrição) via prop.
    *   Injetar opcionalmente o JSON-LD `@type: "HowTo"`.
    *   Aderente ao teste: `__tests__/seo/HowToGuide.test.tsx`.

3.  **Reconstruir `components/seo/SoftwareApplicationSchema.tsx`**
    *   Renderizar apenas a tag `<script type="application/ld+json">` invisível com `@type: "WebApplication"`, `price: "0"` e `priceCurrency: "BRL"`.
    *   Aderente ao teste: `__tests__/seo/SoftwareApplicationSchema.test.tsx`.

*Ação de Validação:* `npm run test` deve exibir 5 testes verdes.

## Fase 2: Aplicação da Camada de SEO em TODAS as Ferramentas
Objetivo: Aplicar os componentes de SEO a 100% das ferramentas atuais e à Home, mitigando o "Thin Content" com conteúdo gerado contextualmente.

1.  **Home (`app/page.tsx`):**
    *   Injetar `SoftwareApplicationSchema` representando o portal Utly (`UtilitiesApplication`).
    *   Injetar `FAQStructured` global falando sobre as ferramentas e a privacidade.

2.  **Sorteador (`app/sorteador/page.tsx`):**
    *   Injetar `SoftwareApplicationSchema` (Nome: Sorteador Online, Categoria: `UtilitiesApplication`).
    *   Adicionar `HowToGuide` com passos: 1) Adicione os nomes/números, 2) Clique em Sortear, 3) Copie o resultado.
    *   Adicionar `FAQStructured` focado em "É grátis?", "Posso sortear equipes?", "Os dados são salvos?" (ênfase no client-side).
    *   Adicionar `generateMetadata()` específico para a página.
    *   Garantir que a UI principal (formulário) permaneça no *above the fold*.

3.  **Magic Eraser / Removedor de Fundo (`app/remove-bg/page.tsx`):**
    *   Injetar `SoftwareApplicationSchema` (Categoria: `MultimediaApplication`).
    *   Adicionar `HowToGuide` com os passos de upload, processamento e download.
    *   Adicionar `FAQStructured` com forte ênfase em privacidade: "A foto é enviada para algum servidor?" (Resposta: Não, é processada localmente via WASM).

4.  **Encurtador de URL (`app/shortener/page.tsx`):**
    *   Injetar `SoftwareApplicationSchema` (Categoria: `UtilitiesApplication`).
    *   Adicionar `HowToGuide` com os passos: 1) Cole a URL, 2) Clique em Encurtar, 3) Copie o link gerado.
    *   Adicionar `FAQStructured` focado em segurança: "Os links expiram?", "Existe rastreamento?", "É seguro contra phishing?".
    *   Adicionar `generateMetadata()` específico.

5.  **Componentes de Navegação:**
    *   Verificar `components/layout/AppShell.tsx` para garantir que a adição de texto não desloque os itens.
    *   Validar que `SeeAlso` e o `InternalPromo` continuam exibindo corretamente.

## Fase 3: Aderência às Restrições de Arquitetura
Objetivo: Não quebrar o que já funciona (Next.js Middleware, Rotas Existentes).

1.  **Middleware (`proxy.ts`):**
    *   A regex atual já exclui `sorteador`, `remove-bg`, `qrcode` e `shortener` da interceptação de links curtos. Como esta fase foca em aplicar a UI de SEO nas rotas existentes (sem criar novas URLs), nenhuma alteração é necessária no `proxy.ts`.

## Fase 4: Avaliação de Performance (INP)
Objetivo: Atender ao RF3 da Spec.

1.  **Auditoria de Processamento:**
    *   Verificar se a adição do `HowToGuide` e do `FAQStructured` (com seus `<script>` JSON-LD) não impacta o LCP.
    *   Garantir que o `SoftwareApplicationSchema` (apenas um script sem peso visual) não impacte a renderização.

*Ação de Validação Final:*
*   `npm run test` → Deve retornar todos os 5 testes passando.
*   `npm run lint` → Sem novos erros de lint.
*   `npm run build` → Garantir que o Next.js compila tudo (especialmente os metadados JSON-LD).
