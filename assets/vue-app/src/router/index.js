import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import EventList from '@/components/EventList'
import EventDetails from '@/components/EventDetails'
import MessageList from '@/components/MessageList'
import Chat from '@/components/Chat'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/dashboard',
			name: 'Dashboard',
			component: Dashboard
		},
		{
			path: '/events',
			name: 'EventList',
			component: EventList
		},
		{
			path: '/event/:eventId',
			name: 'EventDetails',
			component: EventDetails
		},
		{
			path: '/messages',
			name: 'MessageList',
			component: MessageList
		},
		{
			path: '/chat',
			name: 'chat',
			component: Chat
		}
	]
})
