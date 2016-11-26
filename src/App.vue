<template>
  <div id="app">
    <top-header></top-header>
    <main-content></main-content>
  </div>
</template>

<script>
import TopHeader from './components/common/TopHeader'
import MainContent from './view/MainContent'

export default {
    name: 'app',
    components: {
        TopHeader,
        MainContent
    }
}
</script>

<style>
</style>
