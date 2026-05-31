/* =====================================================================
   HEADER.JS — Componente único do cabeçalho (topbar + nav)
   Renderiza o mesmo header em todas as páginas. Para usar, inclua na
   página um placeholder e este script ANTES de main.js:

     <div id="header-mount" data-pagina="index"></div>
     <script defer src="js/header.js"></script>

   data-pagina aceita: "index" | "inscricao" | "galeria"
   Itens do menu e textos vêm do CONFIG.navegacao.
   ===================================================================== */

(function injetarHeader() {
  const mount = document.getElementById("header-mount");
  if (!mount) return;

  const cfg = (window.CONFIG && CONFIG.navegacao) || {};
  const ev  = (window.CONFIG && CONFIG.evento) || {};
  const pagina = mount.dataset.pagina || "index";
  const naHome = pagina === "index";
  const logoHref = naHome ? "#topo" : "index.html";
  const topbarClasse = naHome ? "" : ' class="compacto"';

  // Resolve um alvo (#ancora ou pagina.html) considerando a página atual.
  // Em páginas internas, âncoras viram link absoluto para a home.
  function resolverAlvo(alvo) {
    if (!alvo) return "#";
    if (alvo.startsWith("#")) return naHome ? alvo : "index.html" + alvo;
    return alvo;
  }

  // Decide se o item corresponde à página corrente (para aria-current).
  function ehAtual(alvo) {
    if (!alvo) return false;
    if (alvo === "galeria.html"  && pagina === "galeria")   return true;
    if (alvo === "inscricao.html" && pagina === "inscricao") return true;
    return false;
  }

  const itens = Array.isArray(cfg.itens) && cfg.itens.length ? cfg.itens : [
    { texto: "Sobre",       alvo: "#sobre"        },
    { texto: "Programação", alvo: "#programacao"  },
    { texto: "Galeria",     alvo: "galeria.html"  },
    { texto: "Depoimentos", alvo: "#depoimentos"  },
    { texto: "Contato",     alvo: "#contato"      },
  ];
  const labelInscricao = cfg.botaoInscricao || "Inscreva-se";

  const linksHtml = itens.map(it => {
    const href = resolverAlvo(it.alvo);
    const atual = ehAtual(it.alvo) ? ' aria-current="page"' : "";
    return `<a href="${href}"${atual}>${it.texto || ""}</a>`;
  }).join("");

  const inscAtual = pagina === "inscricao" ? ' aria-current="page"' : "";
  const nomeEvento = ev.nome || "Princesas Adornadas";

  const html = `
  <header id="topbar"${topbarClasse}>
    <a href="${logoHref}" class="logo"><span class="coroa">♛</span> <span data-nome-evento>${nomeEvento}</span></a>
    <nav>
      <button id="menuBtn" aria-label="Abrir menu" aria-expanded="false">☰</button>
      <div class="nav-links" id="navLinks">
        ${linksHtml}
        <a href="inscricao.html" class="btn-topo" data-inscricao-link${inscAtual}>${labelInscricao}</a>
      </div>
    </nav>
  </header>`;

  mount.outerHTML = html;
})();
