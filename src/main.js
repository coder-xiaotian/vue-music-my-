// babel补丁，解决为了转义es6的一些原生库，比如：promise
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 解决移动端点击300毫米延迟问题
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import 'common/stylus/index.styl'

// 解决移动端点击300毫米延迟问题
fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
    // require是webpack默认支持的语法
    loading: require('common/image/default.png')
})

new Vue({
    el: '#app',
    render: h => h(App),
    store,
    router
})
