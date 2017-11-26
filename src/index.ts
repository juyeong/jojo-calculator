const commanderData = require("./data");

interface ICommander {
  name: string;
  class: string;
  grade: string;
  origin: string;
  cost: string;
  str: string;
  int: string;
  com: string;
  dex: string;
  luk: string;
  special30: string;
  special50: string;
  special70: string;
  special90: string;
}

interface IAppState {
  selectedCharacters?: ICommander[];
  totalCost?: number;
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

  function getCharacterInformation(name: string) {
    return commanderData.find((commander: ICommander) => name === commander.name);
  }

  function getTotalCost(commanders: ICommander[]) {
    const totalCost = commanders.reduce((accumulator, currentValue) => {
      return accumulator + parseInt(currentValue.cost, 10);
    }, 0);
    return totalCost;
  }

  function mapResultNode() {
    return getState()
      .selectedCharacters.map(char => {
        return `<li class="list-group-item">
          <div>
          ${char.name} | ${char.class} | ${char.cost} cost
          </div>
          <div>
          ${char.special30} | ${char.special50} | ${char.special70} | ${char.special90}
          </div>
        </li>`;
      })
      .join("");
  }

  ($ as any)(".commander-input").selectize({
    maxItems: 5,
    hideSelected: true,
    valueField: "name",
    labelField: "name",
    searchField: ["name"],
    maxOptions: 9999,
    options: commanderData,
    create: false,
    onItemAdd(value: string, _$item: any) {
      const char = getCharacterInformation(value);
      const newState = getState().selectedCharacters.concat([char]);

      setState({
        selectedCharacters: newState,
        totalCost: getTotalCost(newState),
      });

      render();
    },
    onItemRemove(value: string) {
      const index = getState().selectedCharacters.findIndex(char => char.name === value);
      if (index >= 0) {
        const prevArr = getState().selectedCharacters.slice(0, index);
        const nextArr = getState().selectedCharacters.slice(index + 1);
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
    totalCostNode.innerHTML = `
    <div class="list-group-item list-group-item-action active">
    총 COST : ${getState().totalCost}
  </div>
  `;
  }
}

ready(main);
