import Vue from 'vue'
import App from './App'

require('./assets/js/common')
require('normalize.css')
require('./assets/css/common.css')

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App)
})
