<script>
  import { createEventDispatcher } from "svelte";
  import { timer, elapsed } from "./timer.js";
  export let currentKeyframe = 0;
  export let keyframeCount = 0;
  export let duration = 1000;
  export let isEnabled = false;

  const dispatch = createEventDispatcher();

  const onReset = () => {
    currentKeyframe = 0;
    timer.reset();
  };

  $: if (isEnabled) currentKeyframe = Math.floor($elapsed / duration);

  $: if (currentKeyframe === keyframeCount) dispatch("end");

  $: isEnabled ? timer.start() : timer.stop();
</script>

<div>
  <button on:click={() => (isEnabled = true)}>Start</button>
  <button on:click={() => (isEnabled = false)}>Pause</button>
  <button on:click={onReset}>Zurücksetzen</button>
</div>

<style>
  div {
    display: flex;
    justify-content: center;
    margin-bottom: 3em;
  }

  button {
    margin: 0.5em;
    padding: 0.5em;
    border-color: #68686e !important;
    background: #222628;
    color: #fff;
    font-size: 13px;
    font-weight: bold;
    border: solid 0.5px;
    border-radius: 3px;
    cursor: pointer;
  }

  .dropdown {
    background: #222628;
    border-color: #68686e !important;
    color: #fff;
    border-radius: 3px;
    border: solid 1px;
    outline: none;
    font-size: 13px;
  }
</style>
