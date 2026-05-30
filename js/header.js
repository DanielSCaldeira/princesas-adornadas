/* =====================================================================
   HEADER.JS — Componente único do cabeçalho (topbar + nav)
   Renderiza o mesmo header em todas as páginas. Para usar, inclua na
   página um placeholder e este script ANTES de main.js:

     <div id="header-mount" data-pagina="index"></div>
     <script defer src="js/header.js"></script>

   data-pagina aceita: "index" | "inscricao" | "galeria"
   ===================================================================== */

(function injetarHeader() {
  const mount = document.getElementById("header-mount");
  if (!mount) return;

  const pagina = mount.dataset.pagina || "index";
  const naHome = pagina === "index";
  const prefixo = naHome ? "" : "index.html";
  const current = (p) => pagina === p ? ' aria-current="page"' : '';
  const logoHref = naHome ? "#topo" : "index.html";
  const topbarClasse = naHome ? "" : ' class="compacto"';

  const html = `
  <header id="topbar"${topbarClasse}>
    <a href="${logoHref}" class="logo"><span class="coroa">♛</span> <span data-nome-evento>Princesas Adornadas</span></a>
    <nav>
      <button id="menuBtn" aria-label="Abrir menu" aria-expanded="false">☰</button>
      <div class="nav-links" id="navLinks">
        <a href="${prefixo}#sobre">Sobre</a>
        <a href="${prefixo}#programacao">Programação</a>
        <a href="galeria.html"${current("galeria")}>Galeria</a>
        <a href="${prefixo}#depoimentos">Depoimentos</a>
        <a href="${prefixo}#contato">Contato</a>
        <a href="inscricao.html" class="btn-topo" data-inscricao-link${current("inscricao")}>Inscreva-se</a>
      </div>
    </nav>
  </header>`;

  mount.outerHTML = html;
})();
