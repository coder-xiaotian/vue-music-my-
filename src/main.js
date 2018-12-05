// babel补丁，解决为了转义es6的一些原生库，比如：promise
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// 解决移动端点击300毫米延迟问题
import fastclick from 'fastclick'

import 'common/stylus/index.styl'

// 解决移动端点击300毫米延迟问题
fastclick.attach(document.body)

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
