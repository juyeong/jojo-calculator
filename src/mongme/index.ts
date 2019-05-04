import {disableContextMenu, registerServiceWorker} from "../util";

require("./mongme.css");
require("html-loader!./index.ejs");

function ready(fn: (EventListenerOrEventListenerObject?: any, useCapture?: boolean) => void) {
  if ((document as any).attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

const GUIDE_LIST: IGuideLink[] = [
  {source: "cafe", link: "https://cafe.naver.com/nexonjojo/621476", title: "논공행상 효율", author: "Berein"},
  null,
  {source: "dc", link: "https://gall.dcinside.com/board/view/?id=zohong&no=411084", title: "5월 몽매의 시련 동탁 완전 정리", author: "조랑보리"},
  {source: "dc", link: "https://gall.dcinside.com/board/view/?id=zohong&no=415437", title: "내성 여는 조건", author: "조링조링"},
  {source: "dc", link: "https://gall.dcinside.com/board/view/?id=zohong&no=415684", title: "50만 몽매 출진장수 및 자리 참고용"},
  {source: "dc", link: "https://gall.dcinside.com/board/view/?id=zohong&no=415562", title: "[스압]몽매 동탁 개인 공략 1"},
  {source: "dc", link: "https://gall.dcinside.com/board/view/?id=zohong&no=415563", title: "[스압]몽매 동탁 개인 공략 2"},
  {source: "cafe", link: "https://cafe.naver.com/nexonjojo/624456", title: "[몽매-동탁] 조조, 아린, 지원궁기 활용하여 44.5만딜", author: "찰진엉덩국V"},
  {source: "cafe", link: "https://cafe.naver.com/nexonjojo/624294", title: "조린이가 쓰는 몽매팁", author: "초오오고열용광로"},
  {source: "cafe", link: "https://cafe.naver.com/nexonjojo/624243", title: "무과금 슬로우 유저의 몽매의 시련 - 광기에 사로잡힌 동탁 편", author: "아이누족"},
];

function main() {
  registerServiceWorker();
  disableContextMenu();
  if (Math.random() >= 1) return;
  const list = document.querySelector(".mongme-list");
  GUIDE_LIST.forEach((guide) => {
    if (guide) {
      const link = document.createElement("a");
      const favicon = document.createElement("img");
      link.href = guide.link;
      link.target = "_href";
      link.className = "list-group-item list-group-item-action";
      favicon.src = guide.source === "cafe" ? "https://cafe.naver.com/favicon.ico" : "https://gall.dcinside.com/favicon.ico";
      favicon.className = "favicon";
      // const title = `${guide.title}${guide.author ? " by " + guide.author : ""}`;
      link.appendChild(favicon);
      link.appendChild(document.createTextNode(guide.title));
      list.appendChild(link);
    } else {
      let li = document.createElement("li");
      li.className = "list-group-item";
      list.appendChild(li);
    }
  });
}

interface IGuideLink {
  source: "cafe" | "dc"
  link: string;
  title: string;
  author?: string;
}

ready(main);
