<script lang="ts">
    import ImageWithText from "$lib/components/ImageWithText.svelte";
</script>

<h1>Our story</h1>

<ImageWithText image="/item_images/wathog.jpg">
    <div class="padding">
        <h2>How it all started</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At deserunt est quos dicta ipsa! Soluta laudantium dolore temporibus nisi aspernatur expedita vel, unde natus a nulla rerum officiis optio neque.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At deserunt est quos dicta ipsa! Soluta laudantium dolore temporibus nisi aspernatur expedita vel, unde natus a nulla rerum officiis optio neque.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At deserunt est quos dicta ipsa! Soluta laudantium dolore temporibus nisi aspernatur expedita vel, unde natus a nulla rerum officiis optio neque.</p>
    </div>
</ImageWithText>

<div class="spacer"></div>

<ImageWithText image="/beetle.jpg" toRight={true}>
    <div class="padding">
        <h2>Our Chef</h2>
        <p>He sucks at his job</p>
    </div>
</ImageWithText>


<style lang="scss">
    @use "$lib/styles/vars";

    .padding {
        padding: vars.$spacing-normal;
    }
</style>
