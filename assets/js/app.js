  // ---------- INGREDIENT PHOTO GALLERY (tous les plats) ----------
  function matchIngredientImage(text){
    const t = text.toLowerCase();
    if(t.includes('ndolé') || t.includes('ndole')) return { img: ING_IMG.ndole, label: 'Ndolé' };
    if(t.includes('arachide')) return { img: ING_IMG.arachide, label: 'Arachides' };
    if(t.includes('oignon')) return { img: ING_IMG.oignons, label: 'Oignons' };
    if(t.includes('ail')) return { img: ING_IMG.ail, label: 'Ail' };
    if(t.includes('miondo')) return { img: ING_IMG.miondo, label: 'Miondo' };
    if(t.includes('bobolo')) return { img: ING_IMG.bobolo, label: 'Bobolo' };
    if(t.includes('écrevisse') || t.includes('ecrevisse') || t.includes('crevette')) return { img: ING_IMG.ecrevisses, label: 'Écrevisses séchées' };
    if(t.includes('sans os')) return { img: ING_IMG.viande_sans_os, label: 'Viande sans os' };
    if(t.includes('avec os')) return { img: ING_IMG.viande_avec_os, label: 'Viande avec os' };
    if(t.includes('viande de bœuf') || t.includes('viande de boeuf')) return { img: ING_IMG.viande_sans_os, label: 'Viande de bœuf' };
    if(t.includes('viande')) return { img: ING_IMG.viande_sans_os, label: 'Viande' };
    if(t.includes('aubergine')) return { img: ING_IMG.aubergine, label: 'Aubergines jaunes' };
    if(t.includes('basilic')) return { img: ING_IMG.basilic, label: 'Basilic' };
    if(t.includes('carotte')) return { img: ING_IMG.carotte, label: 'Carottes' };
    if(t.includes('céleri') || t.includes('celeri')) return { img: ING_IMG.celeri, label: 'Céleri' };
    if(t.includes('chou')) return { img: ING_IMG.chou, label: 'Chou blanc' };
    if(t.includes('girofle')) return { img: ING_IMG.girofle, label: 'Clou de girofle' };
    if(t.includes('couscous') && t.includes('gari')) return { img: ING_IMG.couscous_gari, label: 'Couscous (gari)' };
    if(t.includes('couscous') && t.includes('manioc')) return { img: ING_IMG.couscous_manioc, label: 'Couscous (manioc)' };
    if(t.includes('garri')) return { img: ING_IMG.garri, label: 'Garri' };
    if(t.includes('water fufu') || t.includes('fufu')) return { img: ING_IMG.water_fufu, label: 'Water fufu' };
    if(t.includes('djansang')) return { img: ING_IMG.djansang, label: 'Djansang' };
    if(t.includes('feuilles de manioc') || t.includes('feuille de manioc')) return { img: ING_IMG.feuille_manioc, label: 'Feuilles de manioc' };
    if(t.includes('okok') && t.includes('feuille')) return { img: ING_IMG.feuille_okok, label: "Feuille d'okok" };
    if(t.includes('folon')) return { img: ING_IMG.folon, label: 'Folon' };
    if(t.includes('gombo')) return { img: ING_IMG.gombo, label: 'Gombos frais' };
    if(t.includes('macabo')) return { img: ING_IMG.macabo, label: 'Macabo' };
    if(t.includes('gingembre')) return { img: ING_IMG.gingembre, label: 'Gingembre' };
    if(t.includes('haricots verts') || t.includes('haricot vert')) return { img: ING_IMG.haricot_vert, label: 'Haricots verts' };
    if(t.includes('haricots noirs') || t.includes('haricot noir')) return { img: ING_IMG.haricot_noir, label: 'Haricots noirs' };
    if(t.includes('huile')) return { img: ING_IMG.huile_palme, label: 'Huile de palme rouge' };
    if(t.includes('kanwa')) return { img: ING_IMG.kanwa, label: 'Kanwa' };
    if(t.includes('condiment')) return { img: ING_IMG.condiments, label: 'Condiments de la sauce jaune' };
    if(t.includes('laurier')) return { img: ING_IMG.laurier, label: 'Laurier' };
    if(t.includes('lojam') || t.includes("l'ojam") || t.includes('ojam')) return { img: ING_IMG.lojam, label: "L'Ojam" };
    if(t.includes('maïs') || t.includes('mais')) return { img: ING_IMG.mais, label: 'Maïs frais' };
    if(t.includes('messep')) return { img: ING_IMG.messep, label: 'Messep' };
    if(t.includes('noix de palme') || t.includes('noix')) return { img: ING_IMG.noix_palme, label: 'Noix de palme' };
    if(t.includes('pattes de bœuf') || t.includes('pattes de boeuf') || t.includes('pattes')) return { img: ING_IMG.pattes_boeuf, label: 'Pattes de bœuf' };
    if(t.includes('peau de bœuf') || t.includes('peau de boeuf') || t.includes('peau')) return { img: ING_IMG.peau_boeuf, label: 'Peau de bœuf' };
    if(t.includes('pèbè') || t.includes('pebe')) return { img: ING_IMG.pebe, label: 'Pèbè' };
    if(t.includes('persil')) return { img: ING_IMG.persil, label: 'Persil' };
    if(t.includes('piment')) return { img: ING_IMG.piment, label: 'Piment' };
    if(t.includes('plantain')) return { img: ING_IMG.plantain, label: 'Plantain' };
    if(t.includes('poireau')) return { img: ING_IMG.poireau, label: 'Poireau' };
    if(t.includes('poisson-chat') || t.includes('machoiron')) return { img: ING_IMG.poisson_chat, label: 'Poisson-chat machoiron' };
    if(t.includes('fumé') || t.includes('fume') || t.includes('séché') || t.includes('seche')) return { img: ING_IMG.poisson_fume, label: 'Poisson fumé / séché' };
    if(t.includes('poisson frais')) return { img: ING_IMG.poisson_frais, label: 'Poisson frais' };
    if(t.includes('poivron')) return { img: ING_IMG.poivron, label: 'Poivron' };
    if(t.includes('poivre')) return { img: ING_IMG.poivre_blanc, label: 'Poivre blanc' };
    if(t.includes('pommes de terre') || t.includes('pomme de terre')) return { img: ING_IMG.pomme_de_terre, label: 'Pommes de terre' };
    if(t.includes('porc')) return { img: ING_IMG.porc, label: 'Porc' };
    if(t.includes('poulet')) return { img: ING_IMG.poulet, label: 'Poulet' };
    if(t.includes('hiomi') || t.includes('hol')) return { img: ING_IMG.poudre_hiomi, label: 'Poudre de Hiomi' };
    if(t.includes('mbongo')) return { img: ING_IMG.poudre_mbongo, label: 'Poudre de Mbongo' };
    if(t.includes('quatre côtés') || t.includes('quatre cotes') || t.includes('4 côtés') || t.includes('4 cotes')) return { img: ING_IMG.quatre_cotes, label: 'Quatre côtés' };
    if(t.includes('romarin')) return { img: ING_IMG.romarin, label: 'Romarin' };
    if(t.includes('rondelles')) return { img: ING_IMG.rondelles, label: 'Rondelles' };
    if(t.includes('sucre')) return { img: ING_IMG.sucre, label: 'Sucre' };
    if(t.includes('taro')) return { img: ING_IMG.taro, label: 'Taro' };
    if(t.includes('thym')) return { img: ING_IMG.thym, label: 'Thym' };
    if(t.includes('tomate')) return { img: ING_IMG.tomates, label: 'Tomates' };
    if(t.includes('légumes') || t.includes('legumes')) return { img: ING_IMG.legumes, label: 'Légumes' };
    if(t.includes('manioc')) return { img: ING_IMG.manioc, label: 'Manioc' };
    return null;
  }

  // N'affiche le bouton que si au moins un ingrédient (ou le complément) a une photo disponible
  function packHasIngredientPhotos(pack){
    const hasIngredientMatch = pack.ingredientsBase.some(text =>
      text.split(',').some(part => matchIngredientImage(part.trim()))
    );
    if(hasIngredientMatch) return true;
    return pack.complements.some(c => matchIngredientImage(c.name));
  }

  function openIngredientModal(dishId, packId){
    const pack = findPackById(packId);
    if(!pack) return;

    const items = [];
    pack.ingredientsBase.forEach(text => {
      // "Oignons, ail" contient deux ingrédients à séparer
      text.split(',').forEach(part => {
        const match = matchIngredientImage(part.trim());
        if(match && !items.some(i => i.label === match.label)) items.push(match);
      });
    });

    // Ajoute le complément actuellement sélectionné (Miondo, Bobolo ou Plantains)
    const idx = currentComplementIndex(packId);
    const complementName = pack.complements[idx].name;
    const compMatch = matchIngredientImage(complementName);
    if(compMatch && !items.some(i => i.label === compMatch.label)) items.push(compMatch);

    document.getElementById('ingModalTitle').textContent = t(pack.name) + t(' — Ingrédients');
    document.getElementById('ingGrid').innerHTML = items.map(i => `
      <div class="ing-item">
        <img src="${i.img}" alt="${t(i.label)}">
        <span>${t(i.label)}</span>
      </div>
    `).join('');

    document.getElementById('ingModal').classList.add('open');
  }

  function closeIngredientModal(){
    document.getElementById('ingModal').classList.remove('open');
  }

  function findPackById(packId){
    for(const dish of dishes){
      const p = dish.packs.find(p => p.id === packId);
      if(p) return p;
    }
    return null;
  }

  function findCustomById(customId){
    const dish = dishes.find(d => d.customPack.id === customId);
    return dish ? dish.customPack : null;
  }

  function currentComplementIndex(packId){
    const sel = document.getElementById('complement-' + packId);
    return sel ? parseInt(sel.value, 10) : 0;
  }

  function currentPackPrice(pack){
    const idx = currentComplementIndex(pack.id);
    return complementDisplayPrice(pack.complements[idx]);
  }

  function updatePackPrice(packId){
    const pack = findPackById(packId);
    const price = currentPackPrice(pack) * qtyState[packId];
    document.getElementById('price-' + packId).textContent = fmt(price);
  }

  function customBasePrice(customPack){
    if(currentFormat === 'single' && typeof customPack.singleBasePrice === 'number'){
      return customPack.singleBasePrice;
    }
    return customPack.basePrice;
  }

  function addonPrice(addon){
    if(currentFormat === 'single' && typeof addon.singlePrice === 'number'){
      return addon.singlePrice;
    }
    return addon.price;
  }

  function updateCustomPrice(customId){
    const customPack = findCustomById(customId);
    let total = customBasePrice(customPack);
    customPack.addons.forEach(a => {
      const cb = document.getElementById('addon-' + a.id);
      if(cb && cb.checked) total += addonPrice(a);
    });
    total *= qtyState[customId];
    document.getElementById('price-' + customId).textContent = fmt(total);
  }

  function changeQty(id, delta){
    qtyState[id] = Math.max(1, qtyState[id] + delta);
    document.getElementById('qty-' + id).textContent = qtyState[id];

    if(findCustomById(id)){
      updateCustomPrice(id);
    } else {
      updatePackPrice(id);
    }
  }

  // ---------- DISH SELECTION ----------
  function renderDishSelect(){
    renderDishCards(dishes);
  }

  function renderDishCards(list){
    const grid = document.getElementById('dishGrid');
    const emptyMsg = document.getElementById('dishSearchEmpty');
    if(list.length === 0){
      grid.innerHTML = '';
      emptyMsg.style.display = 'block';
      return;
    }
    emptyMsg.style.display = 'none';
    grid.innerHTML = list.map(dish => `
      <div class="dish-card" onclick="selectDish('${dish.id}')">
        <div class="dish-photo">
          <img src="${dish.photo}" alt="${t(dish.name)}">
        </div>
        <div class="dish-info">
          <h3>${t(dish.homeLabel || dish.name)}</h3>
          <span class="dish-cta" data-i18n="Voir les packs →">${t('Voir les packs →')}</span>
          <a class="dish-page-link" href="${dish.id}.html" onclick="event.stopPropagation();">${t('Fiche du plat')}</a>
        </div>
      </div>
    `).join('');
  }

  function renderHeroPhoto(){
    const heroImg = document.getElementById('heroPhoto');
    if(!heroImg || !dishes.length) return;
    const featured = dishes[0];
    heroImg.src = featured.photo;
    heroImg.alt = t(featured.homeLabel || featured.name);
  }

  function filterDishes(){
    const rawValue = document.getElementById('dishSearch').value;
    const query = normalizeText(rawValue);
    const grid = document.getElementById('dishGrid');
    const icon = document.getElementById('dishSearchIcon');

    if(rawValue){
      icon.innerHTML = ICONS.close;
      icon.classList.add('clearable');
    } else {
      icon.innerHTML = ICONS.search;
      icon.classList.remove('clearable');
    }

    if(!query){
      grid.classList.remove('search-active');
      renderDishCards(dishes);
      return;
    }
    grid.classList.add('search-active');
    const filtered = dishes.filter(dish =>
      normalizeText(dish.name).includes(query) ||
      normalizeText(dish.homeLabel || '').includes(query)
    );
    renderDishCards(filtered);
  }

  function clearDishSearch(){
    const input = document.getElementById('dishSearch');
    if(!input.value) return;
    input.value = '';
    filterDishes();
    input.focus();
  }

  // Met à jour uniquement l'affichage (aucune manipulation d'historique ici)
  function showPacksView(dishId, format){
    currentDish = dishId;
    currentFormat = format || 'familial';
    const dish = dishes.find(d => d.id === dishId);
    document.getElementById('dishTitle').textContent = t("Nos packs — ") + t(dish.name);
    document.getElementById('formatIndicator').textContent = currentFormat === 'single'
      ? t("Format : Pack Single (1-3 personnes)")
      : t("Format : Pack Familial (6-8 personnes)");
    document.getElementById('dishSelectSection').style.display = 'none';
    document.getElementById('formatChoiceSection').style.display = 'none';
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.how-it-works').style.display = 'none';
    document.querySelector('.free-delivery').style.display = 'none';
    document.querySelector('.info-strip').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
    document.getElementById('products').style.display = 'block';
    document.getElementById('cartFab').style.display = cart.length > 0 ? 'flex' : 'none';
    document.getElementById('homeFab').style.display = 'flex';
    renderProducts();
  }

  function showFormatChoice(dishId){
    currentDish = dishId;
    const dish = dishes.find(d => d.id === dishId);
    document.getElementById('formatDishTitle').textContent = t("Choisissez votre format — ") + t(dish.name);
    document.getElementById('dishSelectSection').style.display = 'none';
    document.getElementById('products').style.display = 'none';
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.how-it-works').style.display = 'none';
    document.querySelector('.free-delivery').style.display = 'none';
    document.querySelector('.info-strip').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
    document.getElementById('cartFab').style.display = 'none';
    document.getElementById('homeFab').style.display = 'none';
    document.getElementById('formatChoiceSection').style.display = 'block';
    renderFormatChoice();
  }

  function renderFormatChoice(){
    const grid = document.getElementById('formatGrid');
    grid.innerHTML = `
      <div class="dish-card" onclick="chooseFormat('single')">
        <div class="dish-info">
          <div class="format-icon"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"></path></svg></div>
          <h3>${t('Pack Single')}</h3>
          <p class="dish-serves">${t('Pour 1 à 3 personnes')}</p>
        </div>
      </div>
      <div class="dish-card" onclick="chooseFormat('familial')">
        <div class="dish-info">
          <div class="format-icon"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8.5" cy="8" r="3.2"></circle><path d="M2.5 20c0-3.6 2.7-6.5 6-6.5s6 2.9 6 6.5"></path><circle cx="17" cy="9" r="2.5"></circle><path d="M15.2 13.8c2.5.4 4.3 2.7 4.3 5.5"></path></svg></div>
          <h3>${t('Pack Familial')}</h3>
          <p class="dish-serves">${t('Pour 6 à 8 personnes')}</p>
        </div>
      </div>
    `;
  }

  function chooseFormat(format){
    showPacksView(currentDish, format);
    try {
      history.pushState({ view: 'packs', dish: currentDish, format: format }, '');
    } catch(e) { /* environnement restreint : navigation encore fonctionnelle sans historique */ }
    document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function showDishSelectView(){
    currentDish = null;
    document.getElementById('products').style.display = 'none';
    document.getElementById('formatChoiceSection').style.display = 'none';
    document.querySelector('.hero').style.display = '';
    document.querySelector('.how-it-works').style.display = '';
    document.querySelector('.free-delivery').style.display = '';
    document.querySelector('.info-strip').style.display = '';
    document.querySelector('footer').style.display = '';
    document.getElementById('dishSelectSection').style.display = 'block';
    document.getElementById('cartFab').style.display = 'none';
    document.getElementById('homeFab').style.display = 'none';
  }

  // Actions déclenchées par un clic utilisateur : elles gèrent l'historique du navigateur
  function selectDish(dishId){
    showFormatChoice(dishId);
    try {
      history.pushState({ view: 'format', dish: dishId }, '');
    } catch(e) { /* environnement restreint : navigation encore fonctionnelle sans historique */ }
    document.getElementById('formatChoiceSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function goBackToDishes(){
    if(directDishEntry){
      directDishEntry = false;
      hasDirectFormatHistory = false;
      showDishSelectView();
      try {
        history.replaceState({ view: 'dishes' }, '', window.location.pathname + window.location.search);
      } catch(e) { /* navigation remains available if history is restricted */ }
      document.getElementById('dishSelectSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    history.back();
  }

  function goBackToFormat(){
    if(!currentDish) return;
    if(directDishEntry && !hasDirectFormatHistory){
      hasDirectFormatHistory = true;
      try {
        history.replaceState({ view: 'format', dish: currentDish }, '', window.location.href);
      } catch(e) { /* navigation remains available if history is restricted */ }
      showFormatChoice(currentDish);
      document.getElementById('formatChoiceSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    history.back();
  }

  function goToHome(){
    showDishSelectView();
    try {
      history.pushState({ view: 'dishes' }, '');
    } catch(e) { /* environnement restreint : navigation encore fonctionnelle sans historique */ }
    document.getElementById('dishSelectSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Bouton "retour" physique du téléphone / navigateur
  window.addEventListener('popstate', function(e){
    const state = e.state;
    if(state && state.view === 'packs'){
      showPacksView(state.dish, state.format);
    } else if(state && state.view === 'format'){
      showFormatChoice(state.dish);
    } else {
      showDishSelectView();
    }
  });


  function renderProducts(){
    if(!currentDish) return;
    const dish = dishes.find(d => d.id === currentDish);
    const packs = dish.packs;
    const customPack = dish.customPack;
    const grid = document.getElementById('productGrid');

    const packCards = packs.map(p => `
      <div class="card">
        <div class="card-visual"${p.photo ? ` style="background-image:url('${p.photo}');background-size:cover;background-position:center;"` : ''}>
          <span class="badge">${t(p.badge)}</span>
        </div>
        <div class="card-body">
          <h3>${t(p.name)}</h3>
          <p class="serves-note">${ICONS.people}${currentFormat === 'single' ? t('Pour 1-3 personnes') : t('Pour 6-8 personnes')}</p>
          <ul class="ingredient-list">
            ${p.ingredientsBase.map(i => `<li>${t(i)}</li>`).join('')}
          </ul>
          ${packHasIngredientPhotos(p) ? `<button class="ing-photos-btn" onclick="openIngredientModal('${dish.id}','${p.id}')"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px; margin-right:0.35em;"><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"></path><circle cx="12" cy="14" r="3.4"></circle></svg>${t('Voir les ingrédients en photo')}</button>` : ''}
          <div class="field-inline">
            <label>${t(p.complementLabel)}</label>
            ${isGenericComplement(p.complements) ? `
              <p class="no-complement-note">${t('Pas de complément pour ce repas')}</p>
            ` : `
              <select id="complement-${p.id}" onchange="updatePackPrice('${p.id}')">
                ${p.complements.map((c, idx) => `<option value="${idx}">${t(c.name)}</option>`).join('')}
              </select>
            `}
          </div>
          <div class="price-line">
            <span class="label">${t('Prix')}</span>
            <span class="value" id="price-${p.id}">${fmt(complementDisplayPrice(p.complements[0]))}</span>
          </div>
          <div class="card-actions">
            <div class="qty-block">
              <span class="qty-label">${t('Quantité')}</span>
              <div class="qty">
                <button onclick="changeQty('${p.id}', -1)">−</button>
                <span id="qty-${p.id}">${qtyState[p.id]}</span>
                <button onclick="changeQty('${p.id}', 1)">+</button>
              </div>
            </div>
            <div class="btn-row">
              <button class="add-btn secondary" onclick="addPackToCart('${p.id}', false)">${t('Ajouter au panier')}</button>
              <button class="add-btn" onclick="addPackToCart('${p.id}', true)">${t('Commander')}</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    const customCard = `
      <div class="card">
        <div class="card-visual">
          <span class="badge">${t(customPack.badge)}</span>
        </div>
        <div class="card-body">
          <h3>${t(customPack.name)}</h3>
          <p class="serves-note">${ICONS.people}${currentFormat === 'single' ? t('Pour 1-3 personnes') : t('Pour 6-8 personnes')}</p>
          <ul class="ingredient-list">
            <li>${t('Base : ')}${t(dish.name)}${t(customPack.baseSuffix || ', arachides, oignons, ail, écrevisses')}</li>
          </ul>
          ${customPack.addons.map(a => `
            <div class="checkbox-row">
              <label>
                <input type="checkbox" id="addon-${a.id}" onchange="updateCustomPrice('${customPack.id}')">
                ${t(a.name)}
              </label>
              <span class="addon-price">+${fmt(addonPrice(a))}</span>
            </div>
          `).join('')}
          <div class="price-line">
            <span class="label">${t('Prix de base : ')}${fmt(customBasePrice(customPack))}</span>
            <span class="value" id="price-${customPack.id}">${fmt(customBasePrice(customPack))}</span>
          </div>
          <div class="card-actions">
            <div class="qty-block">
              <span class="qty-label">${t('Quantité')}</span>
              <div class="qty">
                <button onclick="changeQty('${customPack.id}', -1)">−</button>
                <span id="qty-${customPack.id}">${qtyState[customPack.id]}</span>
                <button onclick="changeQty('${customPack.id}', 1)">+</button>
              </div>
            </div>
            <div class="btn-row">
              <button class="add-btn secondary" onclick="addCustomToCart('${customPack.id}', false)">${t('Ajouter au panier')}</button>
              <button class="add-btn" onclick="addCustomToCart('${customPack.id}', true)">${t('Commander')}</button>
            </div>
          </div>
          <div class="wa-inline">
            ${t("Besoin d'autre chose ? Décrivez votre pack sur")}
            <a href="${waLink(t('Bonjour BLEDOO, je souhaite créer un pack ') + dish.name + t(' personnalisé. Voici ce que je veux : '))}" target="_blank">${t('WhatsApp (ligne 1)')}</a>
            ${t('ou')}
            <a href="${waLink(t('Bonjour BLEDOO, je souhaite créer un pack ') + dish.name + t(' personnalisé. Voici ce que je veux : '), WHATSAPP_NUMBER_2)}" target="_blank">${t('WhatsApp (ligne 2)')}</a>
          </div>
        </div>
      </div>
    `;

    grid.innerHTML = packCards + customCard;
  }

  function bounceCartFab(){
    const fab = document.getElementById('cartFab');
    fab.classList.remove('pop');
    void fab.offsetWidth; // force le navigateur à relancer l'animation
    fab.classList.add('pop');
  }

  function addPackToCart(packId, openDrawer){
    const pack = findPackById(packId);
    const idx = currentComplementIndex(packId);
    const qty = qtyState[packId];

    cart.push({
      kind: 'pack',
      dishId: currentDish,
      packId: packId,
      complementIdx: idx,
      format: currentFormat,
      unitPrice: currentPackPrice(pack),
      qty: qty
    });

    qtyState[packId] = 1;
    renderProducts();
    renderCart();
    bounceCartFab();
    if(openDrawer){
      openCart();
    }
  }

  function addCustomToCart(customId, openDrawer){
    const customPack = findCustomById(customId);
    const dish = dishes.find(d => d.customPack.id === customId);
    const chosenAddonIds = customPack.addons.filter(a => document.getElementById('addon-' + a.id).checked).map(a => a.id);
    const unitPrice = customBasePrice(customPack) + customPack.addons
      .filter(a => chosenAddonIds.includes(a.id))
      .reduce((s, a) => s + addonPrice(a), 0);
    const qty = qtyState[customId];

    cart.push({
      kind: 'custom',
      dishId: dish ? dish.id : null,
      customId: customId,
      addonIds: chosenAddonIds,
      format: currentFormat,
      unitPrice: unitPrice,
      qty: qty
    });

    customPack.addons.forEach(a => { document.getElementById('addon-' + a.id).checked = false; });
    qtyState[customId] = 1;
    updateCustomPrice(customId);
    renderProducts();
    renderCart();
    bounceCartFab();
    if(openDrawer){
      openCart();
    }
  }

  function removeFromCart(index){
    cart.splice(index, 1);
    renderCart();
  }

  // Regénère le libellé et le détail d'une ligne de panier dans la langue
  // actuelle, à partir des identifiants stockés (permet de changer de langue
  // sans figer le contenu du panier dans l'ancienne langue).
  function cartItemLabelDetail(item){
    const formatLabel = item.format === 'single' ? t('Pack Single') : t('Pack Familial');
    if(item.kind === 'pack'){
      const pack = findPackById(item.packId);
      const dish = dishes.find(d => d.id === item.dishId);
      const dishName = dish ? dish.name : '';
      const label = (dishName ? dishName + t(' — ') : '') + (pack ? t(pack.name) : '') + ' (' + formatLabel + ')';
      const detail = pack && pack.complements[item.complementIdx] ? t(pack.complements[item.complementIdx].name) : '';
      return { label: label, detail: detail };
    } else {
      const customPack = findCustomById(item.customId);
      const dish = dishes.find(d => d.id === item.dishId);
      const label = (dish ? (dish.name + t(' — ') + t(customPack ? customPack.name : '')) : (customPack ? t(customPack.name) : '')) + ' (' + formatLabel + ')';
      const addonNames = customPack ? customPack.addons.filter(a => item.addonIds.includes(a.id)).map(a => t(a.name)) : [];
      const detail = addonNames.length ? t('Base + ') + addonNames.join(', ') : t('Base seule');
      return { label: label, detail: detail };
    }
  }

  function renderCart(){
    const body = document.getElementById('drawerBody');
    let count = 0;
    let total = 0;

    if(cart.length === 0){
      body.innerHTML = '<p class="empty-msg">' + t('Votre panier est vide pour le moment.') + '</p>';
    } else {
      body.innerHTML = cart.map((item, index) => {
        count += item.qty;
        total += item.qty * item.unitPrice;
        const ld = cartItemLabelDetail(item);
        return `
          <div class="line-item">
            <div>
              <div class="li-name">${ld.label}</div>
              <div class="li-sub">${ld.detail} — ${item.qty} × ${fmt(item.unitPrice)}</div>
            </div>
            <button class="li-remove" onclick="removeFromCart(${index})" aria-label="${t('Retirer')}" title="${t('Retirer')}">${ICONS.trash}</button>
          </div>
        `;
      }).join('');
    }

    document.getElementById('cartCount').textContent = count;
    document.getElementById('totalPrice').textContent = fmt(total);
    document.getElementById('waBtn').disabled = cart.length === 0;
    const onPacksView = document.getElementById('products').style.display === 'block';
    if(onPacksView){
      document.getElementById('cartFab').style.display = cart.length > 0 ? 'flex' : 'none';
    }
  }

  let scrollLockY = 0;
  function openCart(){
    document.getElementById('drawer').classList.add('open');
    document.getElementById('overlay').classList.add('open');
    scrollLockY = window.scrollY || window.pageYOffset;
    document.body.style.position = 'fixed';
    document.body.style.top = -scrollLockY + 'px';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  }
  function closeCart(){
    document.getElementById('drawer').classList.remove('open');
    document.getElementById('overlay').classList.remove('open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollLockY);
  }

  // ==========================================================================
  // PARAMÈTRES : volume, langue, apparence
  // ==========================================================================
  function openSettings(){
    document.getElementById('settingsPanel').classList.add('open');
    document.getElementById('settingsOverlay').classList.add('open');
    scrollLockY = window.scrollY || window.pageYOffset;
    document.body.style.position = 'fixed';
    document.body.style.top = -scrollLockY + 'px';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  }
  function closeSettings(){
    document.getElementById('settingsPanel').classList.remove('open');
    document.getElementById('settingsOverlay').classList.remove('open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollLockY);
  }

  // ---------- APPARENCE (clair/sombre) ----------
  const THEME_KEY = 'bledoo_theme';

  function applyTheme(theme){
    if(theme === 'dark'){
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    const lightBtn = document.getElementById('themeBtnLight');
    const darkBtn = document.getElementById('themeBtnDark');
    if(lightBtn && darkBtn){
      lightBtn.classList.toggle('active', theme !== 'dark');
      darkBtn.classList.toggle('active', theme === 'dark');
    }
  }

  function setTheme(theme){
    theme = (theme === 'dark') ? 'dark' : 'light';
    try { localStorage.setItem(THEME_KEY, theme); } catch(e){ /* mémorisation best-effort */ }
    applyTheme(theme);
  }

  function getStoredTheme(){
    // Toujours "clair" par défaut : on ne suit jamais la préférence système,
    // le mode sombre est activé uniquement par un choix explicite du client.
    let theme = 'light';
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if(saved === 'dark' || saved === 'light') theme = saved;
    } catch(e){ /* stockage indisponible : mode clair par défaut */ }
    return theme;
  }

  // ---------- VOLUME ----------
  function updateVolumeUI(vol){
    const pct = Math.round(vol * 100);
    const range = document.getElementById('settingsVolumeRange');
    const label = document.getElementById('settingsVolValue');
    const icon = document.getElementById('settingsVolIcon');
    if(range){ range.value = pct; range.style.setProperty('--range-percent', pct + '%'); }
    if(label) label.textContent = pct + '%';
    if(icon) icon.innerHTML = pct === 0 ? ICONS.soundOff : (pct < 50 ? ICONS.soundLow : ICONS.soundOn);
  }

  function initSettingsControls(){
    updateVolumeUI(soundManager.getVolume());
    const range = document.getElementById('settingsVolumeRange');
    if(range){
      range.addEventListener('input', function(){
        const v = parseInt(range.value, 10) / 100;
        updateVolumeUI(v);
        soundManager.setVolume(v, {silent:true});
      });
    }
    applyTheme(getStoredTheme());
    applyLanguageUI(currentLanguage);
  }

  function sendOrder(line){
    if(cart.length === 0) return;

    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const quartier = document.getElementById('custQuartier').value.trim();
    const deliveryTime = document.getElementById('custDeliveryTime').value.trim();
    const address = document.getElementById('custAddress').value.trim();

    if(!name || !phone || !quartier){
      alert(t("Merci de renseigner votre nom, votre téléphone et votre quartier avant d'envoyer la commande."));
      return;
    }

    let total = 0;
    const lines = cart.map(item => {
      const lineTotal = item.qty * item.unitPrice;
      total += lineTotal;
      const ld = cartItemLabelDetail(item);
      return `• ${ld.label} (${ld.detail}) x${item.qty} — ${fmt(lineTotal)}`;
    }).join('\n');

    const free = isFreeZone(quartier);
    const deliveryFee = free ? 0 : DELIVERY_FEE;
    const deliveryLabel = free ? t("Gratuite") : fmt(DELIVERY_FEE);
    const grandTotal = total + deliveryFee;

    const message =
`${t('Bonjour BLEDOO, je souhaite commander :')}

${lines}

${t('Total produits : ')}${fmt(total)}
${t('Frais de livraison : ')}${deliveryLabel}
${t('Total à payer : ')}${fmt(grandTotal)}

${t('Mes coordonnées :')}
${t('Nom : ')}${name}
${t('Téléphone : ')}${phone}
${t('Quartier : ')}${quartier}
${t('Moment de livraison souhaité : ')}${t(deliveryTime) || t('à confirmer')}
${t('Où exactement : ')}${address || t('-')}`;

    const target = line === 2 ? WHATSAPP_NUMBER_2 : WHATSAPP_NUMBER;
    soundManager.play('success');
    window.open(waLink(message, target), '_blank');
  }

  try {
    history.replaceState({ view: 'dishes' }, '');
  } catch(e) { /* environnement restreint : navigation encore fonctionnelle sans historique */ }
  applyStaticTranslations();
  applyLanguageUI(currentLanguage);
  initSettingsControls();
  renderDishSelect();
  renderCart();
  renderHeroPhoto();

  let directDishEntry = false;
  let hasDirectFormatHistory = false;

  // Deep links support both legacy dish hashes and explicit single-pack links.
  function tryDeepLink(){
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const singleSuffix = '-single';
    const format = hash.endsWith(singleSuffix) ? 'single' : 'familial';
    const dishId = format === 'single' ? hash.slice(0, -singleSuffix.length) : hash;
    const dish = dishes.find(d => d.id === dishId);
    if(dish){
      directDishEntry = true;
      hasDirectFormatHistory = false;
      showPacksView(dish.id, format);
      try {
        history.replaceState({ view: 'packs', dish: dish.id, format: format }, '');
      } catch(e) { /* environnement restreint */ }
      return true;
    }
    directDishEntry = false;
    hasDirectFormatHistory = false;
    return false;
  }
  tryDeepLink();
  window.addEventListener('hashchange', tryDeepLink);

  function copyDishLink(){
    if(!currentDish) return;
    const base = window.location.href.split('#')[0];
    const link = base + '#' + currentDish + (currentFormat === 'single' ? '-single' : '');
    const btn = document.getElementById('copyLinkBtn');
    const done = () => {
      const original = btn.innerHTML;
      btn.innerHTML = ICONS.check + '<span>' + t('Lien copié !') + '</span>';
      setTimeout(() => { btn.innerHTML = original; }, 2000);
    };
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(link).then(done).catch(() => {
        window.prompt(t('Copiez ce lien :'), link);
      });
    } else {
      window.prompt(t('Copiez ce lien :'), link);
    }
  }

  // Empêche le panier flottant de dépasser dans le footer (barre verte)
  const cartFab = document.querySelector('.cart-fab');
  const siteFooter = document.querySelector('footer');
  const fabBottomOffset = parseFloat(getComputedStyle(cartFab).bottom) || 20;
  function adjustFabPosition(){
    if(getComputedStyle(siteFooter).display === 'none'){
      cartFab.style.transform = '';
      return;
    }
    const footerTop = siteFooter.getBoundingClientRect().top;
    const fabBottomY = window.innerHeight - fabBottomOffset;
    if(footerTop < fabBottomY){
      const lift = fabBottomY - footerTop;
      cartFab.style.transform = `translateY(-${lift}px)`;
    } else {
      cartFab.style.transform = '';
    }
  }

  // Logo du header : grand et centré en haut de page, reprend sa taille
  // et sa position normales (petit, à gauche) dès qu'on défile.
  const siteHeader = document.querySelector('header');
  const brandLogo = document.querySelector('.brand img');
  const HEADER_SCROLL_THRESHOLD = 40;
  function updateLogoCenterOffset(){
    if(!siteHeader || !brandLogo) return;
    const headerCenter = siteHeader.clientWidth / 2;
    const logoCenter = brandLogo.offsetLeft + (brandLogo.offsetWidth / 2);
    document.documentElement.style.setProperty('--logo-center-offset', (headerCenter - logoCenter) + 'px');
  }
  function updateHeaderScrollState(){
    if(!siteHeader) return;
    siteHeader.classList.toggle('scrolled', (window.scrollY || window.pageYOffset) > HEADER_SCROLL_THRESHOLD);
  }

  // Regroupe les ajustements dans une seule frame pour éviter le glitch au scroll
  let scrollTicking = false;
  function onScroll(){
    if(!scrollTicking){
      window.requestAnimationFrame(() => {
        adjustFabPosition();
        updateHeaderScrollState();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { adjustFabPosition(); updateLogoCenterOffset(); });
  adjustFabPosition();
  updateLogoCenterOffset();
  updateHeaderScrollState();
