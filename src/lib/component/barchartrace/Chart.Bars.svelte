<script>
  import { getContext } from "svelte";
  import Bar from "./Chart.Bar.svelte";
  import colors from "./colors.json";

  const { data } = getContext("Chart");
  const colorCount = colors.length;
  export let barCount;

  function djb2(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return hash >>> 0;
  }

  function getColorForCategory(category) {
    let color = colormap.find((a) => a.key === category);
    if (color !== undefined && color !== null) {
      return color.color
    } else {
    const categoryHash = djb2(category);
    const colorIndex = categoryHash % colorCount;
    return colors[colorIndex];
    }
  }

</script>

{#each $data as { value, rank, }, i (i)}
  {#if rank < barCount}
    <Bar {value} {rank} fill={colors[i % colorCount]} />
  {/if}
{/each}
