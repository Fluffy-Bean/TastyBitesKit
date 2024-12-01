<script lang="ts">
    import {PaperPlaneRight, SealWarning, SealCheck, CaretDown} from "phosphor-svelte";

    import {postContactEmail} from "$lib/test-api";
    import {expandOnTyping} from "$lib/utils";
    import DropDown from "$lib/components/DropDown.svelte";

    const minMessageLength = 150;

    let formMessage: Promise<string>;

    let name = $state("");
    let email = $state("");
    let reason = $state("");
    let message = $state("");

    let nameValid = $state(true);
    let emailValid = $state(true);
    let reasonValid = $state(true);
    let messageValid = $state(false);

    function validateName() {
        nameValid = name.length > 1
    }

    function validateEmail() {
        emailValid = email.length > 1
    }

    function validateReason() {
        reasonValid = reason != ""
    }

    function validateMessage() {
        messageValid = message.length > minMessageLength
    }

    function onSubmit(e: Event) {
        e.preventDefault();
        try {
            formMessage = postContactEmail(name, email, reason, message)
        } catch (error) {
            validateName();
            validateEmail();
            validateReason();
            validateMessage();
        }
    }
</script>

<h1>Contact us</h1>

<h2>Commonly Asked Questions</h2>
<div class="container">
    <DropDown name="Can I refund my order?" open={false}>
        <p>If you ordered online, if we haven't started making your food yet, a refund is possible.</p>
        <p>If you reserved a table, you can refund upto 1 hour before your time.</p>
    </DropDown>
    <hr>
    <DropDown name="Where can I find my past orders!" open={false}>
        <p>Email....</p>
    </DropDown>
    <hr>
    <DropDown name="Deez nuts" open={false}>
        <p>Gottem</p>
    </DropDown>
</div>

<div class="spacer"></div>

<h2>Contact From</h2>
<form onsubmit={onSubmit}>
    <div class="form-element">
        <label class="form-label" for="name">Name</label>
        <input
                bind:value={name}
                onblur={validateName}
                oninput={validateName}
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
                bind:value={email}
                onblur={validateEmail}
                oninput={validateEmail}
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
        <label class="form-label" for="reason">Contact Reason</label>
        <div class="select-container">
            <select
                    bind:value={reason}
                    onblur={validateReason}
                    oninput={validateReason}
                    class="form-input"
                    id="reason"
                    name="reason"
            >
                <option value="general">General Enquiry</option>
                <option value="technical">Technical/Website</option>
                <option value="order">Order</option>
                <option value="booking">Booking</option>
            </select>
            <div class="select-arrow">
                <CaretDown/>
            </div>
        </div>
        <span class="form-notice error">
            {#if !reasonValid}
                You must provide a reason for contact
            {/if}
        </span>
    </div>

    <div class="spacer half"></div>

    <div class="form-element">
        <label class="form-label" for="message">Message</label>
        <textarea
                bind:value={message}
                onblur={validateMessage}
                use:expandOnTyping
                rows="1"
                cols="50"
                id="message"
                name="message"
                class="form-input"
        ></textarea>
        <span class="form-notice" class:error={!messageValid}>
            ({message.length}/{minMessageLength})
        </span>
    </div>

    <div class="spacer half"></div>

    {#await formMessage then formMessage}
        {#if formMessage}
            <p class="form-message success">
                <SealCheck weight="fill"/>&nbsp;{formMessage}</p>
            <div class="spacer half"></div>
        {/if}
    {:catch error}
        <p class="form-message error">
            <SealWarning weight="fill"/>&nbsp;{error.message}</p>
        <div class="spacer half"></div>
    {/await}

    <button type="submit">Submit&nbsp;&nbsp;<PaperPlaneRight weight="fill"/></button>
</form>

<style lang="scss">
    @use "$lib/styles/vars";

    #name, #email {
        width: 300px;
        max-width: calc(100vw - (vars.$spacing-normal*2));

    }

    #message {
        min-width: 250px;
        max-width: calc(100vw - (vars.$spacing-normal*2));
        resize: none;
        overflow: hidden;
    }

    .select-container {
        width: max-content;
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

    button {
        padding: 0 vars.$spacing-normal;

        height: 30px;

        display: flex;
        justify-content: center;
        align-items: center;

        text-shadow: 0 1px 0.5px rgba(vars.$color-dark, 0.3);

        border: 0 solid transparent;
        border-radius: 9999px;
        background-color: vars.$color-dark;
        color: vars.$color-on-dark;

        &:hover, &:focus {
            border: 0 solid transparent;
            background-color: vars.$color-primary;
            color: vars.$color-on-primary;
            outline: 0 solid transparent
        }
    }
</style>
