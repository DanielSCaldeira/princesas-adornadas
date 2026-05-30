/* =====================================================================
   DRIVE.JS — Sessões e fotos da galeria (a partir do PA_API)
   ===================================================================== */

const Drive = (() => {
  async function getSessoes() {
    const d = await PA_API.load();
    return (d.sessoes || []).map(s => ({
      id: s.id, nome: s.nome, capa: s.capa, total: s.total
    }));
  }

  async function getFotos(sessaoId) {
    const d = await PA_API.load();
    const s = (d.sessoes || []).find(x => x.id === sessaoId);
    return s ? (s.fotos || []) : [];
  }

  return { getSessoes, getFotos };
})();

window.Drive = Drive;
