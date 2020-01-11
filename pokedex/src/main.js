import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import details from './components/pokemonDetails';
Vue.component('app-details', details)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
