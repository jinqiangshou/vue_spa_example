<template>
    <header>Vue SPA Example</header>
</template>

<script>
    export default {
        name: 'top-header'
    }
</script>

<style scoped>
    header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        display: block;
        height: 2rem;
        line-height: 2rem;
        color: #FFF;
        background-color: #666;
        text-align: center;
        z-index: 1;
    }
</style>
