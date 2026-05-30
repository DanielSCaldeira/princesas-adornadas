# 👑 Princesas Adornadas — Site do Evento

Site para o encontro de mulheres cristãs **Princesas Adornadas**, gerenciável
inteiramente pelo **Google Drive + Google Sheets** (sem mexer no código).

## Como começar
👉 Leia o **[SETUP.md](SETUP.md)** — passo a passo completo.

Atalho: abra `index.html` no navegador para ver o site funcionando com conteúdo
de demonstração. Depois edite **`js/config.js`** para colocar seu conteúdo.

## Estrutura
```
index.html          Home (hero, versículo, countdown, sobre, programação,
                    depoimentos, inscrição, ofertas/PIX, contato)
galeria.html        Galeria por sessão (lê pastas do Google Drive)
inscricao.html      Página de inscrição (Google Forms incorporado)
robots.txt          Permissões para os robôs de busca
sitemap.xml         Mapa do site para o Google
css/styles.css      Identidade visual (vinho + dourado + marfim)
js/config.js        ⚙️ ÚNICO arquivo a editar (cole aqui a URL do Web App)
js/seo.js           Injeta canonical, Open Graph, Twitter Card e JSON-LD
js/api.js           Carrega tudo do backend (1 chamada) + demonstração
js/drive.js         Sessões/fotos da galeria
js/sheets.js        Programação/depoimentos
js/main.js          Home: countdown, contato, PIX, render das tabelas
js/galeria.js       Menu de sessões + grade + lightbox
apps-script/
  princesas-backend.gs   Script único: cria pastas/planilha/formulário
                         E serve os dados ao site (sem Chave de API)
```

## SEO (aparecer no Google)
Veja a seção **1.1) SEO** em [SETUP.md](SETUP.md). Em resumo: ajuste a URL
em `js/config.js`, `robots.txt` e `sitemap.xml`, adicione uma imagem
`img/og-cover.jpg` (1200×630) e cadastre o site no Google Search Console.

## Conexão com o Google (sem Chave de API)
O site lê os dados de um **Apps Script Web App** publicado na conta da
organizadora. Veja o passo a passo em **[SETUP.md](SETUP.md)** (seção 2).

## Recursos
- ✅ Galeria automática por edição (pastas do Drive)
- ✅ Inscrição (Google Forms incorporado)
- ✅ Programação + contagem regressiva
- ✅ Depoimentos + versículo/tema
- ✅ WhatsApp (botão flutuante) + ofertas via PIX
- ✅ 100% responsivo, sem servidor, hospedagem gratuita
