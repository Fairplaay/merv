<template>
	<v-snackbar
		right
		v-model="snackbar.visible"
		:color="snackbar.color"
		:timeout="snackbar.timeout"
		:multi-line="snackbar.multiline === true"
	>
		{{ snackbar.text }}
		<v-btn text @click="closeSnackbar">Close</v-btn>
	</v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'SnackbarComponent',
	computed: {
		...mapGetters(['snackbar'])
	},
	methods: {
		...mapActions(['closeSnackbar'])
	}
};
</script>
