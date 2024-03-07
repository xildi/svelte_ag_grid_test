<script>
  import { getContext } from "svelte";
  import Label from "./Chart.Label.svelte";
  const { data } = getContext("Chart");

  export let barCount = 10;
</script>

{#each $data as { value, rank, category, image }, i (i)}
  {#if rank < barCount}
    <Label value="{value}" rank="{rank}" image="{image}" i="{i}" />
  {/if}
{/each}
