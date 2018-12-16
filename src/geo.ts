import "babel-polyfill";

import * as geoData from "./geo_data.json";
import get = Reflect.get;
import {disableContextMenu, registerServiceWorker} from "./util";

const ALL_COLUMNS: string[] = Object.keys(geoData[0]);
const UNIT_TYPES: string[] = geoData.map((row) => row["병종"]);
const BATTLEFIELD: IField[] = [
  {type: "", fields: ["병종", "격전지"]},
  {type: "중광", fields: ["산지", "완류"]},
  {type: "북광", fields: ["설원", "숲"]},
  {type: "남광", fields: ["완류", "황무지"]},
  {type: "서광", fields: ["사막", "평지"]},
  {type: "동광", fields: ["초원", "설원"]},
];
const COMPETITIVE: IField[] = [
  {type: "", fields: ["병종"]},
  {type: "산지 (익주)", fields: ["산지", "숲"]},
  {type: "설원 (병주)", fields: ["설원", "빙판"]},
  {type: "초원 (기주)", fields: ["평지", "초원"]},
  {type: "사막 (옹주)", fields: ["황무지", "사막"]},
  {type: "도성 (사주)", fields: ["성내", "가옥"]},
  {type: "장강 (양주)", fields: ["완류", "습지"]},
  {type: "난투장", fields: ["난투장"]},
];
const CHALLENGE: IField[] = [
  {type: "", fields: ["병종"]},
  {type: "초원의 관문", fields: ["평지"]},
  {type: "사막의 관문", fields: ["황무지", "사막"]},
  {type: "산지의 관문", fields: ["산지", "숲"]},
  {type: "완류의 관문", fields: ["완류"]},
  {type: "설원의 관문", fields: ["설원"]}
];

interface IField {
  type: string;
  fields: string[];
}

function ready(fn: (EventListenerOrEventListenerObject?: any, useCapture?: boolean) => void) {
  if ((document as any).attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function getHead1(types: IField[]) {
  return types.reduce((acc, val) => {
    const active = acc.toggle ? ` class="table-active"` : "";
    return {
      value: acc.value + `\n<td colspan="${val.fields.length}"${active}>${val.type}</td>`,
      toggle: !acc.toggle
    }
  }, {value: "", toggle: false}).value;
}

function getHead2(types: IField[]) {
  return types.reduce((acc, val) => ({
    value: acc.value + val.fields.map((field) => {
      const order = field === "병종" ? "asc" : "desc";
      const active = acc.toggle ? " table-active" : "";
      return `<th scope="col" class="sort${active}" data-sort="${field}" data-order="${order}">${field}</th>`;
    }).join("\n"),
    toggle: !acc.toggle
  }), {value: "", toggle: false}).value;
}

function getBody(types: IField[]) {
  return UNIT_TYPES.map((unitType) => {
    return types.reduce((acc, val) => {
      let value = acc;
      value += val.fields.map((field) => {
        if (field === "병종") {
          return `<th scope="row" class="${unitType} ${field}">${unitType}</th>`;
        } else {
          const stat = getStat(unitType, field) || 0;
          let highlight: boolean;
          switch (field) {
            case "평지":
            case "초원":
              highlight = stat > 100;
              break;
            case "난투장":
            case "격전지":
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

function updateTable(id: string, types: IField[]) {
  const head1 = getHead1(types);
  const haed2 = getHead2(types);
  const rows = getBody(types);
  const html = `<thead>
    <tr>
       ${head1}
    </tr>
    <tr>
      ${haed2}
    </tr>
    <tbody class="list">
    <tr>
      ${rows.join("</tr>\n<tr>")}
    </tr>
    </tbody>`;
  const table = document.querySelector(id);
  table.innerHTML = `<table class="table">${html}</table>`;
}

function main() {
  updateTable("#geo-table-battlefield", BATTLEFIELD);
  updateTable("#geo-table-competitive", COMPETITIVE);
  updateTable("#geo-table-challenge", CHALLENGE);
  onClick("battlefield");
  addListeners();
  addNavListener();
  disableContextMenu();
  registerServiceWorker();
}

function getStat(unitType: string, field: string): number {
  const row = geoData.find((row) => row["병종"] === unitType);
  return get(row, field);
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

function onClick(buttonId: string) {
  let battlefieldDiv = document.querySelector('#geo-table-battlefield');
  let competitiveDiv = document.querySelector('#geo-table-competitive');
  let challengeDiv = document.querySelector('#geo-table-challenge');
  let allDivs = [battlefieldDiv, competitiveDiv, challengeDiv];
  const List = (window as any).List;
  if (!List) {
    console.log("List not fount");
    setTimeout(() => onClick(buttonId), 100);
  } else if (buttonId === 'battlefield') {
    allDivs.forEach((div) => div.classList.add("d-none"));
    battlefieldDiv.classList.remove("d-none");
  } else if (buttonId === 'competitive') {
    allDivs.forEach((div) => div.classList.add("d-none"));
    competitiveDiv.classList.remove("d-none");
  } else if (buttonId === 'challenge') {
    allDivs.forEach((div) => div.classList.add("d-none"));
    challengeDiv.classList.remove("d-none");
  }
  try {
    new List(`geo-table-${buttonId}`, {valueNames: ALL_COLUMNS});
  } catch (e) {
    if (!isConstructor(List)) {
      console.log("List is not constructor");
      setTimeout(() => onClick(buttonId), 100);
    } else {
      console.error(`onClick(${buttonId})`, e);
    }
  }
}

function isConstructor(o: any) {
  try {
    new o();
    return true;
  } catch (e) {
    return false;
  }
}
ready(main);
