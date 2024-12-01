<script lang="ts">
    import type { Checkout } from '$lib/types';
    import type { Map } from "leaflet";

    import { onDestroy, onMount } from "svelte";
    import { ArrowLeft, SealWarning, ArrowRight } from "phosphor-svelte";

    import { expandOnTyping } from "$lib/utils";
    import Cart from "$lib/cart.svelte";


    let leafletMap: Map;
    let checkoutData: Checkout = $state({
        personal: {
            name: "",
            email: "",
        },
        delivery: true,
        message: "",
        address: {
            line1: "",
            line2: "",
            town: "",
            postcode: "",
        },
    });


    let nameValid = $derived(checkoutData.personal.name.length > 1);
    let emailValid = $derived(checkoutData.personal.email.length > 1);
    let phoneValid = $derived(isNaN(checkoutData.personal.phone || NaN));
    let messageValid = $derived(checkoutData.message.length <= 200);

    let items = $derived(Cart.getEntries());
    let totalPrice = $derived((checkoutData.delivery ? 3.00 : 0) + 1.50 + Cart.getTotalPrice());
    let unavailableItems = $derived(Cart.getEntries().some(([_, item]) => { item.data.availability === false }));


    $effect(() => {
        if (!checkoutData.delivery) {
            // Rendering maybe off-centered since map was initialized when div was hidden
            setTimeout(() => {
                leafletMap.invalidateSize();
                leafletMap.panTo([50.82304922105467, -0.432780150496344]);
            }, 305); // 305 as short as delay can be... in testing
        }
    })


    onMount(async () => {
        const L = await import('leaflet');

        leafletMap = L.map("map").setView([50.82304922105467, -0.432780150496344], 13);
        L.tileLayer(
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                maxZoom: 20,
                attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
            },
        ).addTo(leafletMap);
        L.marker([50.82304922105467, -0.432780150496344]).addTo(leafletMap);
    });
    onDestroy(async () => {
        if(leafletMap) {
            console.log('Unloading Leaflet map.');
            leafletMap.remove();
        }
    });


    function onSubmit(event: Event) {
        event.preventDefault();
        alert(JSON.stringify(checkoutData));
    }
</script>

<a href="/cart" id="cancel-button"><ArrowLeft />&nbsp;Cancel</a>
<div class="spacer half"></div>
<div class="checkout">
    <div id="form-container">
        <h1>Checkout</h1>
        <form onsubmit={onSubmit} id="form">
            <h2>Contact Information</h2>
            <p>This is for updates on your order</p>
            <div class="spacer half"></div>
            <div class="form-element">
                <label class="form-label" for="name">Name</label>
                <input
                        bind:value={checkoutData.personal.name}
                        type="text"
                        id="name"
                        class="form-input"
                />
                <span class="form-notice error">
                    {#if !nameValid}Enter a name{/if}
                </span>
            </div>
            <div class="spacer half"></div>
            <div class="form-element">
                <label class="form-label" for="email">Email</label>
                <input
                        bind:value={checkoutData.personal.email}
                        type="text"
                        id="email"
                        class="form-input"
                />
                <span class="form-notice error">
                    {#if !emailValid}Email not valid{/if}
                </span>
            </div>
            <div class="spacer half"></div>
            <div class="form-element">
                <label class="form-label" for="phone">Phone Number</label>
                <input
                        bind:value={checkoutData.personal.phone}
                        type="number"
                        id="phone"
                        class="form-input"
                />
                <span class="form-notice error">
                    {#if !phoneValid}Phone Number not valid{/if}
                </span>
            </div>

            <div class="spacer"></div>
            <hr>
            <div class="spacer"></div>

            <h2>Special Requests</h2>
            <p>Have a noisy dog, and don't want us to knock? Let us know here!</p>
            <div class="spacer half"></div>
            <div class="form-element">
                <label class="form-label" for="message">Message</label>
                <textarea
                        bind:value={checkoutData.message}
                        use:expandOnTyping
                        rows="1"
                        id="message"
                        name="message"
                        class="form-input"
                ></textarea>
                <span class="form-notice" class:error={!messageValid}>
                    ({checkoutData.message.length}/{200})
                </span>
            </div>

            <div class="spacer"></div>
            <hr>
            <div class="spacer"></div>

            <h2>Delivery or Pick Up</h2>
            <p>Where would you want your food to be delivered?</p>

            <div class="spacer half"></div>

            <ul id="delivery-option">
                <li class:checked={checkoutData.delivery}>
                    <button onclick={() => { checkoutData.delivery = true }} type="button">Delivery</button>
                </li>
                <li class:checked={!checkoutData.delivery}>
                    <button onclick={() => { checkoutData.delivery = false }} type="button">Pick Up</button>
                </li>
            </ul>

            <div class="spacer half"></div>

            {#if checkoutData.delivery}
                <div class="form-element">
                    <label class="form-label" for="line1">Address Line 1</label>
                    <input
                        bind:value={checkoutData.address.line1}
                        type="text"
                        id="line1"
                        class="form-input"
                    />
                    <span class="form-notice error">Line 1 required</span>
                </div>
                <div class="spacer half"></div>
                <div class="form-element">
                    <label class="form-label" for="line2">Address Line 2</label>
                    <input
                        bind:value={checkoutData.address.line2}
                        type="text"
                        id="line2"
                        class="form-input"
                    />
                    <span class="form-notice error"></span>
                </div>
                <div class="spacer half"></div>
                <div class="form-element">
                    <label class="form-label" for="town">Town</label>
                    <input
                        bind:value={checkoutData.address.town}
                        type="text"
                        id="town"
                        class="form-input"
                    />
                    <span class="form-notice error">Town name required</span>
                </div>
                <div class="spacer half"></div>
                <div class="form-element">
                    <label class="form-label" for="postcode">Postcode</label>
                    <input
                        bind:value={checkoutData.address.postcode}
                        type="text"
                        id="postcode"
                        class="form-input"
                    />
                    <span class="form-notice error">Postcode required</span>
                </div>
            {:else}
                <p>You'll receive an email and text reminding you of your order, once it's ready to be picked up!</p>
                <div class="spacer half"></div>
            {/if}
            <!-- As leaflet needs the map element to exist while its loading, we must render it always -->
            <div id="map" class:show-map={!checkoutData.delivery}></div>

            <div class="spacer"></div>
            <hr>
            <div class="spacer"></div>

            <h2>Payment</h2>
            <p>Currently, we only do payment in person, as our online payment system isn't setup yet.</p>
        </form>
    </div>
    <div class="spacer"></div>
    <div id="cart">
        <div class="container">
            {#if unavailableItems}
                <div class="unavailable-items-banner">
                    <SealWarning weight="fill" />&nbsp;&nbsp;<span>Order contains unavailable items</span>
                </div>
            {/if}
            <div class="header">
                <h2>Total: £{totalPrice.toFixed(2)}</h2>
            </div>
            <div class="table">
                <table>
                    <thead>
                        <tr><th>Price (each)</th><th>Item Name</th><th>#</th></tr>
                    </thead>
                    <tbody>
                        {#each items as [_, item]}
                            <tr class:table-row-error={!item.data.availability}>
                                <td>£{(item.data.price * item.amount).toFixed(2)} (£{item.data.price.toFixed(2)})</td>
                                <td>{item.data.name}</td>
                                <td>{item.amount}</td>
                            </tr>
                        {/each}
                        <tr class="table-row-border">
                            <td>£{1.50.toFixed(2)}</td>
                            <td colspan="2">Online order Fee</td>
                        </tr>
                        {#if checkoutData.delivery}
                            <tr>
                                <td>£{3.00.toFixed(2)}</td>
                                <td colspan="2">Delivery fee</td>
                            </tr>
                        {/if}
                    </tbody>
                </table>
            </div>
            <div class="section">
                <p>To make any changes, <a href="/cart">return to the cart</a>.</p>
            </div>
        </div>
        <div class="spacer half"></div>
        <div class="container">
            <div class="section">
                <p>By pressing "Checkout" you agree to our terms of service</p>
                <div class="spacer half"></div>
                <button id="checkout-button" form="form">Checkout&nbsp;<ArrowRight /></button>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    @use "$lib/styles/vars";

    #name { width: 300px; }
    #email { width: 300px; }
    #line1, #line2 { width: 400px; }
    #town { width: 250px; }
    #postcode { width: 200px; }
    #message {
        width: 400px;
        max-width: calc( 100vw - calc(2 * vars.$spacing-normal));
        resize: none;
        overflow: hidden;
    }

    #cancel-button {
        padding: 0 vars.$spacing-small;

        width: max-content;
        height: 30px;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        font-size: vars.$font-size-p;
        text-decoration: none;

        border-radius: vars.$border-radius-circle;
        background-color: transparent;
        color: vars.$color-on-background;

        &:hover {
            background-color: vars.$color-error;
            color: vars.$color-on-error;
        }
    }

    #delivery-option {
        padding: 0;

        width: max-content;

        display: flex;
        flex-direction: row;

        > li {
            list-style: none;

            border-radius: 0;
            border: 1px solid rgba(vars.$color-dark, 0.1);
            background-color: vars.$color-light;
            color: vars.$color-on-light;

            overflow: hidden;

            button {
                padding: 0 vars.$spacing-large;

                width: 100%;
                height: 35px;

                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                align-items: center;

                font-size: vars.$font-size-p;
                text-decoration: none;

                border: 0 solid transparent;
                background-color: transparent;
                color: inherit;
            }

            &.checked {
                background-color: vars.$color-dark;
                color: vars.$color-on-dark;
            }

            &:first-of-type {
                border-top-left-radius: vars.$border-radius-normal;
                border-bottom-left-radius: vars.$border-radius-normal;
            }
            &:last-of-type {
                border-top-right-radius: vars.$border-radius-normal;
                border-bottom-right-radius: vars.$border-radius-normal;
            }
            &:hover {
                background-color: vars.$color-primary;
                color: vars.$color-on-primary;
            }
        }
    }

    #map {
        width: 100%;
        max-width: 550px;
        //height: 400px;
        height: 0;

        display: none;

        border-radius: vars.$border-radius-normal;
        box-shadow: 0 1px 0.5px rgba(#000, 0.3);

        &.show-map {
            display: block;
            animation: growMap forwards 0.3s;
        }
    }

    @keyframes growMap {
        0% {
            height: 0;
        }
        100% {
            height: 400px;
        }
    }

    #checkout-button {
        padding: 0 vars.$spacing-normal;

        width: 100%;
        height: 35px;

        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;

        font-size: vars.$font-size-p;
        text-decoration: none;

        border-radius: vars.$border-radius-large;
        border: 0 solid transparent;
        background-color: vars.$color-primary;
        color: vars.$color-on-primary;

        &:hover {
            background-color: vars.$color-dark;
            color: vars.$color-on-dark;
        }
    }

    .unavailable-items-banner {
        height: 30px;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: vars.$font-size-p;

        background: vars.$color-error;
        color: vars.$color-on-error;

        box-shadow: 0 1px 0.5px rgba(#000, 0.2);
    }

    .table {
        margin: 0 vars.$spacing-normal;
        border-radius: vars.$border-radius-normal;
        border: 1px solid rgba(vars.$color-dark, 0.2);
        background-color: vars.$color-light;

        overflow: hidden;

        table {
            width: 100%;
            border-collapse: collapse;

            tr {
                border-bottom: 1px solid rgba(vars.$color-dark, 0.2);

                &:last-of-type {
                    border: 0 solid transparent;
                }

                &.table-row-error {
                    background-color: vars.$color-error;
                    color: vars.$color-on-error;
                }

                &.table-row-border {
                    border-top: 2px solid rgba(vars.$color-dark, 0.2);
                }

                th, td {
                    padding: vars.$spacing-xsmall vars.$spacing-small;
                    font-size: vars.$font-size-small;
                    border-right: 1px solid rgba(vars.$color-dark, 0.2);

                    &:last-of-type {
                        border: 0 solid transparent;
                    }
                }

                th {
                    font-weight: vars.$font-weight-bolder;
                }
                td {
                    font-weight: vars.$font-weight-normal;
                }
            }
        }
    }

    .checkout {
        display: flex;
        flex-direction: row;
        justify-content: normal;
        align-items: flex-start;
    }

    .container {
        overflow: hidden;
    }

    #form-container {
        width: 100%;
        position: relative;
    }

    #cart {
        min-width: 400px - vars.$spacing-normal;
        width: 100%;
        max-width: 400px - vars.$spacing-normal;

        position: sticky;
        top: vars.$sizing-navigation-height + vars.$spacing-normal;
    }

    @media only screen and (max-width: 900px) {
        .checkout {
            flex-direction: column;
        }

        #cart {
            max-width: unset;
            position: unset;
        }

        #map {
            max-width: 100%;
        }
    }
</style>
