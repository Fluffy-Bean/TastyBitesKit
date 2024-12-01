<script lang="ts">
    import { ArrowRight, Basket } from "phosphor-svelte";

    import Cart from "$lib/cart.svelte";
    import MenuItemGrid from "$lib/components/MenuItemGrid.svelte";
    import BasketItem from "$lib/components/BasketItem.svelte";
    import DropDown from "$lib/components/DropDown.svelte";

    let { data } = $props();

    let items = $derived(Cart.getEntries());
    let totalPrice = $derived(Cart.getTotalPrice());
    let totalItems = $derived(Cart.getUniqueLength());
</script>

{#if totalItems}
    <h1>CartSvelte</h1>

    <a id="checkout-button" href="/cart/checkout">Checkout&nbsp;<ArrowRight /></a>
    <h2>Order total: £{totalPrice.toFixed(2)}</h2>

    {#each items as [_, item]}
        <div class="basket-item">
            <BasketItem item={item}/>
        </div>
    {/each}
{:else}
    <div id="emptyCart">
        <h1>Empty CartSvelte&nbsp;<Basket weight="fill" /></h1>
        <p>Why not go and checkout <a href="/menu">our menu</a>?</p>
    </div>
{/if}

<div class="spacer"></div>

<h2>Looking for something more?</h2>
<MenuItemGrid items={data.popularToday} />

<div class="spacer"></div>

<h2>Help</h2>
<div class="container">
    <DropDown name="Booking">
        <p>Want to reserve a table instead? <a href="/booking">You can do this here</a>!</p>
    </DropDown>
    <hr>
    <DropDown name="Past Orders">
        <p>Looking past orders? Check out the <a href="/contact">commonly asked questions</a>.</p>
    </DropDown>
</div>

<style lang="scss">
    @use "$lib/styles/vars";

    .basket-item {
        margin-bottom: vars.$spacing-normal;
    }

    #checkout-button {
        padding: 0 vars.$spacing-normal;

        height: 30px;

        display: flex;
        justify-content: center;
        align-items: center;

        text-shadow: 0 1px 0.5px rgba(vars.$color-dark, 0.3);
        text-decoration: none;
        font-size: vars.$font-size-p;

        border: 0 solid transparent;
        border-radius: 9999px;
        background-color: vars.$color-primary;
        color: vars.$color-on-primary;

        float: right;

        &:hover, &:focus {
            border: 0 solid transparent;
            background-color: vars.$color-dark;
            color: vars.$color-on-dark;
            outline: 0 solid transparent
        }
    }

    #emptyCart {
        margin-left: auto;
        margin-right: auto;

        max-width: vars.$sizing-default-width;
        height: 400px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        > h1 {
            display: flex;
            justify-content: center;
            align-items: center;

            font-size: vars.$font-size-very-fucking-big;
            text-align: center;
        }
        > p {
            text-align: center;
        }
    }
</style>
