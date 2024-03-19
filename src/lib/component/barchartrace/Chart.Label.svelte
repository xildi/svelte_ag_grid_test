<script>
  import { getContext } from "svelte";
  import { format } from "d3";

  export let value;
  export let rank;
  export let image;
  export let i;

  const { names, scales, dimensions } = getContext("Chart");
  const formatNumber = (d) => format(",.0f")(d).replace(/,/g, "'");
  function formatNumberAsMio(value) {
    return formatNumber((value / 1e6).toFixed(0)) + " Mio";
  }

  $: x = $scales.x(value);
  $: y = $scales.y(rank) + $dimensions.barMargin / 2;
  $: height = $dimensions.barHeight;
</script>
{#if value !== undefined && value !== null && value > 0}
<div
  class="label"
  style="height: {height}px; transform: translate({x}px, {y}px);"
>
{#if image !== null && image !== undefined}
  <img class="image" style="height: {height-5}px" src="img/logos/{image}"  />
{/if}
  <div class="inner">
    <p class="name">{names[i]}</p>
    <p class="value">{formatNumberAsMio(value)}</p>
  </div>
</div>
{/if}
<style>
  .label {
    position: absolute;
    left: 0;
    top: 0;
  }
  .inner {
    transform: translate(-100%, 0);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 0.9em;
    height: 100%;
    font-family: -apple-system, "system-ui", "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }
  p {
    margin: 0;
    font-size: 1em;
    text-align: right;
  }
  .name {
    font-weight: 400;

  }
  .value {
    font-size: 0.75em;
    font-feature-settings: "tnum" 1;
    font-family: -apple-system, "system-ui", "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }
  .image {
    position: absolute;
    transform: translate(5px, 2.5px);
  }
</style>
