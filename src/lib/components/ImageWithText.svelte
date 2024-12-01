<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Props {
        image: string;
        toRight?: boolean;
        children?: Snippet;
    }

    let { image, toRight = false, children }: Props = $props();
</script>

<div class="image-with-text" class:toRight={toRight}>
    <img src={image} alt="With Text">

    <div class="container">
        {@render children?.()}
    </div>
</div>

<style lang="scss">
    @use "$lib/styles/vars";

    .image-with-text {
        display: flex;
        flex-direction: row;
        align-items: center;

        > img {
            margin-right: vars.$spacing-normal;

            max-width: 500px;
            max-height: 350px;

            border-radius: vars.$border-radius-large;

            box-shadow: 0 1px 0.5px rgba(#000, 0.3);
        }

        > .container {
            width: 100%;
        }

        &.toRight {
            flex-direction: row-reverse;

            > img {
                margin-right: 0;
                margin-left: vars.$spacing-normal;
            }
        }
    }
</style>