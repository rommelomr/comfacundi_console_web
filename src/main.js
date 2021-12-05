import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Visibility from './plugins/Visibility';
import Helper from './utils/Helper.js';

axios.defaults.baseURL = "http://192.168.56.56/api";
//axios.defaults.baseURL = "https://comfacunditest.frb.io/api";
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'

Vue.config.productionTip = false
Vue.use(Visibility);
Vue.use(VueAxios,axios);

Helper.addNewPropertiesToVueInstance(Vue);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
