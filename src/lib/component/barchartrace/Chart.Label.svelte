<script>
  import { getContext } from "svelte";
  import { format } from "d3";

  export let value;
  export let rank;
  export let i;
  export let category;

  const { names, scales, dimensions } = getContext("Chart");
  const formatNumber = (d) => format(",.0f")(d).replace(/,/g, "'");
  function formatNumberAsMio(value) {
    return formatNumber((value / 1e6).toFixed(0)) + " Mio";
  }
  
  $: x = $scales.x(value);
  $: y = $scales.y(rank) + $dimensions.barMargin / 2;
  $: height = $dimensions.barHeight;
</script>

<div
  class="label"
  style="height: {height}px; transform: translate({x}px, {y}px);"
>
  <div class="inner">
    <p class="name">{names[i]}</p>
    <p class="value">{formatNumberAsMio(value)}</p>
  </div>
</div>

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
    font-family: Verdana, Geneva, Tahoma, sans-serif;
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
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
</style>
