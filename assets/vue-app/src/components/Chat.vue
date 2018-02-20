<template>
	<v-container class="">
		<h1>My messages</h1>
		<div class="field">
			<div class="control">
				<input class="input" type="text" v-model="newMessage" placeholder="your next message">
			</div>
		</div>
		<div class="field">
			<div class="control">
				<input class="input" type="text" v-model="user" placeholder="user">
			</div>
		</div>
		<div class="field">
			<div class="control">
				<a class="button is-primary" @click="addMessage({user: user, message: newMessage})">Add Message</a>&nbsp;
			</div>
		</div>
		<ul>
			<message v-for="message in messages" :key="message.id">{{ message.id }} - {{ message.message }} - {{
				message.user }}
			</message>
		</ul>
	</v-container>
</template>
<script>
	import store from '../store/store'
	import Message from './Message.vue';
	import Axios from 'axios';
	export default {
		data: function() {
			return {
				messages: [],
				newMessage: '',
				user: '',
				connectedUsers: []
			}
		},
		mounted: function() {
			this.getMessages();

			//start socket connection
			io.socket.get('/chat/addconv');

			//register onChat event listener
			this.onChat();


		},
		methods: {
			onChat(){
				var self = this;
				io.socket.on('chat',function(obj){
					console.log('chat event triggered');
					//Check whether the verb is created or not
					if(obj.verb === 'created'){
						console.log(obj.data);
						self.messages.push(obj.data);
					}
				});
			},
			getMessages() {
				var self = this;
				//store.dispatch('getMessages');
				Axios.get('http://localhost:1337/chat')
						.then(function(response) {
							self.messages = response.data;
						});
			},
			addMessage (message) {
				//store.dispatch('addMessage', message);
				io.socket.post('/chat/addconv/',{user:this.user,message: this.newMessage});
				this.newMessage = '';
				this.user = '';


			},
		},
		watch: {

		},
		computed: {

		},
		components: {
			Message: Message

		}
	}
</script>
