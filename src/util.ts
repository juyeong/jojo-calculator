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
  } else {
    console.log('serviceWorker not found in navigator');
  }
}
