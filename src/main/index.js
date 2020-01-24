"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
require("./main.css");
require("html-loader!./index.ejs");
function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    }
    else {
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
    util_1.registerServiceWorker();
    util_1.disableContextMenu();
    registerWindowReizeListener();
    updateBodyHeight();
}
ready(main);
//# sourceMappingURL=index.js.map