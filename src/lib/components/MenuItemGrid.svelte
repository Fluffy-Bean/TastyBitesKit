<script lang="ts">
    import { type Item } from "$lib/types";
    import MenuItem from "./MenuItem.svelte";

    interface Props {
        items: Item[];
    }

    let { items }: Props = $props();
</script>

<ul>
    {#each items as item}
        <li>
            <MenuItem item={item} />
        </li>
    {/each}
</ul>

<style lang="scss">
    @use "$lib/styles/vars";

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: vars.$spacing-small;

        > li {
            margin: 0;
        }
    }

    @media only screen and (max-width: 900px) {
        ul {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
</style>
