<script lang="ts">
    import * as d3 from "d3";

    export let width = 704.667;
    export let height = 530.667;
    let margin = -80;

    const headerX = 30;
    const headerY = 90;
    export let data;
    let xScale;
    let yScale;
    let colorScale;
    let xAxis;
    $: {
        // Create scales
        xScale = d3
            .scaleBand()
            .domain(data.map((d) => d.key))
            .range([0, width + 20])
            .padding(0.5);

        yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.value * 1.5)]) // Adjust the multiplier as needed
            .range([height, 0]);

        colorScale = d3
            .scaleOrdinal(d3.schemeTableau10)
            .domain(data.map((d) => d.key))
            .range(
                [
                    "#094f6b",
                    "#0f84b2",
                    "#42a9d2",
                    "#76cced",
                    "#9fd7ed",
                ].reverse(),
            );
        // Create x-axis
        xAxis = d3.axisBottom(xScale);
    }

    const formatValue = (value) => {
        if (value >= 1000000) {
            return d3.format(".2s")(value).replace("G", "Mrd."); // Display in billions (G replaced with B)
        } else if (value >= 1000) {
            return d3.format(".2s")(value).replace("G", "Mio"); // Display in millions (G replaced with M)
        } else {
            return value.toFixed(2); // Display as is if less than 1000
        }
    };
</script>

<svg
    viewBox={`${margin} ${margin} ${width - margin} ${height - margin}`}
>
    <!-- Apply transform to move the graph -->
    <g transform={`translate(${margin}, ${margin})`}>
        <!-- Render x-axis -->
        <g transform={`translate(0, ${height})`} class="x-axis">
            {#each data as d, i}
                <g
                    transform={`translate(${
                        xScale(d.key) + xScale.bandwidth() / 2
                    }, 0)`}
                >
                    <text dy=".71em" y="6" transform="rotate(0)">
                        {d.key}
                    </text>
                </g>
            {/each}
        </g>
        <line
            x1="0"
            y1={height}
            x2={width}
            y2={height}
            stroke="gray"
            stroke-width="2"
        />
        <!-- Render bars -->
        {#each data as d, i}
            <rect
                class="bar"
                x={xScale(d.key)}
                y={yScale(d.value)}
                width={xScale.bandwidth()}
                height={height - yScale(d.value)}
                fill={colorScale(d.key)}
            />
            <text
                x={xScale(d.key) + xScale.bandwidth() / 2}
                y={yScale(d.value) - 5}
                text-anchor="middle"
                fill="white"
                font-size="16px"
            >
                {formatValue(d.value)}
            </text>
        {/each}
    </g>
</svg>

<style>
    .x-axis text {
        text-anchor: middle;
        fill: white;
        font-size: 16px; /* Adjust the font size as needed */
    }
</style>
