/* =====================================================================
   API.JS — Carrega TODOS os dados do site de uma vez (1 chamada)
   ---------------------------------------------------------------------
   Origem dos dados:
     • Se CONFIG.google.webAppUrl estiver preenchido → busca no seu
       Apps Script Web App (fotos do Drive + planilha), SEM Chave de API.
     • Se estiver vazio → usa dados de DEMONSTRAÇÃO.
   O resultado fica em cache para o site não recarregar a cada clique.
   ===================================================================== */

const PA_API = (() => {
  let _promise = null;

  function load() {
    if (_promise) return _promise;
    const url = (CONFIG.google && CONFIG.google.webAppUrl || "").trim();
    if (!url) { _promise = Promise.resolve(demo()); return _promise; }

    const full = url + (url.includes("?") ? "&" : "?") + "action=all";
    _promise = fetch(full)
      .then(r => { if (!r.ok) throw new Error("WebApp HTTP " + r.status); return r.json(); })
      .then(d => {
        if (!d || d.ok === false) throw new Error(d && d.erro || "Resposta inválida do servidor");
        // injeta a URL do formulário, se o config local não tiver uma
        if (d.formUrl && !CONFIG.inscricao.googleFormUrl) CONFIG.inscricao.googleFormUrl = d.formUrl;
        return {
          sessoes: d.sessoes || [],
          carrossel: d.carrossel || [],
          programacao: d.programacao || [],
          depoimentos: d.depoimentos || [],
        };
      })
      .catch(err => {
        console.warn("Falha ao carregar do Web App, usando demonstração:", err);
        return demo();
      });
    return _promise;
  }

  // Extrai só o ID se vier uma URL completa do Drive (ex.: .../folders/ID?... )
  function _extrairId(v) {
    const s = String(v || "").trim();
    const m = s.match(/[-\w]{25,}/);
    return m ? m[0] : s;
  }

  // Fotos de UMA pasta específica do Drive (carrossel personalizado).
  const _pastaCache = {};
  function fotosDaPasta(pastaId) {
    pastaId = _extrairId(pastaId);
    if (!pastaId) return load().then(d => d.carrossel || []);
    if (_pastaCache[pastaId]) return _pastaCache[pastaId];
    const url = (CONFIG.google && CONFIG.google.webAppUrl || "").trim();
    if (!url) { _pastaCache[pastaId] = Promise.resolve(demo().carrossel); return _pastaCache[pastaId]; }
    const full = url + (url.includes("?") ? "&" : "?") + "action=pasta&id=" + encodeURIComponent(pastaId);
    _pastaCache[pastaId] = fetch(full)
      .then(r => { if (!r.ok) throw new Error("WebApp HTTP " + r.status); return r.json(); })
      .then(d => { if (!d || d.ok === false) throw new Error(d && d.erro || "erro"); return d.fotos || []; })
      .catch(err => { console.warn("Falha no carrossel, usando demo:", err); return demo().carrossel; });
    return _pastaCache[pastaId];
  }

  /* ---------------- Dados de demonstração ---------------- */
  function demo() {
    const u = (id, w) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80`;
    const ids = ["1511795409834-ef04bbd61622","1530103862676-de8c9debad1d",
      "1464366400600-7168b8af9bc3","1519741497674-611481863552",
      "1492684223066-81342ee5ff30","1523438885200-e635ba2c371e",
      "1469371670807-013ccf25f16a","1438232992991-995b7058bbb5"];
    const fotos = ids.map((id, i) => ({ nome: "Foto " + (i + 1), thumb: u(id, 600), full: u(id, 1600) }));
    const sessoes = [
      { id: "demo1", nome: "2024 • 1º Encontro", capa: u(ids[0], 800), total: 8, fotos },
      { id: "demo2", nome: "2025 • Adornadas pela Graça", capa: u(ids[1], 800), total: 8, fotos },
      { id: "demo3", nome: "Bastidores & Louvor", capa: u(ids[2], 800), total: 8, fotos },
    ];
    const carrossel = ids.slice(0, 5).map((id, i) => ({ nome: "Destaque " + (i + 1), thumb: u(id, 1200), full: u(id, 1600) }));
    const programacao = [
      { horario: "08:30", atividade: "Recepção & Credenciamento", descricao: "Café de boas-vindas e entrega dos kits.", sessao: "Manhã" },
      { horario: "09:30", atividade: "Abertura & Louvor", descricao: "Momento de adoração para preparar o coração.", sessao: "Manhã" },
      { horario: "10:30", atividade: "Palestra: Adornadas pela Graça", descricao: "Mensagem principal sobre identidade em Cristo.", sessao: "Manhã" },
      { horario: "12:30", atividade: "Almoço & Comunhão", descricao: "Refeição e tempo de confraternização.", sessao: "Tarde" },
      { horario: "14:00", atividade: "Oficinas & Dinâmicas", descricao: "Atividades práticas em grupos.", sessao: "Tarde" },
      { horario: "16:00", atividade: "Ministração & Oração", descricao: "Intercessão e encerramento.", sessao: "Tarde" },
    ];
    const depoimentos = [
      { nome: "Ana Beatriz", texto: "Saí transformada. Foi um dia de cura e renovo para a minha alma.", cidade: "Brasília/DF" },
      { nome: "Mariana Costa", texto: "Senti o amor de Deus de uma forma que não tenho palavras. Voltarei com certeza!", cidade: "Goiânia/GO" },
      { nome: "Patrícia Lima", texto: "Cada detalhe feito com tanto cuidado. Me senti uma princesa adornada.", cidade: "Anápolis/GO" },
      { nome: "Juliana Ferreira", texto: "Cheguei cansada e voltei renovada. Um encontro que marca a alma e fortalece a fé.", cidade: "São Paulo/SP" },
      { nome: "Camila Rodrigues", texto: "Foi um divisor de águas na minha caminhada com Cristo. Recomendo a toda mulher!", cidade: "São Paulo/SP" },
      { nome: "Letícia Almeida", texto: "Saí dali certa do amor do Pai por mim. Cada palavra foi um abraço de Deus.", cidade: "Belo Horizonte/MG" },
      { nome: "Renata Oliveira", texto: "Comunhão linda, louvor poderoso e uma palavra que tocou o mais profundo de mim.", cidade: "Uberlândia/MG" },
      { nome: "Fernanda Souza", texto: "Encontrei irmãs que levarei para a vida. Foi muito mais do que eu esperava.", cidade: "Caldas Novas/GO" },
      { nome: "Bianca Martins", texto: "A presença de Deus foi tão real! Voltei para casa transbordando gratidão.", cidade: "Caldas Novas/GO" },
      { nome: "Tatiane Ribeiro", texto: "Cada momento foi preparado com tanto amor. Me senti verdadeiramente filha do Rei.", cidade: "Caldas Novas/GO" },
      { nome: "Vanessa Carvalho", texto: "Voltei diferente para a minha família. Deus me restaurou ali, no meio das minhas irmãs.", cidade: "Campinas/SP" },
      { nome: "Daniela Santos", texto: "Que dia abençoado! O louvor, a palavra, a comunhão — tudo me ministrou profundamente.", cidade: "Contagem/MG" },
    ];
    return { sessoes, carrossel, programacao, depoimentos };
  }

  return { load, fotosDaPasta };
})();

window.PA_API = PA_API;
