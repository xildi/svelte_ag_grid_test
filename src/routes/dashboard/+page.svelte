<script lang="ts">
    import { onMount } from "svelte";
    import {
        createGrid,
        type GridApi,
        type GridOptions,
        type NewValueParams,
    } from "ag-grid-community";

    import D3Doughnut from "$lib/component/d3/Donut.svelte";
    import D3Bar from "$lib/component/d3/Bar.svelte";
    import D3VerticalBar from "$lib/component/d3/VerticalBar.svelte";
    let gridApi: GridApi;
    let theme = "ag-theme-alpine-dark col-span-2";
    $: asset_data = [
        {
            asset_type: "Equity",
            component_var: 160238,
            country: "USA",
            currency: "USD",
            exposure: 13070822,
            id: 1,
            kurs_fw: 2456198,
            kurs_iw: 287.05,
            liquidity_risk: 130708,
            name: "Apple Inc",
            nominale: 9155.658805,
            rendite: 0.3,
            sector: "IT",
            var: 345008,
        },
        {
            asset_type: "Equity",
            component_var: 929887,
            country: "Deutschland",
            currency: "EUR",
            exposure: 8730958,
            id: 2,
            kurs_fw: 1465328,
            kurs_iw: 0.725,
            liquidity_risk: 130964,
            name: "Wellsitin AG",
            nominale: 2021142.069,
            rendite: 0.1,
            sector: "Finanzen",
            var: 1161244,
        },
        {
            asset_type: "FRN",
            component_var: -1806,
            country: "Frankreich",
            currency: "EUR",
            exposure: 3922120,
            id: 3,
            kurs_fw: 1268434,
            kurs_iw: 1.00501,
            liquidity_risk: 12557,
            name: "Cooperative Rabobank UA",
            nominale: 1262110.825,
            rendite: 1.9,
            sector: "Finanzen",
            var: 1620,
        },
        {
            asset_type: "FRN",
            component_var: -1017,
            country: "Österreich",
            currency: "EUR",
            exposure: 3922120,
            id: 4,
            kurs_fw: 1576224,
            kurs_iw: 0.98503,
            liquidity_risk: 43501,
            name: "Volksbank Wien AG",
            nominale: 1600178.675,
            rendite: 3.4,
            sector: "Finanzen",
            var: 3139,
        },
        {
            asset_type: "FRN",
            component_var: 18099,
            country: "USA",
            currency: "USD",
            exposure: 3625440,
            id: 5,
            kurs_fw: 846123,
            kurs_iw: 0.99523,
            liquidity_risk: 5964,
            name: "Tsy Infl IX N/B",
            nominale: 909690.8353,
            rendite: 1.1,
            sector: "Basiskonsumgüter",
            var: 68986,
        },
        {
            asset_type: "Equity",
            component_var: 108060,
            country: "Schweiz",
            currency: "CHF",
            exposure: 3285338,
            id: 6,
            kurs_fw: 1843687,
            kurs_iw: 314.95,
            liquidity_risk: 32853,
            name: "Roche Holding AG-GS",
            nominale: 5561.208605,
            rendite: 2.3,
            sector: "Basiskonsumgüter",
            var: 185681,
        },
        {
            asset_type: "FRN",
            component_var: -5003,
            country: "Schweiz",
            currency: "CHF",
            exposure: 2895738,
            id: 7,
            kurs_fw: 2895738,
            kurs_iw: 1.01787,
            liquidity_risk: 14181,
            name: "Sriev NV",
            nominale: 2702654.661,
            rendite: 1.9,
            sector: "IT",
            var: 11470,
        },
        {
            asset_type: "Bond",
            component_var: 15947,
            country: "UK",
            currency: "GBP",
            exposure: 2778971,
            id: 8,
            kurs_fw: 2778971,
            kurs_iw: 0.9669,
            liquidity_risk: 21383,
            name: "Credit Suisse AG London",
            nominale: 2442988.261,
            rendite: 0.1,
            sector: "Finanzen",
            var: 53553,
        },
        {
            asset_type: "Bond",
            component_var: 6485,
            country: "USA",
            currency: "USD",
            exposure: 2330007,
            id: 9,
            kurs_fw: 648912,
            kurs_iw: 1.01625,
            liquidity_risk: 19869,
            name: "African Export-Import Bank",
            nominale: 683233.2989,
            rendite: 6.8,
            sector: "Finanzen",
            var: 38556,
        },
        {
            asset_type: "FRN",
            component_var: -1988,
            country: "Deutschland",
            currency: "EUR",
            exposure: 2095240,
            id: 10,
            kurs_fw: 1308513,
            kurs_iw: 1.04762,
            liquidity_risk: 18245,
            name: "Aegon NV",
            nominale: 1249034.001,
            rendite: 0,
            sector: "IT",
            var: 1949,
        },
        {
            asset_type: "Bond",
            component_var: -1432,
            country: "Italien",
            currency: "EUR",
            exposure: 1922960,
            id: 11,
            kurs_fw: 1156344,
            kurs_iw: 0.96148,
            liquidity_risk: 7846,
            name: "Telecom Italia Spa",
            nominale: 1202670.882,
            rendite: 6.8,
            sector: "Telekommunikation",
            var: 1795,
        },
        {
            asset_type: "FRN",
            component_var: 13847,
            country: "USA",
            currency: "USD",
            exposure: 1731605,
            id: 12,
            kurs_fw: 576127,
            kurs_iw: 0.9507,
            liquidity_risk: 10278,
            name: "Bank of America Corp",
            nominale: 648423.1514,
            rendite: 0,
            sector: "Finanzen",
            var: 31040,
        },
        {
            asset_type: "Equity",
            component_var: 51523,
            country: "Deutschland",
            currency: "EUR",
            exposure: 1683300,
            id: 13,
            kurs_fw: 1683300,
            kurs_iw: 112.22,
            liquidity_risk: 16833,
            name: "GMP Quantis Low Volatile",
            nominale: 15000,
            rendite: 1.6,
            sector: "Andere",
            var: 78679,
        },
        {
            asset_type: "Commodity",
            component_var: 63445.12,
            country: "International",
            currency: "USD",
            exposure: 1982660,
            id: 14,
            kurs_fw: 1982660,
            kurs_iw: 56785,
            liquidity_risk: 15773,
            name: "Gold 12.5 Kg 999.9",
            nominale: 37.35927093,
            rendite: -2.5,
            sector: "Andere",
            var: 79306.4,
        },
        {
            asset_type: "Bond",
            component_var: 1708,
            country: "Frankreich",
            currency: "EUR",
            exposure: 1348753,
            id: 15,
            kurs_fw: 1348753,
            kurs_iw: 1.05756,
            liquidity_risk: 5245,
            name: "Orange-Anleihe: 8,125% bis 28.01.2033",
            nominale: 1275344.189,
            rendite: -0.8,
            sector: "Telekommunikation",
            var: 2135,
        },
        {
            asset_type: "Bond",
            component_var: 3901.6,
            country: "Australien",
            currency: "AUD",
            exposure: 1868534,
            id: 16,
            kurs_fw: 1868534,
            kurs_iw: 1.03254,
            liquidity_risk: 13587,
            name: "Telstra-Anleihe: 4,900% bis 08.03.2028",
            nominale: 3004015.767,
            rendite: -0.84,
            sector: "Telekommunikation",
            var: 4877,
        },
        {
            asset_type: "Cash",
            component_var: 454,
            country: "Liechtenstein",
            currency: "EUR",
            exposure: 891315,
            id: 17,
            kurs_fw: 891315,
            kurs_iw: 1,
            liquidity_risk: 1345,
            name: "EUR Current Account ",
            nominale: 891315,
            rendite: 1.2,
            sector: "Andere",
            var: 545,
        },
        {
            asset_type: "Cash",
            component_var: 312,
            country: "Liechtenstein",
            currency: "CHF",
            exposure: 864134,
            id: 18,
            kurs_fw: 864134,
            kurs_iw: 0.95,
            liquidity_risk: 1687,
            name: "CHF Current Account ",
            nominale: 864134,
            rendite: 1.9,
            sector: "Andere",
            var: 323,
        },
        {
            asset_type: "Cash",
            component_var: 855,
            country: "Liechtenstein",
            currency: "USD",
            exposure: 235402,
            id: 19,
            kurs_fw: 235402,
            kurs_iw: 1.07,
            liquidity_risk: 1357,
            name: "USD Current Account ",
            nominale: 235402,
            rendite: 0.5,
            sector: "Andere",
            var: 478,
        },
        {
            asset_type: "Cash",
            component_var: 825,
            country: "Liechtenstein",
            currency: "AUD",
            exposure: 3654816,
            id: 20,
            kurs_fw: 3654816,
            kurs_iw: 1.66,
            liquidity_risk: 1843,
            name: "AUD Current Account ",
            nominale: 3654816,
            rendite: -0.6,
            sector: "Andere",
            var: 658,
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
                acc[key] = (acc[key] || 0) + asset.kurs_fw;
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
                acc[key] = (acc[key] || 0) + asset.kurs_fw;
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
                acc[key] = (acc[key] || 0) + asset.kurs_fw;
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
                acc[key] = (acc[key] || 0) + asset.kurs_fw;
                return acc;
            }, {});
        const totalSumVarSector = Object.values(sumVarBySector).reduce(
            (sum, value) => sum + value,
            0,
        );
        const sectorRes = Object.entries(sumVarBySector).map(
            ([key, value]) => ({
                key: key,
                value: value,
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
                editable: true,
                onCellValueChanged: cellValueChanged,
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
        gridApi.setGridOption("rowData", asset_data);
    });
</script>

<div class=" flex-grow overflow-hidden">
    <div class="grid grid-cols-12 gap-4 mr-4 ml-4 mt-4 mb-4 cont">
        <div
            id="myGrid"
            style="width:100%;"
            class="ag-theme-balham-dark col-span-9 graph-container rounded-lg cont"
        />
        <div class="bg-[#2c2c2c] rounded-lg flex flex-col col-span-3 cont">
            <h1 class="text-white text-4xl m-4">Sektoren</h1>
            <div class="flex-1 w-full">
                <D3VerticalBar bind:data={sectorResSorted} />
            </div>
        </div>
    </div>
    <div class="grid grid-cols-3 gap-4 grid-rows-1 mr-4 ml-4 mb-4 cont">
        <div class="bg-[#2c2c2c] rounded-lg flex flex-col">
            <h1 class="text-white text-4xl m-4">Assetklassen</h1>
            <div class="flex-1 w-full">
                <D3Doughnut bind:data={assetTypeResSorted} />
            </div>
        </div>
        <div class="bg-[#2c2c2c] rounded-lg flex flex-col">
            <h1 class="text-white text-4xl m-4">Währungen</h1>
            <div class="flex-1 w-full">
                <D3Bar bind:data={currencyResSorted} />
            </div>
        </div>
        <div class="bg-[#2c2c2c] rounded-lg flex flex-col h-full">
            <h1 class=" text-white text-4xl m-4">Länder</h1>
            <div class="flex-1 w-full">
                <D3Doughnut bind:data={countryResSorted} />
            </div>
        </div>
    </div>
</div>

<style>
    .ag-theme-balham-dark {
        --ag-odd-row-background-color: #242424;
        --ag-background-color: #2c2c2c;
        --ag-header-background-color: #242424;
        --ag-border-color: #2c2c2c;
        --ag-font-size: 16px;
        --ag-border-radius: 0.5rem;
    }
    .cont {
        height: calc((100vh - 6em) / 2) !important;
    }
</style>
