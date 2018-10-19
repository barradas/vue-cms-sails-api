import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './store';

import eventList from './components/event-list.vue';
import login from './components/login.vue';
import messageList from './components/message-list.vue';
import dashboard from './components/dashboard.vue';
import eventDetails from './components/event-details.vue';

Vue.use(VueRouter);
Vue.use(Vuetify);

const routes = [
    {path: '/', component: login},
    {path: '/dashboard', component: dashboard},
    {path: '/messages', component: messageList},
    {path: '/events', component: eventList},
    {path: '/events/:param/:value', component: eventList},
    {path: '/event/:eventId', component: eventDetails}
];

const router = new VueRouter({
    // this is the shorthand for routes: routes
    routes,
    mode: 'history'
});

new Vue({
    store,
    router,
    el: '#app',
    render: h => h(App)
})
