# 👑 Princesas Adornadas — Guia de Configuração

Este site é **gerenciado pelo seu Google Drive + Google Sheets**, mas você
**não precisa de Chave de API nem de Google Cloud**. Tudo funciona com **um único
script** que você cola na sua conta e publica.

O site **já funciona** ao abrir o `index.html` (com conteúdo de exemplo). Siga
abaixo para colocar o **seu** conteúdo real.

---

## 🚀 Caminho rápido (resumo)

1. Editar `js/config.js` (nome, data, WhatsApp, PIX…).
2. Rodar e publicar **1 script** → ele cria pastas, planilha e formulário.
3. Colar **1 URL** no `config.js`.
4. Publicar o site (grátis).

---

## 1) Configuração básica — `js/config.js`

Abra `js/config.js` no Bloco de Notas e preencha:

- **seo** → URL final do site, imagem de compartilhamento, palavras-chave
  (essencial para o Google e para o preview no WhatsApp/Facebook)
- **evento** → nome, versículo/tema, link do Instagram
- **proximoEvento** → data do próximo encontro (alimenta a contagem regressiva)
- **contato** → WhatsApp (formato `5561999998888`), e-mail, **chave PIX**

Salve e abra o `index.html` para ver as mudanças. ✅

### 1.1) SEO — Aparecer no Google

Para ranquear bem no Google, faça **depois** de publicar o site:

1. **Substitua a URL placeholder** em três lugares:
   - `js/config.js` → campo `seo.siteUrl`
   - `robots.txt` → linha `Sitemap:`
   - `sitemap.xml` → as três tags `<loc>…</loc>`
2. **Adicione a imagem de compartilhamento**: salve uma imagem 1200×630px
   em `img/og-cover.jpg` (ou ajuste o caminho em `seo.imagemCompartilhamento`).
   Essa imagem é o que aparece no preview do WhatsApp/Facebook.
3. **Cadastre o site no Google Search Console**
   ([search.google.com/search-console](https://search.google.com/search-console)).
   Cole o código de verificação em `seo.googleSiteVerification` no `config.js`.
4. **Envie o sitemap** dentro do Search Console: `sitemap.xml`.

---

## 2) Criar e publicar o backend (o script que faz tudo) 🛠️

Este é o coração da automação. Leva ~3 minutos.

### 2.1 Criar a estrutura
1. Acesse **[script.google.com](https://script.google.com)** → **Novo projeto**.
2. Apague o que estiver lá e **cole todo** o conteúdo de
   `apps-script/princesas-backend.gs`. Salve (Ctrl+S).
3. No topo, selecione a função **`configurarTudo`** e clique em **▶ Executar**.
4. Na primeira vez o Google pede autorização:
   **Revisar permissões → sua conta → Avançado → "Acessar projeto (não seguro)" → Permitir.**
   > É seguro: é o *seu* script, rodando na *sua* conta, sobre os *seus* arquivos.
5. Veja os **Logs** (Ctrl+Enter). Vai aparecer o link da pasta criada
   **"Princesas Adornadas - Site"** no seu Drive (com a Galeria, a planilha e o formulário).

### 2.2 Publicar como "App da Web" (o servidor)
1. Botão **Implantar** → **Nova implantação**.
2. Clique na engrenagem ⚙ e escolha **App da Web**.
3. Configure:
   - **Executar como:** *Eu* (sua conta)
   - **Quem pode acessar:** **Qualquer pessoa**
4. **Implantar** → autorize se pedir → **copie a "URL do app da Web"**
   (algo como `https://script.google.com/macros/s/AKfyc.../exec`).

### 2.3 Conectar ao site
Cole essa URL em `js/config.js` → `google.webAppUrl`. **Pronto!** 🎉
O site agora puxa fotos, programação e depoimentos sozinho.

---

## 3) Subir as fotos 📸

No seu Drive, abra **"Princesas Adornadas - Site" → "Galeria"**. Lá já existem
subpastas de exemplo. Para cada edição/sessão:

- Renomeie ou crie subpastas (ex.: `2025 - Adornadas pela Graça`).
- Jogue as fotos dentro. **Cada subpasta vira um item no menu da galeria.**

> A ordem segue o nome. Use prefixos `01 -`, `02 -` para ordenar.
> Não precisa fazer mais nada: o site lê automaticamente.

### 3.1 Carrossel do topo (fotos de destaque) 🎠
Na pasta **"Princesas Adornadas - Site"** existe a pasta **"Carrossel (fotos do
topo do site)"**. Tudo que você jogar lá aparece no carrossel da página inicial.
> Quer usar OUTRA pasta? Copie o ID dela e cole em
> `js/config.js → carrossel.pastaId`.

> ⚠️ **IMPORTANTE — republicar o script:** o recurso do carrossel foi adicionado
> ao backend. Como você já tinha publicado o App da Web, abra o projeto em
> [script.google.com](https://script.google.com), cole a versão atualizada de
> `apps-script/princesas-backend.gs`, e vá em **Implantar → Gerenciar
> implantações → ✏️ (editar) → Versão: Nova versão → Implantar**. A URL continua
> a mesma. Sem isso, o carrossel usa fotos de demonstração.

---

## 4) Editar Programação e Depoimentos 📋

Abra a planilha **"Princesas Adornadas — Conteúdo do Site"** (criada na pasta).

- Aba **Programacao**: `Horario | Atividade | Descricao | Sessao`
- Aba **Depoimentos**: `Nome | Texto | Cidade`

Edite à vontade — o site reflete as mudanças. (Não renomeie as abas.)

---

## 5) Inscrições 📝

O script já criou o **Formulário de Inscrição** dentro da pasta, e o site já o
usa automaticamente. Para personalizar perguntas, abra o formulário e edite.
As respostas ficam numa planilha de respostas do próprio formulário.

> Quer usar outro formulário? Cole a URL dele em `config.js → inscricao.googleFormUrl`.

---

## 6) Publicar o site (grátis) 🌐

- **Netlify (mais fácil):** [app.netlify.com/drop](https://app.netlify.com/drop) →
  **arraste a pasta inteira** do site. No ar na hora.
- **Vercel** ou **GitHub Pages** também funcionam.

Depois é só divulgar o link no Instagram! 💛

---

## ❓ Dúvidas comuns

- **Fotos não aparecem?** Confira se a pasta **Galeria** está compartilhada como
  "qualquer pessoa com o link" (o script já faz isso) e se você publicou o App da
  Web como **"Qualquer pessoa"**.
- **Mudei a planilha e o site não atualizou?** Aguarde alguns segundos e recarregue
  (Ctrl+F5). Os nomes das abas devem ser `Programacao` e `Depoimentos`.
- **Atualizei o script depois de publicar?** Em **Implantar → Gerenciar
  implantações**, edite a implantação e salve **nova versão** (a URL continua a mesma).
- **Esconder a seção de PIX?** Deixe `contato.pixChave` vazio em `config.js`.
- **Sem a URL do Web App**, o site mostra conteúdo de **demonstração** — ótimo para testar.

Que Deus abençoe o evento! 🌷👑
