import {disableContextMenu, registerServiceWorker} from "../util";
import axios from 'axios';

const isBot = require("isBot");
const fg = require("fg-loadcss");

require("./mongme.css");

function ready(fn: (EventListenerOrEventListenerObject?: any, useCapture?: boolean) => void) {
  if ((document as any).attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

const BOT_GUIDE_LIST: IGuideLink[] = [
  {source: "cafe", link: "https://cafe.naver.com/nexonjojo/621476", title: "논공행상 효율", author: "Berein"},
  {source: "dc", link: "https://gall.dcinside.com/board/view/?id=zohong&amp;no=419747", title: "몽매의 시련 HP 변화기"},
  {source: "dc", link: "https://gall.dcinside.com/board/view/?id=zohong&amp;no=402180", title: "몽매의 시련 장각편 인연 정리"},
  {source: "dc", link: "https://gall.dcinside.com/board/view/?id=zohong&amp;no=411084", title: "몽매의 시련 동탁편 완전 가이드"},
  {source: "dc", link: "https://gall.dcinside.com/board/view/?id=zohong&amp;no=423299", title: "몽매의 시련 원술편 완전 가이드"},
  {source: "dc", link: "https://gall.dcinside.com/board/view/?id=zohong&amp;no=423303", title: "몽매의 시련 원소편 인연 장수들"},
  {
    source: "dc",
    link: "https://gall.dcinside.com/mgallery/board/view/?id=johong&amp;no=3002",
    title: "몽매의 시련 원소편 완전 가이드"
  },
  {
    source: "dc",
    link: "https://gall.dcinside.com/mgallery/board/view/?id=johong&amp;no=11868",
    title: "몽매의 시련 엄백호편 완전 가이드"
  },
  {
    source: "dc",
    link: "https://gall.dcinside.com/mgallery/board/view/?id=johong&amp;no=25719",
    title: "몽매의 시련 손권편 (진격의 손권) 완전 가이드"
  },
  {
    source: "dc",
    link: "https://gall.dcinside.com/mgallery/board/view/?id=johong&amp;no=25757",
    title: "몽매의 시련 손권편 (패주의 손권) 완전 가이드"
  },
  {
    source: "dc",
    link: "https://gall.dcinside.com/mgallery/board/view/?id=johong&amp;no=27184",
    title: "몽매의 시련 하후연편 (최후의 질풍) 불완전 가이드"
  },
  {
    source: "dc",
    link: "https://gall.dcinside.com/mgallery/board/view/?id=johong&amp;no=48501",
    title: "몽매의 시련 조인편 (현군의 조인) 완전 가이드"
  },
  {
    source: "dc",
    link: "https://gall.dcinside.com/mgallery/board/view/?id=johong&amp;no=48563",
    title: "몽매의 시련 조인편 (번성의 조인) 완전 가이드"
  },
];

function loadCSS() {
  fg.loadCSS("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css",
    null,
    null,
    {
      "crossorigin": "anonymous",
      "integrity": "sha256-eSi1q2PG6J7g7ib17yAaWMcrr5GrtohYChqibrV7PBE="
    }
  );
}

function createListItem(guide: IGuideLink) {
  const link = document.createElement("a");
  link.href = guide.link;
  link.target = "_href";
  link.className = "list-group-item list-group-item-action";
  const favicon = document.createElement("img");
  if (guide.source === "cafe") {
    favicon.src = "https://cafe.naver.com/favicon.ico";
    favicon.alt = "공카";
  } else if (guide.source === "dc") {
    favicon.src = "https://gall.dcinside.com/favicon.ico";
    favicon.alt = "조갤";
  }
  favicon.className = "guide-favicon";
  const text = document.createElement("span");
  text.innerText = guide.title;
  text.className = "guide-title";
  // const title = `${guide.title}${guide.author ? " by " + guide.author : ""}`;
  link.appendChild(favicon);
  link.appendChild(text);
  return link;
}

function main() {
  registerServiceWorker();
  disableContextMenu();
  loadCSS();
  const list = document.querySelector(".mongme-list");
  renderItems(list, []);
  if (isBot(navigator.userAgent)) {
    renderItems(list, BOT_GUIDE_LIST);
  } else {
    showLoading();
    axios.get<IGuideLink[]>('https://bo0tc0zpia.execute-api.ap-northeast-2.amazonaws.com/prod/mongme')
      .then((response) => renderItems(list, response.data))
      .catch(() => renderItems(list, BOT_GUIDE_LIST));
  }
}

function showLoading() {
  document.querySelector('.spinner').classList.remove('invisible')
}

function hideLoading() {
  document.querySelector('.spinner').classList.add('invisible')
}

function renderItems(list: Element, allItems: IGuideLink[]) {
  list.innerHTML = "";
  allItems.forEach((guide: IGuideLink) => {
    if (guide) {
      list.appendChild(createListItem(guide));
    } else {
      let li = document.createElement("li");
      li.className = "list-group-item";
      list.appendChild(li);
    }
  });
  hideLoading();
}

interface IGuideLink {
  source: "cafe" | "dc"
  link: string;
  title: string;
  author?: string;
}

ready(main);
