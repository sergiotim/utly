# Technical Specification: Utly Randomizer (Sorteador)

## 1. Contexto e Visão Geral
A Utly é uma suíte de utilitários focada em privacidade (client-side) e design impecável. Este documento especifica a implementação da ferramenta "Sorteador", que permitirá aos usuários realizar sorteios aleatórios de números, nomes ou divisão de equipes, com foco em uma experiência fluida, animações ricas e metadados detalhados de histórico imediato.

## 2. Objetivos e Não-Objetivos
**Objetivos:**
- Criar a rota `/sorteador` com três modos distintos: Números, Nomes e Equipes.
- Processar leitura de arquivos TXT/CSV no lado do cliente (`FileReader`).
- Implementar uma animação de contagem regressiva (5s) para gerar expectativa.
- Exibir metadados detalhados pós-sorteio (data, hora, fuso, métricas do pool).
- Oferecer ações de refação rápida (refazer idêntico, refazer excluindo já sorteados, resetar).

**Não-Objetivos:**
- Persistência em banco de dados: O resultado não será salvo em backend. Foco total em processamento local para privacidade.
- Suporte a contas de usuário/autenticação.

## 3. Requisitos Funcionais (User Stories)
- **RF1 - Sorteio de Números:** O usuário deve poder escolher intervalo (Mínimo/Máximo), quantidade de números e habilitar/desabilitar repetições.
- **RF2 - Sorteio de Nomes:** O usuário deve poder inserir nomes manualmente (vírgula ou quebra de linha) ou importar via arquivo (`.txt`/`.csv`). A importação de arquivo deve *adicionar* (append) os dados à lista existente.
- **RF3 - Divisão de Equipes:** O usuário insere a lista de participantes (texto ou arquivo) e define a quantidade de equipes. O sistema deve dividir aleatoriamente e de forma mais igualitária possível os membros nas `N` equipes.
- **RF4 - Contagem Regressiva:** Toda ação de sorteio pode ser antecedida por uma contagem regressiva visual animada de 5 segundos. Esta opção deve ser um "toggle" disponível para o usuário, permitindo que os sorteios sejam instantâneos se desejado.
- **RF5 - Metadados do Sorteio:** O resultado deve apresentar data, horário e fuso horário da extração, além de exibir: "Sorteados X de Y opções disponíveis".
- **RF6 - Controles Pós-Sorteio:** 
  - **Sortear Novamente (Sem Repetir):** Roda um novo sorteio removendo os vencedores atuais do *pool* de opções originais. Disponível para Números e Nomes.
  - **Refazer Sorteio:** Reinicia a contagem com as configurações exatas pré-sorteio, limpando o histórico para iniciar novamente.

## 4. Design Técnico e Arquitetura
- **Path:** `app/sorteador/page.tsx`
- **Diretiva:** `use client` (necessário por conta do ciclo de vida, contagem e APIs de arquivo).
- **Framework & Estilos:** Next.js 16 (App Router), React 19, Tailwind CSS v4. Ícones via `lucide-react`.
- **Integração no Ecossistema:**
  - Adição de card em `app/page.tsx`.
  - Atualização do componente `components/ui/SeeAlso.tsx` para recomendação cruzada.

## 5. UI / UX Design
- **Layout de Duas Colunas (Desktop):**
  - **Esquerda (Configuração):** Componente de abas para alternar entre Números, Nomes e Equipes. Uso do `InputGroup` padrão do projeto.
  - **Direita (Palco/Resultado):** Área destacada com fundo escuro. Estados:
    - *Idle:* Mensagem instigando o início.
    - *Loading (Contagem):* Números grandes centralizados com animação Tailwind (`animate-ping`, `scale`).
    - *Success (Resultado):* Cards dos resultados, badge de metadados e botões de ação na base.

## 6. Estrutura de Estado (State Management)
Os principais estados abrangerão:
- `currentMode`: `'numbers' | 'names' | 'teams'`
- `isDrawing`: `boolean`
- `countdown`: `number` (5 a 0)
- `drawnResults`: `any[]`
- `drawMetadata`: `{ date: string, timezone: string, drawnCount: number, poolCount: number }`

## 7. Tratamento de Erros e Edge Cases
O botão "Sortear" exibirá erro na UI se:
- **Números:** "Sem repetição" ativo e a quantidade exigida for maior que o total de números possíveis.
- **Nomes:** Quantidade de nomes para sortear for maior que o total de nomes inseridos.
- **Equipes:** Quantidade de equipes solicitadas for superior à quantidade de participantes.
- **"Sortear Novamente (Sem Repetir)":** Bloqueado/Aviso se o *pool* restante for menor do que a quantidade necessária.

## 8. Critérios de Aceite
- Upload adiciona conteúdo sem substituir o existente.
- Contagem regressiva funciona visualmente.
- Metadados processados corretamente no fuso do cliente.
- A página se integra visualmente ao design system do app.