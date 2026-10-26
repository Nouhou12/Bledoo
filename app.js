/* BLEDOO : script partagé (panier, prix, livraison, message WhatsApp) */
(function () {
  'use strict';
  var WA1 = '237678699309', WA2 = '237681862579', FEE = 1000;
  var FREE = ['Akwa', 'Bonabéri', 'Bonamoussadi', 'Deido', 'Bonanjo', 'Bonapriso', 'Makepe', 'Logpom', 'Logbessou', 'Ndokoti', 'Kotto', 'Bali', 'Nkongmondo', 'Bépanda', 'Newbel', 'Mboppi'];
  var DISH_IDS = ['ndole', 'eru', 'okok', 'pile', 'kondre', 'kwem', 'legumes-sautes', 'sanga', 'poulet-dg', 'poisson-braise', 'bouillon-boeuf', 'mbongo-tchobi', 'sauce-jaune', 'sauce-gombo', 'chou-arachides', 'banane-malaxee', 'riz-saute', 'poulet-saute-legumes', 'spaghetti-saute', 'beignets', 'gateau', 'croissants'];

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function norm(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim(); }
  function fmt(n) { return n.toLocaleString('fr-FR') + ' FCFA'; }

  // Stockage (avec repli en mémoire si le navigateur le bloque)
  var mem = {};
  function load(k) { try { var v = localStorage.getItem(k); return v === null ? mem[k] : JSON.parse(v); } catch (e) { return mem[k]; } }
  function save(k, v) { mem[k] = v; try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  function getQuartier() { return load('bledoo_quartier') || ''; }
  function setQuartier(q) { save('bledoo_quartier', (q || '').trim()); }
  function getCart() { var c = load('bledoo_cart'); return Array.isArray(c) ? c : []; }
  function saveCart(c) { save('bledoo_cart', c); updateBadge(); }
  function isFree(q) {
    var n = norm(q || '');
    if (!n) return null;
    return FREE.some(function (z) { return n.indexOf(norm(z)) > -1; });
  }
  function cartCount() { return getCart().reduce(function (s, i) { return s + i.qty; }, 0); }

  function updateBadge() {
    var n = cartCount(), b = $('#cartCount'), bar = $('#cartBar'), bn = $('#cartBarN');
    if (b) { b.textContent = n; b.hidden = n === 0; }
    if (bar) { bar.hidden = n === 0; if (bn) bn.textContent = n; }
  }

  // Quartier passé dans l'adresse (?quartier=Deido)
  var qp = new URLSearchParams(location.search).get('quartier');
  if (qp) setQuartier(qp);

  // Anciens liens du type index.html#ndole : on envoie vers la page du plat
  var h = location.hash.replace('#', '');
  if (h && DISH_IDS.indexOf(h) > -1 && $('body').getAttribute('data-page') === 'home') {
    location.replace('/' + h + '.html');
    return;
  }

  var page = $('body').getAttribute('data-page');

  // ---------- Accueil ----------
  function initHome() {
    var form = $('#locator');
    if (form) form.addEventListener('submit', function () { setQuartier($('#quartier').value); });
    $$('.chip').forEach(function (a) {
      a.addEventListener('click', function () { setQuartier(a.getAttribute('data-q')); });
    });
    var inp = $('#quartier');
    if (inp && getQuartier()) inp.value = getQuartier();
  }

  // ---------- Liste des plats ----------
  function initPlats() {
    var q = getQuartier(), f = isFree(q);
    var name = $('#locName');
    if (name) name.textContent = q || 'Choisis ton quartier';
    var state = f === null ? 'unknown' : (f ? 'free' : 'paid');
    $$('[data-state]').forEach(function (el) { el.hidden = el.getAttribute('data-state') !== state; });
    var s = $('#dishSearch');
    var filters = $$('.dish-filter');
    var selectedCategory = 'all';
    function filterDishes() {
      var query = norm(s ? s.value : ''), shown = 0;
      $$('.dish-card').forEach(function (card) {
        var section = card.closest('[data-category-section]');
        var matchesCategory = selectedCategory === 'all' || section.getAttribute('data-category-section') === selectedCategory;
        var searchable = norm((card.getAttribute('data-search') || '') + ' ' + (card.getAttribute('data-name') || ''));
        var matchesSearch = !query || searchable.indexOf(query) > -1;
        card.hidden = !matchesCategory || !matchesSearch;
        if (!card.hidden) shown++;
      });
      $$('[data-category-section]').forEach(function (section) {
        section.hidden = !$$('.dish-card', section).some(function (card) { return !card.hidden; });
      });
      var noResult = $('#noResult');
      if (noResult) noResult.hidden = shown > 0;
    }
    if (s) s.addEventListener('input', filterDishes);
    filters.forEach(function (button) {
      button.addEventListener('click', function () {
        selectedCategory = button.getAttribute('data-filter');
        filters.forEach(function (filter) {
          var active = filter === button;
          filter.classList.toggle('active', active);
          filter.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        filterDishes();
      });
    });
    if (filters.length) filterDishes();
  }

  // ---------- Page d'un plat ----------
  var mode = 'familial';
  function unitOf(el) { return +el.getAttribute('data-' + mode); }
  function modeLabel() { return mode === 'single' ? 'Pack Single' : 'Pack Familial'; }
  function qtyOf(card) { return +$('.qty-n', card).textContent; }

  function packUnit(card) {
    var sel = $('.complement', card);
    return sel ? unitOf(sel.options[sel.selectedIndex]) : unitOf(card);
  }
  function customUnit(card) {
    var total = unitOf($('.base', card));
    $$('.addon input', card).forEach(function (cb) { if (cb.checked) total += unitOf(cb); });
    return total;
  }
  function refresh() {
    $$('.serves-txt').forEach(function (e) { e.textContent = mode === 'single' ? 'Pour 1-3 personnes' : 'Pour 6-8 personnes'; });
    $$('.pack-card[data-kind="pack"]').forEach(function (c) { $('.price', c).textContent = fmt(packUnit(c) * qtyOf(c)); });
    $$('.pack-card[data-kind="custom"]').forEach(function (c) {
      $('.base-price', c).textContent = fmt(unitOf($('.base', c)));
      $$('.checkbox-row', c).forEach(function (l) { var cb = $('input', l); $('.addon-price', l).textContent = '+' + fmt(unitOf(cb)); });
      $('.price', c).textContent = fmt(customUnit(c) * qtyOf(c));
    });
  }

  function flash(btn) {
    var old = btn.getAttribute('data-label') || btn.textContent;
    btn.setAttribute('data-label', old);
    btn.textContent = 'Ajouté ✓';
    setTimeout(function () { btn.textContent = old; }, 1600);
  }

  function initDish() {
    var dishName = $('main').getAttribute('data-dish-name');
    var packSizeModal = $('#packSizeModal');
    var packFormatValue = $('#packFormatValue');
    var changePackFormat = $('#changePackFormat');
    var confirmPackFormat = $('#confirmPackFormat');
    function openPackSize() {
      if (!packSizeModal) return;
      packSizeModal.classList.add('open');
      packSizeModal.setAttribute('aria-hidden', 'false');
      $('input[name="format"]:checked', packSizeModal).focus();
    }
    function closePackSize() {
      if (!packSizeModal) return;
      packSizeModal.classList.remove('open');
      packSizeModal.setAttribute('aria-hidden', 'true');
      if (changePackFormat) changePackFormat.focus();
    }
    $$('input[name="format"]').forEach(function (r) {
      r.addEventListener('change', function () {
        mode = r.value;
        if (packFormatValue) packFormatValue.textContent = modeLabel();
        refresh();
      });
    });
    if (changePackFormat) changePackFormat.addEventListener('click', openPackSize);
    if (confirmPackFormat) confirmPackFormat.addEventListener('click', closePackSize);
    if (packSizeModal) openPackSize();
    $$('.pack-card').forEach(function (card) {
      var sel = $('.complement', card);
      if (sel) sel.addEventListener('change', refresh);
      $$('.addon input', card).forEach(function (cb) { cb.addEventListener('change', refresh); });
      $('.qty-minus', card).addEventListener('click', function () {
        var n = $('.qty-n', card); if (+n.textContent > 1) { n.textContent = +n.textContent - 1; refresh(); }
      });
      $('.qty-plus', card).addEventListener('click', function () {
        var n = $('.qty-n', card); n.textContent = +n.textContent + 1; refresh();
      });
      function addToCart(btn, goCart) {
        var item;
        if (card.getAttribute('data-kind') === 'custom') {
          var names = $$('.addon input', card).filter(function (c) { return c.checked; }).map(function (c) { return c.getAttribute('data-name'); });
          item = { label: dishName + ' — Crée ton pack (' + modeLabel() + ')', detail: names.length ? 'Base + ' + names.join(', ') : 'Base seule', unit: customUnit(card), qty: qtyOf(card) };
          $$('.addon input', card).forEach(function (c) { c.checked = false; });
        } else {
          item = { label: dishName + ' — ' + card.getAttribute('data-name') + ' (' + modeLabel() + ')', detail: sel ? sel.options[sel.selectedIndex].text : '', unit: packUnit(card), qty: qtyOf(card) };
        }
        var cart = getCart(); cart.push(item); saveCart(cart);
        $('.qty-n', card).textContent = '1';
        refresh();
        if (goCart) { location.href = '/panier.html'; } else { flash(btn); }
      }
      $('.add', card).addEventListener('click', function () { addToCart(this, false); });
      $('.order', card).addEventListener('click', function () { addToCart(this, true); });
      var ph = $('.ing-photos-btn', card);
      if (ph) ph.addEventListener('click', function () { openIng(card, ph); });
    });
    var modal = $('#ingModal');
    function closeIng() { if (modal) modal.classList.remove('open'); }
    if (modal) {
      $('.ing-modal-overlay', modal).addEventListener('click', closeIng);
      $('.ing-modal-close', modal).addEventListener('click', closeIng);
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeIng(); });
    }
    function openIng(card, btn) {
      var sel = $('.complement', card), idx = sel ? sel.selectedIndex : 0;
      var tpl = $('.ing-tpl', card), grid = $('#ingGrid');
      grid.textContent = '';
      $$('.ing-item', tpl.content).forEach(function (it) {
        var c = +it.getAttribute('data-comp');
        if (c === -1 || c === idx) grid.appendChild(it.cloneNode(true));
      });
      $('#ingModalTitle').textContent = btn.getAttribute('data-title');
      modal.classList.add('open');
    }
    var chip = $('#delivChip');
    if (chip) {
      var q = getQuartier(), f = isFree(q);
      chip.textContent = f === null ? 'Livraison gratuite dans 16 quartiers de Douala' : (f ? 'Livraison gratuite à ' + q : 'Livraison ' + fmt(FEE) + ' à ' + q);
      chip.hidden = false;
    }
    refresh();
  }

  // ---------- Panier ----------
  function initCart() {
    var box = $('#cartLines');
    function feeNote() {
      var q = $('#custQuartier').value.trim(), f = isFree(q), n = $('#feeNote');
      n.className = 'fee-note' + (f === null ? '' : (f ? ' free' : ' paid'));
      n.textContent = f === null ? '' : (f ? 'Livraison gratuite pour ' + q + ' !' : 'Frais de livraison pour ' + q + ' : ' + fmt(FEE) + '.');
      return f;
    }
    function render() {
      var cart = getCart(), total = 0;
      box.textContent = '';
      $('#cartEmpty').hidden = cart.length > 0;
      $('#cartForm').hidden = cart.length === 0;
      cart.forEach(function (it, i) {
        total += it.qty * it.unit;
        var row = document.createElement('div'); row.className = 'line';
        var info = document.createElement('div'); info.className = 'line-info';
        var b = document.createElement('b'); b.textContent = it.label;
        var s = document.createElement('small'); s.textContent = (it.detail ? it.detail + ' — ' : '') + fmt(it.unit) + ' l\'unité';
        var qd = document.createElement('div'); qd.className = 'line-qty';
        var m = document.createElement('button'); m.type = 'button'; m.textContent = '−'; m.setAttribute('aria-label', 'Moins');
        var n = document.createElement('b'); n.textContent = it.qty;
        var p = document.createElement('button'); p.type = 'button'; p.textContent = '+'; p.setAttribute('aria-label', 'Plus');
        var rm = document.createElement('button'); rm.type = 'button'; rm.className = 'line-rm'; rm.textContent = 'Retirer';
        qd.appendChild(m); qd.appendChild(n); qd.appendChild(p);
        info.appendChild(b); info.appendChild(s); info.appendChild(qd); info.appendChild(rm);
        var t = document.createElement('div'); t.className = 'line-total'; t.textContent = fmt(it.qty * it.unit);
        row.appendChild(info); row.appendChild(t); box.appendChild(row);
        m.addEventListener('click', function () { if (it.qty > 1) { it.qty--; saveCart(cart); render(); } });
        p.addEventListener('click', function () { it.qty++; saveCart(cart); render(); });
        rm.addEventListener('click', function () { cart.splice(i, 1); saveCart(cart); render(); });
      });
      var f = feeNote(), fee = f === false ? FEE : 0;
      $('#tProducts').textContent = fmt(total);
      $('#tFee').textContent = f === null ? 'Entrez votre quartier' : (f ? 'Gratuite' : fmt(FEE));
      $('#tGrand').textContent = fmt(total + fee);
    }
    $('#custQuartier').value = getQuartier();
    $('#custQuartier').addEventListener('input', function () { setQuartier(this.value); render(); });
    $('#waSend').addEventListener('click', function () {
      var cart = getCart(); if (!cart.length) return;
      var name = $('#custName').value.trim(), phone = $('#custPhone').value.trim(), q = $('#custQuartier').value.trim();
      var time = $('#custTime').value, addr = $('#custAddress').value.trim(), err = $('#formError');
      if (!name || !phone || !q) { err.hidden = false; return; }
      err.hidden = true;
      var total = 0;
      var lines = cart.map(function (it) {
        total += it.qty * it.unit;
        return '• ' + it.label + (it.detail ? ' (' + it.detail + ')' : '') + ' x' + it.qty + ' — ' + fmt(it.qty * it.unit);
      }).join('\n');
      var free = isFree(q), fee = free ? 0 : FEE;
      var msg = 'Bonjour BLEDOO, je souhaite commander :\n\n' + lines + '\n\n' +
        'Total produits : ' + fmt(total) + '\n' +
        'Frais de livraison : ' + (free ? 'Gratuite' : fmt(FEE)) + '\n' +
        'Total à payer : ' + fmt(total + fee) + '\n\n' +
        'Mes coordonnées :\nNom : ' + name + '\nTéléphone : ' + phone + '\nQuartier : ' + q + '\n' +
        'Moment de livraison souhaité : ' + (time || 'à confirmer') + '\nOù exactement : ' + (addr || '-');
      window.open('https://wa.me/' + WA1 + '?text=' + encodeURIComponent(msg), '_blank');
    });
    render();
  }

  // ---------- Installation (PWA) ----------
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('/sw.js').catch(function () {}); });
  }
  (function () {
    var standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    if (standalone || load('bledoo_install_off')) return;
    var deferred = null, bar = null;
    function hide(remember) { if (bar) { bar.remove(); bar = null; } if (remember) save('bledoo_install_off', 1); }
    function show(ios) {
      if (bar) return;
      bar = document.createElement('div'); bar.className = 'install-bar'; bar.setAttribute('role', 'dialog');
      var t = document.createElement('p');
      t.textContent = ios ? 'Installez Bledoo : appuyez sur Partager puis « Sur l\'écran d\'accueil ».' : 'Installez Bledoo sur votre téléphone';
      bar.appendChild(t);
      if (!ios) {
        var b = document.createElement('button'); b.type = 'button'; b.className = 'btn'; b.textContent = 'Installer';
        b.addEventListener('click', function () {
          if (!deferred) return;
          deferred.prompt();
          deferred.userChoice.then(function (r) { deferred = null; hide(r.outcome !== 'accepted' ? true : false); });
        });
        bar.appendChild(b);
      }
      var x = document.createElement('button'); x.type = 'button'; x.className = 'install-x'; x.setAttribute('aria-label', 'Fermer'); x.textContent = '×';
      x.addEventListener('click', function () { hide(true); });
      bar.appendChild(x);
      document.body.appendChild(bar);
    }
    window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; show(false); });
    window.addEventListener('appinstalled', function () { hide(true); });
    var ua = navigator.userAgent;
    var ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    var safari = /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);
    if (ios && safari) setTimeout(function () { show(true); }, 1500);
  })();

  updateBadge();
  if (page === 'home') initHome();
  else if (page === 'plats') initPlats();
  else if (page === 'dish') initDish();
  else if (page === 'cart') initCart();
})();
