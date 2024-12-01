<script>
    import "$lib/styles/main.scss";

    import { page } from "$app/stores";
    import {
        House,
        BookOpenText,
        Envelope,
        CalendarDots,
        Basket,
        TwitterLogo,
        FacebookLogo,
        InstagramLogo,
        TiktokLogo,
    } from "phosphor-svelte";

    let { children } = $props();

    let windowScroll = $state(0);
    let windowWidth = $state(999);
</script>

<svelte:window
    bind:scrollY={windowScroll}
    bind:innerWidth={windowWidth}
/>
<svelte:head>
    <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=erode@300,301,400,401,500,501,600,601,700,701,1,2&display=swap"
    />
    <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossorigin=""
    />
</svelte:head>

<nav class:scrolled={windowScroll > 0} class:mobile={windowWidth < 850}>
    {#if windowWidth < 850}
        <!-- MOBILE -->
        <ul>
            <li class:active={$page.url.pathname === "/"}><a href="/"><House weight="fill" /></a></li>
            <li class:active={$page.url.pathname.includes("/contact")}><a href="/contact"><Envelope weight="fill" /></a></li>
            <li class:active={$page.url.pathname.includes("/menu")}><a href="/menu"><BookOpenText weight="fill" /></a></li>
            <li class:active={$page.url.pathname.includes("/booking")}><a href="/booking"><CalendarDots weight="fill" /></a></li>
            <li class:active={$page.url.pathname.includes("/cart")}><a href="/cart"><Basket weight="fill" /></a></li>
        </ul>
    {:else}
        <!-- DESKTOP -->
        <ul style="justify-content: flex-end">
            <li class:active={$page.url.pathname === "/"}><a href="/">Home</a></li>
            <li class:active={$page.url.pathname.includes("/about")}><a href="/about">About</a></li>
            <li class:active={$page.url.pathname.includes("/contact")}><a href="/contact">Contact</a></li>
        </ul>
        <span class="nav-logo"><img src="/assets/LogoAlt.svg" alt="TastyBites"></span>
        <ul style="justify-content: flex-start">
            <li class:active={$page.url.pathname.includes("/menu")}><a href="/menu">Menu</a></li>
            <li class:active={$page.url.pathname.includes("/booking")}><a href="/booking">Booking</a></li>
            <li class:active={$page.url.pathname.includes("/cart")}><a href="/cart">Cart</a></li>
        </ul>
    {/if}
</nav>

<main class="nav-space">
    {@render children()}
</main>

<footer>
    <div class="footer-section">
        <p>TastyBites is not a real restaurant</p>
    </div>
    <div class="footer-section">
        <h4>Find us on:</h4>
        <ul>
            <li><a href="https://example.com"><TwitterLogo weight="fill"/></a></li>
            <li><a href="https://example.com"><FacebookLogo weight="fill"/></a></li>
            <li><a href="https://example.com"><InstagramLogo weight="fill"/></a></li>
            <li><a href="https://example.com"><TiktokLogo weight="fill"/></a></li>
        </ul>
    </div>
</footer>
