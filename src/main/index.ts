import {disableContextMenu, registerServiceWorker} from "../util";

require("./main.css");
require("html-loader!./index.ejs");

function ready(fn: (EventListenerOrEventListenerObject?: any, useCapture?: boolean) => void) {
  if ((document as any).attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function updateBodyHeight() {
  const innerHeight = window.innerHeight;
  if (innerHeight && innerHeight > 0) {
    document.body.style.height = `${innerHeight}px`;
  }
}

function registerWindowReizeListener() {
  window.addEventListener("resize", () => updateBodyHeight());
}

function main() {
  registerServiceWorker();
  disableContextMenu();
  registerWindowReizeListener();
  updateBodyHeight();
}

ready(main);
