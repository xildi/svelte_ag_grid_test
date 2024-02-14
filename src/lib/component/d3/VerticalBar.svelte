<script>
    import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";
    import * as d3 from "d3";
    export let data;

    export let width = 508.25;
    export let height = 432.5;

    const barWidthScale = 1;
    const margin = { top: 30, right: 100, bottom: 50, left: 200 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    $: yScale = scaleBand()
        .domain(
            // Sort the data in descending value
            d3.groupSort(
                data,
                ([d]) => -d.value,
                (d) => d.key,
            ),
        )
        .range([0, innerHeight])
        .padding(0.4);
    $: xScale = scaleLinear()
        .domain([0, d3.max(data, (d) => d.value)])
        .range([0, innerWidth]);

    $: colorScale = scaleOrdinal(d3.schemeTableau10)
        .domain(data.map((d) => d.key))
        .range(
            ["#094f6b", "#0f84b2", "#42a9d2", "#76cced", "#9fd7ed"],
        );
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
    {width}
    {height}
    viewBox="0 0 {width} {height}"
    style:max-width="100%"
    style:height="100%"
>
    <g transform={`translate(${margin.left},${margin.top})`}>
        <line y2={innerHeight} stroke="white" />

        {#each data as d}
            <text
                text-anchor="end"
                x="-10"
                dy=".32em"
                fill="white"
                y={yScale(d.key) + yScale.bandwidth() / 2}
            >
                {d.key}
            </text>
            <rect
                x="0"
                y={yScale(d.key)}
                width={xScale(d.value) * barWidthScale}
                height={yScale.bandwidth()}
                fill={colorScale(d.key)}
            />
            <text
                text-anchor="start"
                x={xScale(d.value) * barWidthScale + 6}
                y={yScale(d.key) + yScale.bandwidth() / 2}
                dy=".32em"
                fill="white"
            >
                {formatValue(d.value)}
            </text>
        {/each}
    </g>
</svg>
