<script lang="ts">
    import Navigation from "$lib/component/Navigation.svelte";
    import Sidebar from "$lib/component/Sidebar.svelte";

    let routes = [
        {
            href: "/dashboard",
            display_name: "Portfolio",
        },
        {
            href: "/dashboard",
            display_name: "Simulation",
        },
        {
            href: "/dashboard",
            display_name: "IC",
        },
        {
            href: "/dashboard",
            display_name: "Performance",
        },
        {
            href: "/dashboard",
            display_name: "Risiko",
        },
        {
            href: "/dashboard",
            display_name: "NAV",
        },
        {
            href: "/dashboard",
            display_name: "Reporting",
        },
    ];

</script>

<div class="flex flex-col h-screen">
    <Navigation {routes} />

    <!-- Main Container -->
    <div id="content2" class="flex flex-row flex-grow">
        <!-- Sidebar -->
        <Sidebar />

        <!-- Main Content -->
        <slot />
    </div>
</div>

<style>
    #content2{
        height: calc(98vh - 5em) !important; 
    }
</style>