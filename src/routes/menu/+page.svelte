<script lang="ts">
    import { getMenuItems } from "$lib/test-api";
    import LoadingBar from "$lib/components/LoadingBar.svelte";
    import MenuList from "$lib/components/MenuItemGrid.svelte";
    import DropDown from "$lib/components/DropDown.svelte";

    let items = getMenuItems();

    function reloadMenu() {
        items = getMenuItems();
    }
</script>

<div class="menu">
    <div class="container" id="filter">
        <div class="header">
            <h2>Filters</h2>
        </div>
        <hr>
        <DropDown name="Meal Prefrences">
            <ul>
                <li>
                    <label><input type="checkbox">Vegan</label>
                </li>
                <li>
                    <label><input type="checkbox">Vegetarian</label>
                </li>
                <li>
                    <label><input type="checkbox">Pescatarian</label>
                </li>
            </ul>
        </DropDown>
        <hr>
        <DropDown name="Allergies">
            <ul>
                <li>
                    <label><input type="checkbox">Deez Nut</label>
                </li>
                <li>
                    <label><input type="checkbox">Sea</label>
                </li>
                <li>
                    <label><input type="checkbox">Dairy</label>
                </li>
                <li>
                    <label><input type="checkbox">Gluten</label>
                </li>
            </ul>
        </DropDown>
        <hr>
        <DropDown name="Meal Types">
            <ul>
                <li>
                    <label><input type="checkbox">Breakfast</label>
                </li>
                <li>
                    <label><input type="checkbox">Main</label>
                </li>
                <li>
                    <label><input type="checkbox">Dinner</label>
                </li>
                <li>
                    <label><input type="checkbox">Alcoholic Drinks</label>
                </li>
                <li>
                    <label><input type="checkbox">Non-Alcoholic Drinks</label>
                </li>
                <li>
                    <label><input type="checkbox">Sides</label>
                </li>
                <li>
                    <label><input type="checkbox">Sweet</label>
                </li>
            </ul>
        </DropDown>
        <hr>
        <DropDown name="Other">
            <ul>
                <li>
                    <label><input type="checkbox">Hide Seasonal</label>
                </li>
                <li>
                    <label><input type="checkbox">Hide Unavailable</label>
                </li>
            </ul>
        </DropDown>
    </div>

    <div id="menu-list">
        {#await items}
            <LoadingBar />
        {:then items}
            {#each items as section, i}
                <h2>{section.name}</h2>
                {#if section.items.length > 0}
                    <MenuList items={section.items} />
                {:else}
                    <p>No results</p>
                {/if}
                {#if i !== items.length -1}
                    <div class="spacer"></div>
                {/if}
            {/each}
        {:catch error}
            <p>{error}</p>
        {/await}
    </div>
</div>

<style lang="scss">
    @use "$lib/styles/vars";

    .menu {
        display: flex;
        flex-direction: row;
        justify-content: normal;
        align-items: flex-start;
    }

    #menu-list {
        margin-left: vars.$spacing-normal;
        width: 100%;
        position: relative;

        > h2, p {
            text-align: right;
        }
    }

    #filter {
        min-width: 300px - vars.$spacing-normal;
        width: 100%;
        max-width: 300px - vars.$spacing-normal;
        position: sticky;
        top: vars.$sizing-navigation-height + vars.$spacing-normal;

        button {
            height: 32px;
            width: 32px;

            display: flex;
            justify-content: center;
            align-items: center;

            text-decoration: none;
            font-size: vars.$font-size-p;

            border-radius: vars.$border-radius-circle;
            border: 0 solid transparent;
            background-color: vars.$color-dark;
            color: vars.$color-on-dark;

            &:hover {
                background-color: vars.$color-primary;
                color: vars.$color-on-primary;
            }
        }
    }

    @media only screen and (max-width: 900px) {
        #filter {
            min-width: 250px - vars.$spacing-normal;
            max-width: 250px - vars.$spacing-normal;
        }
    }

    @media only screen and (max-width: 700px) {
        .menu {
            flex-direction: column;
        }

        #filter {
            max-width: unset;
            position: unset;
        }

        #menu-list {
            margin-left: 0;
            margin-top: vars.$spacing-normal;

            > h2, p {
                text-align: left;
            }
        }
    }
</style>
