export default {
	SHOW_SNACKBAR(state, payload) {
		state.snackbar.text = payload.text;
		state.snackbar.color = payload.color;
		state.snackbar.multiline = payload.text.length > 50 ? true : false;

		if (payload.multiline) {
			state.snackbar.multiline = payload.multiline;
		}

		if (payload.timeout) {
			state.snackbar.timeout = payload.timeout;
		}

		state.snackbar.visible = true;
	},

	CLOSE_SNACKBAR(state) {
		state.snackbar.visible = false;
		state.snackbar.multiline = false;
		state.snackbar.timeout = 6000;
		state.snackbar.text = null;
		state.snackbar.color = null;
	}
};
