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

  const component = get_current_component();
  const svelteDispatch = createEventDispatcher();

  let counter = 0;
  let time = new Date();

  $: dateFormat = date.format(time, format);
  $: dateHour = date.format(time, "HH");
  $: dateMin = date.format(time, "mm");
  $: dateSec = date.format(time, "ss");
  $: fontsizeClass = `is-size-${size}`;
  $: fontcolorClass = `has-text-${color}`;
  $: fontcolorReverse = `has-text-${bg}`;
  $: backgroundClass = `has-background-${bg}`;

  let tick = () => {
    component.dispatchEvent &&
      component.dispatchEvent(
        new CustomEvent("tick", {
          detail: {
            load(t) {
              time = new Date(Date(t));
            },
          },
        })
      );
  };

  onMount(() => {
    tick();
    setInterval(() => {
      tick();
    }, 1000);
    setInterval(() => {
      counter = (counter + 1) % 2;
    }, 500);
  });
</script>

<div
  class="has-text-centered {fontsizeClass} {fontcolorClass} {backgroundClass}"
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
