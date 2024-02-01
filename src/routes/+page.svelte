<script lang="ts">
    import { onMount } from "svelte";
    import {
        createGrid,
        type BarSparklineOptions,
        type GridApi,
        type GridOptions,
        type LabelFormatterParams,
        type ValueGetterParams,
    } from "ag-grid-community";

    import type { PageData } from "./$types";
    import "ag-grid-community/styles/ag-grid.css";
    import "ag-grid-community/styles/ag-theme-balham.css";
    import "ag-grid-community/styles/ag-theme-alpine.css";
    import "ag-grid-community/styles/ag-theme-quartz.css";
    import "ag-grid-community/styles/ag-theme-material.css";
    import { LicenseManager } from "ag-grid-enterprise";
    export let data: PageData;

    interface IRow {
        id: number;
        name: string;
        language: string;
        country: string;
        game_name: string;
        bought: boolean;
        bank_balance: number;
        rating: number;
        total_winnings: number;
        jan: number;
        feb: number;
        mar: number;
        apr: number;
        may: number;
        jun: number;
        jul: number;
        aug: number;
        sep: number;
        oct: number;
        nov: number;
        dec: number;
    }

    let gridApi: GridApi<IRow>;

    let theme = "ag-theme-alpine-dark";
    let themes = [
        { name: "Alpine Dark", key: "ag-theme-alpine-dark" },
        { name: "Balham Dark", key: "ag-theme-balham-dark" },
        { name: "Quartz Dark", key: "ag-theme-quartz-dark" },
        { name: "Alpine", key: "ag-theme-alpine" },
        { name: "Balham", key: "ag-theme-balham" },
        { name: "Quartz", key: "ag-theme-quartz" },
        { name: "Material", key: "ag-theme-material" },
    ];
    function currencyFormatter(params) {
        if (params.value !== undefined && params.value !== null) {
            return params.value == null
                ? ""
                : "CHF " + numberWithCommas(params.value);
        }
        return params.value == null ? "" : numberWithCommas(params.value);
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "'");
    }

    LicenseManager.setLicenseKey(
        "Using_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-054178}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{XILDI_AG}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{ic}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{ic}_need_to_be_licensed___{ic}_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Charts_and_AG_Grid}_Enterprise_versions_released_before_{25_January_2025}____[v3]_[0102]_MTczNzc2MzIwMDAwMA==a76833d54e30f1203cb10fba213f4aaf",
    );

    function starRenderer(params) {
        let res = `<span>`;
        for (let i = 0; i < params.value; i++) {
            res += starRendererHelper();
        }
        res += `</span>`;
        return res;
    }
    function starRendererFilter(params) {
        if (params.value === "(Select All)") {
            return `<span>(Select All)</span>`;
        }
        if (params.value == 0) {
            return `<span>No Stars</span>`;
        }
        let res = `<span>`;
        for (let i = 0; i < params.value; i++) {
            res += starRendererHelper();
        }
        res += `</span>`;
        return res;
    }
    function starRendererHelper() {
        return `<svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: Sketch 46.1 (44463) - http://www.bohemiancoding.com/sketch -->
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

    const tooltipRenderer = (params) => {
        return {
            content: params.context.data.total_winnings,
        };
    };

    function countryFlagRenderer(params) {
        if (params !== undefined && params !== null) {
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
        return `<span/>`;
    }

    const markerFormatter = (params) => {
        const { min, max } = params;
        return {
            size: min || max ? 5 : 3,
            fill: min ? "#ee6666" : max ? "#3ba272" : "skyBlue",
            stroke: min ? "#ee6666" : max ? "#3ba272" : "skyBlue",
        };
    };
    function booleanTick(params) {
        if (params.value == true) {
            return `<i class="ag-icon ag-icon-tick content-icon"/>`;
        }
        return `<i class="ag-icon ag-icon-cross content-icon"/>`;
    }
    function booleanTickFilter(params) {
        if (params.value == true) {
            return `<i class="ag-icon ag-icon-tick content-icon"/>`;
        } else if (params.value === "(Select All)") {
            return `(Select All)`;
        }
        return `<i class="ag-icon ag-icon-cross content-icon"/>`;
    }
    let countries = [
        {
            name: "Ireland",
            code: "ie",
        },
        {
            name: "Argentinia",
            code: "ar",
        },
        {
            name: "Belgium",
            code: "be",
        },
        {
            name: "Brazil",
            code: "br",
        },
        {
            name: "Colombia",
            code: "co",
        },
        {
            name: "France",
            code: "fr",
        },
        {
            name: "Germany",
            code: "de",
        },
        {
            name: "Greece",
            code: "gr",
        },
        {
            name: "Iceland",
            code: "is",
        },
        {
            name: "Italy",
            code: "it",
        },
        {
            name: "Luxembourg",
            code: "lu",
        },
        {
            name: "Malta",
            code: "mt",
        },
        {
            name: "Norway",
            code: "no",
        },
        {
            name: "Peru",
            code: "pe",
        },
        {
            name: "Portugal",
            code: "pt",
        },
        {
            name: "Spain",
            code: "es",
        },
        {
            name: "Switzerland",
            code: "ch",
        },
        {
            name: "Sweden",
            code: "se",
        },
        {
            name: "United Kingdom",
            code: "gb",
        },
        {
            name: "Uruguay",
            code: "uy",
        },
        {
            name: "Venezuela",
            code: "ve",
        },
    ];
    const country_names = [
        "Ireland",
        "Argentinia",
        "Belgium",
        "Brazil",
        "Colombia",
        "France",
        "Germany",
        "Greece",
        "Iceland",
        "Italy",
        "Luxembourg",
        "Malta",
        "Norway",
        "Peru",
        "Portugal",
        "Spain",
        "Switzerland",
        "Sweden",
        "United Kingdom",
        "Uruguay",
        "Venezuela",
    ];

    const languages = [
        "English",
        "Spanish",
        "French",
        "Portuguese",
        "German",
        "Swedish",
        "Norwegian",
        "Italian",
        "Greek",
        "Icelandic",
        "Maltese",
    ];
    const games = [
        "Abalone",
        "Agon",
        "Backgammon",
        "Battleship",
        "Blockade",
        "Blood Bowl",
        "Bul",
        "Camelot",
        "Checkers",
        "Chess",
        "Cross and Circle",
        "DVONN",
        "Daldos",
        "Downfall",
        "Fanorona",
        "Game of Generals",
        "Ghosts",
        "Gipf",
        "Go",
        "Guess Who?",
        "Hare and Hounds",
        "Hex",
        "Hijara",
        "Isola",
        "Janggi (Korean Chess)",
        "Kalah",
        "Kamisado",
        "Le Jeu de la Guerre",
        "Liu po",
        "Lost Cities",
        "Mad Grab",
        "Master Mind",
        "Nine Men's Morris",
        "Obsession",
        "Othello",
        "PUNCT",
        "Patolli",
        "Plateu",
        "Rithmomanchy",
        "Sahkku",
        "Senet",
        "Shogi",
        "Space Hulk",
        "Stratego",
        "Sugoroku",
        "Tab",
        "Tablut",
        "Wari",
        "Xiangqi (Chinese chess)",
        "YINSH",
        "ZERTZ",
    ];

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
                filter: false,
                floatingFilter: false,
                editable: false,
            },
            {
                headerName: "Participant",
                children: [
                    {
                        field: "name",
                        headerName: "Name",
                        enableRowGroup: true,
                        minWidth: 150,
                    },
                    {
                        field: "language",
                        headerName: "Language",
                        cellEditor: "agRichSelectCellEditor",
                        cellEditorParams: {
                            values: languages,
                        },
                        enableRowGroup: true,
                        filter: true,
                        filterParams: {
                            values: languages,
                        },
                        minWidth: 150,
                    },
                    {
                        field: "country",
                        headerName: "Country",
                        cellEditor: "agRichSelectCellEditor",
                        cellEditorParams: {
                            values: country_names,
                            cellRenderer: countryFlagRenderer,
                        },
                        cellRenderer: countryFlagRenderer,
                        enableRowGroup: true,
                        filter: true,
                        filterParams: {
                            values: country_names,
                            cellRenderer: countryFlagRenderer,
                        },
                        minWidth: 150,
                    },
                ],
                enableRowGroup: true,
            },
            {
                headerName: "Game of Choice",
                children: [
                    {
                        field: "game_name",
                        headerName: "Game Name",
                        cellEditor: "agRichSelectCellEditor",
                        cellEditorParams: {
                            values: country_names,
                        },
                        enableRowGroup: true,
                        minWidth: 150,
                    },
                    {
                        field: "bought",
                        headerName: "Bought",
                        cellRenderer: booleanTick,
                        cellStyle: { "text-align": "center" },
                        enableRowGroup: true,
                        filter: true,
                        filterParams: {
                            cellRenderer: booleanTickFilter,
                        },
                        minWidth: 100,
                    },
                ],
                enableRowGroup: true,
            },
            {
                headerName: "Performance",
                children: [
                    {
                        field: "bank_balance",
                        headerName: "Bank Balance",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                        enableRowGroup: true,
                        minWidth: 150,
                    },
                ],
                enableRowGroup: true,
            },
            {
                field: "rating",
                headerName: "Rating",
                cellRenderer: starRenderer,
                enableRowGroup: true,
                filter: true,
                filterParams: {
                    cellRenderer: starRendererFilter,
                },
                minWidth: 120,
            },
            {
                headerName: "Total Winnings",
                enableRowGroup: true,
                children: [
                    {
                        field: "total_winnings",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                        minWidth: 150,
                    },
                    {
                        cellRenderer: "agSparklineCellRenderer",
                        valueGetter: (params: ValueGetterParams) => {
                            const formattedData: any = [
                                0,
                                params.data.total_winnings,
                                0,
                            ];
                            return formattedData;
                        },
                        cellRendererParams: {
                            sparklineOptions: {
                                // Sparkline customisation goes here.
                                type: "bar",
                                fill: "#76cbed",
                                strokeWidth: 0,

                                highlightStyle: {
                                    fill: "#fac858",
                                },
                                valueAxisDomain: [
                                    0,
                                    data.max_winnings._max.total_winnings,
                                ],
                                //formatter: barFormatter,
                                axis: {
                                    strokeWidth: 0,
                                },
                                tooltip: {
                                    renderer: tooltipRenderer,
                                },
                            },
                        },
                        minWidth: 150,
                    },
                ],
            },

            {
                headerName: "Montly Breakdown",
                children: [
                    {
                        field: "jan",
                        headerName: "Jan",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                        enableRowGroup: true,

                        minWidth: 120,
                    },
                    {
                        field: "feb",
                        headerName: "Feb",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                        enableRowGroup: true,
                        minWidth: 120,
                    },
                    {
                        field: "mar",
                        headerName: "Mar",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                        enableRowGroup: true,
                        minWidth: 120,
                    },
                    {
                        field: "apr",
                        headerName: "Apr",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                        enableRowGroup: true,
                        minWidth: 120,
                    },
                    {
                        field: "may",
                        headerName: "May",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                        enableRowGroup: true,
                        minWidth: 120,
                    },
                    {
                        field: "jun",
                        headerName: "Jun",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                        enableRowGroup: true,
                        minWidth: 120,
                    },
                    {
                        field: "jul",
                        headerName: "Jul",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                        enableRowGroup: true,
                        minWidth: 120,
                    },
                    {
                        field: "aug",
                        headerName: "Aug",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                        enableRowGroup: true,
                        minWidth: 120,
                    },
                    {
                        field: "sep",
                        headerName: "Sep",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                        enableRowGroup: true,
                        minWidth: 120,
                    },
                    {
                        field: "oct",
                        headerName: "Oct",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                        enableRowGroup: true,
                        minWidth: 120,
                    },
                    {
                        field: "nov",
                        headerName: "Nov",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                        enableRowGroup: true,
                        minWidth: 120,
                    },
                    {
                        field: "dec",
                        headerName: "Dec",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                        enableRowGroup: true,
                        minWidth: 120,
                    },
                    {
                        headerName: "chart",
                        cellRenderer: "agSparklineCellRenderer",
                        valueGetter: (params: ValueGetterParams) => {
                            const formattedData: any = [
                                params.data.jan,
                                params.data.feb,
                                params.data.mar,
                                params.data.apr,
                                params.data.may,
                                params.data.jun,
                                params.data.jul,
                                params.data.aug,
                                params.data.sep,
                                params.data.oct,
                                params.data.nov,
                                params.data.dec,
                            ];
                            return formattedData;
                        },
                        cellRendererParams: {
                            sparklineOptions: {
                                type: "column",

                                fill: "#76cbed",
                                axis: {
                                    strokeWidth: 2,
                                },
                                paddingInner: 0.3,
                            },
                        },
                        minWidth: 150,
                    },
                    {
                        headerName: "chart",
                        cellRenderer: "agSparklineCellRenderer",
                        valueGetter: (params: ValueGetterParams) => {
                            const formattedData: any = [
                                params.data.jan,
                                params.data.feb,
                                params.data.mar,
                                params.data.apr,
                                params.data.may,
                                params.data.jun,
                                params.data.jul,
                                params.data.aug,
                                params.data.sep,
                                params.data.oct,
                                params.data.nov,
                                params.data.dec,
                            ];
                            return formattedData;
                        },
                        cellRendererParams: {
                            sparklineOptions: {
                                type: "area",
                                line: {
                                    stroke: "#76cbed",
                                },
                                axis: {
                                    strokeWidth: 2,
                                },
                                marker: {
                                    formatter: markerFormatter, // add formatter to marker options
                                },
                            },
                        },
                        minWidth: 150,
                    },
                ],
            },
        ],
    };
    let row_count: number = 100;
    onMount(() => {
        const gridEl = document.getElementById("myGrid");
        if (!gridEl) {
            throw new Error("Grid element not found");
        }
        gridApi = createGrid(gridEl, gridOptions);
        gridApi.setGridOption("rowData", data.input_list);
    });
    async function onChange() {
        gridApi.showLoadingOverlay();
        const res = await fetch(`/api/data?rows=${row_count}`);
        let res_value = await res.json();
        gridApi!.setGridOption("rowData", res_value);
        gridApi.hideOverlay();
    }
</script>

<div>
    <div class="dropdown_container">
        <img
            height="50vh"
            src="/img/Logo_dunkel.svg"
            class="attachment-full size-full wp-image-27 left"
            alt="Xildi Logo - More than numbers"
        />
        <select
            class="dropdown pos"
            bind:value={row_count}
            on:change={onChange}
        >
            <option value={100}> 100 </option>
            <option value={1000}> 1000 </option>
            <option value={10000}> 10000 </option>
            <option value={50000}> 50000 </option>
            <option value={100000}> 100000 </option>
        </select>
        <select class="dropdown pos" bind:value={theme}>
            {#each themes as theme}
                <option value={theme.key}>
                    {theme.name}
                </option>
            {/each}
        </select>
    </div>

    <div id="myGrid" style="height: 93vh; width:100%;" class={theme} />
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
    }
</style>
