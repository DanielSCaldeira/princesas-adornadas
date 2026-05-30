/* =====================================================================
   SHEETS.JS — Programação e Depoimentos (a partir do PA_API)
   ===================================================================== */

const Sheets = (() => {
  async function getProgramacao() {
    const d = await PA_API.load();
    return d.programacao || [];
  }
  async function getDepoimentos() {
    const locais = (window.CONFIG && Array.isArray(CONFIG.depoimentos)) ? CONFIG.depoimentos : [];
    if (locais.length) return locais;
    const d = await PA_API.load();
    return d.depoimentos || [];
  }
  return { getProgramacao, getDepoimentos };
})();

window.Sheets = Sheets;
