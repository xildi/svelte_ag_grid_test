<script lang="ts">
    import { page } from "$app/stores";
    import User from "$lib/component/icon/user.svelte";
    import PowerOff from "$lib/component/icon/power-off.svelte";
    import {
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        NavHamburger,
        Avatar,
        Dropdown,
        DropdownItem,
        DropdownHeader,
        DropdownDivider,
    } from "flowbite-svelte";

    export let routes;
    let showMenu = false;
    let loggedIn = true;
    function toggleNavbar() {
        showMenu = !showMenu;
    }
    function loggedInClick() {
        loggedIn = !loggedIn;
    }
</script>

<nav
    class="flex-shrink-0 container max-w-full h-[3em] bg-[#2c2c2c] md:flex border-b border-[#3a3a3a]"
>
    <div class="flex items-center w-[5em] justify-between">
        <a
            class="text-xl flex justify-center w-[5em] font-bold text-gray-800 md:text-2xl hover:bg-[#1e1e1e]"
            href="/dashboard"
            ><img
                width="40em"
                src="/img/code_birne_dunkel.svg"
                alt="XILDI Company logo which is a lightbulb made of a gear"
            />
        </a>
        <!-- Mobile menu button -->
        <div class="flex md:hidden">
            <button
                on:click={toggleNavbar}
                type="button"
                class="bg-gray-500 hover:bg-gray-200 text-white font-bold py-2 px-4 border-b-4 border-gray-800 hover:border-gray-500 rounded"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </button>
        </div>
    </div>

    <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
    <div
        class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0 w-4/6 {showMenu
            ? 'flex'
            : 'hidden'}"
    >
        {#each routes as route}
            <a
                class="flex-1 h-full align-center text-black dark:text-white hover:bg-[#1e1e1e] flex items-center justify-center"
                href={route.href}>{route.display_name}</a
            >
        {/each}
    </div>
    <div class="items-end flex ml-auto h-full flex items-center">
        <form
            class="flex items-center space-x-2 border-2 border-none rounded-lg p-1 bg-[#444444]"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-white"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
            </svg>

            <input
                class="w-full outline-none placeholder-white-100 text-white bg-[#444444] text-right pr-6"
                type="text"
                placeholder="Search"
            />
        </form>
        <div class=" items-end pl-16 pr-4 mb-1 text-black dark:text-white">
            <User id="user-menu" width="1.75em" height="1.75em" fill="white" />
        </div>
        <button
            on:click={loggedInClick}
            class=" text-black mb-1 pr-2 dark:text-white"
        >
            {#if loggedIn}
                <PowerOff width="1.75em" height="1.75em" fill="white" />
            {:else}
                <PowerOff width="1.75em" height="1.75em" fill="red" />
            {/if}
        </button>
    </div>
 
</nav>
