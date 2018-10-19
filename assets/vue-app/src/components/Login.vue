<template>
	<v-container fluid fill-height>
		<v-layout wrap justify-space-around align-center>
			<v-form ref="form" lazy-validation>
				<v-text-field
						label="E-mail"
						value="test@test.com"
						v-model="email"
						required
				></v-text-field>
				<v-text-field
						type="password"
						value="test123456"
						label="Password"
						v-model="password"
						required
				></v-text-field>
				<v-btn
						@click="login()"
				>
					submit
				</v-btn>
				<!--<v-btn @click="clear">clear</v-btn>-->
				{{isloggedIn}}
			</v-form>
		</v-layout>
	</v-container>
</template>
<script>
	import router from 'vue-router'
	import store from '../store/store';

	export default {
		data(){
			return {
				email: '',
				password: ''
			}
		},
		mounted: function() {
		},
		methods: {
			login(){
				return store.dispatch('authenticateUser', {email: 'test@test.com', password: '1234567'});
			},
			redirectToDashboard(){
				this.$router.push({path: `/dashboard`})
			}
		},
		computed: {
			isloggedIn(){
				return this.$store.getters.authentication.loggedIn;
			}
		},
		watch: {
			isloggedIn (value){
				if(value){
					this.redirectToDashboard();
				}
			}
		}
	}
</script>
<style>
</style>
