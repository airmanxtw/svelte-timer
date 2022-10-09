<svelte:options tag="svelte-timer" />

<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { get_current_component } from "svelte/internal";
  import date from "date-and-time";

  export let size = "3";
  export let format = "YYYY/MM/DD";
  export let color = "black";
  export let bg = "white";
  export let weight = "medium";

  const component = get_current_component();
  const svelteDispatch = createEventDispatcher();

  let counter = 0;
  let intervalID1 = null;
  let intervalID2 = null;
  let time = new Date();

  $: dateFormat = date.format(time, format);
  $: dateHour = date.format(time, "HH");
  $: dateMin = date.format(time, "mm");
  $: dateSec = date.format(time, "ss");
  $: fontsizeClass = `is-size-${size}`;
  $: fontcolorClass = `has-text-${color}`;
  $: fontcolorReverse = `has-text-${bg}`;
  $: backgroundClass = `has-background-${bg}`;
  $: fontweightClass = `has-text-weight-${weight}`;

  let tick = () => {
    component.dispatchEvent &&
      component.dispatchEvent(
        new CustomEvent("tick", {
          detail: {
            load(t) {
              time = typeof Date(t) === "string" ? new Date(Date(t)) : Date(t);
            },
          },
        })
      );
  };

  let setTime = (n) => {
    counter = 0;
    tick();
    intervalID1 = setInterval(() => {
      tick();
    }, n);
    intervalID2 = setInterval(() => {
      counter = (counter + 1) % 2;
    }, n / 2);
  };

  onMount(() => {
    setTime(1000);
    document.addEventListener("visibilitychange", () => {
      if (intervalID1 != null || intervalID2 != null) {
        clearInterval(intervalID1);
        clearInterval(intervalID2);
      }
      if (!document.hidden) {
        setTime(1000);
      } else {
        setTime(1000 * 60 * 5);
      }
    });
  });
</script>

<div
  class="has-text-centered {fontsizeClass} {fontcolorClass} {backgroundClass} {fontweightClass}"
>
  <div>{dateFormat}</div>
  <div>
    {dateHour}<span class={counter % 2 == 0 ? fontcolorClass : fontcolorReverse}
      >:</span
    >{dateMin}<span class={counter % 2 == 0 ? fontcolorClass : fontcolorReverse}
      >:</span
    >{dateSec}
  </div>
</div>

<style lang="scss">
  @import "bulma/sass/helpers/color.sass";
  @import "bulma/sass/helpers/typography.sass";
</style>
