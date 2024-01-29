<script lang="ts">
    import { onMount } from "svelte";
    import { createGrid } from "ag-grid-community";
    import type { GridOptions } from "ag-grid-community";
    import type { PageData } from "./$types";
    import "ag-grid-community/styles/ag-grid.css";
    import "ag-grid-community/styles/ag-theme-alpine.css";
    import { LicenseManager } from "ag-grid-enterprise";
    export let data: PageData;

    function currencyFormatter(params) {
        if (!params.value.includes("CHF ")){
        return params.value == null
            ? ""
            : "CHF " + numberWithCommas(params.value);
        }
        return params.value == null
            ? ""
            : numberWithCommas(params.value)
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
    function countryFlagRenderer(params) {
        let flag_code = countries.find((value) => value.name === params.value);
        if (flag_code !== undefined) {
            return `<span><img src="img/flags/${flag_code.code}.webp" width="15" height="10" /> ${params.value}</span>`;
        }
        return `<span>${params.value}</span>`;
    }
    function booleanTick(params) {
        if (params.value === "true") {
            return `<i class="ag-icon ag-icon-tick content-icon"/>`;
        }
        return `<i class="ag-icon ag-icon-cross content-icon"/>`;
    }
    let grid;
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
                }
            ],
        },
        sideBar: true,
        defaultColDef: {
            sortable: true,
            flex: 1,
            resizable: true,
            editable: true,
            filter: "agTextColumnFilter",
            minWidth: 150,
            pivot: true,
        },
        defaultColGroupDef: {
            marryChildren: true,
        },
        enableRangeSelection: true,
        enableRangeHandle: true,
        rowGroupPanelShow: "always",
        columnDefs: [
            {
                headerName: "Participant",
                children: [
                    { field: "Name", headerName: "Name" },
                    {
                        field: "Language",
                        headerName: "Language",
                        cellEditor: "agRichSelectCellEditor",
                        cellEditorParams: {
                            values: languages,
                        },
                    },
                    {
                        field: "Country",
                        headerName: "Country",
                        cellEditor: "agRichSelectCellEditor",
                        cellEditorParams: {
                            values: country_names,
                            cellRenderer: countryFlagRenderer,
                        },
                        cellRenderer: countryFlagRenderer,
                    },
                ],
            },
            {
                headerName: "Game of Choice",
                children: [
                    {
                        field: "Game_Name",
                        headerName: "Game Name",
                        cellEditor: "agRichSelectCellEditor",
                        cellEditorParams: {
                            values: country_names,
                        },
                    },
                    {
                        field: "Bought",
                        headerName: "Bought",
                        type: "booleanType",
                        cellRenderer: booleanTick,
                        cellStyle: { "text-align": "center" },
                    },
                ],
            },
            {
                headerName: "Performance",
                children: [
                    {
                        field: "Bank_Balance",
                        headerName: "Bank Balance",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                    },
                ],
            },
            {
                field: "Rating",
                headerName: "Rating",
                cellRenderer: starRenderer,
            },
            {
                field: "Total_winnings",
                headerName: "Total Winnings",
                type: "numericColumn",
                valueFormatter: currencyFormatter,
            },
            {
                headerName: "Montly Breakdown",
                children: [
                    {
                        field: "Jan",
                        headerName: "Jan",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                    },
                    {
                        field: "Feb",
                        headerName: "Feb",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                    },
                    {
                        field: "Mar",
                        headerName: "Mar",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                    },
                    {
                        field: "Apr",
                        headerName: "Apr",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                    },
                    {
                        field: "May",
                        headerName: "May",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                    },
                    {
                        field: "Jun",
                        headerName: "Jun",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                    },
                    {
                        field: "Jul",
                        headerName: "Jul",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                    },
                    {
                        field: "Aug",
                        headerName: "Aug",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                    },
                    {
                        field: "Sep",
                        headerName: "Sep",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                    },
                    {
                        field: "Oct",
                        headerName: "Oct",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                    },
                    {
                        field: "Nov",
                        headerName: "Nov",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                    },
                    {
                        field: "Dec",
                        headerName: "Dec",
                        type: "numericColumn",
                        valueFormatter: currencyFormatter,
                    },
                ],
            },
        ],
        rowData: data.input_list,
    };

    onMount(() => {
        const gridEl = document.getElementById("myGrid");
        if (!gridEl) {
            throw new Error("Grid element not found");
        }
        grid = createGrid(gridEl, gridOptions);
    });
</script>

<div style="height: 900px;">
    <div
        id="myGrid"
        style="height: 100%; width:100%;"
        class="ag-theme-alpine-dark"
    />
</div>
