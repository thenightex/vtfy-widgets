import Vue from 'vue';
import Vuetify from 'vuetify/es5';
import VtfyRoundWidgets from '../../dist/vtfy-round-widgets';
import App from './App.vue';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;

// register lib
Vue.use(VtfyRoundWidgets);
Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify({icons: {iconfont: 'mdi'}}),
  render: (h) => h(App),
}).$mount('#app')
