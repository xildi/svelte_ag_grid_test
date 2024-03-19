<script>
  import { createEventDispatcher } from "svelte";
  import { timer, elapsed } from "./timer.js";
  import PhPlayFill from "~icons/ph/play-fill";
  import PhPauseFill from "~icons/ph/pause-fill";
  import IcRoundRefresh from "~icons/ic/round-refresh";

  export let currentKeyframe = 0;
  export let keyframeCount = 0;
  export let duration = 1000;
  export let isEnabled = false;
  export let selectedKeyframeIndex;

  const dispatch = createEventDispatcher();

  const onReset = () => {
    currentKeyframe = 0;
    selectedKeyframeIndex = undefined;
    timer.reset();
  };
  const onPause = () => {
    isEnabled = false;
    if (selectedKeyframeIndex !== undefined) {
      currentKeyframe = selectedKeyframeIndex;
      timer.set(selectedKeyframeIndex * duration);
      selectedKeyframeIndex = undefined;
    }
  };
  const onStart = () => {
    isEnabled = true;
    if (selectedKeyframeIndex !== undefined) {
      currentKeyframe = selectedKeyframeIndex;
      timer.set(selectedKeyframeIndex * duration);
      selectedKeyframeIndex = undefined;
    }
  };
  $: if (isEnabled) {
    if (selectedKeyframeIndex == undefined) {
      currentKeyframe = Math.floor($elapsed / duration);
    } else {
      currentKeyframe = selectedKeyframeIndex;
    }
  }

  $: if (currentKeyframe === keyframeCount) dispatch("end");

  $: isEnabled ? timer.start() : timer.stop();
</script>

<div>
  <button on:click={onStart}><PhPlayFill/></button>
  <button on:click={onPause}><PhPauseFill/></button>
  <button on:click={onReset}><IcRoundRefresh/></button>
</div>

<style>
  div {
    display: flex;
    justify-content: center;
    margin-bottom: 0.75em;
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
