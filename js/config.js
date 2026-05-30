/* =====================================================================
   PRINCESAS ADORNADAS — ARQUIVO DE CONFIGURAÇÃO
   ---------------------------------------------------------------------
   👉 ESTE É O ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR.
   Preencha os campos abaixo. Enquanto estiverem vazios, o site mostra
   um conteúdo de DEMONSTRAÇÃO para você ver como fica.
   Veja o passo a passo completo no arquivo SETUP.md
   ===================================================================== */

const CONFIG = {

  /* ------------------------------------------------------------------
     1) IDENTIDADE DO EVENTO
  ------------------------------------------------------------------ */
  evento: {
    nome: "Princesas Adornadas",
    subtitulo: "Encontro de mulheres cristãs",
    // Versículo / tema do ano que aparece em destaque na home:
    versiculo: "“Toda formosa és, amiga minha, e em ti não há mancha.”",
    versiculoRef: "Cantares 4:7",
    tema: "Adornadas pela Graça",
    instagram: "https://www.instagram.com/princesas.adornadas/",
    instagramUser: "princesas.adornadas",
    facebook: "https://www.facebook.com/alinhadasnapalavra",
  },

  /* ------------------------------------------------------------------
     1.1) IDEALIZADORA / RESPONSÁVEL PELO EVENTO
     Deixe "foto" vazio para mostrar um avatar com a inicial.
  ------------------------------------------------------------------ */
  idealizadora: {
    nome: "Lázara Rosa",
    papel: "Idealizadora & Fundadora",
    instagram: "https://www.instagram.com/lazara.rosa.5/",
    instagramUser: "lazara.rosa.5",
    foto: "", // ex.: "assets/lazara.jpg" (coloque a imagem na pasta assets)
    bio: "Movida pelo amor de Deus e pelo desejo de ver mulheres restauradas, Lázara idealizou o Princesas Adornadas para que cada mulher descubra seu valor como filha do Rei.",
  },

  /* ------------------------------------------------------------------
     1.2) EQUIPE / ORGANIZAÇÃO (aparece na seção "Fale Conosco")
     Adicione quantas pessoas quiser. WhatsApp só números (com DDI/DDD).
  ------------------------------------------------------------------ */
  equipe: [
    {
      nome: "Lázara Rosa",
      papel: "Idealizadora",
      whatsapp: "5561991798348",
      instagram: "https://www.instagram.com/lazara.rosa.5/",
      instagramUser: "lazara.rosa.5",
    },
    {
      nome: "Ana Brandão",
      papel: "Coordenação & Apoio",
      whatsapp: "5561993050472",
      instagram: "https://www.instagram.com/anatbrandao/",
      instagramUser: "anatbrandao",
    },
  ],

  /* ------------------------------------------------------------------
     2) PRÓXIMO EVENTO (usado na contagem regressiva)
     Formato da data: "AAAA-MM-DDTHH:MM:SS"  (24h)
  ------------------------------------------------------------------ */
  proximoEvento: {
    titulo: "Próximo Encontro",
    data: "2026-09-12T09:00:00",
    local: "A definir",
    cidade: "",
  },

  /* ------------------------------------------------------------------
     3) CONTATO / REDES / OFERTAS
  ------------------------------------------------------------------ */
  contato: {
    // Coloque o número com DDI e DDD, só números. Ex.: 5561999998888
    whatsapp: "5561991798348",
    mensagemWhatsapp: "Olá! Tenho interesse no evento Princesas Adornadas 🌷",
    email: "",
    // Chave PIX para ofertas/contribuições (deixe vazio para esconder a seção):
    pixChave: "",
    pixNome: "",
    pixTipo: "", // ex.: "E-mail", "Telefone", "Aleatória"
  },

  /* ------------------------------------------------------------------
     4) INSCRIÇÃO (Google Forms)
     Cole aqui o link do seu Google Formulário. Se vazio, o botão de
     inscrição vira um link para o WhatsApp.
  ------------------------------------------------------------------ */
  inscricao: {
    googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLScWGGLS4fuOxoh8GY0dJpTh6UKc_AXIKxrDnHocJwvKnwD1pQ/viewform",
    incorporar: true,
  },

  /* ------------------------------------------------------------------
     5) INTEGRAÇÃO GOOGLE (via Apps Script Web App — SEM Chave de API)
     Cole aqui a "URL do app da Web" que você gerou ao publicar o
     script apps-script/princesas-backend.gs (veja SETUP.md, passo 4-5).
     Enquanto vazio, o site usa dados de demonstração.
  ------------------------------------------------------------------ */
  google: {
    webAppUrl: "https://script.google.com/macros/s/AKfycbw75mE2saNgheCpGwyohVmpt92_UcSDvCj9T_7e06HduM3hNxIuWV8G4nV25yNZiCl0aw/exec",
  },

  /* ------------------------------------------------------------------
     6) CARROSSEL DO TOPO (fotos de destaque)
     Por padrão usa a pasta "Carrossel (fotos do topo do site)" criada
     no seu Drive — é só jogar fotos lá. Se quiser usar OUTRA pasta,
     cole o ID dela em "pastaId" (o ID fica no link da pasta).
  ------------------------------------------------------------------ */
  carrossel: {
    pastaId: "https://drive.google.com/drive/folders/1kh4kIKVn8WGwEv1zzhKQ-GNLweA-DJY1",          // vazio = usa a pasta padrão do carrossel
    autoPlay: true,
    intervaloSegundos: 5, // tempo entre as fotos
  },

  /* ------------------------------------------------------------------
     7) INVESTIMENTO / INGRESSO
     Para esconder a seção inteira, deixe "mostrar: false".
  ------------------------------------------------------------------ */
  ingresso: {
    mostrar: true,
    titulo: "Investimento",
    subtitulo: "Tudo o que você recebe nesse dia especial",
    preco: "R$ 120,00",
    precoObs: "por pessoa",
    parcelas: "ou em até 3x sem juros",   // deixe "" se não houver
    incluso: [
      "Credenciamento e kit da participante",
      "Coffee break da manhã",
      "Almoço completo",
      "Material das oficinas",
      "Louvor, palestras e ministração",
      "Certificado de participação",
    ],
    botaoTexto: "Garantir minha vaga",
  },

  /* ------------------------------------------------------------------
     7.1) CONDIÇÕES DE PAGAMENTO
     O nº de parcelas SEM JUROS diminui sozinho conforme o evento chega:
     ele é igual aos MESES que faltam até a data do evento, limitado por
     "maxParcelas". Ex.: em janeiro = 10x, fevereiro = 9x, março = 8x...
  ------------------------------------------------------------------ */
  pagamento: {
    mostrar: true,
    titulo: "Condições de Pagamento",
    subtitulo: "Quanto antes você garante, em mais vezes pode parcelar!",
    maxParcelas: 10,          // máximo de parcelas sem juros
    semJuros: true,
    // Valor total para o cálculo. Vazio = usa o preço do ingresso (acima).
    valorTotal: "",           // ex.: "1200" ou "R$ 1.200,00"
    observacao: "O número de parcelas sem juros diminui conforme a data do evento se aproxima. Garanta já a sua e parcele em mais vezes!",
    formas: ["PIX", "Cartão de crédito", "Cartão de débito", "Dinheiro"],
  },

  /* ------------------------------------------------------------------
     8) LOCAL DO EVENTO
     Cole o link do Google Maps em "mapsUrl" (abra o mapa → Compartilhar
     → Copiar link). Para esconder o card, deixe os campos vazios.
  ------------------------------------------------------------------ */
  local: {
    nome: "Lagoa Quente Hotel",        // ex.: "Espaço de Eventos Bella Vista"
    endereco: "Avenida Lagoa Quente, 05 - St. Lagoa Quente, Caldas Novas, Goiás 75.692-580, Brasil",    // ex.: "QNL 10, Taguatinga — Brasília/DF"
    mapsUrl: "https://maps.app.goo.gl/JUBKMqLAwf745k6H7",     // ex.: "https://maps.app.goo.gl/xxxxx"
  },

  /* ------------------------------------------------------------------
     9) PROVA SOCIAL (números de destaque — gatilho de confiança)
     Aparece numa faixa logo abaixo do topo. "mostrar: false" esconde.
  ------------------------------------------------------------------ */
  provaSocial: {
    mostrar: true,
    itens: [
      { numero: "+300", label: "Mulheres impactadas" },
      { numero: "5", label: "Edições realizadas" },
      { numero: "100%", label: "Dias de bênção" },
    ],
  },

  /* ------------------------------------------------------------------
     10) GATILHOS DE VENDA (textos de urgência/escassez)
     Use para criar senso de urgência. Deixe vazio ("") para esconder.
  ------------------------------------------------------------------ */
  gatilhos: {
    escassez: "Vagas limitadas",            // selo no topo e no preço
    urgenciaPreco: "Valores promocionais por tempo limitado",
    chamadaFinal: "Não fique de fora — as vagas se esgotam rápido!",
  },

  /* ------------------------------------------------------------------
     11) VAGAS (escassez com barra de progresso)
     total = nº máximo de vagas | preenchidas = quantas já foram ocupadas
     A barra e o texto "restam X" são calculados automaticamente.
     "mostrar: false" esconde a seção.
  ------------------------------------------------------------------ */
  vagas: {
    mostrar: true,
    total: 200,
    preenchidas: 150,
    titulo: "Corra, as vagas estão acabando!",
    subtitulo: "Garanta a sua antes que esgote",
  },

  /* ------------------------------------------------------------------
     12) FAQ — Perguntas frequentes (quebra de objeções de venda)
  ------------------------------------------------------------------ */
  faq: {
    mostrar: true,
    titulo: "Perguntas Frequentes",
    subtitulo: "Tudo o que você precisa saber antes de se inscrever",
    itens: [
      { p: "Quem pode participar?", r: "Todas as mulheres são bem-vindas — jovens, mães, esposas e líderes. Venha do jeitinho que você é. 💛" },
      { p: "O que está incluso na inscrição?", r: "Kit da participante, coffee break, almoço completo, material das oficinas e certificado de participação." },
      { p: "Posso parcelar o pagamento?", r: "Sim! Você pode parcelar sem juros — e quanto antes garantir sua vaga, em mais vezes pode dividir." },
      { p: "E se eu não puder ir depois de me inscrever?", r: "Fale com a nossa equipe pelo WhatsApp que encontramos a melhor solução para você." },
      { p: "Como recebo a confirmação da minha vaga?", r: "Logo após a inscrição, nossa equipe entra em contato pelo WhatsApp para confirmar todos os detalhes." },
    ],
  },

  /* ------------------------------------------------------------------
     13) SELOS DE CONFIANÇA (reduzem o medo de comprar)
  ------------------------------------------------------------------ */
  confianca: {
    mostrar: true,
    itens: [
      { icone: "🔒", texto: "Pagamento 100% seguro" },
      { icone: "💬", texto: "Atendimento humano no WhatsApp" },
      { icone: "👑", texto: "Vaga garantida após confirmação" },
    ],
  },

  /* ------------------------------------------------------------------
     14) BOTÃO FIXO DE INSCRIÇÃO (sempre visível — aumenta conversão)
  ------------------------------------------------------------------ */
  stickyCta: {
    mostrar: true,
    resumo: "Garanta sua vaga",
    texto: "Inscreva-se",
  },

  /* ------------------------------------------------------------------
     14.1) DEPOIMENTOS
     Lista local de testemunhos. Se preencher aqui, esta lista será
     usada no carrossel da seção "Testemunhos" (tem prioridade sobre a
     planilha do Google Sheets). Deixe a lista vazia [] para usar a
     planilha normalmente.
  ------------------------------------------------------------------ */
  depoimentos: [
    { nome: "Ana Beatriz",      texto: "Saí transformada. Foi um dia de cura e renovo para a minha alma.",                              cidade: "Brasília/DF" },
    { nome: "Mariana Costa",    texto: "Senti o amor de Deus de uma forma que não tenho palavras. Voltarei com certeza!",               cidade: "Goiânia/GO" },
    { nome: "Patrícia Lima",    texto: "Cada detalhe feito com tanto cuidado. Me senti uma princesa adornada.",                          cidade: "Anápolis/GO" },
    { nome: "Juliana Ferreira", texto: "Cheguei cansada e voltei renovada. Um encontro que marca a alma e fortalece a fé.",              cidade: "São Paulo/SP" },
    { nome: "Camila Rodrigues", texto: "Foi um divisor de águas na minha caminhada com Cristo. Recomendo a toda mulher!",                cidade: "São Paulo/SP" },
    { nome: "Letícia Almeida",  texto: "Saí dali certa do amor do Pai por mim. Cada palavra foi um abraço de Deus.",                     cidade: "Belo Horizonte/MG" },
    { nome: "Renata Oliveira",  texto: "Comunhão linda, louvor poderoso e uma palavra que tocou o mais profundo de mim.",                cidade: "Uberlândia/MG" },
    { nome: "Fernanda Souza",   texto: "Encontrei irmãs que levarei para a vida. Foi muito mais do que eu esperava.",                    cidade: "Caldas Novas/GO" },
    { nome: "Bianca Martins",   texto: "A presença de Deus foi tão real! Voltei para casa transbordando gratidão.",                      cidade: "Caldas Novas/GO" },
    { nome: "Tatiane Ribeiro",  texto: "Cada momento foi preparado com tanto amor. Me senti verdadeiramente filha do Rei.",              cidade: "Caldas Novas/GO" },
    { nome: "Vanessa Carvalho", texto: "Voltei diferente para a minha família. Deus me restaurou ali, no meio das minhas irmãs.",        cidade: "Campinas/SP" },
    { nome: "Daniela Santos",   texto: "Que dia abençoado! O louvor, a palavra, a comunhão — tudo me ministrou profundamente.",          cidade: "Contagem/MG" },
  ],

  /* ------------------------------------------------------------------
     15) IGREJA RESPONSÁVEL (realização do evento)
  ------------------------------------------------------------------ */
  igreja: {
    mostrar: true,
    nome: "Comunidade Vida por Vidas",
    descricao: "Igreja responsável pela realização do evento",
    facebook: "https://www.facebook.com/ComunidadeVidaPorVidas",
    instagram: "https://www.instagram.com/comunidadevidaporvidas",
    instagramUser: "comunidadevidaporvidas",
    tiktok: "https://www.tiktok.com/@igrejacvv",
    tiktokUser: "igrejacvv",
  },
};

/* Não edite abaixo desta linha. */
window.CONFIG = CONFIG;
