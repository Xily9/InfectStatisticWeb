import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
let routeList = [{
    path: '/',
    name: 'Index',
    component: resolve => require(['@/views/index.vue'], resolve)
}, {
    path: '/detail/:province',
    name: 'Detail',
    component: resolve => require(['@/views/detail.vue'], resolve)
}]
let router = new Router({
    routes: routeList
})
export default router