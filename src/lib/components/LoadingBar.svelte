<script lang="ts">
    interface Props {
        bottom?: boolean;
    }

    let { bottom = false }: Props = $props();
</script>

<div class="loader" class:bottom={bottom}>
    <div class="bar bar-1"></div>
    <div class="bar bar-2"></div>
</div>
