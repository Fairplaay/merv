import Vue from 'vue';
import Vuex from 'vuex';
import Actions from '@/store/actions';
import State from '@/store/state';
import Getters from '@/store/getters';
import Mutations from '@/store/mutations';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: State,
	actions: Actions,
	getters: Getters,
	mutations: Mutations
});
