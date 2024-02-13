<script>
    import { page } from "$app/stores";
    import {
        Sidebar,
        SidebarGroup,
        SidebarItem,
        SidebarWrapper,
    } from "flowbite-svelte";
    import { slide } from "svelte/transition";
    import HouseChimney from "./icon/house-chimney.svelte";
    import Globe from "./icon/globe.svelte";
    import Calculator from "./icon/calculator.svelte";
    import PieChart from "./icon/pie-chart.svelte";
    import Send from "./icon/send.svelte";
    import LayerGroup from "./icon/layer-group.svelte";
    import Shield from "./icon/shield.svelte";
    import CircleInfo from "./icon/circle-info.svelte";
    import Comments from "./icon/comments.svelte";
    import Bell from "./icon/bell.svelte";
    import CogWheel from "./icon/cog_wheel.svelte";
    import ArrowLeft from "./icon/circle-chevron-left.svelte";
    import ArrowRight from "./icon/circle-chevron-right.svelte";
    $: activeUrl = $page.url.pathname;
    let show = false;

    let spanClass = "flex-1 ms-3 whitespace-nowrap h-full w-full ";
    let transitionState = null;

    function hideSidebar() {
        show = !show;
        transitionState = show ? "in" : "out";
    }
</script>

<div class="flex border-r border-[#3a3a3a]">
    {#if show}
        <Sidebar class="relative">
            <div
                class="bg-[#2C2C2C] flex w-[10em] h-full flex-col rounded-none"
                transition:slide={{ duration: 500, axis: "x" }}
            >
                <button
                    class="absolute -right-2 bottom-4"
                    on:click={hideSidebar}
                >
                    <ArrowLeft width="1em" height="1em" fill="gray" />
                </button>
                <SidebarWrapper
                    class="bg-[#2C2C2C] flex w-[10em] h-full flex-col rounded-none items-center"
                >
                    <!-- Section at the top -->
                    <SidebarGroup class="mt-auto">
                        <SidebarItem
                            href="/dashboard"
                            label="Home"
                            class="hover:bg-[#1e1e1e] rounded-none "
                            {spanClass}
                        >
                            <svelte:fragment slot="icon">
                                <HouseChimney
                                    width="1.75em"
                                    height="1.75em"
                                    fill="white"
                                />
                            </svelte:fragment>
                        </SidebarItem>
                        <SidebarItem
                            href="/dashboard"
                            label="Übersicht"
                            class="hover:bg-[#1e1e1e] rounded-none"
                            {spanClass}
                        >
                            <svelte:fragment slot="icon">
                                <Globe
                                    width="1.75em"
                                    height="1.75em"
                                    fill="white"
                                />
                            </svelte:fragment>
                        </SidebarItem>
                        <SidebarItem
                            href="/dashboard"
                            label="Berechnung"
                            class="hover:bg-[#1e1e1e] rounded-none"
                            {spanClass}
                        >
                            <svelte:fragment slot="icon">
                                <Calculator
                                    width="1.75em"
                                    height="1.75em"
                                    fill="white"
                                />
                            </svelte:fragment>
                        </SidebarItem>
                        <SidebarItem
                            href="/dashboard"
                            label="Dashboard"
                            class="hover:bg-[#1e1e1e] rounded-none"
                            {spanClass}
                        >
                            <svelte:fragment slot="icon">
                                <PieChart
                                    width="1.75em"
                                    height="1.75em"
                                    fill="white"
                                />
                            </svelte:fragment>
                        </SidebarItem>
                        <!-- SidebarItems for the top section go here -->
                    </SidebarGroup>

                    <!-- Section in the middle -->
                    <SidebarGroup
                        class="flex-grow flex flex-col  justify-center"
                    >
                        <SidebarItem
                            href="/dashboard"
                            label="Versand"
                            class="hover:bg-[#1e1e1e] rounded-none"
                            {spanClass}
                        >
                            <svelte:fragment slot="icon">
                                <Send
                                    width="1.75em"
                                    height="1.75em"
                                    fill="white"
                                />
                            </svelte:fragment>
                        </SidebarItem>
                        <SidebarItem
                            href="/dashboard"
                            label="Stammdaten"
                            class="hover:bg-[#1e1e1e] rounded-none"
                            {spanClass}
                        >
                            <svelte:fragment slot="icon">
                                <LayerGroup
                                    width="1.75em"
                                    height="1.75em"
                                    fill="white"
                                />
                            </svelte:fragment>
                        </SidebarItem>
                        <SidebarItem
                            href="/dashboard"
                            label="Schützen"
                            class="hover:bg-[#1e1e1e] rounded-none"
                            {spanClass}
                        >
                            <svelte:fragment slot="icon">
                                <Shield
                                    width="1.75em"
                                    height="1.75em"
                                    fill="white"
                                />
                            </svelte:fragment>
                        </SidebarItem>
                        <!-- SidebarItems for the middle section go here -->
                    </SidebarGroup>

                    <!-- Section at the bottom -->
                    <SidebarGroup class="mb-auto">
                        <SidebarItem
                            href="/dashboard"
                            label="Informationen"
                            class="hover:bg-[#1e1e1e] rounded-none"
                            {spanClass}
                        >
                            <svelte:fragment slot="icon">
                                <CircleInfo
                                    width="1.75em"
                                    height="1.75em"
                                    fill="white"
                                />
                            </svelte:fragment>
                        </SidebarItem>
                        <SidebarItem
                            href="/dashboard"
                            label="Feedback"
                            class="hover:bg-[#1e1e1e] rounded-none"
                            {spanClass}
                        >
                            <svelte:fragment slot="icon">
                                <Comments
                                    width="1.75em"
                                    height="1.75em"
                                    fill="white"
                                />
                            </svelte:fragment>
                        </SidebarItem>
                        <SidebarItem
                            href="/dashboard"
                            label="Erinnerungen"
                            class="hover:bg-[#1e1e1e] rounded-none"
                            {spanClass}
                        >
                            <svelte:fragment slot="icon">
                                <Bell
                                    width="1.75em"
                                    height="1.75em"
                                    fill="white"
                                />
                            </svelte:fragment>
                        </SidebarItem>
                        <SidebarItem
                            href="/dashboard"
                            label="Einstellungen"
                            class="hover:bg-[#1e1e1e] rounded-none"
                            {spanClass}
                        >
                            <svelte:fragment slot="icon">
                                <CogWheel
                                    width="1.75em"
                                    height="1.75em"
                                    fill="white"
                                />
                            </svelte:fragment>
                        </SidebarItem>
                    </SidebarGroup>
                </SidebarWrapper>
            </div>
        </Sidebar>
    {:else}
        <Sidebar class="relative">
            <button class="absolute -right-2 bottom-4" on:click={hideSidebar}>
                <ArrowRight width="1em" height="1em" fill="gray" />
            </button>
            <div class="bg-[#2C2C2C] flex w-[5em] h-full flex-col rounded-none">
                <SidebarWrapper
                    class="bg-[#2C2C2C] flex w-[5em] h-full flex-col rounded-none"
                >
                    <!-- Section at the top -->
                    <SidebarGroup class="mt-auto ">
                        <SidebarItem href="/dashboard" spanClass="">
                            <svelte:fragment slot="icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    width="1.75em"
                                    height="1.75em"
                                    style="margin: auto;"
                                    fill="white"
                                    ><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->
                                    <path
                                        d="M543.8 287.6c17 0 32-14 32-32.1c1-9-3-17-11-24L512 185V64c0-17.7-14.3-32-32-32H448c-17.7 0-32 14.3-32 32v36.7L309.5 7c-6-5-14-7-21-7s-15 1-22 8L10 231.5c-7 7-10 15-10 24c0 18 14 32.1 32 32.1h32v69.7c-.1 .9-.1 1.8-.1 2.8V472c0 22.1 17.9 40 40 40h16c1.2 0 2.4-.1 3.6-.2c1.5 .1 3 .2 4.5 .2H160h24c22.1 0 40-17.9 40-40V448 384c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v64 24c0 22.1 17.9 40 40 40h24 32.5c1.4 0 2.8 0 4.2-.1c1.1 .1 2.2 .1 3.3 .1h16c22.1 0 40-17.9 40-40V455.8c.3-2.6 .5-5.3 .5-8.1l-.7-160.2h32z"
                                    /></svg
                                >
                            </svelte:fragment>
                        </SidebarItem>
                        <SidebarItem
                            href="/dashboard"
                            class="justify-center hover:bg-[#1e1e1e] rounded-none"
                            spanClass="">
                            <svelte:fragment slot="icon">
                                <Globe
                                    width="1.75em"
                                    height="1.75em"
                                    fill="white"
                                />
                            </svelte:fragment>
                        </SidebarItem>
                        <SidebarItem
                            href="/dashboard"
                            class="justify-center hover:bg-[#1e1e1e] rounded-none"
                            spanClass="">
                            <svelte:fragment slot="icon">
                                <Calculator
                                    width="1.75em"
                                    height="1.75em"
                                    fill="white"
                                />
                            </svelte:fragment>
                        </SidebarItem>
                        <SidebarItem
                            href="/dashboard"
                            class="justify-center hover:bg-[#1e1e1e] rounded-none"
                            spanClass="">
                            <svelte:fragment slot="icon">
                                <PieChart
                                    width="1.75em"
                                    height="1.75em"
                                    fill="white"
                                />
                            </svelte:fragment>
                        </SidebarItem>
                        <!-- SidebarItems for the top section go here -->
                    </SidebarGroup>

                    <!-- Section in the middle -->
                    <SidebarGroup
                        class="flex-grow flex flex-col justify-center"
                    >
                        <SidebarItem
                            href="/dashboard"
                            class="justify-center w-full hover:bg-[#1e1e1e] rounded-none"
                            spanClass="">
                            <svelte:fragment slot="icon">
                                <Send
                                    width="1.75em"
                                    height="1.75em"
                                    fill="white"
                                />
                            </svelte:fragment>
                        </SidebarItem>
                        <SidebarItem
                            href="/dashboard"
                            class="justify-center hover:bg-[#1e1e1e] rounded-none"
                            spanClass="">
                            <svelte:fragment slot="icon">
                                <LayerGroup
                                    width="1.75em"
                                    height="1.75em"
                                    fill="white"
                                />
                            </svelte:fragment>
                        </SidebarItem>
                        <SidebarItem
                            href="/dashboard"
                            class="justify-center hover:bg-[#1e1e1e] rounded-none"
                            spanClass="">
                            <svelte:fragment slot="icon">
                                <Shield
                                    width="1.75em"
                                    height="1.75em"
                                    fill="white"
                                />
                            </svelte:fragment>
                        </SidebarItem>
                        <!-- SidebarItems for the middle section go here -->
                    </SidebarGroup>

                    <!-- Section at the bottom -->
                    <SidebarGroup class="mb-auto">
                        <SidebarItem
                            href="/dashboard"
                            class="justify-center hover:bg-[#1e1e1e] rounded-none"
                            spanClass="">
                            <svelte:fragment slot="icon">
                                <CircleInfo
                                    width="1.75em"
                                    height="1.75em"
                                    fill="white"
                                />
                            </svelte:fragment>
                        </SidebarItem>
                        <SidebarItem
                            href="/dashboard"
                            class="justify-center hover:bg-[#1e1e1e] rounded-none"
                            spanClass="">
                            <svelte:fragment slot="icon">
                                <Comments
                                    width="1.75em"
                                    height="1.75em"
                                    fill="white"
                                />
                            </svelte:fragment>
                        </SidebarItem>
                        <SidebarItem
                            href="/dashboard"
                            class="justify-center hover:bg-[#1e1e1e] rounded-none"
                            spanClass="">
                            <svelte:fragment slot="icon">
                                <Bell
                                    width="1.75em"
                                    height="1.75em"
                                    fill="white"
                                />
                            </svelte:fragment>
                        </SidebarItem>
                        <SidebarItem
                            href="/dashboard"
                            class="justify-center hover:bg-[#1e1e1e] rounded-none"
                            spanClass="">
                            <svelte:fragment slot="icon">
                                <CogWheel
                                    width="1.75em"
                                    height="1.75em"
                                    fill="white"
                                />
                            </svelte:fragment>
                        </SidebarItem>
                        <!-- SidebarItems for the bottom section go here -->
                    </SidebarGroup>
                </SidebarWrapper>
            </div>
        </Sidebar>
    {/if}
</div>

<style>
</style>
