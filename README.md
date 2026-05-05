# Hawks Assessoria Digital — Landing Page

Landing page de alta conversão para a Hawks Assessoria Digital.

## Tecnologias

- **React 18** + **Vite**
- **Lucide React** (ícones)
- CSS-in-JS (inline styles)

## Como rodar localmente

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev

# 3. Abrir no navegador
http://localhost:5173
```

## Como fazer o deploy

### GitHub + Vercel (recomendado)

1. **Suba para o GitHub:**
   ```bash
   git init
   git add .
   git commit -m "feat: hawks landing page"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/hawks-landing.git
   git push -u origin main
   ```

2. **Deploy na Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em **Add New Project**
   - Importe o repositório do GitHub
   - Configurações (já detectadas automaticamente):
     - **Framework:** Vite
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - Clique em **Deploy**
   - Pronto! ✅

### Build manual

```bash
npm run build
# Pasta /dist gerada — suba ela em qualquer hosting estático
```

## Estrutura do projeto

```
hawks-landing/
├── public/
│   └── logo-icon.png       # Favicon
├── src/
│   ├── assets/
│   │   └── logo.png        # Logo Hawks (fundo transparente)
│   ├── App.jsx             # Componente principal (toda a landing)
│   └── main.jsx            # Entry point React
├── index.html              # HTML base
├── package.json
├── vite.config.js
├── vercel.json             # Config de rotas para SPA
└── .gitignore
```
