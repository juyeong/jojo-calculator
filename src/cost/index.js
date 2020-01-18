"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("babel-polyfill");
const axios_1 = require("axios");
require("./index.css");
const util_1 = require("../util");
let commanderData;
const HAS_LOCAL_STORAGE = window.localStorage;
function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    }
    else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
function main() {
    let state = {
        selectedCharacters: [],
        totalCost: 0,
    };
    let inDefaultUpdate = false;
    function getState() {
        return state;
    }
    function setState(newState) {
        return (state = Object.assign(Object.assign({}, getState()), newState));
    }
    function getCharacterInformation(id) {
        return commanderData.find((commander) => id === commander.id);
    }
    function getTotalCost(commanders) {
        return commanders.reduce((acc, val) => {
            return acc + val.cost;
        }, 0);
    }
    function getDisplayName(commander) {
        return commander.desc == null ? commander.name : `${commander.name} ${commander.desc}`;
    }
    function getActiveCharacterNodes() {
        return getState()
            .selectedCharacters.map(char => {
            return `<li class="list-group-item">
          <div style="margin-bottom: 2px;">
            <strong>${char.name}</strong> | ${char.class} | ${char.cost} cost
          </div>
          <div class=".text-dark" style="font-size: 0.9em;">
            ${char.skill1} | ${char.skill2} | ${char.skill3} | ${char.skill4}
          </div>
        </li>`;
        })
            .join("");
    }
    function setStateAndRender(newState) {
        setState({
            selectedCharacters: newState,
            totalCost: getTotalCost(newState),
        });
        renderCharacters();
    }
    function saveState() {
        if (HAS_LOCAL_STORAGE) {
            window.localStorage.setItem("ids", getState().selectedCharacters.map(commander => commander.id).join(","));
        }
    }
    function loadState() {
        if (HAS_LOCAL_STORAGE) {
            let ids = window.localStorage.getItem("ids");
            if (ids) {
                const savedIds = ids.split(",").map(id => parseInt(id));
                if (savedIds.length > 0 && savedIds.every(id => id > 1000000)) {
                    return savedIds;
                }
            }
        }
        return shuffle([1100001, 1100002, 1100003, 1100004, 1100005, 1100006, 1100007, 1100008, 1100009, 1100010, 1100011, 1100012, 1100013, 1100014, 1100015, 1100016, 1100017, 1100018, 1100019, 1100020, 1100021, 1100022, 1100023, 1100024, 1100025, 1100026, 1100171])
            .slice(0, 5);
    }
    function getNewSaveId() {
        if (HAS_LOCAL_STORAGE) {
            const id = window.localStorage.getItem("_id");
            let idNum = 1;
            if (id != null) {
                idNum = parseInt(id, 10) + 1;
            }
            window.localStorage.setItem("_id", `${idNum}`);
            return idNum;
        }
    }
    function saveCharacters(id, characters) {
        if (characters.length == 0) {
            return;
        }
        const ids = characters.map((c) => c.id).join(',');
        window.localStorage.setItem(`saved_${id}`, `${ids}`);
    }
    function deleteCharacters(id) {
        window.localStorage.removeItem(id);
    }
    function getSavedCharacterKeys() {
        const localStorage = window.localStorage;
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('saved_')) {
                keys.push(key);
            }
        }
        return keys.sort((key1, key2) => key1 < key2 ? 1 : -1);
    }
    function getSavedCharacter(key) {
        const localStorage = window.localStorage;
        return localStorage.getItem(key)
            .split(',')
            .map(id => parseInt(id, 10))
            .map(id => getCharacterInformation(id))
            .filter(character => character);
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
    function addSaveListener() {
        document.querySelector('.commander-save').addEventListener('click', () => {
            const savedKeys = getSavedCharacterKeys();
            if (savedKeys.length >= 100) {
                alert("최대 100개 까지 저장 가능");
                return;
            }
            const saveId = getNewSaveId();
            const characters = getState().selectedCharacters;
            saveCharacters(saveId, characters);
            renderSavedCharacters();
        });
    }
    let select = $(".commander-input").selectize({
        maxItems: 7,
        hideSelected: true,
        valueField: "id",
        render: {
            item: function (char) {
                return `<div>${getDisplayName(char)}</div>`;
            },
            option: function (char) {
                return `<div>${getDisplayName(char)}</div>`;
            }
        },
        searchField: ["name", "desc", "aka"],
        maxOptions: 9999,
        sortField: {
            field: "order",
            direction: "desc"
        },
        options: commanderData,
        create: false,
        diacritics: true,
        onItemAdd(value) {
            const id = parseInt(value);
            const char = getCharacterInformation(id);
            const newState = getState().selectedCharacters.concat([char]);
            setStateAndRender(newState);
            if (!inDefaultUpdate) {
                saveState();
                ga('send', 'event', 'Character', 'Select', `${char.id}_${getDisplayName(char)}`);
            }
        },
        onItemRemove(value) {
            const id = parseInt(value);
            const state = getState();
            const index = state.selectedCharacters.findIndex(char => char.id === id);
            if (index >= 0) {
                const prevArr = state.selectedCharacters.slice(0, index);
                const nextArr = state.selectedCharacters.slice(index + 1);
                const newState = prevArr.concat(nextArr);
                setStateAndRender(newState);
                saveState();
            }
        },
    });
    function renderCharacters() {
        if (inDefaultUpdate)
            return;
        const listParentNode = document.querySelector(".active-characters");
        listParentNode.innerHTML = getActiveCharacterNodes();
        const totalCostNode = document.querySelector(".total-cost-wrapper");
        const totalCostValue = getState().totalCost;
        let style;
        if (totalCostValue > 145) {
            style = "list-group-item-danger";
        }
        else if (totalCostValue > 99) {
            style = "list-group-item-warning";
        }
        else {
            style = "list-group-item-success";
        }
        totalCostNode.innerHTML = `
    <div class="list-group-item list-group-item-action ${style}">
    총 COST : ${totalCostValue}
  </div>
  `;
    }
    function renderSavedCharacters() {
        const listParentNode = document.querySelector(".saved-characters");
        const savedKeys = getSavedCharacterKeys();
        listParentNode.innerHTML =
            savedKeys.map((key) => {
                let characters = getSavedCharacter(key);
                return [key, characters.map(character => character.name).join(", "), characters.map(character => character.cost).reduce((acc, val) => val + acc, 0)];
            })
                .map((arr) => {
                const key = arr[0];
                const line = arr[1];
                const cost = arr[2];
                return `<li class="list-group-item" style="padding-bottom: 0;">[${cost}] ${line}<div style="display: flex; justify-content: flex-end">
<!--<button type="button" class="btn btn-link">공유</button>-->
<button type="button" class="saved-delete btn btn-link" data-key="${key}">삭제</button>
</div>
</li>`;
            })
                .join('');
        const deleteButtons = document.querySelectorAll('.saved-delete');
        for (let i = 0; i < deleteButtons.length; i++) {
            const button = deleteButtons[i];
            button.addEventListener('click', () => {
                deleteCharacters(button.getAttribute('data-key'));
                renderSavedCharacters();
            });
        }
    }
    function setDefaultItems() {
        inDefaultUpdate = true;
        select[0].selectize.setValue(loadState());
        inDefaultUpdate = false;
        renderCharacters();
    }
    window.setTimeout(() => setDefaultItems(), 0);
    addSaveListener();
    addNavListener();
    window.setTimeout(() => renderSavedCharacters(), 0);
    util_1.disableContextMenu();
    util_1.registerServiceWorker();
}
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
function fetchCharacters() {
    axios_1.default.get("https://public.jy.is/caocao/characters.json")
        .then((resp) => {
        commanderData = resp.data;
        main();
    })
        .catch(() => window.location.href = "/");
}
ready(fetchCharacters);
//# sourceMappingURL=index.js.map