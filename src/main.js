// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'
import ElementUI from 'element-ui';
import VueScroller from 'vue-scroller'
import upperFirst from 'lodash.upperfirst'
import camelCase from 'camelcase'
import 'element-ui/lib/theme-chalk/index.css';
import { Button, Select } from 'element-ui';
Vue.component(Button.name, Button);

import $ from 'jquery'


import axios from "axios"


import { Swipe, SwipeItem } from 'vant';
	Vue.use(Swipe).use(SwipeItem);

Vue.prototype.$axios = axios;
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(VueScroller)

Vue.config.productionTip = false;

Vue.prototype.backBefore = () => {
	window.history.back(-1);
}

const requireComponent = require.context(
  './components/sub/',
  false,
  /.(vue|js)$/
)
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `'./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

