<script lang="ts">
    import * as d3 from "d3";

    let width = 441;
    let height = 450;
    let margin = 80;

    const headerX = -125;
    const headerY = -30;
    export let data: [{ key: string; value: number }];
    export let title;

    // Swap x and y scales
    $: xScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value * 2)]) // Adjust the multiplier as needed
        .range([0, width]);

    $: yScale = d3
        .scaleBand()
        .domain(data.map((d) => d.key))
        .range([0, height])
        .padding(0.4);
    $: colorScale = d3
        .scaleOrdinal(d3.schemeTableau10)
        .domain(data.map((d) => d.key))
        .range(
            ["#094f6b", "#0f84b2", "#42a9d2", "#76cced", "#9fd7ed"].reverse(),
        );
    // Create x-axis
    $: xAxis = d3.axisBottom(xScale);

    const formatValue = (value) => {
        if (value !== undefined && value !== null) {
            if (value >= 1000000) {
                return d3.format(".2s")(value).replace("G", "Mrd."); // Display in billions (G replaced with B)
            } else if (value >= 1000) {
                return d3.format(".2s")(value).replace("G", "Mio"); // Display in millions (G replaced with M)
            } else {
                return value.toFixed(2); // Display as is if less than 1000
            }
        }
    };
</script>

<svg
    width={width + margin * 2}
    height={height + margin * 2}
    class="bg-[#2c2c2c] rounded-lg col-span-3 pr-4"
>
    <g transform={`translate(${margin*2}, ${margin})`}>
        <!-- ... (header and other elements) -->
        <g class="header">
            <text x={headerX} y={headerY} fill="white" font-size="2em">
                {title}
            </text>
        </g>
        <!-- Render bars -->
        {#each data as d, i}
            <!-- Render the label to the left of the bar -->
            <text x="-5" 
                y={yScale(d.key) + yScale.bandwidth() / 2}
                text-anchor="end" fill="white" font-size="16px" dy="0.35em" >
                {d.key}
            </text>
            <rect
                class="bar"
                x="0"
                y={yScale(d.key)}
                width={xScale(d.value)}
                height={yScale.bandwidth()}
                fill={colorScale(d.key)}
            />
            <text
                x={xScale(d.value) + 5}
                y={yScale(d.key) + yScale.bandwidth() / 2}
                text-anchor="start"
                fill="white"
                font-size="16px"
                dy="0.35em"
            >
                {formatValue(d.value)}
            </text>
        {/each}

        <!-- Render vertical line at 0 -->
        <line
            x1={xScale(0)}
            y1="0"
            x2={xScale(0)}
            y2={height}
            stroke="gray"
            stroke-width="2"
        />
    </g>
</svg>
