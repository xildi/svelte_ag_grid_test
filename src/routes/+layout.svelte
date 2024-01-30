<script lang="ts">    
</script>

<div id="content">
   
    <div id="page">
        <slot />
    </div>
</div>


<style>
    :global(body, html) {
        background: #222628;
    }
    #content {
        height: 98vh;
    }
    #page {
        height: 100%;
    }
</style>
