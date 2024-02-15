<script>
    import * as d3 from "d3";

    // Receive plot data as prop.
    export let data;

    // The chart dimensions and margins as optional props.

    export let width = 683;
    export let height = width * 0.63324;
    export let marginTop = 30;
    export let marginRight = 50;
    export let marginBottom = 50;
    export let marginLeft = 40;

    // Create the x (horizontal position) scale.
    $: xScale = d3
        .scaleBand()
        .domain(
            // Sort the data in descending value
            d3.groupSort(
                data,
                ([d]) => -d.value,
                (d) => d.key,
            ),
        )
        .range([marginLeft, width - marginRight])
        .padding(0.3);

    // Create the y (vertical position) scale.
    $: yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value)])
        .range([height - marginBottom, marginTop]);

    $: colorScale = d3
        .scaleOrdinal(d3.schemeTableau10)
        .domain(data.map((d) => d.key))
        .range(["#094f6b", "#0f84b2", "#42a9d2", "#76cced", "#9fd7ed"]);
    const formatValue = (value) => {
        if (value >= 1e9) {
            return d3.format(".2s")(value).replace(/G/, " Mrd.");
        } else if (value >= 1e6) {
            return d3.format(".2s")(value).replace(/M/, " Mio.");
        } else if (value >= 1e3) {
            return d3.format(".2s")(value).replace(/k/, " K");
        }
        return value;
    };
</script>

<svg
    viewBox="0 0 {width} {height}"
    style:width="100%"
    style:height="100%"
    style=""
>
    <!-- Add a rect for each bar. -->
    <g>
        {#each data as d}
            <rect
                x={xScale(d.key)}
                y={yScale(d.value)}
                height={yScale(0) - yScale(d.value)}
                width={xScale.bandwidth()}
                fill={colorScale(d.key)}
            />
            <text
                fill="white"
                text-anchor="middle"
                x={xScale(d.key) + xScale.bandwidth() / 2}
                y={yScale(d.value) - 5}
            >
                {formatValue(d.value)}
            </text>
        {/each}
    </g>

    <!-- X-Axis -->
    <g transform="translate(0,{height - marginBottom})">
        <line stroke="white" x1={marginLeft - 6} x2={width - marginRight} />

        {#each data as d}
            <!-- X-Axis Tick Labels -->
            <text
                fill="white"
                text-anchor="middle"
                x={xScale(d.key) + xScale.bandwidth() / 2}
                y={22}
            >
                {d.key}
            </text>
        {/each}
    </g>
</svg>

<style>
    svg{
        width: 100%;
        height: 100%;
        preserveAspectRatio: "xMinYMin meet";
    }
</style>
