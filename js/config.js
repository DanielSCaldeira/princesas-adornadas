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
     0) SEO — Aparecer melhor no Google e nas redes sociais
     ⚠️ Substitua "siteUrl" pelo endereço final do site (sem barra no fim).
     A imagem "imagemCompartilhamento" deve ter 1200x630px para ficar
     bonita no WhatsApp / Facebook / Instagram (link preview).
  ------------------------------------------------------------------ */
  seo: {
    // Ex.: "https://princesasadornadas.com.br"  ou  "https://seu-usuario.github.io/princesas-adornadas"
    siteUrl: "https://princesasadornadas.com.br",
    // Caminho da imagem de compartilhamento (1200x630). Deixe vazio para
    // o site não enviar imagem nas previews.
    imagemCompartilhamento: "img/og-cover.jpg",
    // Palavras-chave (separe por vírgula). Pense no que sua público busca:
    palavrasChave: "encontro de mulheres cristãs, retiro feminino evangélico, conferência feminina cristã, Princesas Adornadas, evento cristão para mulheres, Caldas Novas, Goiás, mulheres de fé, comunhão cristã",
    // Identidade local — ajuda no SEO de pesquisas regionais.
    localidade: {
      cidade: "Caldas Novas",
      estado: "GO",
      pais: "BR",
    },
    // Cor da barra do navegador no celular (combine com a marca).
    corTema: "#c81e6e",
    // Identificador do Google Search Console (opcional). Deixe vazio se não tiver.
    googleSiteVerification: "",
  },

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
    selo: "Encontro de Mulheres Cristãs",  // selo pequeno no topo do hero
    instagram: "https://www.instagram.com/princesas.adornadas/",
    instagramUser: "princesas.adornadas",
    facebook: "https://www.facebook.com/alinhadasnapalavra",
  },

  /* ------------------------------------------------------------------
     1.0) TEXTOS DAS SEÇÕES (títulos e subtítulos das seções da home)
     Deixe vazio "" para ocultar.
  ------------------------------------------------------------------ */
  secoes: {
    carrossel:  { titulo: "Momentos Especiais",  subtitulo: "Um pouquinho do que já vivemos juntas" },
    sobre:      { titulo: "Sobre o Encontro",    subtitulo: "Mais que um evento, um encontro com o Rei" },
    idealizadora: { titulo: "Quem está à frente", subtitulo: "A idealizadora do encontro" },
    programacao:{ titulo: "Programação",         subtitulo: "Um dia inteiro preparado com carinho" },
    depoimentos:{ titulo: "Testemunhos",         subtitulo: "O que dizem nossas princesas" },
    ctaInscricao: {
      titulo: "Venha viver esse dia com a gente",
      // Se vazio, usa CONFIG.gatilhos.chamadaFinal como fallback.
      texto: "",
      botao: "Fazer minha inscrição",
    },
    ofertas:    { titulo: "Contribua com a Obra", subtitulo: "Sua oferta abençoa este ministério",
                  texto: "Você pode contribuir via PIX:", botao: "Copiar chave PIX" },
    contato:    { titulo: "Fale Conosco",         subtitulo: "Estamos aqui para te receber" },
    realizacao: { eyebrow: "Realização" },
  },

  /* ------------------------------------------------------------------
     1.0.1) HERO (capa / topo)
  ------------------------------------------------------------------ */
  hero: {
    // Imagem de fundo do hero (URL absoluta ou caminho local).
    imagemFundo: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=80",
    botaoPrincipal: "Quero garantir minha vaga",
    botaoSecundario: "Ver fotos",
  },

  /* ------------------------------------------------------------------
     1.0.2) SEÇÃO "SOBRE" (texto + imagem + pilares)
     "paragrafos" aceita HTML simples (ex.: <strong>...</strong>).
  ------------------------------------------------------------------ */
  sobre: {
    imagem: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=900&q=80",
    imagemAlt: "Mulheres cristãs em comunhão e oração no encontro Princesas Adornadas",
    paragrafos: [
      "<strong>Princesas Adornadas</strong> nasceu do desejo de reunir mulheres para celebrar a identidade que temos em Cristo: filhas amadas, escolhidas e cuidadas pelo Pai.",
      "Em cada edição preparamos um ambiente de cuidado, beleza e profundidade espiritual — com louvor, palavra, oficinas e muita comunhão. É um dia para descansar, ser ministrada e lembrar do seu valor.",
      "Seja você uma jovem, mãe, esposa ou líder: há um lugar reservado para você à mesa do Rei. 👑",
    ],
    pilares: [
      { icone: "🙏", titulo: "Adoração", texto: "Momentos de louvor para aquietar o coração na presença de Deus." },
      { icone: "📖", titulo: "Palavra",  texto: "Ensino bíblico que edifica, restaura e fortalece a fé." },
      { icone: "💐", titulo: "Comunhão", texto: "Amizades que florescem e laços que permanecem." },
    ],
  },

  /* ------------------------------------------------------------------
     1.0.3) MENU DE NAVEGAÇÃO (cabeçalho)
     "alvo" usa âncoras (#sobre) ou páginas (galeria.html).
  ------------------------------------------------------------------ */
  navegacao: {
    itens: [
      { texto: "Sobre",       alvo: "#sobre"        },
      { texto: "Programação", alvo: "#programacao"  },
      { texto: "Galeria",     alvo: "galeria.html"  },
      { texto: "Depoimentos", alvo: "#depoimentos"  },
      { texto: "Contato",     alvo: "#contato"      },
    ],
    botaoInscricao: "Inscreva-se",
  },

  /* ------------------------------------------------------------------
     1.0.4) PÁGINAS INTERNAS (galeria / inscrição)
  ------------------------------------------------------------------ */
  paginas: {
    galeria: {
      titulo: "Galeria de Momentos",
      subtitulo: "Reviva cada edição. Escolha uma sessão ao lado e relembre os momentos especiais. 👑",
    },
    inscricao: {
      titulo: "Faça sua Inscrição",
      heroSubtitulo: "Garanta sua vaga antes que as inscrições se encerrem",
      passosTitulo: "Como se inscrever",
      passos: [
        "Preencha o formulário abaixo com seus dados.",
        'Toque em <strong>“Enviar”</strong> ao final.',
        "Pronto! Entraremos em contato para confirmar. 💛",
      ],
      whatsappTitulo: "Prefere se inscrever pelo WhatsApp? É só falar com a gente:",
      whatsappBotao: "Inscrição pelo WhatsApp",
      voltar: "← Voltar para a página inicial",
    },
  },

  /* ------------------------------------------------------------------
     1.0.5) RODAPÉ
  ------------------------------------------------------------------ */
  rodape: {
    assinatura: "Feito com 💛 e oração",
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
    data: "2026-08-28T12:00:00",
    local: "Hotel Lagoa quente",
    cidade: "Caldas Novas-GO",
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
    // Cartões do bloco "Fale Conosco" (títulos e legendas dos canais)
    cards: {
      whatsapp:  { titulo: "WhatsApp",            legenda: "Fale com a nossa equipe" },
      instagram: { titulo: "Instagram do evento", legenda: "" /* usa @user automaticamente */ },
      facebook:  { titulo: "Facebook",            legenda: "Curta nossa página" },
      email:     { titulo: "E-mail",              legenda: "" },
    },
  },

  /* ------------------------------------------------------------------
     4) INSCRIÇÃO (Google Forms)
     Cole aqui o link do seu Google Formulário. Se vazio, o botão de
     inscrição vira um link para o WhatsApp.
  ------------------------------------------------------------------ */
  inscricao: {
    googleFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLScWGGLS4fuOxoh8GY0dJpTh6UKc_AXIKxrDnHocJwvKnwD1pQ/viewform",
    incorporar: true,
    // Altura do formulário incorporado, em pixels. Aumente se aparecer
    // rolagem interna; diminua se sobrar muito espaço em branco no fim.
    alturaIframe: 1400,
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
    preco: "R$ 1.200,00",
    precoLabel: "Valor do ingresso",
    precoObs: "por pessoa",
    parcelas: "ou em até 10x sem juros",   // deixe "" se não houver
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
    label: "Parcelamento sem juros",
    formasTitulo: "Formas de pagamento",
    botaoTexto: "Garantir minha vaga",
    maxParcelas: 10,          // máximo de parcelas sem juros
    semJuros: true,
    // Valor total para o cálculo. Vazio = usa o preço do ingresso (acima).
    valorTotal: "1.200,00",           // ex.: "1200" ou "R$ 1.200,00"
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
    tituloCard: "Onde vai ser",
    botaoMaps: "Ver no mapa",
  },

  /* ------------------------------------------------------------------
     9) PROVA SOCIAL (números de destaque — gatilho de confiança)
     Aparece numa faixa logo abaixo do topo. "mostrar: false" esconde.
  ------------------------------------------------------------------ */
  provaSocial: {
    mostrar: true,
    itens: [
      { numero: "+300", label: "Mulheres impactadas" },
      { numero: "15", label: "Edições realizadas" },
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
    // Textos da contagem regressiva (use {dias} onde quiser exibir os dias restantes)
    contagem: {
      eHoje: "É hoje! 👑 Te esperamos.",
      urgenciaHoje: "✨ É hoje! Te esperamos!",
      urgenciaUltimasHoras: "🔥 É hoje! Últimas horas para se inscrever!",
      urgenciaFalta1Dia: "🔥 Falta só 1 dia! Garanta sua vaga!",
      urgenciaFaltamDias: "⏳ Faltam {dias} dias — não deixe para a última hora!",
    },
    // Mensagem do WhatsApp ao clicar em "Inscreva-se" sem formulário configurado
    mensagemInscricaoWhatsapp: "Quero me inscrever no Princesas Adornadas!",
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
    preenchidas: 170,
    selo: "🔥 Atenção",
    titulo: "Corra, as vagas estão acabando!",
    subtitulo: "Garanta a sua antes que esgote",
    // Use {preenchidas}, {total}, {restam} para personalizar:
    infoTemplate: "{preenchidas} de {total} vagas preenchidas — restam apenas {restam}!",
    botaoTexto: "Quero minha vaga agora",
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
    icone: "⛪",
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
