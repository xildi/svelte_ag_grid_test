<script lang="ts">
    import { onMount } from "svelte";
    import countries from "$lib/static/countires.json";
    import assets from "$lib/static/assets.json";
    import {
        createGrid,
        type GridApi,
        type GridOptions,
        type ICellRendererParams,
        type ValueFormatterParams,
        type TooltipRendererParams,
        type MarkerFormatterParams,
    } from "ag-grid-community";

    import type { PageData } from "./$types";
    import D3Doughnut from "$lib/component/d3/Donut.svelte";
    import D3Bar from "$lib/component/d3/Bar.svelte";
    import BarChartHorizontal from "$lib/component/BarChartHorizontal.svelte";
    export let data: PageData;
    let gridApi: GridApi;
    let theme = "ag-theme-alpine-dark col-span-2";

    function currencyFormatter(params: ValueFormatterParams) {
        if (params.value !== undefined && params.value !== null) {
            return params.value == null
                ? ""
                : "CHF " + numberWithCommas(params.value);
        }
        return params.value == null ? "" : numberWithCommas(params.value);
    }

    function numberWithCommas(x: string | number | boolean) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "'");
    }

    function starRenderer(params: ICellRendererParams) {
        if (params !== undefined && params !== null) {
            let res = `<span>`;
            for (let i = 0; i < params.value; i++) {
                res += starRendererHelper();
            }
            res += `</span>`;
            return res;
        }
    }
    function starRendererFilter(params: ICellRendererParams) {
        if (params.value === "(Select All)") {
            return `<span>(Select All)</span>`;
        }
        if (params.value == 0) {
            return `<span>No Stars</span>`;
        }
        if (params !== undefined && params !== null) {
            let res = `<span>`;
            for (let i = 0; i < params.value; i++) {
                res += starRendererHelper();
            }
            res += `</span>`;
            return res;
        }
    }
    function starRendererHelper() {
        return `<svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>star</title>
                <desc>Created with Sketch.</desc>
                <defs/>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="star" fill-rule="nonzero" fill="#4A4A4A">
                        <polygon id="Shape" points="0 4.41133593 12 4.41133593 2.29311741 11.4655867 6.0048583 0.0485830253 9.71659919 11.4655867"/>
                    </g>
                </g>
            </svg>`;
    }

    const tooltipRenderer = (params: TooltipRendererParams) => {
        if (
            params !== undefined &&
            params !== null &&
            params.context !== undefined &&
            params.context !== null &&
            params.context.data !== undefined &&
            params.context.data !== null &&
            params.context.data.total_winnings !== undefined &&
            params.context.data.total_winnings !== null
        ) {
            return {
                content: params.context.data.total_winnings,
            };
        }
    };

    function countryFlagRenderer(params: ICellRendererParams) {
        if (
            params !== undefined &&
            params !== null &&
            params.value !== undefined &&
            params.value !== null
        ) {
            let flag_code = countries.find(
                (value) => value.name === params.value,
            );
            if (flag_code !== undefined && flag_code !== null) {
                return `<span><img src="img/flags/${flag_code.code}.webp" width="15" height="10" /> ${params.value}</span>`;
            }
            if (params.value !== undefined && params.value !== null) {
                return `<span>${params.value}</span>`;
            }
        }
    }

    const markerFormatter = (params: MarkerFormatterParams) => {
        if (params !== undefined && params !== null) {
            const { min, max } = params;
            return {
                size: min || max ? 5 : 3,
                fill: min ? "#ee6666" : max ? "#3ba272" : "skyBlue",
                stroke: min ? "#ee6666" : max ? "#3ba272" : "skyBlue",
            };
        }
    };
    function booleanTick(params: ICellRendererParams) {
        if (params !== undefined && params !== null) {
            if (params.value == true) {
                return `<i class="ag-icon ag-icon-tick content-icon"/>`;
            } else if (params.value == false) {
                return `<i class="ag-icon ag-icon-cross content-icon"/>`;
            }
        }
    }
    function booleanTickFilter(params: ICellRendererParams) {
        if (params !== undefined && params !== null) {
            if (params.value == true) {
                return `<i class="ag-icon ag-icon-tick content-icon"/>`;
            } else if (params.value === "(Select All)") {
                return `(Select All)`;
            } else if (params.value == false) {
                return `<i class="ag-icon ag-icon-cross content-icon"/>`;
            }
        }
    }

    const gridOptions: GridOptions = {
        statusBar: {
            statusPanels: [
                {
                    statusPanel: "agTotalRowCountComponent",
                    align: "left",
                },
                {
                    statusPanel: "agAggregationComponent",
                    align: "right",
                },
            ],
        },
        sideBar: true,
        defaultColDef: {
            sortable: true,
            flex: 1,
            resizable: true,
            editable: true,
            filter: "agTextColumnFilter",
            enablePivot: true,
            floatingFilter: true,
            minWidth: 150,
        },
        defaultColGroupDef: {
            marryChildren: true,
        },
        enableCharts: true,
        enableRangeSelection: true,
        enableFillHandle: true,
        rowGroupPanelShow: "always",
        columnDefs: [
            {
                field: "id",
                headerName: "ID",
                minWidth: 70,
                hide: true,
                filter: false,
                floatingFilter: false,
                editable: false,
            },
            {
                field: "name",
                headerName: "Name",
                minWidth: 70,
                filter: false,
                floatingFilter: false,
                editable: false,
            },
            {
                field: "asset_type",
                headerName: "Asset Typ",
                minWidth: 70,
                filter: false,
                floatingFilter: false,
                editable: false,
            },
            {
                field: "currency",
                headerName: "Währung",
                minWidth: 70,
                filter: false,
                floatingFilter: false,
                editable: false,
            },
            {
                field: "nominale",
                headerName: "Nominale",
                minWidth: 70,
                filter: false,
                floatingFilter: false,
                editable: false,
            },
            {
                field: "kurs_iw",
                headerName: "Kurs IW",
                minWidth: 70,
                filter: false,
                floatingFilter: false,
                editable: false,
            },
            {
                field: "kurs_fw",
                headerName: "Kurs FW",
                minWidth: 70,
                filter: false,
                floatingFilter: false,
                editable: false,
            },
            {
                field: "exposure",
                headerName: "Exposure",
                minWidth: 70,
                filter: false,
                floatingFilter: false,
                editable: false,
            },
            {
                field: "rendite",
                headerName: "Rendite",
                minWidth: 70,
                filter: false,
                floatingFilter: false,
                editable: false,
            },
            {
                field: "component_var",
                headerName: "Comp. Var",
                minWidth: 70,
                filter: false,
                floatingFilter: false,
                editable: false,
            },
            {
                field: "var",
                headerName: "Var",
                minWidth: 70,
                filter: false,
                floatingFilter: false,
                editable: false,
            },
            {
                field: "liquidity_risk",
                headerName: "Liquidity Risk",
                minWidth: 70,
                filter: false,
                floatingFilter: false,
                editable: false,
            },
        ],
    };
    onMount(() => {
        const gridEl = document.getElementById("myGrid");
        if (!gridEl) {
            throw new Error("Grid element not found");
        }
        gridApi = createGrid(gridEl, gridOptions);
        gridApi.setGridOption("rowData", assets);
    });
    async function onChange() {
        gridApi.showLoadingOverlay();
        const res = await fetch(`/api/data?rows=${row_count}`);
        let res_value = await res.json();
        gridApi!.setGridOption("rowData", res_value);
        gridApi.hideOverlay();
    }

    // Sort the data by asset_type
    const sortedDataByAssetType = assets
        .slice()
        .sort((a, b) => a.asset_type.localeCompare(b.asset_type));

    // Calculate the sum of 'var' for each asset type
    const sumVarByAssetType: Record<string, number> =
        sortedDataByAssetType.reduce((acc, asset) => {
            const key = asset.asset_type;
            acc[key] = (acc[key] || 0) + asset.var;
            return acc;
        }, {});
    const totalSumVar = Object.values(sumVarByAssetType).reduce(
        (sum, value) => sum + value,
        0,
    );
    const res = Object.entries(sumVarByAssetType).map(([key, value]) => ({
        key: key,
        value: Math.round((value / totalSumVar) * 100 * 100) / 100,
    }));

    let assetTypeResSorted = res.slice().sort((a, b) => b.value - a.value);

    // Sort the data by asset_type
    const sortedDataByCurrency = assets
        .slice()
        .sort((a, b) => a.currency.localeCompare(b.currency));

    // Calculate the sum of 'var' for each asset type
    const sumVarByCurrency: Record<string, number> =
        sortedDataByCurrency.reduce((acc, asset) => {
            const key = asset.currency;
            acc[key] = (acc[key] || 0) + asset.var;
            return acc;
        }, {});
    const currencyRes = Object.entries(sumVarByCurrency).map(
        ([key, value]) => ({
            key: key,
            value: value,
        }),
    );
    let currencyResSorted = currencyRes.slice().sort((a, b) => b.value - a.value);

    // Sort the data by asset_type
    const sortedDataByCountry = assets
        .slice()
        .sort((a, b) => a.country.localeCompare(b.country));

    // Calculate the sum of 'var' for each asset type
    const sumVarByCountry: Record<string, number> = sortedDataByCountry.reduce(
        (acc, asset) => {
            const key = asset.country;
            acc[key] = (acc[key] || 0) + asset.var;
            return acc;
        },
        {},
    );
    const countryRes = Object.entries(sumVarByCountry).map(
        ([key, value]) => ({
            key: key,
            value: Math.round((value / totalSumVar) * 100 * 100) / 100,
        }),
    );
    let countryResSorted = countryRes.slice().sort((a, b) => b.value - a.value);

    // Sort the data by asset_type
    const sortedDataBySector = assets
        .slice()
        .sort((a, b) => a.sector.localeCompare(b.sector));

    // Calculate the sum of 'var' for each asset type
    const sumVarBySector: Record<string, number> = sortedDataBySector.reduce(
        (acc, asset) => {
            const key = asset.sector;
            acc[key] = (acc[key] || 0) + asset.var;
            return acc;
        },
        {},
    );
    const sectorRes = Object.entries(sumVarBySector).map(([country, sum]) => ({
        name: country,
        sum: Math.round((sum / totalSumVar) * 100 * 100) / 100,
    }));
    let sectorResSorted = sectorRes.slice().sort((a, b) => b.sum - a.sum);
</script>

<div class="relative">
    <div class="grid grid-cols-5">
        <div
            id="myGrid"
            style="height: 100%; width:100%;"
            class="ag-theme-alpine-dark col-span-4 p-5"
        />
        <div class="pr-5 mr-0 m-5">
            <BarChartHorizontal data={sectorResSorted} id="sectorBar" />
        </div>
    </div>

    <div class="grid gap-4 grid-cols-3 grid-rows-3">
        <div class="pl-5 box">
            <D3Doughnut data={assetTypeResSorted}  />
        </div>
        <div class="px-5">
            <D3Bar data={currencyResSorted}/>
        </div>
        <div class="pr-5">
            <D3Doughnut data={countryResSorted}  />
        </div>
    </div>
</div>

<style>
    .dropdown {
        background: #222628;
        border-color: #68686e !important;
        color: #fff;
        border-radius: 3px;
        border: solid 1px;
        outline: none;
        font-size: 13px;
    }
    .dropdown_container {
        align-items: center;
    }
    .pos {
        float: inline-end;
        padding-left: 17px;
        padding-right: 17px;
        height: 42px;
    }
    .left {
        float: auto;
    }
    .ag-theme-alpine-dark,
    .ag-theme-alpine,
    .ag-theme-balham-dark,
    .ag-theme-balham,
    .ag-theme-quartz-dark,
    .ag-theme-quartz,
    .ag-theme-material {
        --ag-active-color: #76cbed !important;
        --ag-alpine-active-color: #76cbed !important;
        --ag-alpine-active-color: #76cbed !important;
        --ag-alpine-dark-active-color: #76cbed !important;
        --ag-balham-active-color: #76cbed !important;
        --ag-checkbox-checked-color: #76cbed !important;
        --ag-checkbox-input: #76cbed !important;
    }
</style>
