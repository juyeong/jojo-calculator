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
    if (isIos() && !isInStandaloneMode()) {
      let localStorage = window.localStorage;
      if (localStorage) {
        let now = Date.now();
        const lastShowString = localStorage.getItem("ios-pwa-popup");
        if (lastShowString) {
          const nextShow = Number.parseInt(lastShowString, 10);
          if (nextShow < now) {
            // 1 week
            localStorage.setItem("ios-pwa-popup", (now + 604800000).toString());
            alert("하단 공유 버튼을 누르면📱\n'홈 화면에 추가'할 수 있습니다!");
          }
        } else {
          // 1 hour
          localStorage.setItem("ios-pwa-popup", (now + 3600000).toString());
        }
      }
    }
  } else {
    console.log('serviceWorker not found in navigator');
  }
}

function isIos() {
  const userAgent = window.navigator.userAgent;
  return /iphone|ipad|ipod/i.test(userAgent);
}

function isInStandaloneMode() {
  const navigator: any = window.navigator;
  return ('standalone' in navigator) && (navigator.standalone);
}
