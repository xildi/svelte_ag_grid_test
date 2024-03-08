<script>
  import { getContext } from "svelte";
  import Tick from "./Chart.Tick.svelte";
  import { format } from "d3";

  const { scales } = getContext("Chart");

  const desiredTicks = [100000000, 1000000000, 10000000000];

  // $: ticks = $scales.x.ticks(1.9); // don't need to show 0
  $: ticks = desiredTicks.filter(value => value <= $scales.x.domain()[1]); // Filter ticks based on domain
  function formatNumber(value) {
    const absValue = Math.abs(value);

    if (absValue >= 1e9) {
      // Billion (Milliard)
      return (value / 1e9).toFixed(0) + " Mrd";
    } else if (absValue >= 1e6) {
      // Million (Mio)
      return (value / 1e6).toFixed(0) + " Mio";
    } else {
      // No suffix for values less than 1 million
      return value.toFixed(0);
    }
  }
</script>

{#each ticks as value (value)}
  <Tick x={$scales.x(value)} value={formatNumber(value)} />
{/each}
