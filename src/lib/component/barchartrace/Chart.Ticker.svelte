<script>
  import { timeParse } from "d3";

  export let date;
  $: year = timeParse("%m-%d-%Y")(date).getFullYear();
  $: month = timeParse("%m-%d-%Y")(date).getMonth() + 1;
</script>

{#if date}
  <p>{month}-{year}</p>
{/if}

<style>
  p {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 0;
    font-size: 3em;
    font-weight: 400;
    font-feature-settings: "tnum" 1;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
</style>