<script lang="ts">
    import type { Snippet } from 'svelte';
    import { slide } from "svelte/transition";
    import { CaretDown } from "phosphor-svelte";

    interface Props {
        open?: boolean;
        name: string;
        children: Snippet;
    }

    let { open = false, name, children }: Props = $props();
</script>

<div class="dropdown" class:open={open}>
    <button class="dropdown-header" onclick={() => {open = !open}}>
        <span class="dropdown-text">{name}</span>
        <span class="dropdown-button"><CaretDown /></span>
    </button>
    {#if open}
        <div class="dropdown-content" transition:slide={{ axis: "y", duration: 250 }}>
            <div>
                {@render children()}
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
    @use "$lib/styles/vars";

    .dropdown {
        border-bottom: 1px solid transparent;

        color: vars.$color-on-light;

        .dropdown-header {
            padding: vars.$spacing-normal;

            width: 100%;

            position: relative;

            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            border: 0 solid transparent;
            background-color: transparent;

            .dropdown-text {
                font-size: vars.$font-size-h6;
                font-weight: vars.$font-weight-bold;
            }

            .dropdown-button {
                padding: 0;

                height: 100%;
                width: 60px;

                position: absolute;
                top: 0;
                right: 0;

                display: flex;
                justify-content: center;
                align-items: center;

                text-decoration: none;
                font-size: vars.$font-size-p;

                border: 0 solid transparent;
                background-color: transparent;
                color: vars.$color-on-light;

                transition: transform 0.1s ease-in-out;
            }

            &:hover, &:focus-visible {
                .dropdown-button {
                    color: vars.$color-primary;
                    outline: 0 solid transparent;
                    transform: rotate(-15deg);
                }
            }
        }

        .dropdown-content {
            padding: 0 vars.$spacing-normal vars.$spacing-normal;
        }

        &.open {
            .dropdown-header {
                .dropdown-button {
                    transform: rotate(-180deg);
                }

                &:hover, &:focus-visible {
                    .dropdown-button {
                        transform: rotate(calc(-180deg + 15deg));
                    }
                }
            }
        }
    }

</style>
