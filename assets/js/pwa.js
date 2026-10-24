(function () {
  const banner = document.getElementById('installBanner');
  const button = document.getElementById('installBannerButton');
  const closeButton = document.getElementById('installBannerClose');
  const instructions = document.getElementById('installBannerInstructions');
  const dismissedKey = 'bledoo-install-dismissed';
  let installPrompt = null;

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function (error) {
        console.error('Impossible d’enregistrer le service worker Bledoo.', error);
      });
    });
  }

  function isInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches ||
      navigator.standalone === true;
  }

  function wasDismissed() {
    try {
      return localStorage.getItem(dismissedKey) === 'true';
    } catch (error) {
      console.warn('Le choix d’installation Bledoo ne peut pas être mémorisé.', error);
      return false;
    }
  }

  function rememberDismissal() {
    try {
      localStorage.setItem(dismissedKey, 'true');
    } catch (error) {
      console.warn('Le choix d’installation Bledoo ne peut pas être mémorisé.', error);
    }
  }

  function showBanner() {
    if (!isInstalled() && !wasDismissed()) {
      banner.hidden = false;
    }
  }

  function hideBanner() {
    banner.hidden = true;
  }

  if (isInstalled() || wasDismissed()) {
    hideBanner();
    return;
  }

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (isIOS) {
    instructions.textContent = 'Appuyez sur Partager puis « Sur l’écran d’accueil ».';
    button.hidden = true;
    closeButton.hidden = false;
    showBanner();
  }

  window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault();
    installPrompt = event;
    instructions.textContent = '';
    button.hidden = false;
    closeButton.hidden = true;
    showBanner();
  });

  button.addEventListener('click', async function () {
    if (!installPrompt) return;
    installPrompt.prompt();
    const result = await installPrompt.userChoice;
    installPrompt = null;
    if (result.outcome === 'dismissed') {
      rememberDismissal();
    }
    hideBanner();
  });

  closeButton.addEventListener('click', function () {
    rememberDismissal();
    hideBanner();
  });

  window.addEventListener('appinstalled', function () {
    rememberDismissal();
    hideBanner();
  });
})();
