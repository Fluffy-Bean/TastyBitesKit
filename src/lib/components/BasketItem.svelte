<script lang="ts">
    import {
        Plus,
        Minus,
        Trash,
        Acorn,
        Fish,
        GrainsSlash,
        Leaf,
        Pepper,
        SealWarning,
    } from "phosphor-svelte";

    import type { CartItem } from "$lib/types";
    import { Labels } from "$lib/types";
    import CartSvelte from "$lib/cart.svelte";

    interface Props {
        item: CartItem;
    }

    let { item }: Props = $props();

    function reduce() {
        if (item.amount > 1) {
            CartSvelte.addToCart(item.data.uuid, -1)
        }
    }
    function add() {
        if (item.amount < 99) {
            CartSvelte.addToCart(item.data.uuid, 1);
        }
    }
    function yeet() {
        CartSvelte.removeByUUID(item.data.uuid)
    }
</script>


<div class="container" >
    {#if !item.data.availability}
        <div class="basket-item-notice">
            <SealWarning weight="fill" />&nbsp;&nbsp;<span>Item is no-longer for sale</span>
        </div>
    {/if}
    <div class="basket-item">
        {#if item.data.images && item.data.images[0]}
            <img src="{item.data.images[0]}" alt="Item" class="basket-item-image">
        {:else}
            <img src="/assets/MenuItemLoading.svg" alt="Item" class="basket-item-image">
        {/if}

        <ul class="basket-item-data">
            <li class="basket-item-name"><a href="/item/{item.data.uuid}">{item.data.name}</a></li>
            <li class="basket-item-controls">
                <button class="button" class:disabled={item.amount <= 1} onclick={reduce}><Minus /></button>
                <p>{item.amount}</p>
                <button class="button" class:disabled={item.amount >= 99} onclick={add}><Plus /></button>
                <hr>
                <button class="button evil" onclick={yeet}><Trash /></button>
            </li>
            <li class="basket-item-price">£{(item.data.price * item.amount).toFixed(2)} (£{item.data.price.toFixed(2)})</li>
        </ul>

        <ul class="basket-item-labels">
            {#each item.data.labels || [] as label}
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
        </ul>
    </div>
</div>

<style lang="scss">
    @use "$lib/styles/vars";

    .container {
        overflow: hidden;
    }

    .basket-item {
        position: relative;

        display: flex;
        flex-direction: row;

        border-radius: vars.$border-radius-normal;

        overflow: hidden;
    }
    .basket-item-notice {
        width: 100%;
        height: 30px;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: vars.$font-size-p;

        background: vars.$color-error;
        color: vars.$color-on-error;

        box-shadow: 0 1px 0.5px rgba(#000, 0.3);
    }
    .basket-item-image {
        margin: vars.$spacing-small;

        width: 120px;
        height: 120px;

        border-radius: vars.$border-radius-normal;

        object-fit: cover;
    }
    .basket-item-labels {
        padding: vars.$spacing-normal;

        display: flex;
        flex-direction: row;

        > li {
            margin: 0 0 0 -15px;

            width: 30px;
            height: 30px;

            display: flex;
            justify-content: center;
            align-items: center;

            border-radius: vars.$border-radius-circle;
            background-color: vars.$color-dark;
            color: vars.$color-on-dark;

            list-style: none;

            &.vegan {
                background-color: vars.$color-vegan;
            }
            &.fish {
                background-color: vars.$color-fish;
            }
            &.nut {
                background-color: vars.$color-nut;
            }
            &.gluten {
                background-color: vars.$color-gluten;
            }
            &.spicy {
                background-color: vars.$color-spicy;
            }
        }
    }
    .basket-item-data {
        margin: 0;
        padding: vars.$spacing-small;

        display: flex;
        flex-direction: column;
        flex-grow: 1;

        > li {
            padding-bottom: vars.$spacing-small;
            list-style: none;
        }
    }
    .basket-item-name a {
        font-size: vars.$font-size-h2;
        text-decoration: underline;

        color: vars.$color-on-light;

        &:hover {
            text-decoration: none;
        }
    }
    .basket-item-controls {
        display: flex;
        flex-direction: row;

        > .button {
            width: 35px;
            height: 35px;

            display: flex;
            justify-content: center;
            align-items: center;

            font-family: vars.$font-family;
            font-size: vars.$font-size-p;

            border: 1px solid rgba(vars.$color-dark, 0.2);
            border-radius: vars.$border-radius-normal;
            background-color: vars.$color-light;
            color: vars.$color-on-light;

            &:hover {
                border: 1px solid rgba(vars.$color-dark, 0.4);
            }
            &:focus-visible {
                border: 1px solid rgba(vars.$color-primary, 0.9);
                outline: 0 solid transparent;
            }

            &.evil {
                border: 1px solid vars.$color-error;
                color: vars.$color-error;

                &:hover,
                &:focus-visible {
                    background-color: rgba(vars.$color-error, 0.1);
                }
            }

            &.disabled {
                border: 1px solid rgba(vars.$color-dark, 0.1);
                color: rgba(vars.$color-on-light, 0.6);

                &:hover,
                &:focus-visible {
                    border: 1px solid rgba(vars.$color-dark, 0.1);
                    background-color: vars.$color-light;
                    color: rgba(vars.$color-on-light, 0.6);
                }
            }
        }

        > p {
            width: 40px;
            height: 35px;

            display: flex;
            justify-content: center;
            align-items: center;

            font-family: vars.$font-family;
            font-size: vars.$font-size-p;

            border: 1px solid transparent;
            color: vars.$color-on-light;
        }

        > hr {
            margin: 0 vars.$spacing-small;

            width: 1px;
            height: 100%;

            border: 0 solid transparent;
            background-color: rgba(vars.$color-dark, 0.1);
        }
    }
    .basket-item-price {
        font-size: vars.$font-size-p;
    }
</style>