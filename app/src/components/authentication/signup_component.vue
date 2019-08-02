<template>
	<v-container fluid fill-height>
		<v-flex xs11 class="flex">
			<div class="header">
				<v-avatar color="pink accent-3" size="60">
					<v-icon x-large color="white">lock</v-icon>
				</v-avatar>
				<h2 class="font-weight-bold">Sing up</h2>
			</div>
			<v-form ref="form" v-model="valid" v-on:submit.prevent="validateForm()">
				<v-text-field
					type="text"
					outlined
					name="firstName"
					label="Nombre"
					clearable
					validate-on-blur
					:rules="[rules.required, rules.minText]"
					v-model="firstName"
				></v-text-field>
				<v-text-field
					type="text"
					outlined
					name="lastName"
					label="Apellido"
					clearable
					validate-on-blur
					:rules="[rules.required, rules.minText]"
					v-model="lastName"
				></v-text-field>
				<v-text-field
					type="text"
					outlined
					name="login"
					label="Correo electronico"
					clearable
					validate-on-blur
					:rules="[rules.required, rules.emailMatch]"
					v-model="email"
				></v-text-field>
				<v-text-field
					v-model="password"
					outlined
					name="password"
					label="Contraseña"
					counter
					@click:append="showPass = !showPass"
					:type="showPass ? 'text' : 'password'"
					:rules="[rules.required, rules.min, rules.passwordMatch]"
					:append-icon="showPass ? 'visibility' : 'visibility_off'"
				></v-text-field>
				<v-btn type="submit" :disabled="!valid" color="primary" block>Registrar</v-btn>
			</v-form>
		</v-flex>
	</v-container>
</template>

<script>
import { emailRegex, passwordRegex } from '@/plugins/regex.js';
import { register, getProfile } from '@/services/auth';
import { mapActions } from 'vuex';

export default {
	name: 'SignupComponent',
	data: () => ({
		showPass: false,
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		valid: true,
		rules: {
			required: value => !!value || 'Campo requerido.',
			min: v => v.length >= 8 || 'Min 8 caracteres',
			minText: v => v.length >= 2 || 'Min 2 caracteres',
			emailMatch: v => emailRegex.test(v) || 'Ingresa un correo electronico valido',
			passwordMatch: v => passwordRegex.test(v) || 'Ingresa una contraseña valida'
		}
	}),
	methods: {
		/**
		 * validate form
		 * format string and post to api a new user
		 * if success redirect to home else show snakbar witch error
		 */
		validateForm() {
			if (this.$refs.form.validate()) {
				// format string
				const email = this.email.toLowerCase();
				const firstName =
					this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1).toLowerCase();
				const lastName =
					this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1).toLowerCase();

				// save user
				register(email, firstName, lastName, this.password)
					.then(() => {
						this.showSnackbar({
							text: `Registro exitoso, bienvenido ${getProfile().firstName}`,
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
