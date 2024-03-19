<script lang="ts">
  import { scaleLinear, scaleLog, select } from "d3";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import { tweened } from "svelte/motion";
  import { RangeSlider } from "@skeletonlabs/skeleton";

  import Timer from "./Timer.svelte";
  import Bars from "./Chart.Bars.svelte";
  import Axis from "./Chart.Axis.svelte";
  import Labels from "./Chart.Labels.svelte";
  import Ticker from "./Chart.Ticker.svelte";

  import keyframes from "./keyframes2.json";

  const duration = 250; // ms between keyframes
  const barCount = 15; // how many bars to show
  const barMargin = 2; // space between bars
  const keyframeCount = keyframes.length; // number of keyframes
  const names = Array.from(
    new Set(keyframes.flatMap((entry) => entry[1].map((item) => item.name))),
  );

  const dimensions = writable({});
  const scales = writable({});
  const data = tweened(null, { duration });
  const xMax = tweened(null, { duration });

  let figureWidth = 0;
  let figureHeight = 0;
  let currentKeyframe = 0;
  let isEnabled = false;
  let selectedKeyframeIndex;

  // update dimensions
  $: width = figureWidth;
  $: height = figureHeight;
  $: barHeight = height / barCount - barMargin;
  const onRangeInput = (e) => {
    selectedKeyframeIndex = e.target.value || selectedKeyframeIndex;
    frameIndex = selectedKeyframeIndex;
    currentKeyframe = frameIndex;
  };
  // update data
  $: isEnabled = currentKeyframe < keyframeCount;
  $: frameIndex = Math.min(currentKeyframe, keyframeCount - 1);
  $: frame = get_key_frame(selectedKeyframeIndex, frameIndex);
  $: keyframeDate = frame[0];
  $: keyframeData = frame[1];
  $: currentData = names.map((name) => ({
    ...keyframeData.find((d) => d.name == name),
  }));

  function get_key_frame(selectedKeyframeIndex, frameIndex) {
    if (selectedKeyframeIndex !== undefined && selectedKeyframeIndex !== null) {
      let keyframe = keyframes[selectedKeyframeIndex];
      isEnabled = false;
      return keyframe;
    }
    return keyframes[frameIndex];
  }
  // function formatDateToMMYYYY(date2: Date) {
  //     return new Intl.DateTimeFormat("en-US", {
  //       month: "2-digit",
  //       year: "numeric",
  //     }).format(date2);
  // }
  function formatDateToDDMMYYYY(dateString: string): string {
    const date = new Date(dateString);

    // Set the day to 01
    date.setDate(1);

    const formattedDate = date
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");

    return formattedDate;
  }

  function removeDayFromDate(dateString: string): string {
    // Assuming dateString is in the format "YYYY-MM-DD"
    const yearMonth = dateString.slice(0, 7); // Extract the "YYYY-MM" part
    return yearMonth;
  }

  // update stores and context
  $: data.set(currentData);
  $: dimensions.set({
    width,
    height,
    barHeight,
    barMargin,
  });
  $: xMax.set(Math.max(...keyframeData.map((d) => d.value)));
  $: scales.set({
    x: scaleLog()
      .domain([70000000, $xMax])
      .range([0, $dimensions.width - 55]),
    y: scaleLinear().domain([0, barCount]).range([0, $dimensions.height]),
  });
  $: chartContext = { dimensions, scales, data, names };
  $: setContext("Chart", chartContext);
</script>

{#if keyframes}
  <Timer
    bind:currentKeyframe
    keyframeCount={keyframes.length}
    {duration}
    bind:isEnabled
    bind:selectedKeyframeIndex
    on:end={() => (isEnabled = false)}
  />
  <figure bind:offsetWidth={figureWidth} bind:offsetHeight={figureHeight}>
    <div class="bars">
      <Bars {barCount} />
    </div>

    <div class="axis">
      <Axis />
    </div>

    <div class="labels">
      <Labels {barCount} />
    </div>

    <div class="ticker">
      <Ticker date={keyframeDate} />
    </div>
  </figure>
  <div class="div_width ">
    <input
      style="width: 98vw;"
      type="range"
      min="0"
      max={keyframeCount - 1}
      value={frameIndex}
      on:input={onRangeInput}
    />
  </div>
{/if}

<style>
  div_width {
    width: 100vw;
    text-align: center;
  }
  figure {
    display: block;
    position: relative;
    width: 98%;
    height: 75vh;
    min-height: 420px;
    margin: 0;
    user-select: none;
  }

  figure > * {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .legend {
    flex: auto;
  }
  .axis {
    overflow: visible;
  }
</style>
