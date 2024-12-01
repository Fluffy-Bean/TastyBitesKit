<script lang="ts">
    import { SealWarning, CaretDown, ArrowRight } from "phosphor-svelte";

    import type { Booking } from "$lib/types";
    import { TimeSlots, Tables } from "$lib/types";
    import { expandOnTyping } from "$lib/utils";
    import Calendar from "$lib/components/Calendar.svelte";

    const specialRequestsMax = 300;
    const today = new Date();
    const BookingData: Booking = $state({
        date: {
            date: new Date(),
            slot: TimeSlots.slot0,
        },
        table: Tables.table1,
        message: "",
        personal: {
            name: "",
            email: "",
        },
    });

    let nameValid = $derived(BookingData.personal.name.length > 1);
    let emailValid = $derived(BookingData.personal.email.length > 1);
    let telephoneValid = $derived(`${BookingData.personal.phone}`.length == 11);
    let dateValid = $derived(BookingData.date.date > today);
    let specialRequestsValid = $derived(BookingData.message.length <= 300 );

    function formatDate(date: Date) {
        let formattedDate = new Intl.DateTimeFormat(
            'en-UK',
            {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
        ).format(date);

        let day = date.getDate();
        let suffix = 'th';
        if (day % 10 === 1 && day !== 11) {
            suffix = 'st';
        } else if (day % 10 === 2 && day !== 12) {
            suffix = 'nd';
        } else if (day % 10 === 3 && day !== 13) {
            suffix = 'rd';
        }
        return formattedDate.replace(`${day}`, day + suffix);
    }
</script>

<h1>Table booking</h1>

<div id="booking">
    <div id="form">
        <h2>Date and Time</h2>
        <p>When do you wanna come see us?</p>
        <div class="spacer half"></div>
        <div class="form-element">
            <p class="form-label">Booking Date</p>
            <Calendar
                    bind:selectedDate={BookingData.date.date}
                    notBefore={today}
            />
            <span class="form-notice error">
                    {#if !dateValid}
                        Must chose date that's tomorrow or later
                    {/if}
                </span>
        </div>

        <div class="spacer half"></div>

        <!-- ToDo: Don't give a fake error for the weekend slots, just for testing  || !dateValid -->
        {#if BookingData.date.date && (BookingData.date.date.getDay() === 6 || BookingData.date.date.getDay() === 0)}
            <p class="form-message error"><SealWarning weight="fill" />&nbsp;Time slots not available for this date</p>
        {:else}
            <div class="form-element">
                <label class="form-label" for="time-slot">Time Slot</label>
                <div class="select-container">
                    <select
                            bind:value={BookingData.date.slot}
                            class="form-input"
                            id="time-slot"
                            name="time-slot"
                    >
                        <option value={TimeSlots.slot0}>8am to 10am</option>
                        <option value={TimeSlots.slot1}>10am to 12am</option>
                        <option value={TimeSlots.slot2}>12am to 2pm</option>
                        <option value={TimeSlots.slot3}>2pm to 4pm</option>
                        <option value={TimeSlots.slot4}>4pm to 6pm</option>
                        <option value={TimeSlots.slot5}>6pm to 8pm</option>
                        <option value={TimeSlots.slot6}>8pm to 10pm</option>
                    </select>
                    <div class="select-arrow">
                        <CaretDown />
                    </div>
                </div>
            </div>
        {/if}

        <div class="spacer"></div>
        <hr>
        <div class="spacer"></div>

        <h2>Seating</h2>
        <p>Where would you like to be seating?</p>
        <div class="spacer half"></div>
        <div class="seating-image">
            <img src="/assets/SeatingTemporary.png" alt="Birds-eye view of the available seating at the restaurant" />
        </div>
        <div class="spacer half"></div>
        <div class="form-element">
            <label class="form-label" for="table-slot">Seat Choice</label>
            <div class="select-container">
                <select
                        bind:value={BookingData.table}
                        class="form-input"
                        id="table-slot"
                        name="table-slot"
                >
                    <option value={Tables.table1}>Table 1</option>
                    <option value={Tables.table2}>Table 2</option>
                    <option value={Tables.table3}>Table 3</option>
                </select>
                <div class="select-arrow">
                    <CaretDown />
                </div>
            </div>
        </div>

        <div class="spacer"></div>
        <hr>
        <div class="spacer"></div>

        <h2>Special requests</h2>
        <p>Wanna make sure we're accessible to your disabilities? Let us know where what todo!</p>
        <div class="spacer half"></div>
        <div class="form-element">
            <label class="form-label" for="message">Message</label>
            <textarea
                    bind:value={BookingData.message}
                    use:expandOnTyping
                    rows="1"
                    cols="50"
                    id="message"
                    name="message"
                    class="form-input"
            ></textarea>
            <span class="form-notice" class:error={!specialRequestsValid}>
                ({BookingData.message.length}/{specialRequestsMax})
            </span>
        </div>

        <div class="spacer"></div>
        <hr>
        <div class="spacer"></div>

        <h2>Who are you</h2>
        <p>Just so we can keep you updated on your reservation</p>
        <div class="spacer half"></div>
        <div class="form-element">
            <label class="form-label" for="name">Full Name</label>
            <input
                bind:value={BookingData.personal.name}
                type="text"
                id="name"
                name="name"
                class="form-input"
            />
            <span class="form-notice error">
                {#if !nameValid}
                    Enter a name
                {/if}
            </span>
        </div>

        <div class="spacer half"></div>

        <div class="form-element">
            <label class="form-label" for="email">Email</label>
            <input
                    bind:value={BookingData.personal.email}
                    type="text"
                    id="email"
                    name="email"
                    class="form-input"
            />
            <span class="form-notice error">
                {#if !emailValid}
                    Email not valid
                {/if}
            </span>
        </div>

        <div class="spacer half"></div>

        <div class="form-element">
            <label class="form-label" for="telephone">Telephone</label>
            <input
                bind:value={BookingData.personal.phone}
                type="text"
                id="telephone"
                name="telephone"
                class="form-input"
            />
            <span class="form-notice error">
                {#if !telephoneValid}
                    Telephone number not valid
                {/if}
            </span>
        </div>
    </div>
    <div class="spacer"></div>
    <div id="booking-confirmation">
        <div class="container">
            <div class="header">
                <h2>Booking Confirmation</h2>
            </div>
            <hr>
            <div class="section">
                <p>
                    On
                    <span class="h">{BookingData.date.date ? `the ${formatDate(BookingData.date.date)}` : "an undecided date"}</span>
                    at
                    <span class="h">{BookingData.date.slot ? BookingData.date.slot : "an undecided time"}</span>,
                    I want to be seated at
                    <span class="h">{BookingData.table ? BookingData.table : "a table"}</span>.
                    <br><br>
                    I request
                    <span class="h">{BookingData.message ? BookingData.message : "nothing in particular"}</span>.
                    <br><br>
                    My name is
                    <span class="h">{BookingData.personal.name ? BookingData.personal.name : "Unknown"}</span>,
                    in the event I need to be contacted by email, you can do that at
                    <span class="h">{BookingData.personal.email ? BookingData.personal.email : "an empty email"}</span>,
                    or alternatively call me on
                    <span class="h">{BookingData.personal.phone ? BookingData.personal.phone : "an empty phone number"}</span>.
                </p>
            </div>
        </div>
        <div class="spacer half"></div>
        <div class="container">
            <div class="section">
                <p>By pressing "Book Table" you agree to our terms of service</p>
                <div class="spacer half"></div>
                <button id="book-button" form="form">Book&nbsp;Table&nbsp;<ArrowRight /></button>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    @use "$lib/styles/vars";

    #name, #email {
        width: 300px;
        max-width: calc(100vw - calc(2 * vars.$spacing-normal));
    }

    #telephone {
        width: 180px;
        max-width: calc(100vw - calc(2 * vars.$spacing-normal));
    }

    #message {
        min-width: 250px;
        max-width: calc(100vw - calc(2 * vars.$spacing-normal));
        resize: none;
        overflow: hidden;
    }

    .select-container{
        position: relative;

        > select {
            width: 200px;
            appearance: none;
        }

        > .select-arrow {
            height: 100%;

            position: absolute;
            top: 0;
            right: vars.$spacing-small;

            display: flex;
            justify-content: center;
            align-items: center;

            transition: transform 0.1s ease-in-out;
            pointer-events: none;
        }

        &:hover {
            > .select-arrow {
                transform: translateY(2px);
            }
        }
    }

    .container {
        overflow: hidden;
    }

    .seating-image {
        max-width: 550px;
        border-radius: vars.$border-radius-large;
        overflow: hidden;

        > img {
            width: 100%;
            height: auto;
            display: block;
        }
    }

    .h {
        padding: 0 vars.$spacing-xsmall;
        border-radius: vars.$border-radius-normal;
        background-color: vars.$color-dark;
        color: vars.$color-on-dark;
    }

    #book-button {
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

    #booking {
        display: flex;
        flex-direction: row;
        justify-content: normal;
        align-items: flex-start;
    }

    #form {
        width: 100%;
        position: relative;
    }

    #booking-confirmation {
        min-width: 400px - vars.$spacing-normal;
        width: 100%;
        max-width: 400px - vars.$spacing-normal;

        position: sticky;
        top: vars.$sizing-navigation-height + vars.$spacing-normal;
    }

    @media only screen and (max-width: 900px) {
        #booking {
            flex-direction: column;
        }

        #booking-confirmation {
            max-width: unset;
            position: unset;
        }
    }
</style>
