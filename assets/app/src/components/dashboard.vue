<template>
	<v-container>

			<event-list></event-list>
			<message-list></message-list>
	</v-container>
</template>
<script>
	import messageList from './message-list.vue';
	import eventList from './event-list.vue';
	export default {

		mounted: function() {

		},
		components: {
			messageList,
			eventList
		}
	}
</script>
<style lang="scss">
</style>
