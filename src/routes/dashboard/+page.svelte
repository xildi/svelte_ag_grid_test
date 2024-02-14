<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import {
        createGrid,
        type GridApi,
        type GridOptions,
        type ICellRendererParams,
        type NewValueParams,
        type TooltipRendererParams,
        type ValueFormatterParams,
        type ValueGetterParams,
    } from "ag-grid-community";

    import D3Doughnut from "$lib/component/d3/Donut.svelte";
    import D3Bar from "$lib/component/d3/Bar.svelte";
    import D3VerticalBar from "$lib/component/d3/VerticalBar.svelte";
    import { LicenseManager } from "ag-grid-enterprise";

    LicenseManager.setLicenseKey(
        "Using_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-054178}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{XILDI_AG}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{ic}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{ic}_need_to_be_licensed___{ic}_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Charts_and_AG_Grid}_Enterprise_versions_released_before_{25_January_2025}____[v3]_[0102]_MTczNzc2MzIwMDAwMA==a76833d54e30f1203cb10fba213f4aaf",
    );
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

    let countries = [
        { name: "Afghanistan", code: "AF" },
        { name: "Albanien", code: "AL" },
        { name: "Algerien", code: "DZ" },
        { name: "Amerikanisch-Samoa", code: "AS" },
        { name: "Andorra", code: "AD" },
        { name: "Angola", code: "AO" },
        { name: "Anguilla", code: "AI" },
        { name: "Antarktis", code: "AQ" },
        { name: "Antigua und Barbuda", code: "AG" },
        { name: "Argentinien", code: "AR" },
        { name: "Armenien", code: "AM" },
        { name: "Aruba", code: "AW" },
        { name: "Australien", code: "AU" },
        { name: "Österreich", code: "AT" },
        { name: "Aserbaidschan", code: "AZ" },
        { name: "Bahamas", code: "BS" },
        { name: "Bahrain", code: "BH" },
        { name: "Bangladesch", code: "BD" },
        { name: "Barbados", code: "BB" },
        { name: "Weißrussland", code: "BY" },
        { name: "Belgien", code: "BE" },
        { name: "Belize", code: "BZ" },
        { name: "Benin", code: "BJ" },
        { name: "Bermuda", code: "BM" },
        { name: "Bhutan", code: "BT" },
        { name: "Bolivien", code: "BO" },
        { name: "Bonaire", code: "BQ" },
        { name: "Bosnien und Herzegowina", code: "BA" },
        { name: "Botswana", code: "BW" },
        { name: "Bouvetinsel", code: "BV" },
        { name: "Brasilien", code: "BR" },
        { name: "Britisches Territorium im Indischen Ozean", code: "IO" },
        { name: "Brunei Darussalam", code: "BN" },
        { name: "Bulgarien", code: "BG" },
        { name: "Burkina Faso", code: "BF" },
        { name: "Burundi", code: "BI" },
        { name: "Kambodscha", code: "KH" },
        { name: "Kamerun", code: "CM" },
        { name: "Kanada", code: "CA" },
        { name: "Kap Verde", code: "CV" },
        { name: "Kaimaninseln", code: "KY" },
        { name: "Zentralafrikanische Republik", code: "CF" },
        { name: "Tschad", code: "TD" },
        { name: "Chile", code: "CL" },
        { name: "China", code: "CN" },
        { name: "Weihnachtsinsel", code: "CX" },
        { name: "Kokosinseln", code: "CC" },
        { name: "Kolumbien", code: "CO" },
        { name: "Komoren", code: "KM" },
        { name: "Kongo", code: "CG" },
        { name: "Demokratische Republik Kongo", code: "CD" },
        { name: "Cookinseln", code: "CK" },
        { name: "Costa Rica", code: "CR" },
        { name: "Elfenbeinküste", code: "CI" },
        { name: "Kroatien", code: "HR" },
        { name: "Kuba", code: "CU" },
        { name: "Curaçao", code: "CW" },
        { name: "Zypern", code: "CY" },
        { name: "Tschechien", code: "CZ" },
        { name: "Dänemark", code: "DK" },
        { name: "Dschibuti", code: "DJ" },
        { name: "Dominica", code: "DM" },
        { name: "Dominikanische Republik", code: "DO" },
        { name: "Ecuador", code: "EC" },
        { name: "Ägypten", code: "EG" },
        { name: "El Salvador", code: "SV" },
        { name: "Äquatorialguinea", code: "GQ" },
        { name: "Eritrea", code: "ER" },
        { name: "Estland", code: "EE" },
        { name: "Eswatini", code: "SZ" },
        { name: "Äthiopien", code: "ET" },
        { name: "Falklandinseln (Malwinen)", code: "FK" },
        { name: "Färöer-Inseln", code: "FO" },
        { name: "Fidschi", code: "FJ" },
        { name: "Finnland", code: "FI" },
        { name: "Frankreich", code: "FR" },
        { name: "Französisch-Guayana", code: "GF" },
        { name: "Französisch-Polynesien", code: "PF" },
        { name: "Französische Süd- und Antarktisgebiete", code: "TF" },
        { name: "Gabun", code: "GA" },
        { name: "Gambia", code: "GM" },
        { name: "Georgien", code: "GE" },
        { name: "Deutschland", code: "DE" },
        { name: "Ghana", code: "GH" },
        { name: "Gibraltar", code: "GI" },
        { name: "Griechenland", code: "GR" },
        { name: "Grönland", code: "GL" },
        { name: "Grenada", code: "GD" },
        { name: "Guadeloupe", code: "GP" },
        { name: "Guam", code: "GU" },
        { name: "Guatemala", code: "GT" },
        { name: "Guernsey", code: "GG" },
        { name: "Guinea", code: "GN" },
        { name: "Guinea-Bissau", code: "GW" },
        { name: "Guyana", code: "GY" },
        { name: "Haiti", code: "HT" },
        { name: "Heard und McDonaldinseln", code: "HM" },
        { name: "Heiliger Stuhl (Vatikanstadt)", code: "VA" },
        { name: "Honduras", code: "HN" },
        { name: "Hongkong", code: "HK" },
        { name: "Ungarn", code: "HU" },
        { name: "Island", code: "IS" },
        { name: "Indien", code: "IN" },
        { name: "Indonesien", code: "ID" },
        { name: "Iran, Islamische Republik", code: "IR" },
        { name: "Irak", code: "IQ" },
        { name: "Irland", code: "IE" },
        { name: "Isle of Man", code: "IM" },
        { name: "Israel", code: "IL" },
        { name: "Italien", code: "IT" },
        { name: "Elfenbeinküste", code: "CI" },
        { name: "Jamaika", code: "JM" },
        { name: "Japan", code: "JP" },
        { name: "Jersey", code: "JE" },
        { name: "Jordanien", code: "JO" },
        { name: "Kasachstan", code: "KZ" },
        { name: "Kenia", code: "KE" },
        { name: "Kiribati", code: "KI" },
        { name: "Demokratische Volksrepublik Korea", code: "KP" },
        { name: "Republik Korea", code: "KR" },
        { name: "Kuwait", code: "KW" },
        { name: "Kirgisistan", code: "KG" },
        { name: "Demokratische Volksrepublik Laos", code: "LA" },
        { name: "Laos", code: "LA" },
        { name: "Lettland", code: "LV" },
        { name: "Libanon", code: "LB" },
        { name: "Lesotho", code: "LS" },
        { name: "Liberia", code: "LR" },
        { name: "Libysch-Arabische Dschamahirija", code: "LY" },
        { name: "Liechtenstein", code: "LI" },
        { name: "Litauen", code: "LT" },
        { name: "Luxemburg", code: "LU" },
        { name: "Macao", code: "MO" },
        { name: "Mazedonien, ehemalige jugoslawische Republik", code: "MK" },
        { name: "Madagaskar", code: "MG" },
        { name: "Malawi", code: "MW" },
        { name: "Malaysia", code: "MY" },
        { name: "Malediven", code: "MV" },
        { name: "Mali", code: "ML" },
        { name: "Malta", code: "MT" },
        { name: "Marshallinseln", code: "MH" },
        { name: "Martinique", code: "MQ" },
        { name: "Mauretanien", code: "MR" },
        { name: "Mauritius", code: "MU" },
        { name: "Mayotte", code: "YT" },
        { name: "Mexiko", code: "MX" },
        { name: "Mikronesien, Föderierte Staaten von", code: "FM" },
        { name: "Moldau, Republik", code: "MD" },
        { name: "Monaco", code: "MC" },
        { name: "Mongolei", code: "MN" },
        { name: "Montenegro", code: "ME" },
        { name: "Montserrat", code: "MS" },
        { name: "Marokko", code: "MA" },
        { name: "Mosambik", code: "MZ" },
        { name: "Myanmar", code: "MM" },
        { name: "Namibia", code: "NA" },
        { name: "Nauru", code: "NR" },
        { name: "Nepal", code: "NP" },
        { name: "Niederlande", code: "NL" },
        { name: "Niederländische Antillen", code: "AN" },
        { name: "Neukaledonien", code: "NC" },
        { name: "Neuseeland", code: "NZ" },
        { name: "Nicaragua", code: "NI" },
        { name: "Niger", code: "NE" },
        { name: "Nigeria", code: "NG" },
        { name: "Niue", code: "NU" },
        { name: "Norfolkinsel", code: "NF" },
        { name: "Nördliche Marianen", code: "MP" },
        { name: "Norwegen", code: "NO" },
        { name: "Oman", code: "OM" },
        { name: "Pakistan", code: "PK" },
        { name: "Palau", code: "PW" },
        { name: "Palästinensisches Gebiet, besetztes", code: "PS" },
        { name: "Panama", code: "PA" },
        { name: "Papua-Neuguinea", code: "PG" },
        { name: "Paraguay", code: "PY" },
        { name: "Peru", code: "PE" },
        { name: "Philippinen", code: "PH" },
        { name: "Pitcairninseln", code: "PN" },
        { name: "Polen", code: "PL" },
        { name: "Portugal", code: "PT" },
        { name: "Puerto Rico", code: "PR" },
        { name: "Katar", code: "QA" },
        { name: "Ruanda", code: "RW" },
        { name: "Réunion", code: "RE" },
        { name: "Rumänien", code: "RO" },
        { name: "Russische Föderation", code: "RU" },
        { name: "St. Barthélemy", code: "BL" },
        { name: "St. Helena", code: "SH" },
        { name: "St. Kitts und Nevis", code: "KN" },
        { name: "St. Lucia", code: "LC" },
        { name: "St. Martin", code: "MF" },
        { name: "St. Pierre und Miquelon", code: "PM" },
        { name: "St. Vincent und die Grenadinen", code: "VC" },
        { name: "Samoa", code: "WS" },
        { name: "San Marino", code: "SM" },
        { name: "São Tomé und Príncipe", code: "ST" },
        { name: "Saudi-Arabien", code: "SA" },
        { name: "Senegal", code: "SN" },
        { name: "Serbien", code: "RS" },
        { name: "Seychellen", code: "SC" },
        { name: "Sierra Leone", code: "SL" },
        { name: "Singapur", code: "SG" },
        { name: "Sint Maarten", code: "SX" },
        { name: "Slowakei", code: "SK" },
        { name: "Slowenien", code: "SI" },
        { name: "Salomonen", code: "SB" },
        { name: "Somalia", code: "SO" },
        { name: "Südafrika", code: "ZA" },
        { name: "Südgeorgien und die Südlichen Sandwichinseln", code: "GS" },
        { name: "Südsudan", code: "SS" },
        { name: "Spanien", code: "ES" },
        { name: "Sri Lanka", code: "LK" },
        { name: "Sudan", code: "SD" },
        { name: "Suriname", code: "SR" },
        { name: "Svalbard und Jan Mayen", code: "SJ" },
        { name: "Swasiland", code: "SZ" },
        { name: "Schweden", code: "SE" },
        { name: "Schweiz", code: "CH" },
        { name: "Syrische Arabische Republik", code: "SY" },
        { name: "Taiwan", code: "TW" },
        { name: "Tadschikistan", code: "TJ" },
        { name: "Tansania, Vereinigte Republik", code: "TZ" },
        { name: "Thailand", code: "TH" },
        { name: "Timor-Leste", code: "TL" },
        { name: "Togo", code: "TG" },
        { name: "Tokelau", code: "TK" },
        { name: "Tonga", code: "TO" },
        { name: "Trinidad und Tobago", code: "TT" },
        { name: "Tunesien", code: "TN" },
        { name: "Türkei", code: "TR" },
        { name: "Turkmenistan", code: "TM" },
        { name: "Turks- und Caicosinseln", code: "TC" },
        { name: "Tuvalu", code: "TV" },
        { name: "Uganda", code: "UG" },
        { name: "Ukraine", code: "UA" },
        { name: "Vereinigte Arabische Emirate", code: "AE" },
        { name: "Vereinigtes Königreich", code: "GB" },
        { name: "UK", code: "GB" },
        { name: "Vereinigte Staaten", code: "US" },
        { name: "USA", code: "US" },
        { name: "United States Minor Outlying Islands", code: "UM" },
        { name: "Uruguay", code: "UY" },
        { name: "Usbekistan", code: "UZ" },
        { name: "Vanuatu", code: "VU" },
        { name: "Venezuela, Bolivarische Republik", code: "VE" },
        { name: "Vietnam", code: "VN" },
        { name: "Britische Jungferninseln", code: "VG" },
        { name: "Amerikanische Jungferninseln", code: "VI" },
        { name: "Wales", code: "GB" },
        { name: "Wallis und Futuna", code: "WF" },
        { name: "Westjordanland", code: "PS" },
        { name: "Westsahara", code: "EH" },
        { name: "Jemen", code: "YE" },
        { name: "Sambia", code: "ZM" },
        { name: "Simbabwe", code: "ZW" },
    ];

    let maxKursFW = 3654816;
    $: {
        maxKursFW = asset_data.reduce(
            (max, item) => (item.kurs_fw > max ? item.kurs_fw : max),
            0,
        );
    }
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
    const tooltipRenderer = (params: TooltipRendererParams) => {
        if (
            params !== undefined &&
            params !== null &&
            params.yValue !== undefined &&
            params.yValue !== null
        ) {
            return {
                content: params.yValue,
            };
        }
    };
    const gridOptions: GridOptions = {
        sideBar: false,
        defaultColDef: {
            sortable: true,
            flex: 1,
            resizable: true,
            editable: true,
            filter: "agTextColumnFilter",
            enablePivot: false,
            minWidth: 150,
        },
        defaultColGroupDef: {
            marryChildren: true,
        },
        enableCharts: true,
        enableRangeSelection: true,
        enableFillHandle: true,
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
                field: "country",
                headerName: "Country",
                cellEditor: "agRichSelectCellEditor",
                cellRenderer: countryFlagRenderer,
                enableRowGroup: true,
                minWidth: 150,
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
                type: "numericColumn",
                valueFormatter: currencyFormatter,
                floatingFilter: false,
                editable: false,
            },
            {
                field: "kurs_iw",
                headerName: "Kurs IW",
                minWidth: 70,
                type: "numericColumn",
                filter: false,
                floatingFilter: false,
                editable: false,
            },
            {
                field: "kurs_fw",
                headerName: "Wert",
                minWidth: 70,
                type: "numericColumn",
                valueFormatter: currencyFormatter,
                filter: false,
                floatingFilter: false,
                editable: true,
                onCellValueChanged: cellValueChanged,
            },
            {
                cellRenderer: "agSparklineCellRenderer",
                valueGetter: (params: ValueGetterParams) => {
                    const formattedData: any = [
                        0,
                        params.data !== undefined && params.data !== null
                            ? params.data.kurs_fw
                            : 0,
                        0,
                    ];
                    return formattedData;
                },
                cellRendererParams: {
                    sparklineOptions: {
                        type: "bar",
                        fill: "#094f6b",
                        strokeWidth: 0,

                        highlightStyle: {
                            fill: "#fac858",
                        },
                        valueAxisDomain: [0, maxKursFW],
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
            {
                field: "exposure",
                headerName: "Exposure",
                minWidth: 70,
                type: "numericColumn",
                valueFormatter: currencyFormatter,
                filter: false,
                floatingFilter: false,
                editable: false,
            },
            {
                field: "rendite",
                headerName: "Rendite",
                minWidth: 70,
                type: "numericColumn",
                filter: false,
                floatingFilter: false,
                editable: false,
            },
            {
                field: "component_var",
                headerName: "Comp. Var",
                minWidth: 70,
                type: "numericColumn",
                valueFormatter: currencyFormatter,
                filter: false,
                floatingFilter: false,
                editable: false,
            },
            {
                field: "var",
                headerName: "Var",
                minWidth: 70,
                type: "numericColumn",
                valueFormatter: currencyFormatter,
                filter: false,
                floatingFilter: false,
                editable: false,
            },
            {
                field: "liquidity_risk",
                headerName: "Liquidity Risk",
                minWidth: 70,
                type: "numericColumn",
                valueFormatter: currencyFormatter,
                filter: false,
                floatingFilter: false,
                editable: false,
            },
        ],
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
                return `<span class="flex "><img src="https://flagsapi.com/${flag_code.code}/flat/24.png" class="mr-2"> ${params.value}</span>`;
            }
            if (params.value !== undefined && params.value !== null) {
                return `<span>${params.value}</span>`;
            }
        }
    }

    function currencyFormatter(params: ValueFormatterParams) {
        if (params.value !== undefined && params.value !== null) {
            return params.value == null ? "" : numberWithCommas(params.value);
        }
        return params.value == null ? "" : numberWithCommas(params.value);
    }

    function numberWithCommas(x: string | number | boolean) {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "'");
    }
    onMount(() => {
        const gridEl = document.getElementById("myGrid");
        if (!gridEl) {
            throw new Error("Grid element not found");
        }
        gridApi = createGrid(gridEl, gridOptions);
        maxKursFW = asset_data.reduce(
            (max, item) => (item.kurs_fw > max ? item.kurs_fw : max),
            0,
        );
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
            <h1 class="text-white text-2xl m-4">Sektoren</h1>
            <div class="flex-1 w-full">
                <D3VerticalBar bind:data={sectorResSorted} />
            </div>
        </div>
    </div>
    <div class="grid grid-cols-3 gap-4 grid-rows-1 mr-4 ml-4 mb-4 cont">
        <div class="bg-[#2c2c2c] rounded-lg flex flex-col">
            <h1 class="text-white text-2xl m-4">Assetklassen</h1>
            <div class="flex-1 w-full">
                <D3Doughnut bind:data={assetTypeResSorted} />
            </div>
        </div>
        <div class="bg-[#2c2c2c] rounded-lg flex flex-col">
            <h1 class="text-white text-2xl m-4">Währungen</h1>
            <div class="flex-1 w-full">
                <D3Bar bind:data={currencyResSorted} />
            </div>
        </div>
        <div class="bg-[#2c2c2c] rounded-lg flex flex-col h-full">
            <h1 class=" text-white text-2xl m-4">Länder</h1>
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
