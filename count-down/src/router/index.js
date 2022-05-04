import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import countdown from '@/components/countdown'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'countdown',
      component: countdown
    }
  ]
})
