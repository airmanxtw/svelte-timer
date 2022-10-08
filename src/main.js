import clickTimer from "./components/ClickTimer.svelte";
customElements.get("svelte-timer") ||
  customElements.define("svelte-timer", clickTimer);
