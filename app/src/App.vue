<template>
	<v-app id="app">
		<SnackbarComponent />
		<component v-bind:is="layout">
			<router-view />
		</component>
	</v-app>
</template>

<script>
import SnackbarComponent from '@/components/snackbar_component.vue';
const without_layout = 'default';

export default {
	computed: {
		/**
		 * verify the component has been render
		 * with layout or no
		 * @return {Boolean}
		 */
		layout() {
			return this.$route.meta.layout || without_layout;
		}
	},
	components: {
		SnackbarComponent: SnackbarComponent
	}
};
</script>
