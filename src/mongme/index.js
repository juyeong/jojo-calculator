"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
require("./mongme.css");
const fg = require("fg-loadcss");
const isBot = require("isBot");
function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    }
    else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
const OLD_GUIDE_LIST = [
    { source: "dc", link: "https://gall.dcinside.com/board/view/?id=zohong&no=415437", title: "내성 여는 조건", author: "조링조링" },
    { source: "dc", link: "https://gall.dcinside.com/board/view/?id=zohong&no=415684", title: "50만 몽매 출진장수 및 자리 참고용" },
    { source: "dc", link: "https://gall.dcinside.com/board/view/?id=zohong&no=415562", title: "[스압]몽매 동탁 개인 공략 1" },
    { source: "dc", link: "https://gall.dcinside.com/board/view/?id=zohong&no=415563", title: "[스압]몽매 동탁 개인 공략 2" },
    { source: "cafe", link: "https://cafe.naver.com/nexonjojo/624456", title: "[몽매-동탁] 조조, 아린, 지원궁기 활용하여 44.5만딜", author: "찰진엉덩국V" },
    { source: "cafe", link: "https://cafe.naver.com/nexonjojo/624294", title: "조린이가 쓰는 몽매팁", author: "초오오고열용광로" },
    { source: "cafe", link: "https://cafe.naver.com/nexonjojo/624243", title: "무과금 슬로우 유저의 몽매의 시련 - 광기에 사로잡힌 동탁 편", author: "아이누족" },
    { source: "cafe", link: "https://cafe.naver.com/nexonjojo/625162", title: "(시간없는 분들을 위한) 동탁 25만딜 초간단 영상", author: "Reborn" },
];
const GUIDE_LIST = [
    { source: "cafe", link: "https://cafe.naver.com/nexonjojo/621476", title: "논공행상 효율", author: "Berein" },
    null,
    { source: "dc", link: "https://gall.dcinside.com/board/view/?id=zohong&no=439174", title: "몽매의 시련 안량편 (원소1) 불완전 가이드", author: "조랑보리" },
    { source: "dc", link: "https://gall.dcinside.com/board/view/?id=zohong&no=439221", title: "몽매의 시련 문추편 (원소2) 불완전 가이드", author: "조랑보리" },
    { source: "dc", link: "https://gall.dcinside.com/board/view/?id=zohong&no=439431", title: "몽매의 시련 원소편 (원소3) 완전 가이드", author: "조랑보리" },
    null,
    { source: "dc", link: "https://gall.dcinside.com/board/view/?id=zohong&no=423299", title: "몽매의 시련 원술편 완전 가이드", author: "조랑보리" },
    { source: "dc", link: "https://gall.dcinside.com/board/view/?id=zohong&no=433200", title: "조린이용 몽매 공략 (60만딜 보장)", author: "400만따리" },
    { source: "dc", link: "https://gall.dcinside.com/board/view/?id=zohong&no=433047", title: "몽매의 시련 원술1편 허접한 공략(데이터)", author: "총퇴각" },
    { source: "dc", link: "https://gall.dcinside.com/board/view/?id=zohong&no=433211", title: "몽매 공략 (조린이용)", author: "Yeoul" },
    { source: "dc", link: "https://gall.dcinside.com/board/view/?id=zohong&no=437399", title: "몽매 성안에서 패기 자리잡기편" },
    { source: "cafe", link: "https://cafe.naver.com/nexonjojo/632122", title: "몽매-민폐황제 원술 낭창낭창하게 100만딜 만들기", author: "찰진엉덩국V" },
    { source: "cafe", link: "https://cafe.naver.com/nexonjojo/632154", title: "[몽매의 시련] 민폐 원술 - 167만 공략 (출진 순서 수정 + 영상 첨부)", author: "에이플러스" },
    { source: "cafe", link: "https://cafe.naver.com/nexonjojo/632250", title: "[아이누족] 무과금 슬로우 유저의 몽매의 시련 - 민폐 황제 원술 편 (131만)", author: "아이누족" },
    { source: "cafe", link: "https://cafe.naver.com/nexonjojo/632704", title: "자부진인" },
];
function loadCSS() {
    fg.loadCSS("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css", null, null, {
        "crossorigin": "anonymous",
        "integrity": "sha256-eSi1q2PG6J7g7ib17yAaWMcrr5GrtohYChqibrV7PBE="
    });
}
function createListItem(guide) {
    const link = document.createElement("a");
    link.href = guide.link;
    link.target = "_href";
    link.className = "list-group-item list-group-item-action";
    const favicon = document.createElement("img");
    if (guide.source === "cafe") {
        favicon.src = "https://cafe.naver.com/favicon.ico";
        favicon.alt = "공카";
    }
    else if (guide.source === "dc") {
        favicon.src = "https://gall.dcinside.com/favicon.ico";
        favicon.alt = "조갤";
    }
    favicon.className = "guide-favicon";
    const text = document.createElement("span");
    text.innerText = guide.title;
    text.className = "guide-title";
    link.appendChild(favicon);
    link.appendChild(text);
    return link;
}
function main() {
    util_1.registerServiceWorker();
    util_1.disableContextMenu();
    const list = document.querySelector(".mongme-list");
    list.innerHTML = "";
    const allItems = isBot(navigator.userAgent) ? [].concat(...GUIDE_LIST, ...OLD_GUIDE_LIST) : GUIDE_LIST;
    allItems.forEach((guide) => {
        if (guide) {
            list.appendChild(createListItem(guide));
        }
        else {
            let li = document.createElement("li");
            li.className = "list-group-item";
            list.appendChild(li);
        }
    });
    loadCSS();
}
ready(main);
//# sourceMappingURL=index.js.map