import Vue from 'vue'
import Router from 'vue-router'
const index = () => import ('@/components/index')
const login = () => import ('@/components/login')																																										////


Vue.use(Router)

export default new Router({
  routes: [ 
    {
      path: '/',
      name: 'index',
      component: index,
			meta:{
				keepAlive:false,
			}
    },
		{
		  path: '/login',
		  name: 'login',
		  component: login,
			meta:{
				keepAlive:false,
			}
		}
  ]
})
