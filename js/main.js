/* =====================================================================
   MAIN.JS — Liga o conteúdo às páginas (home e componentes comuns)
   ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  preencherTextosFixos();
  montarIdealizadora();
  iniciarContagem();
  montarProvaSocial();
  montarVagas();
  montarGatilhos();
  montarFaq();
  montarConfianca();
  montarStickyCta();
  montarIgreja();
  montarBotoesContato();
  montarEquipe();
  montarIngresso();
  montarPagamento();
  montarPix();
  montarInscricao();
  carregarProgramacao();
  carregarDepoimentos();
  montarMenuMobile();
  animarAoRolar();
  document.getElementById("ano") && (document.getElementById("ano").textContent = new Date().getFullYear());
});

/* ---------- Textos vindos do config ---------- */
function preencherTextosFixos() {
  const c = CONFIG.evento;
  setText("[data-nome-evento]", c.nome);
  setText("[data-subtitulo]", c.subtitulo);
  setText("[data-tema]", c.tema);
  setText("[data-versiculo]", c.versiculo);
  setText("[data-versiculo-ref]", c.versiculoRef);
  document.querySelectorAll("[data-instagram]").forEach(a => a.href = c.instagram);
  setText("[data-instagram-user]", "@" + c.instagramUser);
  document.querySelectorAll("[data-facebook]").forEach(a => {
    if (c.facebook) a.href = c.facebook; else a.remove();
  });

  const p = CONFIG.proximoEvento;
  setText("[data-evento-titulo]", p.titulo);
  setText("[data-evento-local]", [p.local, p.cidade].filter(Boolean).join(" — "));
  setText("[data-evento-data]", formatarData(p.data));

  // Local (preenche em todas as páginas)
  const loc = CONFIG.local || {};
  setText("[data-local-nome]", loc.nome);
  setText("[data-local-endereco]", loc.endereco);
}

function setText(sel, txt) {
  document.querySelectorAll(sel).forEach(el => { if (txt) el.textContent = txt; });
}

function formatarData(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  } catch { return ""; }
}

/* ---------- Ícones (logos) reutilizáveis ---------- */
const WA_SVG = '<svg class="wa-svg" viewBox="0 0 448 512" aria-hidden="true"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>';
const IG_SVG = '<svg class="ig-svg" viewBox="0 0 448 512" aria-hidden="true"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>';

/* ---------- Equipe / Organização ---------- */
function montarEquipe() {
  const box = document.getElementById("equipe-cards");
  if (!box) return;
  const equipe = CONFIG.equipe || [];
  if (!equipe.length) { box.remove(); return; }
  const msg = encodeURIComponent(CONFIG.contato.mensagemWhatsapp || "");
  box.innerHTML = equipe.map(p => {
    const wa = p.whatsapp ? `https://wa.me/${p.whatsapp}?text=${msg}` : "";
    return `<div class="contato-card pessoa-card">
      <div class="pessoa-avatar">${(p.nome || "?").trim().charAt(0)}</div>
      <strong>${p.nome || ""}</strong>
      <span class="pessoa-papel">${p.papel || ""}</span>
      <div class="pessoa-acoes">
        ${wa ? `<a class="btn btn-whats" href="${wa}" target="_blank" rel="noopener">${WA_SVG} WhatsApp</a>` : ""}
        ${p.instagram ? `<a class="ig-link" href="${p.instagram}" target="_blank" rel="noopener">${IG_SVG} @${p.instagramUser || "instagram"}</a>` : ""}
      </div>
    </div>`;
  }).join("");
}

/* ---------- Idealizadora ---------- */
function montarIdealizadora() {
  const sec = document.getElementById("idealizadora");
  const id = CONFIG.idealizadora;
  if (!sec) return;
  if (!id || !id.nome) { sec.remove(); return; }
  setText("[data-ideal-nome]", id.nome);
  setText("[data-ideal-papel]", id.papel);
  setText("[data-ideal-bio]", id.bio);
  const insta = document.getElementById("idealInsta");
  if (insta) insta.href = id.instagram || "#";
  setText("[data-ideal-user]", id.instagramUser ? "@" + id.instagramUser : "Instagram");
  const foto = document.getElementById("idealFoto");
  if (foto) {
    if (id.foto) foto.style.backgroundImage = `url('${id.foto}')`;
    else foto.innerHTML = `<span class="ideal-inicial">${id.nome.trim().charAt(0)}</span>`;
  }
}

/* ---------- Contagem regressiva ---------- */
function iniciarContagem() {
  const alvo = new Date(CONFIG.proximoEvento.data).getTime();
  const box = document.getElementById("countdown");
  if (!box || isNaN(alvo)) return;

  const urg = document.querySelector("[data-urgencia]");
  const tick = () => {
    const agora = Date.now();
    let dif = Math.max(0, alvo - agora);
    const dias = Math.floor(dif / 864e5); dif -= dias * 864e5;
    const hrs = Math.floor(dif / 36e5); dif -= hrs * 36e5;
    const min = Math.floor(dif / 6e4); dif -= min * 6e4;
    const seg = Math.floor(dif / 1e3);
    box.innerHTML =
      cell(dias, "dias") + cell(hrs, "horas") + cell(min, "min") + cell(seg, "seg");
    if (alvo - agora <= 0) box.innerHTML = '<p class="cd-fim">É hoje! 👑 Te esperamos.</p>';
    if (urg) {
      if (alvo - agora <= 0) urg.textContent = "✨ É hoje! Te esperamos!";
      else if (dias === 0) urg.textContent = "🔥 É hoje! Últimas horas para se inscrever!";
      else if (dias === 1) urg.textContent = "🔥 Falta só 1 dia! Garanta sua vaga!";
      else urg.textContent = `⏳ Faltam ${dias} dias — não deixe para a última hora!`;
    }
  };
  const cell = (n, l) =>
    `<div class="cd-cell"><span class="cd-num">${String(n).padStart(2,"0")}</span><span class="cd-lbl">${l}</span></div>`;
  tick();
  setInterval(tick, 1000);
}

/* ---------- WhatsApp / e-mail ---------- */
function montarBotoesContato() {
  const { whatsapp, mensagemWhatsapp, email } = CONFIG.contato;
  const links = document.querySelectorAll("[data-whatsapp]");
  if (whatsapp) {
    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensagemWhatsapp || "")}`;
    links.forEach(a => { a.href = url; a.style.display = ""; });
  } else {
    links.forEach(a => a.href = CONFIG.evento.instagram);
  }
  document.querySelectorAll("[data-email]").forEach(a => {
    if (email) { a.href = "mailto:" + email; a.textContent = email; }
    else a.closest("[data-email-wrap]")?.remove();
  });
  // botão flutuante
  const float = document.getElementById("whatsFloat");
  if (float && whatsapp) {
    float.href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensagemWhatsapp || "")}`;
    float.style.display = "flex";
  }
}

/* ---------- Prova social (números) ---------- */
function montarProvaSocial() {
  const box = document.getElementById("prova-social");
  if (!box) return;
  const ps = CONFIG.provaSocial || {};
  const itens = ps.itens || [];
  if (ps.mostrar === false || !itens.length) { (box.closest("section") || box).remove(); return; }
  box.innerHTML = itens.map(i => `
    <div class="ps-item">
      <span class="ps-num">${i.numero || ""}</span>
      <span class="ps-label">${i.label || ""}</span>
    </div>`).join("");
}

/* ---------- Vagas (escassez com barra) ---------- */
function montarVagas() {
  const sec = document.getElementById("vagas");
  if (!sec) return;
  const v = CONFIG.vagas || {};
  const total = Number(v.total) || 0;
  const preenchidas = Math.min(Number(v.preenchidas) || 0, total);
  if (v.mostrar === false || total <= 0) { sec.remove(); return; }

  const restam = Math.max(0, total - preenchidas);
  const pct = Math.round((preenchidas / total) * 100);
  setText("[data-vagas-titulo]", v.titulo);
  setText("[data-vagas-subtitulo]", v.subtitulo);
  setText("[data-vagas-preenchidas]", preenchidas);
  setText("[data-vagas-total]", total);
  setText("[data-vagas-restam]", restam);
  setText("[data-vagas-pct]", pct + "%");

  const barra = document.getElementById("vagas-barra");
  if (barra) {
    barra.style.width = "0%";
    barra.setAttribute("aria-valuenow", pct);
    requestAnimationFrame(() => setTimeout(() => { barra.style.width = pct + "%"; }, 200));
    if (pct >= 85) barra.classList.add("quase-esgotado");
  }
}

/* ---------- Gatilhos de venda (textos de urgência) ---------- */
function montarGatilhos() {
  const g = CONFIG.gatilhos || {};
  document.querySelectorAll("[data-escassez]").forEach(el => {
    if (g.escassez) el.textContent = g.escassez; else el.remove();
  });
  document.querySelectorAll("[data-urgencia-preco]").forEach(el => {
    if (g.urgenciaPreco) el.textContent = g.urgenciaPreco; else el.remove();
  });
  document.querySelectorAll("[data-chamada-final]").forEach(el => {
    if (g.chamadaFinal) el.textContent = g.chamadaFinal;
  });
}

/* ---------- Igreja responsável (realização) ---------- */
function montarIgreja() {
  const sec = document.getElementById("igreja");
  if (!sec) return;
  const ig = CONFIG.igreja || {};
  if (ig.mostrar === false || !ig.nome) { sec.remove(); return; }
  setText("[data-igreja-nome]", ig.nome);
  setText("[data-igreja-desc]", ig.descricao);
  const liga = (sel, url) => {
    const a = sec.querySelector(sel);
    if (!a) return;
    if (url) a.href = url; else a.remove();
  };
  liga("[data-igreja-fb]", ig.facebook);
  liga("[data-igreja-ig]", ig.instagram);
  liga("[data-igreja-tt]", ig.tiktok);
}

/* ---------- FAQ (quebra de objeções) ---------- */
function montarFaq() {
  const box = document.getElementById("faq-lista");
  if (!box) return;
  const f = CONFIG.faq || {};
  const itens = f.itens || [];
  if (f.mostrar === false || !itens.length) { (box.closest("section") || box).remove(); return; }
  setText("[data-faq-titulo]", f.titulo);
  setText("[data-faq-subtitulo]", f.subtitulo);
  box.innerHTML = itens.map(i => `
    <details class="faq-item">
      <summary>${i.p || ""}<span class="faq-mais" aria-hidden="true">+</span></summary>
      <div class="faq-resp">${i.r || ""}</div>
    </details>`).join("");
}

/* ---------- Selos de confiança ---------- */
function montarConfianca() {
  const box = document.getElementById("confianca");
  if (!box) return;
  const c = CONFIG.confianca || {};
  const itens = c.itens || [];
  if (c.mostrar === false || !itens.length) { box.remove(); return; }
  box.innerHTML = itens.map(i => `
    <div class="confianca-item"><span class="conf-ico">${i.icone || "✓"}</span><span>${i.texto || ""}</span></div>`).join("");
}

/* ---------- Botão fixo de inscrição (sticky) ---------- */
function montarStickyCta() {
  const bar = document.getElementById("sticky-cta");
  if (!bar) return;
  const s = CONFIG.stickyCta || {};
  if (s.mostrar === false) { bar.remove(); return; }
  setText("[data-sticky-resumo]", s.resumo);
  setText("[data-sticky-texto]", s.texto);
  const preco = (CONFIG.ingresso && CONFIG.ingresso.preco) || "";
  setText("[data-sticky-preco]", preco);
}

/* ---------- Investimento / Ingresso ---------- */
function montarIngresso() {
  const sec = document.getElementById("ingresso");
  if (!sec) return;
  const ing = CONFIG.ingresso || {};
  if (ing.mostrar === false || !ing.preco) { sec.remove(); return; }

  setText("[data-ingresso-titulo]", ing.titulo);
  setText("[data-ingresso-subtitulo]", ing.subtitulo);
  setText("[data-preco]", ing.preco);
  setText("[data-preco-obs]", ing.precoObs);
  if (ing.botaoTexto) {
    document.querySelectorAll("[data-ingresso-botao]").forEach(b => b.textContent = ing.botaoTexto);
  }
  const ul = document.getElementById("incluso-lista");
  if (ul) ul.innerHTML = (ing.incluso || []).map(i => `<li>${i}</li>`).join("");

  montarLocal();
}

function montarLocal() {
  const card = document.getElementById("local-card");
  if (!card) return;
  const local = CONFIG.local || {};
  if (!local.nome && !local.endereco && !local.mapsUrl) { card.remove(); return; }
  setText("[data-local-nome]", local.nome);
  setText("[data-local-endereco]", local.endereco);
  const btn = document.getElementById("localMaps");
  if (btn) {
    if (local.mapsUrl) btn.href = local.mapsUrl;
    else btn.remove();
  }
}

/* ---------- Condições de pagamento ---------- */
// Converte "R$ 1.200,00" → 1200.00
function parsePreco(v) {
  if (typeof v === "number") return v;
  let s = String(v || "").replace(/[^\d.,]/g, "");
  s = s.replace(/\.(?=\d{3}(\D|$))/g, "").replace(",", ".");
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
}

// Quantos meses faltam até a data do evento (mínimo conforme aproxima)
function mesesAteEvento() {
  const ev = new Date(CONFIG.proximoEvento.data);
  const hoje = new Date();
  if (isNaN(ev.getTime())) return 1;
  let meses = (ev.getFullYear() - hoje.getFullYear()) * 12 + (ev.getMonth() - hoje.getMonth());
  if (ev.getDate() < hoje.getDate()) meses -= 1; // mês corrente já não cabe parcela cheia
  return meses;
}

function montarPagamento() {
  const sec = document.getElementById("pagamento");
  if (!sec) return;
  const pg = CONFIG.pagamento || {};
  if (pg.mostrar === false) { sec.remove(); return; }

  const total = parsePreco(pg.valorTotal || (CONFIG.ingresso && CONFIG.ingresso.preco));
  const max = Math.max(1, Number(pg.maxParcelas) || 1);
  const parcelas = Math.max(1, Math.min(max, mesesAteEvento() || 1));
  const semJuros = pg.semJuros !== false ? " sem juros" : "";
  const fmt = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const resumo = total > 0
    ? `Em até ${parcelas}x de ${fmt(total / parcelas)}${semJuros}`
    : `Em até ${parcelas}x${semJuros}`;

  setText("[data-pagamento-titulo]", pg.titulo);
  setText("[data-pagamento-subtitulo]", pg.subtitulo);
  setText("[data-pagamento-parcelas]", resumo);
  setText("[data-pagamento-obs]", pg.observacao);

  // Resumo curto no card de preço (seção Investimento)
  document.querySelectorAll("[data-parcelas-resumo]").forEach(el => {
    el.textContent = total > 0 ? `ou em até ${parcelas}x de ${fmt(total / parcelas)}${semJuros}` : `em até ${parcelas}x${semJuros}`;
  });

  // Formas de pagamento
  const formasBox = document.getElementById("pagamento-formas");
  if (formasBox) formasBox.innerHTML = (pg.formas || []).map(f => `<span class="forma-chip">${f}</span>`).join("");
}

/* ---------- PIX / ofertas ---------- */
function montarPix() {
  const sec = document.getElementById("ofertas");
  const { pixChave, pixNome, pixTipo } = CONFIG.contato;
  if (!sec) return;
  if (!pixChave) { sec.remove(); return; }
  setText("[data-pix-chave]", pixChave);
  setText("[data-pix-nome]", pixNome);
  setText("[data-pix-tipo]", pixTipo);
  const btn = document.getElementById("copiarPix");
  if (btn) btn.addEventListener("click", () => {
    navigator.clipboard.writeText(pixChave).then(() => {
      btn.textContent = "✓ Chave copiada!";
      setTimeout(() => (btn.textContent = "Copiar chave PIX"), 2500);
    });
  });
}

/* ---------- Inscrição ---------- */
function montarInscricao() {
  const url = CONFIG.inscricao.googleFormUrl;
  const frameWrap = document.getElementById("formWrap");
  const naPaginaDoForm = !!frameWrap; // estamos em inscricao.html

  // Botões "Garantir minha vaga" / "Quero participar" sempre levam para a
  // página interna da inscrição (que já tem o formulário embutido), em vez
  // de abrir o Google Forms em outra aba.
  document.querySelectorAll("[data-inscricao-link]").forEach(a => {
    if (naPaginaDoForm) {
      // Já estamos na página do form: o botão rola até o iframe.
      a.href = "#formWrap";
      a.removeAttribute("target");
      a.removeAttribute("rel");
    } else if (url) {
      a.href = "inscricao.html#formWrap";
      a.removeAttribute("target");
      a.removeAttribute("rel");
    } else {
      // Sem formulário configurado: cai pro WhatsApp/Instagram como antes.
      a.href = CONFIG.contato.whatsapp
        ? `https://wa.me/${CONFIG.contato.whatsapp}?text=${encodeURIComponent("Quero me inscrever no Princesas Adornadas!")}`
        : CONFIG.evento.instagram;
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    }
  });

  if (frameWrap && url && CONFIG.inscricao.incorporar) {
    const embed = url.includes("?") ? url + "&embedded=true" : url + "?embedded=true";
    frameWrap.innerHTML = `<iframe src="${embed}" title="Inscrição" loading="lazy">Carregando…</iframe>`;
  } else if (frameWrap && !url) {
    frameWrap.innerHTML =
      `<div class="form-placeholder"><p>As inscrições serão divulgadas em breve.</p>
       <a class="btn btn-ouro" data-inscricao-link>Falar conosco</a></div>`;
    montarInscricao(); // re-aplica o link no botão recém-criado
  }
}

/* ---------- Programação ---------- */
async function carregarProgramacao() {
  const box = document.getElementById("programacao-lista");
  if (!box) return;
  try {
    const itens = await Sheets.getProgramacao();
    if (!itens.length) { box.innerHTML = "<p class='vazio'>Programação em breve.</p>"; return; }
    const grupos = {};
    itens.forEach(i => { (grupos[i.sessao || "Programação"] ||= []).push(i); });
    box.innerHTML = Object.entries(grupos).map(([sessao, lista]) => `
      <div class="prog-grupo">
        <h3 class="prog-sessao">${sessao}</h3>
        <ul class="prog-ul">
          ${lista.map(i => `
            <li class="prog-item">
              <span class="prog-hora">${i.horario || ""}</span>
              <div class="prog-info">
                <strong>${i.atividade || ""}</strong>
                ${i.descricao ? `<p>${i.descricao}</p>` : ""}
              </div>
            </li>`).join("")}
        </ul>
      </div>`).join("");
  } catch (e) {
    console.warn(e);
    box.innerHTML = "<p class='vazio'>Não foi possível carregar a programação.</p>";
  }
}

/* ---------- Depoimentos ---------- */
async function carregarDepoimentos() {
  const box = document.getElementById("depoimentos-lista");
  if (!box) return;
  try {
    const itens = await Sheets.getDepoimentos();
    if (!itens.length) { box.innerHTML = "<p class='vazio'>Em breve, testemunhos.</p>"; return; }
    box.innerHTML = itens.map(d => `
      <figure class="dep-card">
        <div class="dep-aspas">”</div>
        <div class="dep-estrelas" aria-label="Avaliação 5 de 5 estrelas">★★★★★</div>
        <blockquote>${d.texto || ""}</blockquote>
        <figcaption>
          <strong>${d.nome || ""}</strong>
          ${d.cidade ? `<span>${d.cidade}</span>` : ""}
        </figcaption>
      </figure>`).join("");
  } catch (e) {
    console.warn(e);
    box.innerHTML = "<p class='vazio'>Não foi possível carregar os depoimentos.</p>";
  }
}

/* ---------- Menu mobile ---------- */
function montarMenuMobile() {
  const btn = document.getElementById("menuBtn");
  const nav = document.getElementById("navLinks");
  if (!btn || !nav) return;
  const sync = () => {
    const aberto = nav.classList.contains("aberto");
    btn.setAttribute("aria-expanded", aberto ? "true" : "false");
    btn.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    btn.textContent = aberto ? "✕" : "☰";
  };
  btn.addEventListener("click", () => { nav.classList.toggle("aberto"); sync(); });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("aberto"); sync(); }));
  window.addEventListener("scroll", () => {
    document.getElementById("topbar")?.classList.toggle("compacto", window.scrollY > 40);
  });
}

/* ---------- Animação de entrada ---------- */
function animarAoRolar() {
  const els = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("visivel")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visivel"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(e => io.observe(e));
}
