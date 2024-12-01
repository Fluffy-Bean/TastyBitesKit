<script lang="ts">
    import { Labels } from "$lib/types";

    import {
        Acorn,
        Fish,
        GrainsSlash,
        Leaf,
        Minus,
        Pepper,
        Plus,
        ShoppingCart,
        SealWarning,
        ArrowLeft,
    } from "phosphor-svelte";
    import { marked } from "marked";

    import Cart from "$lib/cart.svelte";
    import MenuItemGrid from "$lib/components/MenuItemGrid.svelte";


    let { data } = $props();
    let selectedImage = $state(0);
    let basketAmount = $state(1);


    function reduceBasket() {
        if (basketAmount < 1) return;
        basketAmount -= 1;
    }

    function increaseBasket() {
        if (basketAmount > 99) return;
        basketAmount += 1;
    }

    function addToCart() {
        Cart.addToCart(data.menuItem.uuid, basketAmount);
    }
</script>

{#if !data.menuItem.availability}
    <div class="notice error">
        <SealWarning weight="fill" />&nbsp;&nbsp;<span>Item is no-longer for sale</span>
    </div>
{/if}

<a href="/menu" id="back-button"><ArrowLeft />&nbsp;Back</a>

<div class="spacer half"></div>

<div class="main">
    <div id="images">
        <div class="img-main loaded">
            {#if data.menuItem.images && data.menuItem.images[selectedImage]}
                <img src="{data.menuItem.images[selectedImage]}" alt="Item">
            {:else}
                <img src="/assets/MenuItemLoading.svg" alt="Item">
            {/if}
        </div>
        <ul class="img-alts">
            {#if data.menuItem.images && data.menuItem.images.length > 1}
                {#each data.menuItem.images as image, i}
                    <li class:selected={selectedImage === i}>
                        <button onclick={() => { selectedImage = i }}>
                            <img src={image} alt="">
                        </button>
                    </li>
                {/each}
            {/if}
        </ul>
    </div>

    <div class="spacer half"></div>

    <div id="info">
        <h2>{data.menuItem.name}</h2>
        <p>£{data.menuItem.price.toFixed(2)}</p>

        <div class="spacer"></div>

        <div class="container">
            <div id="description">
                {#if data.menuItem.description}
                    {@html marked(data.menuItem.description || "")}
                {:else}
                    <p>Item is missing information</p>
                {/if}
            </div>
            <hr>
            <div id="small-text">
                <p>If you require any specific informtaion on a meal, <a href="/contact">please contact us</a>.</p>
            </div>
        </div>

        <div class="spacer half"></div>

        <ul id="allergy-labels">
            {#each data.menuItem.labels || [] as label}
                {#if label === Labels.vegan}
                    <li class="vegan"><Leaf weight="fill" />&nbsp;&nbsp;Vegan</li>
                {:else if label === Labels.fish}
                    <li class="fish"><Fish weight="fill" />&nbsp;&nbsp;Sea</li>
                {:else if label === Labels.nut}
                    <li class="nut"><Acorn weight="fill" />&nbsp;&nbsp;Nut</li>
                {:else if label === Labels.gluten}
                    <li class="gluten"><GrainsSlash weight="fill" />&nbsp;&nbsp;Gluten Free</li>
                {:else if label === Labels.spicy}
                    <li class="spicy"><Pepper weight="fill" />&nbsp;&nbsp;Spicy</li>
                {/if}
            {/each}
        </ul>

        <div class="spacer"></div>

        <div id="basket-controls">
            <button class="button" class:disabled={basketAmount <= 1} onclick={reduceBasket}><Minus /></button>
            <p>{basketAmount}</p>
            <button class="button" class:disabled={basketAmount >= 99} onclick={increaseBasket}><Plus /></button>
            <div class="spacer half"></div>
            <button class="button add" onclick={addToCart} id="add-to-cart">Add&nbsp;to&nbsp;Cart&nbsp;&nbsp;<ShoppingCart weight="fill" /></button>
        </div>
    </div>
</div>

<div class="spacer"></div>

<div class="other">
    <h2>Popular</h2>
    <div id="popular">
        <MenuItemGrid items={data.popularToday} />
    </div>
</div>

<style lang="scss">
    @use "$lib/styles/vars";

    .notice {
        margin-right: auto;
        margin-bottom: vars.$spacing-large;
        margin-left: auto;

        max-width: vars.$sizing-default-width;
        height: 45px;

        position: sticky;
        top: vars.$spacing-small + vars.$sizing-navigation-height;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: vars.$font-size-h6;

        border-radius: vars.$border-radius-normal;
        background: vars.$color-dark;
        color: vars.$color-on-dark;

        box-shadow: 0 1px 0.5px rgba(#000, 0.3);

        &.error {
            background: vars.$color-error;
            color: vars.$color-on-error;
        }
    }

    #back-button {
        margin-top: 8px;
        padding: 0 vars.$spacing-small;

        width: max-content;
        height: 30px;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        font-size: vars.$font-size-p;
        text-decoration: none;

        border-radius: 9999px;
        background-color: transparent;
        color: vars.$color-on-background;

        &:hover {
            background-color: vars.$color-light;
            color: vars.$color-on-light;
        }
    }

    .main {
        display: flex;
        flex-direction: row;
    }

    #images {
        display: flex;
        flex-direction: column;

        .img-main {
            margin-bottom: vars.$spacing-small;

            width: 600px;
            height: 450px;

            display: flex;
            justify-content: center;
            align-items: center;

            overflow: hidden;

            &.loaded {
                border-radius: vars.$border-radius-large;
                border: 1px solid rgba(vars.$color-dark, 0.15);
                background-color: rgba(vars.$color-dark, 0.1);
            }

            > .loading-box.image {
                width: 100%;
                height: 100%;
            }

            > img {
                max-width: 100%;
                max-height: 100%;
            }
        }

        .img-alts {
            margin: 0;
            padding: 0;

            display: flex;
            flex-direction: row;

            > li {
                list-style: none;

                > .loading-box.image-small {
                    margin-right: vars.$spacing-small;
                    width: 100px;
                    height: 100px;
                }

                > button {
                    margin-right: vars.$spacing-small;
                    padding: 0;

                    width: 100px;
                    height: 100px;

                    border-radius: vars.$border-radius-normal;
                    border: 1px solid transparent;
                    background: transparent;

                    overflow: hidden;

                    > img {
                        width: 100%;
                        height: 100%;
                        display: block;
                        object-fit: cover;
                    }

                    &:hover, &:focus-visible {
                        border: 1px solid vars.$color-dark;
                    }
                }

                &.selected > button {
                    border: 1px solid vars.$color-primary !important;
                }
            }
        }
    }

    #info {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: flex-end;

        > h2 {
            padding-bottom: vars.$spacing-xsmall;
            font-size: vars.$font-size-h1;
        }
        > p {
            padding: 0;
            font-size: vars.$font-size-h2;
        }

        .container {
            width: 100%;

            #description {
                padding: vars.$spacing-normal;
            }

            #small-text {
                padding: vars.$spacing-small vars.$spacing-normal;

                p {
                    font-size: vars.$font-size-xsmall;
                }
            }
        }
    }

    #basket-controls {
        display: flex;
        flex-direction: row;

        > .button {
            min-width: 35px;
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

            &.add {
                padding: 0 vars.$spacing-normal;

                border: 0 solid transparent;
                border-radius: vars.$border-radius-circle;
                background-color: vars.$color-dark;
                color: vars.$color-on-dark;

                &:hover,
                &:focus-visible {
                    background-color: vars.$color-primary;
                    color: vars.$color-on-primary;
                }
            }

            &.disabled {
                border: 1px solid rgba(vars.$color-dark, 0.1);
                color: rgba(vars.$color-on-light, 0.6) !important;

                &:hover,
                &:focus-visible {
                    border: 1px solid rgba(vars.$color-dark, 0.1);
                    background-color: vars.$color-light;
                    color: rgba(vars.$color-on-light, 0.6);
                }

                &.add {
                    background-color: vars.$color-dark !important;
                    color: rgba(vars.$color-on-dark, 0.6) !important;
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
    }

    .other {
        margin-left: auto;
        margin-right: auto;
        max-width: vars.$sizing-default-width;
    }

    #popular {
        position: relative;
    }

    #error {
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

    #allergy-labels {
        padding: 0;

        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        flex-wrap: wrap;

        > li {
            margin: 0 0 0 vars.$spacing-xsmall;
            padding: 0 vars.$spacing-small;

            min-width: 30px;
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

    .loading-box {
        &.title {
            margin-bottom: vars.$spacing-small;
            height: vars.$font-size-h1 + 10px;
            width: 150px;
        }
        &.price {
            margin-bottom: vars.$spacing-normal;
            height: vars.$font-size-h2 + 10px;
            width: 60px;
        }
        &.description {
            height: 300px;
            width: 100%;
        }
    }
</style>