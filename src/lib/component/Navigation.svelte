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
    import CogWheel from "./icon/cog_wheel.svelte";
    import CircleQuestion from "./icon/circle-question.svelte";
    import Darkmode from "./icon/darkmode.svelte";
    import CommentDots from "./icon/comment-dots.svelte";
    import Web from "./icon/web.svelte";
    import { resolveRoute } from "$app/paths";

    export let routes;
    let loggedIn = true;
    let isUserMenuShow = false;
    function loggedInClick() {
        loggedIn = !loggedIn;
    }
    function showUserMenu() {
        console.log("clicked ", isUserMenuShow);
        isUserMenuShow = !isUserMenuShow;
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
    </div>

    <div
        class=" mt-0 flex space-y-0  items-center  w-4/6 "
    >
        {#each routes as route}
            {#if route.display_name == "Portfolio"}
                <a
                    class="flex-1 h-full bg-[#1e1e1e] mt-0 align-center text-black dark:text-white hover:bg-[#1e1e1e] flex items-center justify-center"
                    href={route.href}>{route.display_name}</a
                >
            {:else}
                <a
                    class="flex-1 h-full align-center mt-0 text-black dark:text-white hover:bg-[#1e1e1e] flex items-center justify-center"
                    href={route.href}>{route.display_name}</a
                >
            {/if}
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
        <div class="flex items-end pl-16 pr-4  text-black dark:text-white">
            <button
                class="items-center"
                on:click={() => (isUserMenuShow = !isUserMenuShow)}
            >
                <User width="1.75em" height="1.75em" fill="white" />
            </button>
            <!-- Dropdown menu -->
            <Dropdown
                open={isUserMenuShow}
                class="bg-[#2c2c2c] rounded-b-lg border-b border-l border-r  border-[#3a3a3a]"
            >
                <DropdownItem class="flex  hover:bg-[#1e1e1e]">
                    <a class=" flex items-center m-2" href="/dashboard" 
                        ><img
                            src="img/gianni.png"
                            alt="Userimage"
                            class="h-10 w-10"
                        />
                        <span class="ml-4 align-center text-center"
                            >Gianni Notari</span
                        ></a
                    >
                </DropdownItem>
                <DropdownDivider class="border-b border-[#3a3a3a] mx-4 mb-1" />
                <DropdownItem class="hover:bg-[#1e1e1e]">
                    <a class=" flex items-center m-2" href="/dashboard">
                        <div class="bg-[#3A3B3C] rounded-full p-2">
                            <CogWheel
                                height="1.75em"
                                width="1.75em"
                                fill="white"
                            />
                        </div>
                        <span class="ml-4 align-center text-center"
                            >User-Einstellungen</span
                        >
                    </a>
                </DropdownItem>
                <DropdownItem class="hover:bg-[#1e1e1e]">
                    <a class=" flex items-center m-2" href="/dashboard">
                        <div class="bg-[#3A3B3C] rounded-full p-2">
                            <CircleQuestion
                                height="1.75em"
                                width="1.75em"
                                fill="white"
                            />
                        </div>
                        <span class="ml-4 align-center text-center"
                            >Hilfe und Support</span
                        >
                    </a>
                </DropdownItem>
                <DropdownItem class="hover:bg-[#1e1e1e]">
                    <a class=" flex items-center  m-2" href="/dashboard">
                        <div class="bg-[#3A3B3C] rounded-full p-2">
                            <Darkmode
                                height="1.75em"
                                width="1.75em"
                                fill="white"
                            />
                        </div>
                        <span class="ml-4 align-center text-center"
                            >Anzeige & Bedienhilfe</span
                        >
                    </a>
                </DropdownItem>
                <DropdownItem class="hover:bg-[#1e1e1e]">
                    <a class=" flex items-center  m-2" href="/dashboard">
                        <div class="bg-[#3A3B3C] rounded-full p-2">
                            <CommentDots
                                height="1.75em"
                                width="1.75em"
                                fill="white"
                            />
                        </div>
                        <span class="ml-4 align-center text-center"
                            >Feedback geben</span
                        >
                    </a>
                </DropdownItem>
                <DropdownItem class="hover:bg-[#1e1e1e]">
                    <a class=" flex items-center  m-2" href="/dashboard">
                        <div class="bg-[#3A3B3C] rounded-full p-2">
                            <Web height="1.75em" width="1.75em" fill="white" />
                        </div>
                        <span class="ml-4 align-center text-center"
                            >Sprache</span
                        >
                    </a>
                </DropdownItem>
            </Dropdown>
        </div>
        <button
            on:click={loggedInClick}
            class=" text-black  pr-4 dark:text-white"
        >
            {#if loggedIn}
                <PowerOff width="1.75em" height="1.75em" fill="white" />
            {:else}
                <PowerOff width="1.75em" height="1.75em" fill="red" />
            {/if}
        </button>
    </div>
</nav>
