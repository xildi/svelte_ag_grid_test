<script>
  import { getContext } from "svelte";
  import Bar from "./Chart.Bar.svelte";
  import colors from "./colors.json";
  import colors_with_comp from "./colors_with_comp.json";

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
  //<Bar {value} {rank} fill={get_color_for_comp(name)} />
  function get_color_for_comp(name) {
    let color = colors_with_comp.find((color) => color.name === name)?.color
    return  color !== null && color !== undefined ? color : "#0C445A";
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

{#each $data as { value, rank, name }, i (i)}
  {#if rank < barCount && value > 0}
    <Bar {value} {rank} fill={get_color_for_comp(name)} />
  {/if}
{/each}
