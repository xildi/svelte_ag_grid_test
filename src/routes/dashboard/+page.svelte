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
        type NewValueParams,
    } from "ag-grid-community";

    import type { PageData } from "./$types";
    import D3Doughnut from "$lib/component/d3/Donut.svelte";
    import D3Bar from "$lib/component/d3/Bar.svelte";
    import D3VerticalBar from "$lib/component/d3/VerticalBar.svelte";
    let gridApi: GridApi;
    let theme = "ag-theme-alpine-dark col-span-2";
    $: asset_data = [
        {
            id: 1,
            name: "Apple Inc",
            asset_type: "Equity",
            currency: "USD",
            nominale: 50000,
            kurs_iw: 287.05,
            kurs_fw: 13070822,
            exposure: 13070822,
            rendite: 0.3,
            component_var: 160238,
            var: 345008,
            liquidity_risk: 130708,
            country: "USA",
            sector: "IT",
        },
        {
            id: 2,
            name: "Wellsitin AG",
            asset_type: "Equity",
            currency: "EUR",
            nominale: 12042700,
            kurs_iw: 0.725,
            kurs_fw: 8730958,
            exposure: 8730958,
            rendite: 0.1,
            component_var: 929887,
            var: 1161244,
            liquidity_risk: 130964,
            country: "Deutschland",
            sector: "Finanzen",
        },
        {
            id: 3,
            name: "Cooperative Rabobank UA",
            asset_type: "FRN",
            currency: "EUR",
            nominale: 4000000,
            kurs_iw: 100.501,
            kurs_fw: 3922120,
            exposure: 3922120,
            rendite: 1.9,
            component_var: -1806,
            var: 1620,
            liquidity_risk: 12557,
            country: "Frankreich",
            sector: "Finanzen",
        },
        {
            id: 4,
            name: "Volksbank Wien AG",
            asset_type: "FRN",
            currency: "EUR",
            nominale: 4000000,
            kurs_iw: 98.503,
            kurs_fw: 3922120,
            exposure: 3922120,
            rendite: 3.4,
            component_var: -1017,
            var: 3139,
            liquidity_risk: 43501,
            country: "Österreich",
            sector: "Finanzen",
        },
        {
            id: 5,
            name: "Tsy Infl IX N/B",
            asset_type: "FRN",
            currency: "USD",
            nominale: 4000000,
            kurs_iw: 99.523,
            kurs_fw: 3625440,
            exposure: 3625440,
            rendite: 1.1,
            component_var: 18099,
            var: 68986,
            liquidity_risk: 5964,
            country: "USA",
            sector: "Basiskonsumgüter",
        },
        {
            id: 6,
            name: "Roche Holding AG-GS",
            asset_type: "Equity",
            currency: "CHF",
            nominale: 11000,
            kurs_iw: 314.95,
            kurs_fw: 3285338,
            exposure: 3285338,
            rendite: 2.3,
            component_var: 108060,
            var: 185681,
            liquidity_risk: 32853,
            country: "Schweiz",
            sector: "Basiskonsumgüter",
        },
        {
            id: 7,
            name: "Sriev NV",
            asset_type: "FRN",
            currency: "CHF",
            nominale: 3000000,
            kurs_iw: 101787,
            kurs_fw: 2895738,
            exposure: 2895738,
            rendite: 1.9,
            component_var: -5003,
            var: 11470,
            liquidity_risk: 14181,
            country: "Schweiz",
            sector: "IT",
        },
        {
            id: 8,
            name: "Credit Suisse AG London",
            asset_type: "Bond",
            currency: "GBP",
            nominale: 2500000,
            kurs_iw: 96.69,
            kurs_fw: 2778971,
            exposure: 2778971,
            rendite: 0.1,
            component_var: 15947,
            var: 53553,
            liquidity_risk: 21383,
            country: "UK",
            sector: "Finanzen",
        },
        {
            id: 9,
            name: "African Export-Import Bank",
            asset_type: "Bond",
            currency: "USD",
            nominale: 2500000,
            kurs_iw: 101.625,
            kurs_fw: 2330007,
            exposure: 2330007,
            rendite: 6.8,
            component_var: 6485,
            var: 38556,
            liquidity_risk: 19869,
            country: "USA",
            sector: "Finanzen",
        },
        {
            id: 10,
            name: "Aegon NV",
            asset_type: "FRN",
            currency: "EUR",
            nominale: 2000000,
            kurs_iw: 104.762,
            kurs_fw: 2095240,
            exposure: 2095240,
            rendite: 0.0,
            component_var: -1988,
            var: 1949,
            liquidity_risk: 18245,
            country: "Deutschland",
            sector: "IT",
        },
        {
            id: 11,
            name: "Telecom Italia Spa",
            asset_type: "Bond",
            currency: "EUR",
            nominale: 2000000,
            kurs_iw: 96148,
            kurs_fw: 1922960,
            exposure: 1922960,
            rendite: 6.8,
            component_var: -1432,
            var: 1795,
            liquidity_risk: 7846,
            country: "Italien",
            sector: "Telekommunikation",
        },
        {
            id: 12,
            name: "Bank of America Corp",
            asset_type: "FRN",
            currency: "USD",
            nominale: 2000000,
            kurs_iw: 95.07,
            kurs_fw: 1731605,
            exposure: 1731605,
            rendite: 0.0,
            component_var: 13847,
            var: 31040,
            liquidity_risk: 10278,
            country: "USA",
            sector: "Finanzen",
        },
        {
            id: 13,
            name: "GMP Quantis Low Volatile",
            asset_type: "Equity",
            currency: "EUR",
            nominale: 15000,
            kurs_iw: 112.22,
            kurs_fw: 1683300,
            exposure: 1683300,
            rendite: 1.6,
            component_var: 51523,
            var: 78679,
            liquidity_risk: 16833,
            country: "Deutschland",
            sector: "Andere",
        },
    ];

    // Declare assetTypeResSorted as a reactive variable
    let assetTypeResSorted;
    // Update assetTypeResSorted when assets change
    $: {
        // Sort the data by asset_type
        const sortedDataByAssetType = asset_data
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

        assetTypeResSorted = res.slice().sort((a, b) => b.value - a.value);
    }
    let currencyResSorted;
    $: {
        // Sort the data by asset_type
        const sortedDataByCurrency = asset_data
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
        currencyResSorted = currencyRes
            .slice()
            .sort((a, b) => b.value - a.value);
    }
    let countryResSorted;
    $: {
        // Sort the data by asset_type
        const sortedDataByCountry = asset_data
            .slice()
            .sort((a, b) => a.country.localeCompare(b.country));

        // Calculate the sum of 'var' for each asset type
        const sumVarByCountry: Record<string, number> =
            sortedDataByCountry.reduce((acc, asset) => {
                const key = asset.country;
                acc[key] = (acc[key] || 0) + asset.var;
                return acc;
            }, {});

        const totalSumVarCountry = Object.values(sumVarByCountry).reduce(
            (sum, value) => sum + value,
            0,
        );
        const countryRes = Object.entries(sumVarByCountry).map(
            ([key, value]) => ({
                key: key,
                value:
                    Math.round((value / totalSumVarCountry) * 100 * 100) / 100,
            }),
        );
        countryResSorted = countryRes.slice().sort((a, b) => b.value - a.value);
    }
    let sectorResSorted;
    $: {
        // Sort the data by asset_type
        const sortedDataBySector = asset_data
            .slice()
            .sort((a, b) => a.sector.localeCompare(b.sector));

        // Calculate the sum of 'var' for each asset type
        const sumVarBySector: Record<string, number> =
            sortedDataBySector.reduce((acc, asset) => {
                const key = asset.sector;
                acc[key] = (acc[key] || 0) + asset.var;
                return acc;
            }, {});
        const totalSumVarSector = Object.values(sumVarBySector).reduce(
            (sum, value) => sum + value,
            0,
        );
        const sectorRes = Object.entries(sumVarBySector).map(
            ([key, value]) => ({
                key: key,
                value:
                    Math.round((value / totalSumVarSector) * 100 * 100) / 100,
            }),
        );
        sectorResSorted = sectorRes.slice().sort((a, b) => b.value - a.value);
    }
    function cellValueChanged(params: NewValueParams) {
        let index = asset_data.findIndex((item) => item.id === params.data.id);
        if (index !== -1) {
            // Update the corresponding property with the new value
            asset_data[index][params.colDef.field] = params.newValue;
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
                editable: true,
                onCellValueChanged: cellValueChanged,
            },
            {
                field: "currency",
                headerName: "Währung",
                minWidth: 70,
                filter: false,
                editable: true,
                onCellValueChanged: cellValueChanged,
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
                editable: true,
                onCellValueChanged: cellValueChanged,
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
</script>

<div class=" flex-grow overflow-auto">
    <div class="grid grid-cols-12 gap-4 mr-4 ml-4 mt-4 mb-4 cont">
        <div
            id="myGrid"
            style="width:100%;"
            class="ag-theme-quartz-dark col-span-9 graph-container"
        />
        <div class="bg-[#2c2c2c] rounded-lg col-span-3 pr-4">
            <h1 class="text-white text-4xl m-4">Sektoren</h1>
            <D3VerticalBar bind:data={sectorResSorted} />
        </div>
    </div>
    <div class="grid grid-cols-3 gap-4 grid-rows-1 mr-4 ml-4 mb-4 cont">
        <div class="bg-[#2c2c2c] rounded-lg h-full">
            <h1 class="text-white text-4xl m-4">Assetklassen</h1>
            <div class="h-full">
                <D3Doughnut
                    class="graph-container-third"
                    bind:data={assetTypeResSorted}
                />
            </div>
        </div>
        <div class="bg-[#2c2c2c] rounded-lg">
            <h1 class="text-white text-4xl m-4">Währungen</h1>
            <div>
                <D3Bar
                    class="graph-container-third"
                    bind:data={currencyResSorted}
                    title="Währungen"
                />
            </div>
        </div>
        <div class="bg-[#2c2c2c] rounded-lg">
            <h1 class="text-white text-4xl m-4">Länder</h1>
            <div>
                <D3Doughnut
                    class="graph-container-third"
                    bind:data={countryResSorted}
                    title="Länder"
                />
            </div>
        </div>
    </div>
</div>

<style>
    .heights {
        height: calc(98vh - 5em) !important;
    }
    .ag-theme-quartz-dark {
        --ag-odd-row-background-color: #2c2c2c;
        --ag-background-color: #2c2c2c;
        --ag-header-background-color: #2c2c2c;
        --ag-border-color: #2c2c2c;
    }
    .graph-container {
        height: calc((100vh - 6em) / 2) !important;
    }
    .cont {
        height: calc((100vh - 6em) / 2) !important;
    }
    .graph-container-third {
        width: calc(33.33% - 1em); /* Adjust the margin as needed */
    }
</style>
