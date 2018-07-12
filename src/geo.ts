import "babel-polyfill";

// const geoData = require("./geo");
//
// interface IGeoAll {
//   병종: string,
//   산지: number;
//   숲: number;
//   설원: number;
//   빙판: number;
//   평지: number;
//   초원: number;
//   황무지: number;
//   사막: number;
//   성내: number;
//   가옥: number;
//   완류: number;
//   습지: number;
// }

const ALL_COLUMNS = ["병종", "산지", "숲", "설원", "빙판", "평지", "초원", "황무지", "사막", "성내", "가옥", "완류", "습지"];

function ready(fn: (EventListenerOrEventListenerObject?: any, useCapture?: boolean) => void) {
  if ((document as any).attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function main() {
  onClick("battlefield");
  addLiseners();
}


function addLiseners() {
  let radioButtons = document.querySelectorAll('input[type=radio]');
  forEach(radioButtons, (button: HTMLInputElement) => {
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
  if (buttonId === 'battlefield') {
    allDivs.forEach((div) => div.classList.add("d-none"));
    battlefieldDiv.classList.remove("d-none");
  } else if (buttonId === 'competitive') {
    allDivs.forEach((div) => div.classList.add("d-none"));
    competitiveDiv.classList.remove("d-none");
  } else if (buttonId === 'challenge') {
    allDivs.forEach((div) => div.classList.add("d-none"));
    challengeDiv.classList.remove("d-none");
  }
  new List(`geo-table-${buttonId}`, {valueNames: ALL_COLUMNS});
}


function forEach(list: any, callback: (item: any) => void) {
  if (list.forEach) {
    list.forEach(callback);
  } else if (Array && Array.from) {
    Array.from(list).forEach(callback);
  } else {
    let array = [];
    for (let i = 0; i < list.length; i++) {
      array.push(list[i]);
    }
    if (array.forEach) {
      array.forEach(callback);
    } else {
      for (let i = 0; i < array.length; i++) {
        callback(array[i]);
      }
    }
  }
}

ready(main);
