<template>
	<v-container class="container" fluid>
		<v-layout>
			<v-flex md7 class="image"></v-flex>
			<v-flex xs12 sm12 md5>
				<SigninComponent v-if="type === 'signin'" />
				<SignupComponent v-if="type === 'signup'" />
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import SigninComponent from '@/components/authentication/signin_component.vue';
import SignupComponent from '@/components/authentication/signup_component.vue';

const signup = 'signup';

export default {
	name: 'AuthenticationPage',
	computed: {
		// render component signin or signup
		type() {
			return this.$route.meta.auth || signup;
		}
	},
	components: {
		SigninComponent: SigninComponent,
		SignupComponent: SignupComponent
	}
};
</script>

<style lang="scss" scoped>
.image {
	height: 100vh;
	background-image: url(https://source.unsplash.com/random);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
}
.container {
	padding: 0;
	margin: 0;
}
</style>
