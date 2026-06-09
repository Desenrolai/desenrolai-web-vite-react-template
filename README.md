# desenrolai-web-vite-react-template

Template GitHub para aplicações web Desenrolai com **Vite + React + TypeScript**.

## Uso

```bash
npm install
npm run dev       # dev server
npm run build     # produção (output em dist/)
npm run preview   # preview do build
```

## Docker

```bash
docker build -t desenrolai-web-vite-react-template .
docker run -p 80:80 desenrolai-web-vite-react-template
```

Servido pelo nginx na porta 80 com SPA fallback (`/index.html`).

## forge.yaml

Configuração para o Desenrolai Forge (`kind: web`, `tech: vite-react`, porta 80).
