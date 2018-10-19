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
	mode: 'history',
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
			component: Dashboard,
			meta: { requiresAuth: true }
		},
		{
			path: '/events',
			name: 'EventList',
			component: EventList,
			meta: { requiresAuth: true }
		},
		{
			path: '/event/:eventId',
			name: 'EventDetails',
			component: EventDetails,
			props: true,
			meta: { requiresAuth: true }

		},
		{
			path: '/messages',
			name: 'MessageList',
			component: MessageList,
			meta: { requiresAuth: true }
		},
		{
			path: '/chat',
			name: 'chat',
			component: Chat,
			meta: { requiresAuth: true }
		}
	]
})
