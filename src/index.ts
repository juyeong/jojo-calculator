function ready(fn: (EventListenerOrEventListenerObject?: any, useCapture?: boolean) => void) {
  if ((document as any).attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function main() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./dst/service-worker.js')
      .then(() => {
        console.log('Service Worker Registered');
      })
      .catch((e) => {
        console.error('Service Worker Register Failed');
        console.error(e);
      });
  } else {
    console.log('serviceWorker not found in navigator');
  }

  window.oncontextmenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };
}

ready(main);
