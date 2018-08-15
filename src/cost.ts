import "babel-polyfill";

const commanderData = require("./characters");

const HAS_LOCAL_STORAGE = window.localStorage;

interface ICommander {
  id: number;
  name: string;
  class: string;
  grade: string;
  origin: string;
  cost: number;
  str: number;
  int: number;
  com: number;
  dex: number;
  luk: number;
  skill1: string;
  skill2: string;
  skill3: string;
  skill4: string;
  desc?: string;
  aka?: string;
}

interface IAppState {
  selectedCharacters: ICommander[];
  totalCost: number;
}

function ready(fn: (EventListenerOrEventListenerObject?: any, useCapture?: boolean) => void) {
  if ((document as any).attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function main() {
  let state: IAppState = {
    selectedCharacters: [],
    totalCost: 0,
  };

  function getState(): IAppState {
    return state;
  }

  function setState(newState: IAppState): IAppState {
    return (state = {...getState(), ...newState});
  }

  function getCharacterInformation(id: number): ICommander {
    return commanderData.find((commander: ICommander) => id === commander.id);
  }

  function getTotalCost(commanders: ICommander[]): number {
    return commanders.reduce((acc, val) => {
      return acc + val.cost;
    }, 0);
  }

  function getDisplayName(commander: ICommander): string {
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

  function setStateAndRender(newState: ICommander[]) {
    setState({
      selectedCharacters: newState,
      totalCost: getTotalCost(newState),
    });

    renderCharacters();
  }

  function saveState() {
    if (HAS_LOCAL_STORAGE) {
      window.localStorage.setItem("ids", getState().selectedCharacters.map(commander => commander.id).join(","))
    }
  }

  function loadState() {
    if (HAS_LOCAL_STORAGE) {
      let ids = window.localStorage.getItem("ids");
      if (ids != null) {
        return ids.split(",").map(id => parseInt(id));
      }
    }
    // default chars
    return [464, 477, 256, 295, 121];
  }

  function getNewSaveId(): number {
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

  function saveCharacters(id: number, characters: ICommander[]) {
    if (characters.length == 0) {
      return;
    }
    const ids = characters.map((c) => c.id).join(',');
    window.localStorage.setItem(`saved_${id}`, `${ids}`);
  }

  function deleteCharacters(id: string) {
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

  function getSavedCharacter(key: string) {
    const localStorage = window.localStorage;
    return localStorage.getItem(key)
      .split(',')
      .map(id => parseInt(id, 10))
      .map(id => getCharacterInformation(id));
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

  let select = ($ as any)(".commander-input").selectize({
    maxItems: 5,
    hideSelected: true,
    valueField: "id",
    // labelField: "name",
    render: {
      item: function (char: ICommander) {
        return `<div>${getDisplayName(char)}</div>`
      },
      option: function (char: ICommander) {
        return `<div>${getDisplayName(char)}</div>`
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
    onItemAdd(value: string) {
      const id = parseInt(value);
      const char = getCharacterInformation(id);
      const newState = getState().selectedCharacters.concat([char]);

      setStateAndRender(newState);
      saveState();
      ga('send', 'event', 'Character', 'Select', `${char.id}_${getDisplayName(char)}`);
    },
    onItemRemove(value: string) {
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
    const listParentNode = document.querySelector(".active-characters");
    listParentNode.innerHTML = getActiveCharacterNodes();

    const totalCostNode = document.querySelector(".total-cost-wrapper");
    const totalCostValue = getState().totalCost;
    const style = totalCostValue > 99 ? "list-group-item-danger" : "list-group-item-success";
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
      savedKeys.map((key) => [key, getSavedCharacter(key).map(character => character.name).join(", ")])
        .map((arr) => {
          const key = arr[0];
          const line = arr[1];
          return `<li class="list-group-item" style="padding-bottom: 0;">${line}<div style="display: flex; justify-content: flex-end">
<!--<button type="button" class="btn btn-link">공유</button>-->
<button type="button" class="saved-delete btn btn-link" data-key="${key}">삭제</button>
</div>
</li>`
        })
        .join('');
    const deleteButtons = document.querySelectorAll('.saved-delete');
    for (let i = 0; i < deleteButtons.length; i++) {
      const button = deleteButtons[i];
      button.addEventListener('click', () => {
        deleteCharacters(button.getAttribute('data-key'));
        renderSavedCharacters()
      })
    }
  }

  function setDefaultItems() {
    let s = select[0].selectize;
    loadState().forEach(id => s.addItem(id));
  }

  setDefaultItems();
  addSaveListener();
  renderSavedCharacters();
}

ready(main);
