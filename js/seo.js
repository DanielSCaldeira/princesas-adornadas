/* =====================================================================
   SEO.JS — Injeta metadados (canonical, Open Graph, Twitter, JSON-LD)
   ---------------------------------------------------------------------
   Lê tudo do CONFIG (js/config.js). Não precisa editar este arquivo.
   ===================================================================== */
(function () {
  if (typeof window === "undefined" || !window.CONFIG) return;

  const cfg = window.CONFIG;
  const seo = cfg.seo || {};
  const ev = cfg.evento || {};
  const prox = cfg.proximoEvento || {};
  const local = cfg.local || {};
  const ing = cfg.ingresso || {};
  const ideal = cfg.idealizadora || {};
  const igreja = cfg.igreja || {};
  const faq = cfg.faq || {};

  const baseUrl = (seo.siteUrl || "").replace(/\/+$/, "");
  const pageFile = location.pathname.split("/").pop() || "index.html";
  const pagePath = pageFile === "" ? "/" : "/" + pageFile;
  const pageUrl = baseUrl ? baseUrl + pagePath : location.href;

  const isHome = /^(?:|index\.html)$/i.test(pageFile);
  const isGaleria = /galeria\.html$/i.test(pageFile);
  const isInscricao = /inscricao\.html$/i.test(pageFile);

  /* ---------- Título e descrição por página ---------- */
  const cidade = (seo.localidade && seo.localidade.cidade) || "";
  const estado = (seo.localidade && seo.localidade.estado) || "";
  const localTxt = [cidade, estado].filter(Boolean).join("/");

  const descBase = ev.nome
    ? `${ev.nome} — ${ev.subtitulo || "encontro de mulheres cristãs"}${ev.tema ? `: "${ev.tema}"` : ""}${localTxt ? ` em ${localTxt}` : ""}. Um dia de adoração, palavra e comunhão. Inscrições abertas.`
    : "Encontro de mulheres cristãs — adoração, palavra e comunhão.";

  let pageTitle, pageDesc;
  if (isGaleria) {
    pageTitle = `Galeria de Fotos — ${ev.nome || "Princesas Adornadas"}`;
    pageDesc = `Reviva os melhores momentos do ${ev.nome || "Princesas Adornadas"} em fotos: louvor, comunhão e ministração entre mulheres cristãs${localTxt ? ` em ${localTxt}` : ""}.`;
  } else if (isInscricao) {
    pageTitle = `Inscrição — ${ev.nome || "Princesas Adornadas"}`;
    pageDesc = `Faça sua inscrição no ${ev.nome || "Princesas Adornadas"} e garanta sua vaga. Vagas limitadas${localTxt ? ` — ${localTxt}` : ""}.`;
  } else {
    pageTitle = `${ev.nome || "Princesas Adornadas"} — ${ev.subtitulo || "Encontro de Mulheres Cristãs"}${localTxt ? ` em ${localTxt}` : ""}`;
    pageDesc = descBase;
  }

  document.title = pageTitle;

  /* ---------- Helpers ---------- */
  function upsertMeta(attr, attrName, key, content) {
    if (!content) return;
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }
  const setName = (k, v) => upsertMeta("name", "name", k, v);
  const setProp = (k, v) => upsertMeta("property", "property", k, v);

  function upsertLink(rel, href, extra) {
    if (!href) return;
    let el = document.head.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", rel);
      document.head.appendChild(el);
    }
    el.setAttribute("href", href);
    if (extra) Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
  }

  /* ---------- Meta tags básicas ---------- */
  setName("description", pageDesc);
  if (seo.palavrasChave) setName("keywords", seo.palavrasChave);
  setName("author", ev.nome || "Princesas Adornadas");
  setName("robots", "index,follow,max-image-preview:large");
  setName("theme-color", seo.corTema || "#c81e6e");
  setName("format-detection", "telephone=no");

  if (cidade || estado) {
    setName("geo.region", `BR-${estado}`);
    setName("geo.placename", cidade);
  }

  if (seo.googleSiteVerification) {
    setName("google-site-verification", seo.googleSiteVerification);
  }

  /* ---------- Canonical ---------- */
  upsertLink("canonical", pageUrl);

  /* ---------- Open Graph ---------- */
  const ogImage = seo.imagemCompartilhamento
    ? (seo.imagemCompartilhamento.startsWith("http")
      ? seo.imagemCompartilhamento
      : (baseUrl ? baseUrl + "/" + seo.imagemCompartilhamento.replace(/^\//, "") : seo.imagemCompartilhamento))
    : "";

  setProp("og:site_name", ev.nome || "Princesas Adornadas");
  setProp("og:title", pageTitle);
  setProp("og:description", pageDesc);
  setProp("og:type", isHome ? "website" : "article");
  setProp("og:url", pageUrl);
  setProp("og:locale", "pt_BR");
  if (ogImage) {
    setProp("og:image", ogImage);
    setProp("og:image:alt", `${ev.nome || "Princesas Adornadas"} — ${ev.tema || "Encontro de Mulheres Cristãs"}`);
    setProp("og:image:width", "1200");
    setProp("og:image:height", "630");
  }

  /* ---------- Twitter Card ---------- */
  setName("twitter:card", ogImage ? "summary_large_image" : "summary");
  setName("twitter:title", pageTitle);
  setName("twitter:description", pageDesc);
  if (ogImage) setName("twitter:image", ogImage);

  /* ---------- JSON-LD ---------- */
  function jsonLd(data) {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  // Organization (igreja realizadora)
  if (igreja && igreja.nome && igreja.mostrar !== false) {
    const sameAs = [igreja.instagram, igreja.facebook, igreja.tiktok].filter(Boolean);
    jsonLd({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": igreja.nome,
      "description": igreja.descricao || undefined,
      "url": baseUrl || undefined,
      "sameAs": sameAs.length ? sameAs : undefined,
    });
  }

  // Event (proximo evento)
  if (prox && prox.data) {
    const inicio = new Date(prox.data);
    const fim = new Date(inicio.getTime() + 12 * 3600 * 1000); // estimativa: dia inteiro
    const evento = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": `${ev.nome || "Princesas Adornadas"} — ${prox.titulo || "Próximo Encontro"}`,
      "description": ev.tema ? `${ev.tema}. ${descBase}` : descBase,
      "startDate": inicio.toISOString(),
      "endDate": fim.toISOString(),
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "image": ogImage || undefined,
      "url": baseUrl ? baseUrl + "/inscricao.html" : undefined,
      "organizer": igreja && igreja.nome ? {
        "@type": "Organization",
        "name": igreja.nome,
        "url": igreja.facebook || igreja.instagram || undefined,
      } : undefined,
      "performer": ideal && ideal.nome ? {
        "@type": "Person",
        "name": ideal.nome,
      } : undefined,
    };

    if (local && (local.nome || local.endereco)) {
      evento.location = {
        "@type": "Place",
        "name": local.nome || "A definir",
        "address": local.endereco ? {
          "@type": "PostalAddress",
          "streetAddress": local.endereco,
          "addressLocality": cidade || undefined,
          "addressRegion": estado || undefined,
          "addressCountry": "BR",
        } : undefined,
      };
    }

    if (ing && ing.preco && ing.mostrar !== false) {
      const valor = String(ing.preco).replace(/[^\d.,]/g, "").replace(/\.(?=\d{3}(\D|$))/g, "").replace(",", ".");
      evento.offers = {
        "@type": "Offer",
        "price": valor || undefined,
        "priceCurrency": "BRL",
        "availability": "https://schema.org/InStock",
        "url": baseUrl ? baseUrl + "/inscricao.html" : undefined,
        "validFrom": new Date().toISOString().slice(0, 10),
      };
    }

    jsonLd(evento);
  }

  // FAQPage (apenas na home)
  if (isHome && faq && faq.mostrar !== false && Array.isArray(faq.itens) && faq.itens.length) {
    jsonLd({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faq.itens.map(i => ({
        "@type": "Question",
        "name": i.p || "",
        "acceptedAnswer": { "@type": "Answer", "text": i.r || "" },
      })),
    });
  }

  // BreadcrumbList (páginas internas)
  if (!isHome && baseUrl) {
    const nomePagina = isGaleria ? "Galeria" : isInscricao ? "Inscrição" : pageFile.replace(".html", "");
    jsonLd({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Início", "item": baseUrl + "/" },
        { "@type": "ListItem", "position": 2, "name": nomePagina, "item": pageUrl },
      ],
    });
  }

  // WebSite (com SearchAction se houver buscador no futuro)
  if (isHome) {
    jsonLd({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": ev.nome || "Princesas Adornadas",
      "url": baseUrl || location.origin,
      "inLanguage": "pt-BR",
    });
  }
})();
