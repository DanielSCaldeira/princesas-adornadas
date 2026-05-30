/* =====================================================================
   CARROSSEL.JS — Carrossel de fotos de destaque (pasta do Drive)
   Acessível: setas grandes, indicadores, toque/arraste, teclado,
   pausa ao passar o mouse/foco e respeito a "reduzir movimento".
   ===================================================================== */

document.addEventListener("DOMContentLoaded", iniciarCarrossel);

async function iniciarCarrossel() {
  const root = document.getElementById("carrossel");
  if (!root) return;

  const cfg = CONFIG.carrossel || {};
  let fotos = [];
  try {
    fotos = await PA_API.fotosDaPasta(cfg.pastaId || "");
  } catch (e) { console.warn(e); }

  // Sem fotos → esconde a seção inteira (não deixa espaço vazio)
  if (!fotos || !fotos.length) {
    const sec = root.closest("section");
    if (sec) sec.style.display = "none";
    return;
  }

  // Monta a estrutura
  root.innerHTML = `
    <div class="car-trilho" id="carTrilho" aria-live="polite">
      ${fotos.map((f, i) => `
        <div class="car-slide${i === 0 ? " ativo" : ""}" role="group" aria-roledescription="slide" aria-label="${i + 1} de ${fotos.length}">
          <img src="${f.full || f.thumb}" alt="${f.nome || "Foto do evento"}" loading="${i === 0 ? "eager" : "lazy"}">
        </div>`).join("")}
    </div>
    <button class="car-btn car-prev" aria-label="Foto anterior" type="button">‹</button>
    <button class="car-btn car-next" aria-label="Próxima foto" type="button">›</button>
    <div class="car-dots" role="tablist" aria-label="Selecionar foto">
      ${fotos.map((_, i) => `<button class="car-dot${i === 0 ? " ativo" : ""}" type="button" aria-label="Ir para a foto ${i + 1}"></button>`).join("")}
    </div>`;

  const slides = [...root.querySelectorAll(".car-slide")];
  const dots = [...root.querySelectorAll(".car-dot")];
  let atual = 0;
  let timer = null;

  const reduzirMov = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const intervalo = Math.max(3, (cfg.intervaloSegundos || 5)) * 1000;
  const autoPlay = cfg.autoPlay !== false && !reduzirMov && fotos.length > 1;

  function mostrar(n) {
    atual = (n + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("ativo", i === atual));
    dots.forEach((d, i) => {
      d.classList.toggle("ativo", i === atual);
      d.setAttribute("aria-selected", i === atual ? "true" : "false");
    });
  }
  const proximo = () => mostrar(atual + 1);
  const anterior = () => mostrar(atual - 1);

  function reiniciar() {
    if (!autoPlay) return;
    clearInterval(timer);
    timer = setInterval(proximo, intervalo);
  }

  root.querySelector(".car-next").addEventListener("click", () => { proximo(); reiniciar(); });
  root.querySelector(".car-prev").addEventListener("click", () => { anterior(); reiniciar(); });
  dots.forEach((d, i) => d.addEventListener("click", () => { mostrar(i); reiniciar(); }));

  // Pausa ao interagir (bom para quem lê com calma)
  ["mouseenter", "focusin", "touchstart"].forEach(ev => root.addEventListener(ev, () => clearInterval(timer)));
  ["mouseleave", "focusout", "touchend"].forEach(ev => root.addEventListener(ev, reiniciar));

  // Teclado (setas) quando o carrossel está focado
  root.setAttribute("tabindex", "0");
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { proximo(); reiniciar(); }
    if (e.key === "ArrowLeft") { anterior(); reiniciar(); }
  });

  // Arrastar / deslizar (toque e mouse)
  let x0 = null;
  const trilho = root.querySelector(".car-trilho");
  const start = (x) => x0 = x;
  const end = (x) => {
    if (x0 === null) return;
    const dx = x - x0;
    if (Math.abs(dx) > 40) { dx < 0 ? proximo() : anterior(); reiniciar(); }
    x0 = null;
  };
  trilho.addEventListener("touchstart", e => start(e.touches[0].clientX), { passive: true });
  trilho.addEventListener("touchend", e => end(e.changedTouches[0].clientX));
  trilho.addEventListener("mousedown", e => start(e.clientX));
  trilho.addEventListener("mouseup", e => end(e.clientX));

  reiniciar();
}
