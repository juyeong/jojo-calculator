"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("babel-polyfill");
const axios_1 = require("axios");
require("html-loader!./index.ejs");
require("./geo.css");
const util_1 = require("../util");
const ALL_COLUMNS = ["병종", "성내", "잔도", "산지", "설원", "황무지", "사막", "평지", "숲", "습지", "초원", "완류", "빙판", "가옥", "난투장", "격전지", "결투장", "태양", "신록", "창천", "혹한", "능선", "나루"];
const UNIT_TYPES = ["군주", "보병", "궁병", "노병", "창병", "경기병", "중기병", "산악기병", "궁기병", "포차", "무인", "적병", "책사", "풍수사", "도사", "무희", "전차", "수군", "웅술사", "호술사", "도독", "현자", "마왕", "검사", "군악대", "천자", "노전차", "효기병"];
const GEO_DATA = [];
const TAB_HASH = {
    ANNIHILATION: "annihilation",
    BATTLEGROUND: "battleground",
    GATES: "gates",
    OFFICER: "officer"
};
const BATTLEGROUND = [
    { type: "", fields: ["병종", "격전지"] },
    { type: "중광", fields: ["산지", "완류"] },
    { type: "북광", fields: ["설원", "숲"] },
    { type: "남광", fields: ["완류", "황무지"] },
    { type: "서광", fields: ["사막", "평지"] },
    { type: "동광", fields: ["초원", "설원"] },
];
const GATES = [
    { type: "", fields: ["병종"] },
    { type: "난투장", fields: ["난투장"] },
    { type: "산지 (익주)", fields: ["산지", "숲"] },
    { type: "설원 (병주)", fields: ["설원", "빙판"] },
    { type: "초원 (기주)", fields: ["평지", "초원"] },
    { type: "사막 (옹주)", fields: ["황무지", "사막"] },
    { type: "도성 (사주)", fields: ["성내", "가옥"] },
    { type: "장강 (양주)", fields: ["완류", "습지"] },
];
const ANNIHILATION = [
    { type: "", fields: ["병종"] },
    { type: "초원의 관문", fields: ["평지"] },
    { type: "사막의 관문", fields: ["황무지", "사막"] },
    { type: "산지의 관문", fields: ["산지", "숲"] },
    { type: "완류의 관문", fields: ["완류"] },
    { type: "설원의 관문", fields: ["설원"] }
];
const OFFICER = [
    { type: "", fields: ["병종"] },
    { type: "태양의 결투장", fields: ["태양"] },
    { type: "창천의 결투장", fields: ["창천"] },
    { type: "신록의 결투장", fields: ["신록"] },
    { type: "혹한의 결투장", fields: ["혹한"] },
    { type: "영웅의 결투장", fields: ["결투장"] }
];
function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    }
    else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
function getHead1(types) {
    return types.reduce((acc, val) => {
        const active = acc.toggle ? ` class="table-active"` : "";
        return {
            value: acc.value + `\n<td colspan="${val.fields.length}"${active}>${val.type}</td>`,
            toggle: !acc.toggle
        };
    }, { value: "", toggle: false }).value;
}
function getHead2(types) {
    return types.reduce((acc, val) => ({
        value: acc.value + val.fields.map((field) => {
            const order = field === "병종" ? "asc" : "desc";
            const active = acc.toggle ? " table-active" : "";
            return `<th scope="col" class="sort${active}" data-sort="${field}" data-order="${order}">${field}</th>`;
        }).join("\n"),
        toggle: !acc.toggle
    }), { value: "", toggle: false }).value;
}
function getBody(types) {
    return UNIT_TYPES.map((unitType) => {
        return types.reduce((acc, val) => {
            let value = acc;
            value += val.fields.map((field) => {
                if (field === "병종") {
                    return `<th scope="row" class="${unitType} ${field}">${unitType}</th>`;
                }
                else {
                    const stat = getStat(unitType, field);
                    if (!stat) {
                        return `<td class="${unitType} ${field}$">-</td>`;
                    }
                    let highlight;
                    switch (field) {
                        case "평지":
                        case "초원":
                            highlight = stat > 100;
                            break;
                        case "난투장":
                        case "격전지":
                        case "결투장":
                            highlight = stat > 200;
                            break;
                        default:
                            highlight = stat >= 100;
                            break;
                    }
                    return `<td class="${unitType} ${field}${highlight ? " table-success" : ""}">${stat.toFixed(0)}</td>`;
                }
            }).join("\n");
            return value;
        }, "");
    });
}
function updateTable(id, types) {
    const head1 = getHead1(types);
    const head2 = getHead2(types);
    const rows = getBody(types);
    const html = `<thead>
    <tr>
       ${head1}
    </tr>
    <tr>
      ${head2}
    </tr>
    <tbody class="list">
    <tr>
      ${rows.join("</tr>\n<tr>")}
    </tr>
    </tbody>`;
    const table = document.querySelector(id);
    table.classList.add("d-none");
    table.innerHTML = `<table class="table">${html}</table>`;
}
function getDefaultTab() {
    if (location.hash) {
        const element = document.querySelector(location.hash + '-tab');
        if (element) {
            return element;
        }
    }
    return document.getElementById("battleground-tab");
}
function handleHash() {
    const tab = getDefaultTab();
    if (tab) {
        tab.click();
    }
}
function updateContents() {
    axios_1.default.get("https://b6lhivo3t3.execute-api.ap-northeast-2.amazonaws.com/prod/geo")
        .then((response) => updateTables(response.data))
        .catch(e => console.error(e));
}
function updateTables(geoData = undefined) {
    if (geoData) {
        GEO_DATA.push(...geoData);
    }
    updateTable("#geo-table-battleground-tab", BATTLEGROUND);
    updateTable("#geo-table-gates-tab", GATES);
    updateTable("#geo-table-annihilation-tab", ANNIHILATION);
    updateTable("#geo-table-officer-tab", OFFICER);
    if (geoData) {
        handleHash();
    }
}
function main() {
    addListeners();
    updateTables();
    updateContents();
    addNavListener();
    util_1.disableContextMenu();
    util_1.registerServiceWorker();
}
function getStat(unitType, field) {
    if (GEO_DATA.length === 0)
        return;
    const row = GEO_DATA.find((row) => row["병종"] === unitType);
    if (row) {
        return row[field];
    }
}
function addNavListener() {
    document.querySelectorAll(".nav-link")
        .forEach((nav) => {
        nav.addEventListener("click", () => {
            const item = nav.getAttribute("data-item");
            ga('send', 'event', 'Nav', 'Click', item);
        });
    });
}
function addListeners() {
    let radioButtons = document.querySelectorAll('input[type=radio]');
    radioButtons.forEach((button) => {
        button.addEventListener('focus', () => {
            let buttonId = button.id;
            onClick(buttonId);
            ga('send', 'event', 'Filter', 'Geo', buttonId);
        });
    });
}
function onClick(buttonId) {
    let battlegroundDiv = document.querySelector('#geo-table-battleground-tab');
    let gatesDiv = document.querySelector('#geo-table-gates-tab');
    let annihilationDiv = document.querySelector('#geo-table-annihilation-tab');
    let officerDiv = document.querySelector('#geo-table-officer-tab');
    let allDivs = [battlegroundDiv, gatesDiv, annihilationDiv, officerDiv];
    const List = window.List;
    if (!List) {
        console.log("List not fount");
        setTimeout(() => onClick(buttonId), 100);
    }
    else if (buttonId === 'battleground-tab') {
        allDivs.forEach((div) => div.classList.add("d-none"));
        battlegroundDiv.classList.remove("d-none");
        window.location.hash = TAB_HASH.BATTLEGROUND;
    }
    else if (buttonId === 'gates-tab') {
        allDivs.forEach((div) => div.classList.add("d-none"));
        gatesDiv.classList.remove("d-none");
        window.location.hash = TAB_HASH.GATES;
    }
    else if (buttonId === 'annihilation-tab') {
        allDivs.forEach((div) => div.classList.add("d-none"));
        annihilationDiv.classList.remove("d-none");
        window.location.hash = TAB_HASH.ANNIHILATION;
    }
    else if (buttonId === 'officer-tab') {
        allDivs.forEach((div) => div.classList.add("d-none"));
        officerDiv.classList.remove("d-none");
        window.location.hash = TAB_HASH.OFFICER;
    }
    try {
        new List(`geo-table-${buttonId}`, { valueNames: ALL_COLUMNS });
    }
    catch (e) {
        if (!isConstructor(List)) {
            console.log("List is not constructor");
            setTimeout(() => onClick(buttonId), 100);
        }
        else {
            console.error(`onClick(${buttonId})`, e);
        }
    }
}
function isConstructor(o) {
    try {
        new o();
        return true;
    }
    catch (e) {
        return false;
    }
}
ready(main);
//# sourceMappingURL=index.js.map