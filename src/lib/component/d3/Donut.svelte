<script lang="ts">
  import * as d3 from "d3";
  import { draw, fade, slide } from "svelte/transition";
  export let data;
  export let width = 683;
  export let height = 432.5;
  let margin = 0;
  let radius: number;
  let color;
  let pie;
  let data_ready;
  let arc;
  let outerArc;
  $: {
    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    radius = Math.min(width, height) / 2 - margin;

    // set the color scale
    color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.key))
      .range(["#094f6b", "#0f84b2", "#42a9d2", "#76cced", "#9fd7ed"]);

    // Compute the position of each group on the pie:
    pie = d3
      .pie()
      .sort(null) // Do not sort group by size
      .value((d) => d.value);
    data_ready = pie(data);
    // The arc generator
    arc = d3
      .arc()
      .padAngle(0.01)
      .innerRadius(radius * 0.4) // This is the size of the donut hole
      .outerRadius(radius * 0.8);

    // Another arc that won't be drawn. Just for labels positioning
    outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);
  }

  // Function to calculate polyline points
  const calculatePolylinePoints = (d) => {
    const posA: [number, number] = arc.centroid(d);
    const posB: [number, number] = outerArc.centroid(d);
    const posC: [number, number] = outerArc.centroid(d);
    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;

    // Adjust the end length to reduce the path length at the end
    const endLength = radius * 0.5; // Adjust the end length as needed

    // Move posA closer to posB along the line
    const moveCloserFactor = 0.4; // Adjust this factor (0.5 means halfway between posA and posB)
    posA[0] = posA[0] + moveCloserFactor * (posB[0] - posA[0]);
    posA[1] = posA[1] + moveCloserFactor * (posB[1] - posA[1]);

    // Adjust posC based on the new posA
    posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);

    return [posA, posB, posC];
  };
  // Function to calculate label position with padding
  const calculateLabelPosition = (d) => {
    const posC = outerArc.centroid(d);
    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;

    posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
    posC[1] = posC[1] - 10; // Adjust the vertical position

    // Add padding between the end of the line and the beginning of the label
    if (midangle < Math.PI) {
      posC[0] += 5; // Adjust the horizontal position for labels on the left side
      posC[2] = "start"; // Set text-anchor to start for labels on the left side
    } else {
      posC[0] -= 5; // Adjust the horizontal position for labels on the right side
      posC[2] = "end"; // Set text-anchor to end for labels on the right side
    }

    return posC;
  };
</script>

<svg
  {height}
  {width}
  viewBox="{-width / 2}, {-height / 2}, {width}, {height}"
  style:max-width="100%"
  style:height="100%"
>
  <g class="chart-inner">
    {#each data_ready as slice}
      <path d={arc(slice)} fill={color(slice.data.key)} />
      {#if ((slice.endAngle - slice.startAngle) / (2 * Math.PI)) * 100 > 2.5}
        <!-- Draw polyline -->
        <polyline
          stroke="gray"
          fill="none"
          stroke-width="1"
          points={calculatePolylinePoints(slice).join(",")}
        />
        <!-- Draw label with padding -->
        <text
          x={calculateLabelPosition(slice)[0]}
          y={calculateLabelPosition(slice)[1]}
          fill="white"
          text-anchor={calculateLabelPosition(slice)[2]}
          dy="1em"
          font-size="18px"
        >
          {slice.data.key}
        </text>

        <!-- Display percentage in the center -->
        <text
          x={arc.centroid(slice)[0]}
          y={arc.centroid(slice)[1]}
          fill="black"
          text-anchor="middle"
          dy=".35em"
          font-size="14px"
        >
          {(
            ((slice.endAngle - slice.startAngle) / (2 * Math.PI)) *
            100
          ).toFixed(1)}%
        </text>
      {/if}
    {/each}
  </g>
</svg>

<style>
  :global(body) {
    margin: 0;
  }
</style>
