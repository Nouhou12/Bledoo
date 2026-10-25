"use strict";

(function () {
  const DISMISSED_UNTIL_KEY = "bledoo-install-dismissed-until";
  const DISMISSAL_DAYS = 7;
  let installPrompt = null;
  let banner;
  let message;
  let installButton;
  let dismissed = false;
  let instructionsVisible = false;

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.error("Impossible d’enregistrer le service worker BLEDOO.", error);
      });
    });
  }

  function isInstalled() {
    return window.matchMedia("(display-mode: standalone)").matches ||
      navigator.standalone === true;
  }

  function wasDismissed() {
    try {
      return Number(localStorage.getItem(DISMISSED_UNTIL_KEY)) > Date.now();
    } catch (error) {
      console.warn("Le choix d’installation BLEDOO ne peut pas être lu.", error);
      return false;
    }
  }

  function rememberDismissal() {
    try {
      const dismissedUntil = Date.now() + DISMISSAL_DAYS * 24 * 60 * 60 * 1000;
      localStorage.setItem(DISMISSED_UNTIL_KEY, String(dismissedUntil));
    } catch (error) {
      console.warn("Le choix d’installation BLEDOO ne peut pas être mémorisé.", error);
    }
  }

  function hideBanner() {
    banner.hidden = true;
  }

  function showInstructions() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    message.textContent = isIOS
      ? "Pour installer BLEDOO, touchez Partager puis « Sur l’écran d’accueil »."
      : "Ouvrez le menu de votre navigateur, puis choisissez « Installer l’application » ou « Ajouter à l’écran d’accueil ».";
    installButton.textContent = "Compris";
    installButton.setAttribute("aria-label", "Fermer les instructions d’installation");
    instructionsVisible = true;
  }

  function createBanner() {
    banner = document.createElement("aside");
    banner.className = "pwa-install-banner";
    banner.hidden = true;
    banner.setAttribute("aria-labelledby", "pwa-install-title");
    banner.innerHTML = `
      <img class="pwa-install-logo" src="/images/bledoo-logo.webp" alt="Logo BLEDOO" width="64" height="64">
      <div class="pwa-install-copy">
        <h2 id="pwa-install-title">Installez BLEDOO</h2>
        <p data-pwa-install-message>Vos packs à portée de main, même hors ligne.</p>
      </div>
      <button class="pwa-install-action" type="button">Installer l’application</button>
      <button class="pwa-install-dismiss" type="button" aria-label="Plus tard">×</button>`;

    document.body.append(banner);
    message = banner.querySelector("[data-pwa-install-message]");
    installButton = banner.querySelector(".pwa-install-action");
    banner.querySelector(".pwa-install-dismiss").addEventListener("click", () => {
      rememberDismissal();
      hideBanner();
    });
    installButton.addEventListener("click", async () => {
      if (!installPrompt) {
        if (instructionsVisible) {
          hideBanner();
        } else {
          showInstructions();
        }
        return;
      }

      installButton.disabled = true;
      try {
        await installPrompt.prompt();
        const result = await installPrompt.userChoice;
        installPrompt = null;
        if (result.outcome === "dismissed") {
          rememberDismissal();
        }
        hideBanner();
      } catch (error) {
        console.error("L’installation de BLEDOO n’a pas pu être lancée.", error);
        showInstructions();
      } finally {
        installButton.disabled = false;
      }
    });
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
    if (banner && !isInstalled() && !dismissed) {
      instructionsVisible = false;
      installButton.textContent = "Installer l’application";
      installButton.setAttribute("aria-label", "Installer l’application BLEDOO");
      message.textContent = "Vos packs à portée de main, même hors ligne.";
      banner.hidden = false;
    }
  });

  window.addEventListener("appinstalled", () => {
    rememberDismissal();
    hideBanner();
  });

  window.addEventListener("DOMContentLoaded", () => {
    createBanner();
    dismissed = wasDismissed();
    if (installPrompt) {
      installButton.setAttribute("aria-label", "Installer l’application BLEDOO");
    }
    if (!isInstalled() && !dismissed) {
      window.setTimeout(() => {
        if (!isInstalled() && !dismissed) {
          banner.hidden = false;
        }
      }, 1200);
    }
  }, { once: true });
})();
