<script lang="ts">    
</script>

<div id="content">
    <img
    height="50vh"
    src="/img/Logo_dunkel.svg"
    class="attachment-full size-full wp-image-27"
    alt="Xildi Logo - More than numbers"
/>
    <div id="page">
        <slot />
    </div>
</div>


<style>
    :global(body, html) {
        background: #222628;
    }
    #content {
        height: 100vh;
    }
    #page {
        height: 100%;
    }
</style>
