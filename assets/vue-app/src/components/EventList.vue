<template>
	<v-container>
		<v-layout row wrap>
			<h1 class="title">Events</h1>
		</v-layout>
		<v-layout row wrap>

			<v-flex xs6>
				<v-subheader>Select event location</v-subheader>
			</v-flex>
			<v-flex xs6>
				<v-select
						v-bind:items="locations"
						v-model="selectedLocation"
						label="Select"
						class="input-group--focused"
						item-value="text"
				></v-select>
			</v-flex>
		</v-layout>

		<v-layout v-for="event in events"
		          :key="event.id"
		          @click="goToEventDetails(event.id)">
			<v-flex xs12 sm8 offset-sm2>
				<v-card>
					<v-card-media src="https://bulma.io/images/placeholders/128x128.png" height="200px">
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
					<v-card-actions>
						<v-btn flat color="orange">Share</v-btn>
						<v-btn flat color="orange" @click="goToEventDetails(event.id)">More info</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>
<script>
	import store from '../store/store'
	import Event from './Event.vue';

	//import { mapGetters } from 'vuex';

	export default {
		data () {
			return {
				newEvent: '',
				author: '',
				selectedLocation: null,
				locations: [
					{text: 'amsterdam'},
					{text: 'utrecht'},
					{text: 'rotterdam'}
				],
			}
		},
		watch: {
			'$route' (to, from){
				this.getEvents(to.params);
			},
			'selectedLocation' (location){
				console.log(location);
				this.getEvents({param: 'location', value: location});
			}
		},
		mounted: function() {
			console.log(this.$store.getters, 'store event list');
			this.getEvents(this.$route.params);
		},
		methods: {
			getEvents(query) {
				var params = {};
				params[query.param] = query.value;
				store.dispatch('getEvents', params);
			},
			addEvent (event) {
				store.dispatch('addEvent', event);
			},
			deleteEvent (id) {
				store.dispatch('deleteEvent', id);
			},
			goToEventDetails(eventId){
				this.$router.push('/event/' + eventId)
			}

		},
		computed: {
			//...mapGetters({
			//    event: 'events',
			//    notReplied: 'notReplied',
			//    replied: 'replied'
			//}),
			events(){
				console.log(this.$store.getters.events);
				return this.$store.getters.events;
			}
		},
		components: {
			Event: Event
		}
	}
</script>

