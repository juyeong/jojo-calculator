export function disableContextMenu() {
  window.oncontextmenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };
}
