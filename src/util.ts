export function disableContextMenu() {
  window.oncontextmenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };
}

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('Service Worker Registered');
      })
      .catch((e) => {
        console.error('Service Worker Register Failed');
        console.error(e);
      });
    window.addEventListener('beforeinstallprompt', async (e: any) => {
      try {
        ga('send', 'event', 'PWA', 'See', 'Add to homescreen');
        const choiceResult = await e.userChoice;
        const outcome = choiceResult.outcome;
        const platform = choiceResult.platform;
        console.log(outcome, platform);
        if (outcome == 'dismissed') {
          ga('send', 'event', 'PWA', 'Click', 'Dismiss');
        } else {
          ga('send', 'event', 'PWA', 'Click', 'Add');
        }
      } catch (e) {
        console.error(e);
      }
    });
  } else {
    console.log('serviceWorker not found in navigator');
  }
}
