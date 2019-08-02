import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import { store } from '@/store';
import router from '@/router';
import Layout from '@/layout/Layout.vue';
import Default from '@/layout/Default.vue';
import App from '@/App.vue';

// dynamic layout
Vue.component('layout', Layout);
Vue.component('default', Default);

Vue.config.productionTip = false;

new Vue({
	vuetify,
	router,
	store,
	render: h => h(App)
}).$mount('#root');
