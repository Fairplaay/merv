<template>
	<v-container fluid fill-height>
		<v-flex xs11 class="flex">
			<div class="header">
				<v-avatar color="pink accent-3" size="60">
					<v-icon x-large color="white">lock</v-icon>
				</v-avatar>
				<h2 class="font-weight-bold">Singn in</h2>
			</div>
			<v-form ref="form" v-model="valid" v-on:submit.prevent="validateForm()">
				<v-text-field
					type="text"
					outlined
					name="login"
					label="Correo electronico"
					clearable
					validate-on-blur
					:rules="[rules.required, rules.emailMatch]"
					:loading="false"
					v-model="email"
				></v-text-field>
				<v-text-field
					v-model="password"
					outlined
					name="password"
					label="Contraseña"
					counter
					@click:append="show = !show"
					:type="show ? 'text' : 'password'"
					:rules="[rules.required, rules.min, rules.passwordMatch]"
					:loading="false"
					:append-icon="show ? 'visibility' : 'visibility_off'"
				></v-text-field>
				<v-btn type="submit" :disabled="!valid" color="primary" block>Ingresar</v-btn>
			</v-form>
		</v-flex>
	</v-container>
</template>

<script>
import { emailRegex, passwordRegex } from '@/plugins/regex.js';
import { login, getProfile } from '@/services/auth';
import { mapActions } from 'vuex';

export default {
	name: 'SigninComponent',
	data: () => ({
		show: false,
		email: '',
		password: '',
		valid: true,
		rules: {
			required: value => !!value || 'Campo requerido.',
			min: v => v.length >= 8 || 'Min 8 caracteres',
			emailMatch: v => emailRegex.test(v) || 'Ingresa un correo electronico valido',
			passwordMatch: v => passwordRegex.test(v) || 'Ingresa una contraseña valida'
		}
	}),
	methods: {
		/**
		 * validate form
		 * format string email to lower case
		 * call to api for login a user
		 * if success redirect to home else show snakbar witch error
		 */
		validateForm() {
			if (this.$refs.form.validate()) {
				const email = this.email.toLowerCase();
				login(email, this.password)
					.then(() => {
						this.showSnackbar({
							text: `Bienvenido ${getProfile().firstName}`,
							color: 'success'
						});
						this.$router.push('/');
					})
					.catch(err => {
						this.showSnackbar({ text: err.response.data, color: 'error' });
					});
			}
		},
		...mapActions(['showSnackbar'])
	}
};
</script>

<style lang="scss" scoped>
.header {
	text-align: center;
	padding: 16px;
}
.flex {
	margin: 0 auto;
}
</style>
