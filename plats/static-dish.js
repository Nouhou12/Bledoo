"use strict";

const WHATSAPP_NUMBER = "237678699309";
const CART_KEY = "bledoo-static-cart";
const FREE_ZONES = [
  "akwa", "bonaberi", "bonamoussadi", "deido", "bonanjo", "bonapriso",
  "makepe", "logpom", "logbessou", "ndokoti", "kotto", "bali",
  "nkongmondo", "bepanda", "newbel", "mboppi"
];

const formatPrice = (price) => `${new Intl.NumberFormat("fr-FR").format(price)} FCFA`;
const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");
const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function priceFor(complement, format) {
  if (format === "single") {
    if (typeof complement.singlePrice === "number") return complement.singlePrice;
    return Math.round((complement.price / 3) / 500) * 500;
  }
  return complement.price;
}

function ingredientPhoto(text) {
  const value = normalize(text);
  const matches = [
    [["ndole"], "ndole", "Ndolé"],
    [["arachide"], "arachide", "Arachides"],
    [["oignon"], "oignons", "Oignons"],
    [["ail"], "ail", "Ail"],
    [["miondo"], "miondo", "Miondo"],
    [["bobolo"], "bobolo", "Bobolo"],
    [["ecrevisse", "crevette"], "ecrevisses", "Écrevisses séchées"],
    [["sans os"], "viande_sans_os", "Viande sans os"],
    [["avec os"], "viande_avec_os", "Viande avec os"],
    [["viande de boeuf"], "viande_sans_os", "Viande de bœuf"],
    [["viande"], "viande_sans_os", "Viande"],
    [["aubergine"], "aubergine", "Aubergines jaunes"],
    [["basilic"], "basilic", "Basilic"],
    [["carotte"], "carotte", "Carottes"],
    [["celeri"], "celeri", "Céleri"],
    [["chou"], "chou", "Chou blanc"],
    [["girofle"], "girofle", "Clou de girofle"],
    [["couscous", "gari"], "couscous_gari", "Couscous (gari)"],
    [["couscous", "manioc"], "couscous_manioc", "Couscous (manioc)"],
    [["garri"], "garri", "Garri"],
    [["water fufu", "fufu"], "water_fufu", "Water fufu"],
    [["djansang"], "djansang", "Djansang"],
    [["feuille", "manioc"], "feuille_manioc", "Feuilles de manioc"],
    [["okok", "feuille"], "feuille_okok", "Feuille d'okok"],
    [["folon"], "folon", "Folon"],
    [["gombo"], "gombo", "Gombos frais"],
    [["macabo"], "macabo", "Macabo"],
    [["gingembre"], "gingembre", "Gingembre"],
    [["haricot vert"], "haricot_vert", "Haricots verts"],
    [["haricot noir"], "haricot_noir", "Haricots noirs"],
    [["huile"], "huile_palme", "Huile de palme rouge"],
    [["kanwa"], "kanwa", "Kanwa"],
    [["condiment"], "condiments", "Condiments de la sauce jaune"],
    [["laurier"], "laurier", "Laurier"],
    [["lojam", "ojam"], "lojam", "L'Ojam"],
    [["mais"], "mais", "Maïs frais"],
    [["messep"], "messep", "Messep"],
    [["noix de palme", "noix"], "noix_palme", "Noix de palme"],
    [["pattes"], "pattes_boeuf", "Pattes de bœuf"],
    [["peau"], "peau_boeuf", "Peau de bœuf"],
    [["pebe"], "pebe", "Pèbè"],
    [["persil"], "persil", "Persil"],
    [["piment"], "piment", "Piment"],
    [["plantain"], "plantain", "Plantain"],
    [["poireau"], "poireau", "Poireau"],
    [["machoiron", "poisson-chat"], "poisson_chat", "Poisson-chat machoiron"],
    [["fume", "seche"], "poisson_fume", "Poisson fumé / séché"],
    [["poisson frais"], "poisson_frais", "Poisson frais"],
    [["poivron"], "poivron", "Poivron"],
    [["poivre"], "poivre_blanc", "Poivre blanc"],
    [["pommes de terre", "pomme de terre"], "pomme_de_terre", "Pommes de terre"],
    [["porc"], "porc", "Porc"],
    [["poulet"], "poulet", "Poulet"],
    [["hiomi", "hol"], "poudre_hiomi", "Poudre de Hiomi"],
    [["mbongo"], "poudre_mbongo", "Poudre de Mbongo"],
    [["quatre cotes", "4 cotes"], "quatre_cotes", "Quatre côtés"],
    [["romarin"], "romarin", "Romarin"],
    [["rondelles"], "rondelles", "Rondelles"],
    [["sucre"], "sucre", "Sucre"],
    [["taro"], "taro", "Taro"],
    [["thym"], "thym", "Thym"],
    [["tomate"], "tomates", "Tomates"],
    [["legumes"], "legumes", "Légumes"],
    [["manioc"], "manioc", "Manioc"]
  ];

  const match = matches.find(([terms]) => terms.every((term) => value.includes(term)));
  return match ? { key: match[1], label: match[2] } : null;
}

function cardMarkup(dish, pack, format, index) {
  const formatText = format === "single" ? "1-3 personnes" : "6-8 personnes";
  const selectId = `complement-${format}-${index}`;
  const price = priceFor(pack.complements[0], format);
  const genericComplement = pack.complements.length === 1
    && pack.complements[0].name === "Portion standard (6-8 personnes)";
  const complementControl = genericComplement
    ? `<p id="${selectId}" class="no-complement-note">Pas de complément pour ce repas</p>`
    : `<select id="${selectId}" class="static-complement">${pack.complements.map((item, optionIndex) =>
      `<option value="${optionIndex}">${escapeHtml(item.name)}</option>`).join("")}</select>`;

  return `
    <article class="static-pack" data-format="${format}" data-pack-index="${index}">
      <div class="static-pack-visual">
        <img src="../images/${escapeHtml(dish.id)}.webp" alt="${escapeHtml(dish.name)}" width="800" height="600" loading="lazy">
        <span class="static-pack-badge">${escapeHtml(pack.badge)}</span>
      </div>
      <div class="static-pack-body">
        <h3>${escapeHtml(pack.name)}</h3>
        <p class="static-pack-serves">Pour ${formatText}</p>
        <ul>${pack.ingredientsBase.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        <button class="ing-photos-btn" type="button" data-show-ingredients>Voir les ingrédients en photo</button>
        <div class="field-inline">
          <label for="${selectId}">${escapeHtml(pack.complementLabel || "Complément")}</label>
          ${complementControl}
        </div>
        <div class="price-line">
          <span class="label">Prix</span>
          <span class="value" data-static-price>${formatPrice(price)}</span>
        </div>
        <div class="static-pack-actions">
          <div class="qty-block">
            <span class="qty-label">Quantité</span>
            <div class="qty">
              <button type="button" data-qty-change="-1" aria-label="Diminuer la quantité">−</button>
              <span data-static-qty>1</span>
              <button type="button" data-qty-change="1" aria-label="Augmenter la quantité">+</button>
            </div>
          </div>
          <div class="btn-row">
            <button class="add-btn secondary" type="button" data-add-to-cart>Ajouter au panier</button>
            <button class="add-btn" type="button" data-order-now>Commander</button>
          </div>
        </div>
      </div>
    </article>`;
}

function addPageOverlays() {
  document.body.insertAdjacentHTML("beforeend", `
    <button class="cart-fab" id="staticCartFab" type="button" aria-label="Ouvrir le panier" hidden>
      🛒<span class="cart-count" id="staticCartCount">0</span>
    </button>
    <div class="ing-modal" id="staticIngredientModal" aria-hidden="true">
      <div class="ing-modal-overlay" data-close-ingredients></div>
      <div class="ing-modal-box" role="dialog" aria-modal="true" aria-labelledby="staticIngredientTitle">
        <button class="ing-modal-close" type="button" data-close-ingredients aria-label="Fermer">×</button>
        <h3 id="staticIngredientTitle">Ingrédients</h3>
        <p class="ing-modal-sub">Ce que contient ce pack, en image.</p>
        <div class="ing-grid" id="staticIngredientGrid"></div>
      </div>
    </div>
    <div class="overlay" id="staticCartOverlay" data-close-cart></div>
    <section class="drawer" id="staticCartDrawer" role="dialog" aria-modal="true" aria-labelledby="staticCartTitle">
      <div class="drawer-head">
        <h3 id="staticCartTitle">Votre commande</h3>
        <button class="close-btn" type="button" data-close-cart aria-label="Fermer">×</button>
      </div>
      <div class="drawer-body" id="staticCartItems"></div>
      <div class="drawer-foot">
        <div class="total-row"><span>Total produits</span><span id="staticProductTotal">0 FCFA</span></div>
        <div class="total-row"><span>Frais de livraison</span><span id="staticDeliveryFee">Entrez votre quartier ci-dessous</span></div>
        <div class="field">
          <label for="staticCustomerName">Nom complet</label>
          <input id="staticCustomerName" autocomplete="name" placeholder="Ex : Aïcha Mballa" required>
        </div>
        <div class="field">
          <label for="staticCustomerPhone">Numéro de téléphone</label>
          <input id="staticCustomerPhone" type="tel" autocomplete="tel" placeholder="Ex : 6XX XX XX XX" required>
        </div>
        <div class="field">
          <label for="staticDeliveryTime">Moment de livraison souhaité</label>
          <select id="staticDeliveryTime">
            <option value="">Choisissez un moment</option>
            <option value="11h - 13h (matin)">Matin — 11h à 13h</option>
            <option value="16h - 18h (soir)">Soir — 16h à 18h</option>
          </select>
        </div>
        <div class="field">
          <label for="staticCustomerDistrict">Quartier de livraison</label>
          <input id="staticCustomerDistrict" autocomplete="address-level2" placeholder="Ex : Akwa, Bonamoussadi..." required>
          <p class="quartier-fee-note" id="staticDeliveryNote"></p>
        </div>
        <div class="field">
          <label for="staticCustomerAddress">Où exactement</label>
          <textarea id="staticCustomerAddress" autocomplete="street-address" placeholder="Optionnel"></textarea>
        </div>
        <button class="whatsapp-btn" id="staticSendOrder" type="button">Envoyer sur WhatsApp</button>
      </div>
    </section>
    <p class="static-dish-error" id="staticDishError" role="alert" hidden></p>
  `);
}

function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch (error) {
    console.error("Impossible de lire le panier BLEDOO sauvegardé.", error);
    return [];
  }
}

const cart = readCart();
let activeDish;

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Impossible d’enregistrer le panier BLEDOO.", error);
  }
}

function selectedComplement(card, pack) {
  const select = card.querySelector(".static-complement");
  const index = select ? Number(select.value) : 0;
  return { item: pack.complements[index], index };
}

function currentPrice(card, pack) {
  const { item } = selectedComplement(card, pack);
  return priceFor(item, card.dataset.format);
}

function refreshCardPrice(card, pack) {
  const quantity = Number(card.querySelector("[data-static-qty]").textContent);
  card.querySelector("[data-static-price]").textContent = formatPrice(currentPrice(card, pack) * quantity);
}

function openCart() {
  document.getElementById("staticCartDrawer").classList.add("open");
  document.getElementById("staticCartOverlay").classList.add("open");
  document.body.classList.add("drawer-open");
}

function closeCart() {
  document.getElementById("staticCartDrawer").classList.remove("open");
  document.getElementById("staticCartOverlay").classList.remove("open");
  document.body.classList.remove("drawer-open");
}

function renderCart() {
  const items = document.getElementById("staticCartItems");
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  document.getElementById("staticCartCount").textContent = String(count);
  document.getElementById("staticCartFab").hidden = count === 0;
  document.getElementById("staticProductTotal").textContent = formatPrice(total);
  document.getElementById("staticSendOrder").disabled = cart.length === 0;
  items.innerHTML = cart.length
    ? cart.map((item, index) => `
      <div class="line-item">
        <div>
          <div class="li-name">${escapeHtml(item.dish)} — ${escapeHtml(item.pack)} (${escapeHtml(item.formatLabel)})</div>
          <div class="li-sub">${escapeHtml(item.complement)} — ${item.quantity} × ${formatPrice(item.unitPrice)}</div>
        </div>
        <button class="li-remove" type="button" data-remove-cart="${index}" aria-label="Retirer">×</button>
      </div>`).join("")
    : '<p class="empty-msg">Votre panier est vide pour le moment.</p>';
  updateDeliveryFee();
}

function addToCart(card, openAfter) {
  const pack = activeDish.packs[Number(card.dataset.packIndex)];
  const { item: complement } = selectedComplement(card, pack);
  const format = card.dataset.format;
  cart.push({
    dish: activeDish.name,
    pack: pack.name,
    formatLabel: format === "single" ? "Pack Single" : "Pack Familial",
    complement: complement.name,
    unitPrice: priceFor(complement, format),
    quantity: Number(card.querySelector("[data-static-qty]").textContent)
  });
  saveCart();
  renderCart();
  const button = document.getElementById("staticCartFab");
  button.classList.remove("pop");
  void button.offsetWidth;
  button.classList.add("pop");
  if (openAfter) openCart();
}

function openIngredientGallery(card) {
  const pack = activeDish.packs[Number(card.dataset.packIndex)];
  const { item: complement } = selectedComplement(card, pack);
  const ingredients = [...pack.ingredientsBase];
  if (complement) ingredients.push(complement.name);
  const photos = [];

  for (const ingredient of ingredients) {
    for (const part of ingredient.split(",")) {
      const photo = ingredientPhoto(part.trim());
      if (photo && !photos.some((entry) => entry.label === photo.label)) photos.push(photo);
    }
  }

  document.getElementById("staticIngredientTitle").textContent = `${pack.name} — Ingrédients`;
  document.getElementById("staticIngredientGrid").innerHTML = photos.map((photo) => `
    <div class="ing-item">
      <img src="../images/ingredients/${photo.key}.webp" alt="${escapeHtml(photo.label)}" loading="lazy">
      <span>${escapeHtml(photo.label)}</span>
    </div>`).join("");
  document.getElementById("staticIngredientModal").classList.add("open");
  document.getElementById("staticIngredientModal").setAttribute("aria-hidden", "false");
}

function closeIngredientGallery() {
  document.getElementById("staticIngredientModal").classList.remove("open");
  document.getElementById("staticIngredientModal").setAttribute("aria-hidden", "true");
}

function updateDeliveryFee() {
  const district = normalize(document.getElementById("staticCustomerDistrict").value.trim());
  const fee = document.getElementById("staticDeliveryFee");
  const note = document.getElementById("staticDeliveryNote");
  if (!district) {
    fee.textContent = "Entrez votre quartier ci-dessous";
    note.textContent = "";
    note.className = "quartier-fee-note";
    return;
  }
  const isFree = FREE_ZONES.some((zone) => district.includes(zone));
  fee.textContent = isFree ? "Gratuite" : formatPrice(1000);
  note.textContent = isFree
    ? "La livraison est gratuite dans votre quartier."
    : "La livraison coûte 1 000 FCFA dans votre quartier.";
  note.className = `quartier-fee-note ${isFree ? "free" : "paid"}`;
}

function sendOrder() {
  const name = document.getElementById("staticCustomerName");
  const phone = document.getElementById("staticCustomerPhone");
  const district = document.getElementById("staticCustomerDistrict");
  if (!name.value.trim() || !phone.value.trim() || !district.value.trim()) {
    [name, phone, district].find((field) => !field.value.trim()).focus();
    window.alert("Merci de renseigner votre nom, votre téléphone et votre quartier avant d'envoyer la commande.");
    return;
  }
  if (cart.length === 0) return;

  const districtName = district.value.trim();
  const deliveryFee = FREE_ZONES.some((zone) => normalize(districtName).includes(zone)) ? 0 : 1000;
  const productsTotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const lines = cart.map((item) =>
    `• ${item.dish} — ${item.pack} (${item.formatLabel}, ${item.complement}) x${item.quantity} — ${formatPrice(item.unitPrice * item.quantity)}`
  ).join("\n");
  const message = [
    "Bonjour BLEDOO, je souhaite commander :",
    "",
    lines,
    "",
    `Total produits : ${formatPrice(productsTotal)}`,
    `Frais de livraison : ${deliveryFee ? formatPrice(deliveryFee) : "Gratuite"}`,
    `Total à payer : ${formatPrice(productsTotal + deliveryFee)}`,
    "",
    "Mes coordonnées :",
    `Nom : ${name.value.trim()}`,
    `Téléphone : ${phone.value.trim()}`,
    `Quartier : ${districtName}`,
    `Moment de livraison souhaité : ${document.getElementById("staticDeliveryTime").value || "à confirmer"}`,
    `Où exactement : ${document.getElementById("staticCustomerAddress").value.trim() || "-"}`
  ].join("\n");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

async function copyPageLink(button) {
  try {
    await navigator.clipboard.writeText(window.location.href);
    button.textContent = "Lien copié !";
  } catch (error) {
    console.error("Impossible de copier le lien de cette page.", error);
    window.prompt("Copiez le lien de cette page :", window.location.href);
  }
}

async function initializeStaticDishPage() {
  addPageOverlays();
  const slug = window.location.pathname.split("/").pop().replace(/\.html$/, "");
  try {
    const response = await fetch("static-dishes.json");
    if (!response.ok) throw new Error(`Chargement des plats impossible (${response.status}).`);
    const dishes = await response.json();
    activeDish = dishes.find((dish) => dish.id === slug);
    if (!activeDish) throw new Error(`Aucune donnée statique disponible pour le plat « ${slug} ».`);

    document.querySelector(".static-dish-head h1").textContent = `Nos packs — ${activeDish.name}`;
    document.title = `Marmite de ${activeDish.name} | BLEDOO`;
    const formats = [
      { id: "single", section: document.querySelector('[aria-labelledby="single-title"]') },
      { id: "familial", section: document.querySelector('[aria-labelledby="family-title"]') }
    ];
    for (const format of formats) {
      format.section.querySelector(".static-pack-grid").innerHTML =
        activeDish.packs.map((pack, index) => cardMarkup(activeDish, pack, format.id, index)).join("");
    }
    bindPageActions();
    renderCart();
  } catch (error) {
    console.error("La page statique du plat n’a pas pu être initialisée.", error);
    const message = document.getElementById("staticDishError");
    message.hidden = false;
    message.textContent = "Les détails des packs ne sont pas disponibles pour le moment. Rechargez la page ou contactez BLEDOO sur WhatsApp.";
  }
}

function bindPageActions() {
  document.querySelectorAll(".static-pack").forEach((card) => {
    const pack = activeDish.packs[Number(card.dataset.packIndex)];
    card.querySelector(".static-complement")?.addEventListener("change", () => refreshCardPrice(card, pack));
    card.querySelectorAll("[data-qty-change]").forEach((button) => {
      button.addEventListener("click", () => {
        const quantity = card.querySelector("[data-static-qty]");
        quantity.textContent = String(Math.max(1, Number(quantity.textContent) + Number(button.dataset.qtyChange)));
        refreshCardPrice(card, pack);
      });
    });
    card.querySelector("[data-show-ingredients]").addEventListener("click", () => {
      openIngredientGallery(card);
    });
    card.querySelector("[data-add-to-cart]").addEventListener("click", () => addToCart(card, false));
    card.querySelector("[data-order-now]").addEventListener("click", () => addToCart(card, true));
  });

  document.getElementById("staticCartFab").addEventListener("click", openCart);
  document.querySelectorAll("[data-close-cart]").forEach((element) => element.addEventListener("click", closeCart));
  document.querySelectorAll("[data-close-ingredients]").forEach((element) => element.addEventListener("click", closeIngredientGallery));
  document.getElementById("staticCartItems").addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-cart]");
    if (!button) return;
    cart.splice(Number(button.dataset.removeCart), 1);
    saveCart();
    renderCart();
  });
  document.getElementById("staticCustomerDistrict").addEventListener("input", updateDeliveryFee);
  document.getElementById("staticSendOrder").addEventListener("click", sendOrder);
  document.querySelector("[data-copy-link]")?.addEventListener("click", (event) => copyPageLink(event.currentTarget));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeCart();
      closeIngredientGallery();
    }
  });
}

initializeStaticDishPage();
