import Vue from 'vue';
import Router from 'vue-router';
import StorePage from '@/views/store_page.vue';
import { loggedIn } from '@/services/auth';

Vue.use(Router);

const requireAuth = (to, from, next) => {
	if (loggedIn() == false) {
		next('/signin');
	} else {
		next();
	}
};

const isLogin = (to, from, next) => {
	if (loggedIn()) {
		next('/');
	} else {
		next();
	}
};

export default new Router({
	routes: [
		{
			path: '/',
			name: 'store',
			component: StorePage,
			beforeEnter: requireAuth
		},
		{
			path: '/dashboard',
			name: 'dashboard',
			meta: { layout: 'layout' },
			component: () => import('@/views/dashboard_page.vue')
		},
		{
			path: '/profile',
			name: 'profile',
			meta: { layout: 'layout' },
			component: () => import('@/views/profile_page.vue')
		},
		{
			path: '/signin',
			name: 'signin',
			meta: { auth: 'signin' },
			beforeEnter: isLogin,
			component: () => import('@/views/authentication_page.vue')
		},
		{
			path: '/signup',
			name: 'signup',
			meta: { auth: 'signup' },
			beforeEnter: isLogin,
			component: () => import('@/views/authentication_page.vue')
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ '@/views/about_page.vue')
		},
		{
			path: '*',
			name: '404',
			component: require('@/views/404.vue').default // load sync
		}
	]
});
