const commanderData = require("./characters");

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
    return (state = { ...getState(), ...newState });
  }

  function getCharacterInformation(id: number) {
    return commanderData.find((commander: ICommander) => id === commander.id);
  }

  function getTotalCost(commanders: ICommander[]) {
    const totalCost = commanders.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.cost;
    }, 0);
    return totalCost;
  }

  function getDisplayName(commander: ICommander) {
    if (commander.desc == null) {
      return commander.name
    } else {
      return `${commander.name} ${commander.desc}`
    }
  }

  function mapResultNode() {
    return getState()
      .selectedCharacters.map(char => {
        return `<li class="list-group-item">
          <div style="margin-bottom: 2px;">
            <strong>${char.name}</strong> | ${char.class} | ${char.cost} cost
          </div>
          <div style="font-size: 10px;">
            ${char.skill1} | ${char.skill2} | ${char.skill3} | ${char.skill4}
          </div>
        </li>`;
      })
      .join("");
  }

  ($ as any)(".commander-input").selectize({
    maxItems: 5,
    hideSelected: true,
    valueField: "id",
    // labelField: "name",
    render: {
        item: function(char: ICommander, _: any) {
          return `<div>${getDisplayName(char)}</div>`
        },
        option: function(char: ICommander, _: any) {
          return `<div>${getDisplayName(char)}</div>`
        }
    },
    searchField: ["name", "desc", "aka"],
    maxOptions: 9999,
    options: commanderData,
    create: false,
    diacritics: true,
    onItemAdd(value: string, _$item: any) {
      const id = parseInt(value)
      const char = getCharacterInformation(id);
      const newState = getState().selectedCharacters.concat([char]);

      setState({
        selectedCharacters: newState,
        totalCost: getTotalCost(newState),
      });

      render();
    },
    onItemRemove(value: string) {
      const id = parseInt(value)
      const state = getState()
      const index = state.selectedCharacters.findIndex(char => char.id === id);
      if (index >= 0) {
        const prevArr = state.selectedCharacters.slice(0, index);
        const nextArr = state.selectedCharacters.slice(index + 1);
        const newState = prevArr.concat(nextArr);

        setState({
          selectedCharacters: newState,
          totalCost: getTotalCost(newState),
        });

        render();
      }
    },
  });

  function render() {
    const listParentNode = document.querySelector(".list-group");
    listParentNode.innerHTML = mapResultNode();

    const totalCostNode = document.querySelector(".total-cost-wrapper");
    const totalCostValue = getState().totalCost
    const style = totalCostValue > 99 ? "list-group-item-danger" : "list-group-item-success"
    totalCostNode.innerHTML = `
    <div class="list-group-item list-group-item-action ${style}">
    총 COST : ${totalCostValue}
  </div>
  `;
  }
}

ready(main);
