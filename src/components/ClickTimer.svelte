<svelte:options tag="svelte-timer" />

<script>
  import { onMount } from "svelte";
  let time = Date.now();
  onMount(() => {
    setInterval(() => {
      time = Date.now();
    }, 1000);
  });
</script>

<h1 class="has-text-primary">{time}</h1>

<style lang="scss">
  @import "bulma/sass/helpers/color.sass";
</style>
