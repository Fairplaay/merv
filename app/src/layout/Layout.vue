<template>
	<v-content>
		<v-navigation-drawer v-model="drawer" app clipped>
			<v-list dense>
				<v-list-item @click="goHome">
					<v-list-item-action>
						<v-icon>dashboard</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>Dashboard</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item @click="goAbout">
					<v-list-item-action>
						<v-icon>person</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>Profile</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar app clipped-left>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title>Application</v-toolbar-title>
		</v-app-bar>

		<v-container fluid>
			<router-view />
		</v-container>

		<v-footer app>
			<span>&copy; 2019</span>
		</v-footer>
	</v-content>
</template>

<script>
export default {
	name: 'Layout',
	props: {
		source: String
	},
	data: () => ({
		drawer: null
	}),
	methods: {
		goHome: function() {
			this.$router.push('/dashboard');
		},
		goAbout: function() {
			this.$router.push('/profile');
		}
	}
};
</script>
