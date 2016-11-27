<template>
    <div class="loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
    export default {
    }
</script>

<style scoped>
    .loading {
        text-align: center;
        padding: .5rem;
    }
    @keyframes line-scale {
        0% {
            transform: scaley(1);
        }
        50% {
            transform: scaley(0.4);
        }
        100% {
            transform: scaley(1);
        }
    }

    .loading > div:nth-child(1) {
        animation: line-scale 1s 0.1s infinite cubic-bezier(.2, .68, .18, 1.08);
    }
    .loading > div:nth-child(2) {
        animation: line-scale 1s 0.2s infinite cubic-bezier(.2, .68, .18, 1.08);
    }
    .loading > div:nth-child(3) {
        animation: line-scale 1s 0.3s infinite cubic-bezier(.2, .68, .18, 1.08);
    }
    .loading > div:nth-child(4) {
        animation: line-scale 1s 0.4s infinite cubic-bezier(.2, .68, .18, 1.08);
    }
    .loading > div:nth-child(5) {
        animation: line-scale 1s 0.5s infinite cubic-bezier(.2, .68, .18, 1.08);
    }
    .loading > div {
        background-color: #999;
        width: 4px;
        height: 35px;
        border-radius: 2px;
        margin: 2px;
        animation-fill-mode: both;
        display: inline-block;
    }
</style>