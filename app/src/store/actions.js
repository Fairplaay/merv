export default {
	showSnackbar: ({ commit }, payload) => {
		commit('SHOW_SNACKBAR', payload);
	},
	closeSnackbar: ({ commit }) => {
		commit('CLOSE_SNACKBAR');
	}
};
