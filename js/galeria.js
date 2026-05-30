/* =====================================================================
   GALERIA.JS — Menu de sessões + grade de fotos + lightbox
   ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  iniciarGaleria();
});

let _fotosAtual = [];
let _idxAtual = 0;

async function iniciarGaleria() {
  const menu = document.getElementById("galeria-menu");
  const grade = document.getElementById("galeria-grade");
  const titulo = document.getElementById("galeria-titulo");
  if (!menu) return;

  menu.innerHTML = '<p class="vazio">Carregando sessões…</p>';
  let sessoes;
  try {
    sessoes = await Drive.getSessoes();
  } catch (e) {
    console.warn(e);
    menu.innerHTML = "<p class='vazio'>Não foi possível carregar a galeria. Verifique a configuração do Drive.</p>";
    return;
  }

  if (!sessoes.length) {
    menu.innerHTML = "<p class='vazio'>Nenhuma sessão encontrada ainda.</p>";
    return;
  }

  menu.innerHTML = sessoes.map((s, i) => `
    <button class="sessao-card" data-id="${s.id}" data-nome="${s.nome}" style="--i:${i}">
      <div class="sessao-img" style="background-image:url('${s.capa || ""}')">
        ${!s.capa ? '<span class="sessao-sem">👑</span>' : ""}
      </div>
      <div class="sessao-info">
        <strong>${s.nome}</strong>
        <span>${s.total ? s.total + " fotos" : "ver fotos"}</span>
      </div>
    </button>`).join("");

  menu.querySelectorAll(".sessao-card").forEach(card => {
    card.addEventListener("click", () => abrirSessao(card.dataset.id, card.dataset.nome));
  });

  // abre a primeira sessão automaticamente
  abrirSessao(sessoes[0].id, sessoes[0].nome);

  /* ---- abrir uma sessão ---- */
  async function abrirSessao(id, nome) {
    menu.querySelectorAll(".sessao-card").forEach(c =>
      c.classList.toggle("ativo", c.dataset.id === id));
    titulo.textContent = nome;
    grade.innerHTML = '<p class="vazio">Carregando fotos…</p>';
    try {
      const fotos = await Drive.getFotos(id);
      _fotosAtual = fotos;
      if (!fotos.length) { grade.innerHTML = "<p class='vazio'>Sem fotos nesta sessão ainda.</p>"; return; }
      grade.innerHTML = fotos.map((f, i) => `
        <button class="foto" data-idx="${i}" style="--i:${i}">
          <img src="${f.thumb}" alt="${f.nome}" loading="lazy">
        </button>`).join("");
      grade.querySelectorAll(".foto").forEach(b =>
        b.addEventListener("click", () => abrirLightbox(parseInt(b.dataset.idx, 10))));
    } catch (e) {
      console.warn(e);
      grade.innerHTML = "<p class='vazio'>Não foi possível carregar as fotos.</p>";
    }
  }
}

/* ---------- Lightbox ---------- */
function abrirLightbox(idx) {
  _idxAtual = idx;
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lb-img");
  img.src = _fotosAtual[idx].full;
  lb.classList.add("aberto");
  document.body.style.overflow = "hidden";
}
function fecharLightbox() {
  document.getElementById("lightbox").classList.remove("aberto");
  document.body.style.overflow = "";
}
function navLightbox(dir) {
  _idxAtual = (_idxAtual + dir + _fotosAtual.length) % _fotosAtual.length;
  document.getElementById("lb-img").src = _fotosAtual[_idxAtual].full;
}
document.addEventListener("keydown", (e) => {
  if (!document.getElementById("lightbox")?.classList.contains("aberto")) return;
  if (e.key === "Escape") fecharLightbox();
  if (e.key === "ArrowRight") navLightbox(1);
  if (e.key === "ArrowLeft") navLightbox(-1);
});
