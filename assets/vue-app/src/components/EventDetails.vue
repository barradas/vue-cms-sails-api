<template>
	<v-container fluid fill-height>
		<v-layout wrap justify-space-around align-center>
			<v-flex xs10>
				<v-card>
					<v-card-media src="https://bulma.io/images/placeholders/128x128.png" height="300px">
					</v-card-media>
					<v-card-title primary-title>
						<div>
							<h3 class="headline mb-0">{{event.title}}</h3>
							<div>{{event.description}}</div>
							<div>
								<small>{{event.type}}</small>
								<small>{{event.location}}</small>
								<small>{{event.date}}</small>
							</div>
						</div>
					</v-card-title>
					<v-card-title primary-title>
						<div>
							<h3 class="headline mb-0">How is going</h3>
						</div>
					</v-card-title>
					<v-avatar v-for="visitor in event.visitors" :key="visitor.id" class="indigo">
						<v-icon dark>account_circle</v-icon>
					</v-avatar>
					<v-card-actions>
						<v-btn flat
						       v-if="!isUserGoing"
						       @click="goToEvent()"
						       color="orange">
							I am going
						</v-btn>
						<v-btn flat
						       v-if="isUserGoing"
						       @click="removeFromEvent()"
						       color="error">
							Cancel going to event
						</v-btn>
						<v-btn flat color="orange">Share</v-btn>
						<v-btn v-if="!isUserGoing" flat color="orange">I am interested</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>
<script>
	import store from '../store/store';

	export default {
		props: ['eventId'],
		data () {
			return {
				isUserGoing: false,
			}
		},
		beforeRouteEnter(to, from, next){
			console.log('route enter');
			next((vm)=> {
				vm.getEventData(vm.eventId);
			});
		},
		beforeRouteUpdate(to, from, next) {
			console.log('route updated');
			store.dispatch('getEvents');
			next((vm)=> {
				vm.getEventData(vm.eventId);
			});
		},
		methods: {
			getEvents() {
				console.log('get events fired');
				store.dispatch('getEvents');
			},
			getActiveUserId(){

			},
			getEventData(eventId){
				store.dispatch('getEvent', eventId);
			},
			checkUserGoing(){
				if (_.indexOf(this.visitors, this.activeUserId) !== -1) {
					this.isUserGoing = true;
					return true;
				}

				this.isUserGoing = false;
				return false;
			},
			goToEvent(){
				if (!this.checkUserGoing()) {
					this.visitors.push(this.activeUserId);

					this.updateEvent({id: this.eventId, visitors: this.visitors});
				}
				this.checkUserGoing();
			},
			removeFromEvent(){
				var activeUserId = this.activeUserId;
				_.remove(this.visitors, function(n) {
					return n === activeUserId;
				});
				this.checkUserGoing();
				this.updateEvent({id: this.eventId, data: {visitors: this.visitors}});
			},
			updateEvent(params){
				store.dispatch('updateEvent', params);
			}
		},
		computed: {
			event(){
				console.log(this.eventId);
				return this.$store.getters.event;
			},
			activeUserId(){
				return this.$store.getters.activeUserId;
			},
			visitors(){
				return this.$store.getters.event.visitors;
			}
		}
	}
	//TODO related events or events these people are also going
</script>

