<script lang="ts">
    import { AgCharts, type AgChartOptions, type AgChartLabelFormatterParams } from "ag-charts-community";
    import { onMount } from "svelte";
    export let data;
    export let id;
    onMount(() => {
        const options: AgChartOptions = {
            container: document.getElementById(id),
            data: data,
            theme: myTheme,
            series: [
                {
                    type: "bar",
                    direction: 'horizontal',
                    legend: false,
                    xKey: "name",
                    yKey: "sum",
                    fill: "#094F6B",
                    label: {
                        placement: 'outside',
                    }
                },
            ],
        };
        AgCharts.create(options);
    });var myTheme = {
        baseTheme: "ag-default-dark",
        overrides: {
            common: {
            
                background: {
                         fill: '#2c2c2c',
                     },
                title: {
                    fontSize: 24,
                },
            },
            bar: {
                series: {
                    label: {
                        enabled: true,
                        color: "white",
                    },
                },
            },
        },
    };
</script>

<div id={id} class="col-span-1  " style="height: 500px;"></div>
