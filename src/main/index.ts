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

function main() {
  registerServiceWorker();
  disableContextMenu();
}

ready(main);
