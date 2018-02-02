<template>
	<v-app light id="app">
		<v-navigation-drawer
				clipped
				v-model="drawer"
				absolute
				app>
			<v-list dense>
				<v-list-tile v-if="!isloggedIn" @click="goLogin()">
					<v-list-tile-action>
						<v-icon>dashboard</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title color="indigo"><span class="grey--text">Login</span></v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>

				<v-list-tile v-if="isloggedIn" @click="logout()">
					<v-list-tile-action>
						<v-icon>dashboard</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title color="indigo"><span class="grey--text">logout</span></v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile @click="goDashboard()">
					<v-list-tile-action>
						<v-icon>dashboard</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title color="indigo"><span class="grey--text">Dashboard</span></v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile @click="goEvents()">
					<v-list-tile-action>
						<v-icon>settings</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title color="indigo">Events</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile @click="goMessages()">
					<v-list-tile-action>
						<v-icon>settings</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title color="indigo">Messages</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
		<v-toolbar color="indigo" app dark fixed clipped-left>
			<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
			<v-toolbar-title>Application</v-toolbar-title>
		</v-toolbar>
		<v-content>
			<router-view></router-view>
		</v-content>
		<v-footer color="indigo" app fixed>
			<span class="white--text">&copy; 2017</span>
		</v-footer>
	</v-app>
</template>
<script>
	import store from './store'
	import VueRouter from 'vue-router';
	import messageList from './components/message-list.vue';
	import eventList from './components/event-list.vue';
	import dashboard from './components/dashboard.vue';
	import eventDetails from './components/event-details.vue';
	import login from './components/login.vue';

	export default {
		data() {
			return {
				drawer: false
			}
		},
		mounted(){
			console.log(this.$router);
		},
		props: {
			source: String
		},
		methods: {
			goLogin(){
				this.$router.push({path: `/`});
			},
			logout(){
				return store.dispatch('logout');
			},
			goDashboard(){
				if (this.isloggedIn) {
					this.$router.push({path: `/dashboard`});
				}

			},
			goEvents(){
				if (this.isloggedIn) {
					this.$router.push({path: `/events`});
				}

			},
			goMessages(){
				if (this.isloggedIn) {
					this.$router.push({path: `/messages`});
				}

			},
			redirectToLogin(){
				if (this.isloggedIn) {
					this.$router.push({path: `/`});
					console.log('redirected to login screen');
				}

			}
		},
		computed: {
			isloggedIn(){
				return this.$store.getters.authentication.loggedIn;
			}
		},
		components: {
			messageList,
			eventList,
			dashboard,
			eventDetails
		},
		watch: {
			isloggedIn (value){
				console.log(value, 'islogged in ?? ');
				if(!value){
					this.redirectToLogin();
				}
			}
		}
	}
</script>
<style lang="scss">
	/*@import "../node_modules/bulma/bulma.sass";*/
</style>
