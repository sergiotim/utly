# Utly 🚀

> **Ferramentas essenciais para criadores digitais, simplificadas.**

O **Utly** é uma plataforma SaaS "All-in-One" que centraliza ferramentas de produtividade para desenvolvedores, designers e profissionais de marketing. 

Focamos em **UX Premium**, **Privacidade** e **Acesso Imediato** — sem barreiras de login ou paywalls para funcionalidades básicas.

![Status do Projeto](https://img.shields.io/badge/Status-MVP-violet) ![License](https://img.shields.io/badge/License-MIT-blue) ![Next.js](https://img.shields.io/badge/Next.js-16-black)

## ✨ Diferenciais

Diferente de sites de ferramentas cheios de anúncios invasivos e designs datados, o Utly oferece:

* **🚫 Sem Login Obrigatório:** Acesse e use. Sem formulários de cadastro para gerar um simples QR Code.
* **🔒 Privacidade em Primeiro Lugar:** O processamento de imagens (como a remoção de fundo) é feito **Client-side** via WebAssembly. Seus arquivos não são enviados para servidores desconhecidos.
* **🎨 Qualidade Sem Paywall:** Downloads em Alta Resolução (HD) e Vetor (SVG) liberados gratuitamente.
* **🌙 Dark Mode Nativo:** Interface moderna, alto contraste (Zinco & Violeta) pensada para uso prolongado.

## 🛠️ Ferramentas Disponíveis (MVP)

### 1. Magic Eraser (Removedor de Fundo)
Utiliza Inteligência Artificial rodando diretamente no navegador do usuário para remover fundos de imagens.
* **Tecnologia:** WebAssembly + ONNX Runtime (`@imgly/background-removal`).
* **Recursos:** Drag & drop, preview "Antes/Depois", download em PNG transparente HD.

### 2. QR Code Studio
Gerador de QR Codes estáticos com foco em branding.
* **Personalização:** Cores customizadas (Hex), upload de logo centralizada.
* **Formatos:** Exportação para web (PNG) e impressão (SVG).

### 3. Encurtador de Links (Vanity URLs)
Transforme URLs longas em links amigáveis e memoráveis.
* **Feature:** Customização do slug (ex: `utly.com/promocao`).
* **Privacidade:** Links anônimos com expiração automática em 7 dias (reciclagem de banco de dados).

## 💻 Tech Stack

O projeto utiliza as tecnologias mais recentes do ecossistema React:

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
* **Linguagem:** TypeScript
* **UI/Estilização:** [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), Lucide Icons
* **Banco de Dados:** Prisma ORM + Neon (Serverless Postgres)
* **Validação:** Zod
* **IA (Client-side):** @imgly/background-removal (WASM)

## 🚀 Como Rodar Localmente

Siga os passos abaixo para iniciar o ambiente de desenvolvimento:

### Pré-requisitos
* Node.js 20+
* NPM ou Yarn

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/utly.git](https://github.com/seu-usuario/utly.git)
    cd utly
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto e adicione a conexão com seu banco de dados (ex: Neon/Postgres):
    ```env
    DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
    ```

4.  **Configure o Banco de Dados (Prisma):**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Inicie o Servidor:**
    ```bash
    npm run dev
    ```

Acesse `http://localhost:3000` no seu navegador.

## 🗺️ Roadmap

Funcionalidades planejadas para as próximas versões (v2.0+):

- [ ] **Sistema de Contas:** Login opcional para salvar histórico permanente.
- [ ] **Analytics:** Gráficos de cliques e geolocalização para links encurtados.
- [ ] **QR Codes Dinâmicos:** Alterar o destino do link após a impressão.
- [ ] **Conversor de Arquivos:** Suporte para WebP, PDF e otimização de imagem.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir Issues ou enviar Pull Requests.

1.  Faça um Fork do projeto
2.  Crie sua Feature Branch (`git checkout -b feature/MinhaFeature`)
3.  Commit suas mudanças (`git commit -m 'Add: Minha nova feature'`)
4.  Push para a Branch (`git push origin feature/MinhaFeature`)
5.  Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com 💜 por Sérgio Timoteo