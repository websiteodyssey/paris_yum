/* ============================================================
   Paris Yum — Site une page (sans commande / panier)
   ============================================================ */
(function () {
  "use strict";

  const $  = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };

  const FALLBACK = "data:image/svg+xml," + encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='360' height='240'>
       <rect width='100%' height='100%' fill='#6e1212'/>
       <text x='50%' y='50%' font-size='110' text-anchor='middle' dominant-baseline='central' fill='#e3c984'>🍜</text>
     </svg>`);

  const imgURL = (it, size) => {
    if (it.img) return it.img;
    if (it.p == null) return FALLBACK;
    const s = size || "360x240";
    return it.j ? `${IMG_BASE}/owner_update/p${it.p}-${s}.jpg`
                : `${IMG_BASE}/images/p${it.p}-${s}.png`;
  };
  const euro = (n) => n.toFixed(2).replace(".", ",").replace(/,00$/, "") + " €";
  const slug = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
                       .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const badges = (tags = []) => {
    let out = "";
    if (tags.includes("spicy")) out += `<span title="Épicé">🌶️</span>`;
    if (tags.includes("star"))  out += `<span title="Populaire">★</span>`;
    return out;
  };

  /* ---------- Année footer ---------- */
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Nav : fond au scroll + burger + scrollspy ---------- */
  const nav = $("#nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  const burger = $("#burger");
  const navLinks = $("#navLinks");
  if (burger && navLinks) {
    const toggleMenu = (force) => {
      const open = force != null ? force : !navLinks.classList.contains("open");
      navLinks.classList.toggle("open", open);
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", String(open));
    };
    burger.addEventListener("click", () => toggleMenu());
    $$("a", navLinks).forEach(a => a.addEventListener("click", () => toggleMenu(false)));
  }

  // Surligne le lien de la section visible
  const spyLinks = $$('#navLinks a[href^="#"]');
  const sections = spyLinks.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if (sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const id = "#" + en.target.id;
          spyLinks.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === id));
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(s => spy.observe(s));
  }

  /* ---------- La carte : onglets + cartes (affichage) ---------- */
  let activateCat = null;
  const tabs = $("#menuTabs");
  const panels = $("#menuPanels");
  if (tabs && panels && typeof MENU !== "undefined") {
    MENU.forEach((cat, i) => {
      const tab = el("button", "menu__tab" + (i === 0 ? " active" : ""),
        `<span class="zh">${cat.zh}</span> ${cat.fr}`);
      tab.dataset.target = cat.id;
      tabs.appendChild(tab);

      const panel = el("div", "menu__panel" + (i === 0 ? " active" : ""));
      panel.id = "panel-" + cat.id;

      const items = cat.items.map(it => {
        const b = badges(it.tags);
        const price = it.price != null ? euro(it.price) : "Sur place";
        return `
          <li class="carte-item">
            <div class="carte-item__top">
              <span class="carte-item__name">${it.name}${b ? " " + b : ""}</span>
              ${it.zh ? `<span class="carte-item__zh">${it.zh}</span>` : ""}
            </div>
            ${it.desc ? `<p class="carte-item__desc">${it.desc}</p>` : ""}
            <span class="carte-item__price">${price}</span>
          </li>`;
      }).join("");

      panel.innerHTML = `
        <div class="carte-card">
          <div class="carte-card__head">
            <span class="carte-card__zh">${cat.zh}</span>
            <h3>${cat.fr}</h3>
            <span class="carte-card__rule"></span>
          </div>
          <ul class="carte-list">${items}</ul>
          ${cat.note ? `<p class="menu__note">${cat.note}</p>` : ""}
        </div>`;
      panels.appendChild(panel);
    });

    activateCat = (catId) => {
      const tab = tabs.querySelector(`.menu__tab[data-target="${catId}"]`);
      const panel = document.getElementById("panel-" + catId);
      if (!tab || !panel) return false;
      $$(".menu__tab", tabs).forEach(t => t.classList.remove("active"));
      $$(".menu__panel", panels).forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      panel.classList.add("active");
      return tab;
    };

    tabs.addEventListener("click", e => {
      const tab = e.target.closest(".menu__tab");
      if (!tab) return;
      activateCat(tab.dataset.target);
      tab.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    });
  }

  /* ---------- Nos Plats : bande d'images en défilement continu ---------- */
  const sliderTrack = $("#platsTrack");
  if (sliderTrack && typeof SIGNATURES !== "undefined" && SIGNATURES.length) {
    const slide = (s) => `
      <div class="slide">
        <img src="${imgURL(s, "600x400")}" alt="${s.name}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK}'">
        <div class="slide__cap"><span class="slide__zh">${s.zh || ""}</span><span class="slide__name">${s.name}</span></div>
      </div>`;
    // Contenu dupliqué → boucle continue sans couture
    sliderTrack.innerHTML = (SIGNATURES.map(slide).join("")).repeat(2);
  }

  /* ---------- Horaires ---------- */
  const hoursList = $("#hoursList");
  if (hoursList && typeof HOURS !== "undefined") {
    const todayDow = new Date().getDay();
    HOURS.forEach(h => {
      const li = el("li", h.dow === todayDow ? "today" : "");
      li.innerHTML = `<span class="day">${h.day}</span><span class="time">${h.time}</span>`;
      hoursList.appendChild(li);
    });
  }

  /* ---------- Réservation ---------- */
  const form = $("#reserveForm");
  if (form) {
    const note = $("#reserveNote");
    $("#r-date").min = new Date().toISOString().split("T")[0];

    form.addEventListener("submit", e => {
      e.preventDefault();
      note.className = "reserve__note"; note.textContent = "";

      let ok = true;
      $$("[required]", form).forEach(f => {
        const valid = f.value.trim() !== "";
        f.classList.toggle("invalid", !valid);
        if (!valid) ok = false;
      });
      const phone = $("#r-phone").value.trim();
      if (ok && !/[0-9]{6,}/.test(phone.replace(/[\s.+-]/g, ""))) {
        $("#r-phone").classList.add("invalid");
        note.classList.add("err");
        note.textContent = "Merci d'indiquer un numéro de téléphone valide.";
        return;
      }
      if (!ok) {
        note.classList.add("err");
        note.textContent = "Merci de remplir tous les champs obligatoires.";
        return;
      }

      const name = $("#r-name").value.trim();
      const guests = $("#r-guests").value;
      const date = new Date($("#r-date").value).toLocaleDateString("fr-FR",
        { weekday: "long", day: "numeric", month: "long" });
      const time = $("#r-time").value;
      const msg = $("#r-msg").value.trim();

      note.classList.add("ok");
      note.textContent = `Merci ${name} ! Votre demande pour ${guests} pers. le ${date} à ${time} est enregistrée. Nous vous rappelons au ${phone} pour confirmer.`;

      const text = `Bonjour Paris Yum, je souhaite réserver une table.%0A` +
        `Nom : ${name}%0APersonnes : ${guests}%0ADate : ${date}%0AHeure : ${time}%0A` +
        `Téléphone : ${phone}` + (msg ? `%0ADemande : ${msg}` : "");
      const old = form.querySelector('a[href^="https://wa.me"]');
      if (old) old.remove();
      const wa = el("a", "btn btn--gold btn--full", "Confirmer par message");
      wa.href = `https://wa.me/33148000168?text=${text}`;
      wa.target = "_blank"; wa.rel = "noopener"; wa.style.marginTop = "14px";
      note.after(wa);
      form.reset();
      $("#r-guests").value = guests;
    });
  }

  /* ---------- Reveal au scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  $$(".section__head, .histoire__text, .histoire__media, .reserve__intro, .reserve__form, .contact__card, .contact__map, .menu__tabs")
    .forEach(n => { n.classList.add("reveal"); io.observe(n); });

})();
