<script lang="ts">
    import { onMount } from "svelte";
    import {
        Acorn,
        Fish,
        Leaf,
        Pepper,
        ArrowUpRight,
        GrainsSlash,
    } from "phosphor-svelte";

    import type { Item } from "$lib/types";
    import { Labels } from "$lib/types";

    export let item: Item;

    let element: HTMLElement;

    function keepSquare() {
        element.style.height = ""; // For whatever reason, need to remove the height first...
        element.style.height = element.offsetWidth + "px";
    }

    onMount(keepSquare);
</script>

<div class="menu-item" bind:this={element}>
    <img src={item.images ? item.images[0] : "/assets/MenuItemLoadingAlt.svg"} alt="" class="menu-item-image">

    <ul class="menu-item-labels">
        {#if item.labels}
            {#each item.labels as label}
                {#if label === Labels.vegan}
                    <li class="vegan"><Leaf weight="fill" /></li>
                {:else if label === Labels.fish}
                    <li class="fish"><Fish weight="fill" /></li>
                {:else if label === Labels.nut}
                    <li class="nut"><Acorn weight="fill" /></li>
                {:else if label === Labels.gluten}
                    <li class="gluten"><GrainsSlash weight="fill" /></li>
                {:else if label === Labels.spicy}
                    <li class="spicy"><Pepper weight="fill" /></li>
                {/if}
            {/each}
        {/if}
    </ul>

    <a class="menu-item-link" href="/menu/item/{item.uuid}">View&nbsp;<ArrowUpRight /></a>
    <ul class="menu-item-detail"><li>£{item.price.toFixed(2)} | {item.name}</li></ul>
</div>
