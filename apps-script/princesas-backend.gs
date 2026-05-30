/* =====================================================================
   PRINCESAS ADORNADAS — Backend completo (criação + servidor de dados)
   ---------------------------------------------------------------------
   Este ÚNICO script faz tudo, dentro da SUA conta Google:
     • configurarTudo(): cria pasta da galeria + subpastas, planilha e
       formulário, compartilha e guarda os IDs automaticamente.
     • doGet(): vira um "mini-servidor" que entrega as fotos, a
       programação e os depoimentos para o site — SEM Chave de API.

   ====================  PASSO A PASSO  ================================
   1) Abra  https://script.google.com  → "Novo projeto".
   2) Apague tudo e cole ESTE arquivo inteiro. Salve (Ctrl+S).
   3) Selecione a função  configurarTudo  (topo) e clique em ▶ Executar.
      - Autorize: "Revisar permissões" → sua conta → "Avançado" →
        "Acessar projeto (não seguro)" → "Permitir". (É seu, é seguro.)
      - Veja os Logs (Ctrl+Enter): confirma que criou tudo.
   4) Agora PUBLIQUE o servidor:
      - Botão azul "Implantar" → "Nova implantação".
      - Engrenagem ⚙ → tipo "App da Web".
      - "Executar como": Eu (sua conta).
      - "Quem pode acessar": QUALQUER PESSOA.
      - "Implantar" → autorize de novo se pedir → COPIE a "URL do app da Web".
   5) Cole essa URL no arquivo  js/config.js  →  google.webAppUrl
      Pronto! O site lê tudo sozinho. 👑

   Sempre que adicionar fotos/editar a planilha, o site atualiza sozinho.
   ===================================================================== */

var PROPS = PropertiesService.getScriptProperties();

/* ----------------------------------------------------------------------
   PARTE 1 — Cria toda a estrutura na sua conta
---------------------------------------------------------------------- */
function configurarTudo() {
  Logger.log("⏳ Criando estrutura na sua conta...");

  // Pasta-mãe + Galeria + subpastas de exemplo
  var raiz = DriveApp.createFolder("Princesas Adornadas - Site");
  _compartilhar(raiz);
  var galeria = raiz.createFolder("Galeria");
  _compartilhar(galeria);
  ["01 - 2024 - 1º Encontro",
   "02 - 2025 - Adornadas pela Graça",
   "03 - Bastidores e Louvor"].forEach(function (n) {
    _compartilhar(galeria.createFolder(n));
  });

  // Pasta do carrossel do topo do site (fotos de destaque)
  var carrossel = raiz.createFolder("Carrossel (fotos do topo do site)");
  _compartilhar(carrossel);
  PROPS.setProperty("carrosselId", carrossel.getId());

  // Planilha
  var ss = SpreadsheetApp.create("Princesas Adornadas — Conteúdo do Site");
  var prog = ss.getActiveSheet();
  prog.setName("Programacao");
  prog.getRange("A1:D1").setValues([["Horario", "Atividade", "Descricao", "Sessao"]]);
  prog.getRange("A2:D7").setValues([
    ["08:30", "Recepção & Credenciamento", "Café de boas-vindas e entrega dos kits.", "Manhã"],
    ["09:30", "Abertura & Louvor", "Momento de adoração para preparar o coração.", "Manhã"],
    ["10:30", "Palestra principal", "Mensagem do tema do ano.", "Manhã"],
    ["12:30", "Almoço & Comunhão", "Refeição e confraternização.", "Tarde"],
    ["14:00", "Oficinas & Dinâmicas", "Atividades práticas em grupos.", "Tarde"],
    ["16:00", "Ministração & Oração", "Intercessão e encerramento.", "Tarde"]
  ]);
  _cab(prog, 4);
  var dep = ss.insertSheet("Depoimentos");
  dep.getRange("A1:C1").setValues([["Nome", "Texto", "Cidade"]]);
  dep.getRange("A2:C3").setValues([
    ["Ana Beatriz", "Saí transformada. Foi um dia de cura e renovo!", "Brasília/DF"],
    ["Mariana Costa", "Senti o amor de Deus de uma forma única. Voltarei!", "Goiânia/GO"]
  ]);
  _cab(dep, 3);
  DriveApp.getFileById(ss.getId()).moveTo(raiz);

  // Formulário de inscrição
  var form = FormApp.create("Inscrição — Princesas Adornadas");
  form.setDescription("Preencha para garantir sua vaga no encontro. 👑");
  form.addTextItem().setTitle("Nome completo").setRequired(true);
  form.addTextItem().setTitle("Telefone / WhatsApp").setRequired(true);
  form.addTextItem().setTitle("Cidade").setRequired(true);
  form.addTextItem().setTitle("Igreja que congrega");
  form.addParagraphTextItem().setTitle("Observação ou pedido de oração");
  DriveApp.getFileById(form.getId()).moveTo(raiz);

  // Guarda os IDs para o servidor (doGet) usar sozinho
  PROPS.setProperty("galeriaId", galeria.getId());
  PROPS.setProperty("planilhaId", ss.getId());
  PROPS.setProperty("formUrl", form.getPublishedUrl());

  Logger.log("✅ Estrutura criada!");
  Logger.log("Pasta (suba as fotos aqui dentro das subpastas): " + raiz.getUrl());
  Logger.log("Formulário de inscrição: " + form.getPublishedUrl());
  Logger.log("➡ Agora faça o PASSO 4 (Implantar como App da Web) e copie a URL.");
}

/* ----------------------------------------------------------------------
   PARTE 2 — Servidor de dados (o site chama esta URL)
---------------------------------------------------------------------- */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || "all";
  var out = { ok: true };
  try {
    // Fotos de uma pasta específica (usado pelo carrossel personalizado)
    if (action === "pasta") {
      var pid = e.parameter.id;
      if (!pid) throw new Error("Faltou o parâmetro id da pasta.");
      out.fotos = _lerImagens(DriveApp.getFolderById(pid));
      return _json(out);
    }

    var galeriaId = PROPS.getProperty("galeriaId");
    var planilhaId = PROPS.getProperty("planilhaId");
    if (!galeriaId || !planilhaId)
      throw new Error("Rode a função configurarTudo primeiro.");

    out.sessoes = _lerSessoes(galeriaId);
    out.carrossel = _lerImagens(_pastaCarrossel(galeriaId));
    var ss = SpreadsheetApp.openById(planilhaId);
    out.programacao = _lerAba(ss, "Programacao");
    out.depoimentos = _lerAba(ss, "Depoimentos");
    out.formUrl = PROPS.getProperty("formUrl") || "";
  } catch (err) {
    out = { ok: false, erro: String(err) };
  }
  return _json(out);
}

function _json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Garante a pasta do carrossel (cria 1x se ainda não existir)
function _pastaCarrossel(galeriaId) {
  var id = PROPS.getProperty("carrosselId");
  if (id) { try { return DriveApp.getFolderById(id); } catch (e) {} }
  var galeria = DriveApp.getFolderById(galeriaId);
  var pais = galeria.getParents();
  var raiz = pais.hasNext() ? pais.next() : DriveApp.getRootFolder();
  var nova = raiz.createFolder("Carrossel (fotos do topo do site)");
  _compartilhar(nova);
  PROPS.setProperty("carrosselId", nova.getId());
  return nova;
}

function _lerSessoes(galeriaId) {
  var galeria = DriveApp.getFolderById(galeriaId);
  var subs = galeria.getFolders();
  var arr = [];
  while (subs.hasNext()) {
    var f = subs.next();
    var fotos = _lerImagens(f);
    arr.push({
      id: f.getId(),
      nome: f.getName(),
      total: fotos.length,
      capa: fotos.length ? fotos[0].full : null,
      fotos: fotos
    });
  }
  arr.sort(function (a, b) { return a.nome.localeCompare(b.nome); });
  return arr;
}

// Lista as imagens de uma pasta (ordenadas pelo nome)
function _lerImagens(folder) {
  var fotos = [];
  var it = folder.getFiles();
  while (it.hasNext()) {
    var file = it.next();
    var mt = file.getMimeType() || "";
    if (mt.indexOf("image/") === 0) {
      var id = file.getId();
      fotos.push({
        nome: file.getName(),
        thumb: _thumb(id, "w800"),
        full: _thumb(id, "w1600")
      });
    }
  }
  fotos.sort(function (a, b) { return a.nome.localeCompare(b.nome); });
  return fotos;
}

function _lerAba(ss, nome) {
  var sh = ss.getSheetByName(nome);
  if (!sh) return [];
  var vals = sh.getDataRange().getValues();
  if (vals.length < 2) return [];
  var head = vals[0].map(function (h) { return String(h).trim().toLowerCase(); });
  var out = [];
  for (var r = 1; r < vals.length; r++) {
    if (vals[r].join("").trim() === "") continue;
    var o = {};
    for (var c = 0; c < head.length; c++) o[head[c]] = String(vals[r][c] || "").trim();
    out.push(o);
  }
  return out;
}

function _thumb(id, sz) {
  return "https://drive.google.com/thumbnail?id=" + id + "&sz=" + sz;
}
function _compartilhar(file) {
  try { file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); }
  catch (e) { Logger.log("⚠ Compartilhe manualmente: " + e); }
}

/* ----------------------------------------------------------------------
   EXTRA — Garante que TODAS as pastas (Galeria, suas subpastas e o
   Carrossel) estejam compartilhadas como "qualquer pessoa com o link".
   Rode esta função sempre que criar subpastas novas manualmente no Drive,
   ou se as fotos aparecerem em branco no site.
---------------------------------------------------------------------- */
function compartilharTudoPublicamente() {
  var galeriaId = PROPS.getProperty("galeriaId");
  var carrosselId = PROPS.getProperty("carrosselId");
  var total = 0;

  if (galeriaId) {
    var galeria = DriveApp.getFolderById(galeriaId);
    _compartilhar(galeria); total++;
    var subs = galeria.getFolders();
    while (subs.hasNext()) { _compartilhar(subs.next()); total++; }
    // Também compartilha a pasta-mãe (raiz "Princesas Adornadas - Site")
    var pais = galeria.getParents();
    if (pais.hasNext()) { _compartilhar(pais.next()); total++; }
  }
  if (carrosselId) {
    try { _compartilhar(DriveApp.getFolderById(carrosselId)); total++; } catch (e) {}
  }
  Logger.log("✅ " + total + " pasta(s) compartilhada(s) como 'qualquer pessoa com o link'.");
}

/* ----------------------------------------------------------------------
   EXTRA — Cria uma nova sessão (subpasta) dentro da Galeria, JÁ
   compartilhada publicamente. Útil para adicionar um novo encontro
   sem precisar mexer no Drive na mão.
   Uso: edite o nome abaixo e execute esta função.
---------------------------------------------------------------------- */
function criarSessao(nome) {
  nome = nome || "04 - Nova Sessão";
  var galeriaId = PROPS.getProperty("galeriaId");
  if (!galeriaId) throw new Error("Rode a função configurarTudo primeiro.");
  var nova = DriveApp.getFolderById(galeriaId).createFolder(nome);
  _compartilhar(nova);
  Logger.log("✅ Sessão criada e compartilhada: " + nova.getUrl());
  return nova.getUrl();
}
function _cab(sheet, cols) {
  sheet.getRange(1, 1, 1, cols).setBackground("#7d2e46").setFontColor("#fff").setFontWeight("bold");
  sheet.setFrozenRows(1);
  for (var c = 1; c <= cols; c++) sheet.autoResizeColumn(c);
}
