# Modern Threads: Vitrine de E-commerce com Next.js e Sanity

## ❯ Visão Geral

**Modern Threads** é um projeto de vitrine de e-commerce moderno e performático, construído com as tecnologias mais recentes do ecossistema JavaScript. A aplicação exibe produtos de um CMS headless (Sanity.io), permite a visualização detalhada de cada item e inclui um carrinho de compras interativo com gerenciamento de estado no lado do cliente.

O projeto utiliza o **App Router** do Next.js 15 para aproveitar ao máximo os Server Components para busca de dados e renderização otimizada, e os Client Components para interatividade, garantindo uma experiência de usuário rápida e fluida.

**[Link para o repositório](https://github.com/aloneinthecityy/e-commerce)**

---

## ✨ Principais Funcionalidades

*   **Listagem de Produtos:** Página inicial renderizada no servidor (SSR/SSG) para máxima performance e SEO.
*   **Páginas de Detalhes Dinâmicas:** Rotas dinâmicas para cada produto, com dados carregados sob demanda.
*   **Carrinho de Compras Interativo:** Adicione, veja e remova itens em um painel lateral (`Sheet`) sem recarregar a página.
*   **Gerenciamento de Conteúdo Headless:** Os produtos (nomes, imagens, preços, descrições) são gerenciados externamente através do [Sanity.io](http://sanity.io/).
*   **Design Responsivo:** Interface estilizada com Tailwind CSS, adaptável a qualquer tamanho de tela.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando um stack moderno e robusto:

*   **Framework:** [**Next.js 15**](https://nextjs.org/) (com App Router)
*   **Linguagem:** [**TypeScript**](https://www.typescriptlang.org/)
*   **CMS Headless:** [**Sanity.io**](https://www.sanity.io/) para gerenciamento de conteúdo.
*   **Estilização:** [**Tailwind CSS**](https://tailwindcss.com/)
*   **Componentes de UI:** [**shadcn/ui**](https://ui.shadcn.com/) - Uma coleção de componentes reutilizáveis e acessíveis.
*   **Gerenciamento de Estado (Cliente):** [**Zustand**](https://zustand-demo.pmnd.rs/) para o estado do carrinho de compras.
*   **Ícones:** [**Lucide React**](https://lucide.dev/)
*   **Deployment:** Preparado para Vercel ou plataformas similares.

---

## 🚀 Como Rodar o Projeto Localmente

Para executar este projeto em sua máquina, siga os passos abaixo.

### Pré-requisitos

*   [Node.js](https://nodejs.org/en/) (versão 18.x ou superior)
*   [pnpm](https://pnpm.io/) (ou `npm`/`yarn`) como gerenciador de pacotes
*   Uma conta no [Sanity.io](https://www.sanity.io/) para configurar o CMS.

### 1. Clone o Repositório

```bash
git clone https://github.com/aloneinthecityy/e-commerce.git
cd e-commerce
```

### 2. Instale as Dependências

Este projeto usa `pnpm`. Você pode usar `npm` ou `yarn` se preferir.

```bash
pnpm install
```

### 3. Configure as Variáveis de Ambiente

Você precisará conectar o projeto ao seu próprio "banco de dados" de produtos no Sanity.

1.  Crie um projeto no [Sanity.io](http://sanity.io/).
2.  No seu projeto Sanity, defina os *schemas* para os produtos (geralmente `name`, `slug`, `images`, `price`, `description`).
3.  Obtenha o `Project ID` e o `Dataset` do seu projeto Sanity.
4.  Crie um arquivo `.env.local` na raiz do projeto e adicione suas credenciais:

```.env.local
NEXT_PUBLIC_SANITY_PROJECT_ID="SEU_PROJECT_ID"
NEXT_PUBLIC_SANITY_DATASET="SEU_DATASET"
```

### 4. Inicie o Servidor de Desenvolvimento

```bash
pnpm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação em funcionamento.

---

## 📁 Estrutura do Projeto

A estrutura de pastas segue as convenções do Next.js App Router, separando claramente as responsabilidades:

```
e-commerce/
├── public/               # Arquivos estáticos (imagens, favicons)
└── src/
    ├── app/              # Rotas da aplicação (App Router)
    │   ├── layout.tsx    # Layout principal da aplicação
    │   ├── page.tsx      # Página inicial (/)
    │   └── product/
    │       └── [slug]/
    │           └── page.tsx # Página de detalhes do produto
    ├── components/       # Componentes React reutilizáveis
    │   ├── ui/           # Componentes gerados pelo shadcn/ui
    │   ├── AddToCartButton.tsx # Componente de cliente para interatividade
    │   ├── CartDrawer.tsx      # Painel do carrinho (Client Component)
    │   ├── Header.tsx          # Cabeçalho da página
    │   └── ProductDetails.tsx  # Componente de servidor para exibir detalhes
    ├── lib/                # Funções de utilidade e clientes
    │   └── sanity.ts     # Configuração do cliente Sanity
    └── store/              # Gerenciamento de estado global
        └── cartStore.ts    # Store do Zustand para o carrinho
```

---

Projeto criado por **[aloneinthecityy](https://github.com/aloneinthecityy)**.
