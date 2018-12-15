import {disableContextMenu} from "./util";

function ready(fn: (EventListenerOrEventListenerObject?: any, useCapture?: boolean) => void) {
  if ((document as any).attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function registerServiceWorker() {
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
}

function main() {
  registerServiceWorker();
  disableContextMenu();
}

ready(main);
