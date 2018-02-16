<template>
	<v-container>
		The dashboard
			<event-list></event-list>
			<!--<message-list></message-list>-->
	</v-container>
</template>
<script>
//	import messageList from '/message-list.vue'
	import EventList from './EventList.vue'
	export default {

		mounted: function() {

		},
		components: {
//			messageList,
			EventList
		}
	}
</script>
