<script lang="ts">
    import "../app.css";
    import "ag-grid-community/styles/ag-grid.css";
    import "ag-grid-community/styles/ag-theme-balham.css";
    import "ag-grid-community/styles/ag-theme-alpine.css";
    import "ag-grid-community/styles/ag-theme-quartz.css";
    import "ag-grid-community/styles/ag-theme-material.css";
</script>

<div id="content">
    <div id="page">
        <slot />
    </div>
</div>

<style>
    :global(body, html) {
        background: #1e1e1e;
        height: 100%;
    }
    #content {
        height: 98vh;
    }
    #page {
        height: 100%;
    }
</style>
