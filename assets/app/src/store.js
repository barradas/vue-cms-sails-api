import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import _ from 'lodash';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        messages: [],
        events: [],
        users: [],
        authentication: {
            loggedIn: false,
            token: false,
        },
        activeUserId: null,
    },
    getters: {
        messages: state => state.messages,
        count: state => state.messages.length,
        notReplied: state => _.filter(state.messages, function(o) {
            return !o.replied;
        }),
        replied: state => _.filter(state.messages, function(o) {
            return o.replied;
        }),
        events: state => state.events,
        event: state => {
            return eventId => {
                return _.find(state.events, function(event) {
                    return event.id === parseInt(eventId);
                });
            }
        },
        users: state => state.users,
        activeUserId: state => {
            return state.activeUserId;
        },
        authentication: state => state.authentication
    },
    mutations: {
        //AUTHENTICATIONS
        authenticateUser (state, data){
            if (_.has(data, 'loggedIn') && data.loggedIn) {
                state.authentication.loggedIn = true;
                state.activeUserId = data.user.id;

                if (_.has(data, 'token') && data.token) {
                    state.authentication.token = data.token;
                } else {
                    state.authentication.token = null;
                }
            } else {
                state.authentication.loggedIn = false;
            }
        },
        logout(state){
            state.authentication.loggedIn = false;
            state.activeUserId = null;
            state.authentication.token = null;
            console.log(`${state.authentication.loggedIn} , ${state.activeUserId} , ${state.authentication.token}`);
        },

        //MESSAGES MUTATIONS
        getMessages (state, objects) {
            console.log(objects);
            state.messages = objects;
        },
        getMessage (state, object) {

        },
        addMessage (state, object) {
            console.log(object);
            state.messages.push(object);
        },
        updateMessage (state, objects) {
            console.log(objects);
            state.messages.splice(_.findIndex(state.messages, function(o) {
                return o.id == objects.id;
            }), 0, objects)
        },
        deleteMessage (state, objects) {
            console.log(objects);
            state.messages.splice(_.findIndex(state.messages, function(o) {
                return o.id == objects.id;
            }), 1);
        },

        //EVENTS MUTATIONS
        getEvents (state, objects) {
            console.log(objects);
            state.events = objects;
        },

        addEvent (state, object) {
            console.log(object);
            state.events.push(object);
        },
        updateEvent (state, object) {
            console.log(object);
            state.events.splice(_.findIndex(state.events, function(o) {
                return o.id === object.id;
            }), 0, object)
        },
        deleteEvent (state, object) {
            console.log(object);
            state.events.splice(_.findIndex(state.events, function(o) {
                return o.id === object.id;
            }), 1)
        },

        //USERS MUTATIONS
        getUsers (state, objects) {
            console.log(objects);
            state.users = objects;
        },
        addUser (state, object) {
            console.log(object);
            state.users.push(object);
        },
        updateUser (state, object) {
            console.log(object);
            state.users.splice(_.findIndex(state.users, function(o) {
                return o.id === object.id;
            }), 0, object)
        },
        deleteUser (state, object) {
            console.log(object);
            console.log(_.findIndex(state.users, function(o) {
                return o.id === object.id;
            }));
            state.users.splice(_.findIndex(state.users, function(o) {
                return o.id === object.id;
            }), 1)
        }
    },
    actions: {
        //AUTHENTICATE
        authenticateUser({commit}, data){
            Axios.post('http://localhost:1337/login', data).then((response) => {
                commit('authenticateUser', response.data);
            }).catch((responseError)=> {
                console.log(responseError);
            });
        },
        //LOGOUT
        logout({commit}, data){
            Axios.post('http://localhost:1337/logout').then((response) => {
                commit('logout');
            }).catch((responseError)=> {
                console.log(responseError);
            });
        },


        //MESSAGES ACTIONS
        getMessages({commit}){
            Axios.get('http://localhost:1337/message').then((response)=> {
                commit('getMessages', response.data);
                console.log(response.data);
            }).catch((responseError)=> {
                console.log(responseError);
            });
            console.log('get messages action dispatched');
        },
        addMessage({commit}, object){
            console.log('add messages action dispatched');
            Axios.post('http://localhost:1337/message', object).then((response)=> {
                console.log(response.data);
                commit('addMessage', response.data);
            }).catch((responseError)=> {
                console.log(responseError);
            });
        },
        updateMessage({commit}, params){
            console.log('update messages action dispatched');
            Axios.put('http://localhost:1337/message/' + params.id, params.data).then((response)=> {
                commit('updateMessage', response.data);
            }).catch((responseError)=> {
                console.log(responseError);
            });
        },
        deleteMessage({commit}, id){
            console.log('delete messages action dispatched', id);
            Axios.delete('http://localhost:1337/message/' + id).then((response)=> {
                commit('deleteMessage', response.data);
            }).catch((responseError)=> {
                console.log(responseError);
            });
        },

        //EVENTS ACTIONS
        getEvents({commit}, params = {}){
            console.log(params);
            Axios.get('http://localhost:1337/event', {params}).then((response)=> {
                commit('getEvents', response.data);
                console.log(response.data, 'xxx');
            }).catch((responseError)=> {
                console.log(responseError);
            });
            console.log('get events action dispatched');
        },
        addEvent({commit}, object){
            console.log('add events action dispatched');
            Axios.post('http://localhost:1337/event', object).then((response)=> {
                console.log(response.data);
                commit('addEvent', response.data);
            }).catch((responseError)=> {
                console.log(responseError);
            });
        },
        updateEvent({commit}, params){
            console.log('update events action dispatched');
            Axios.put('http://localhost:1337/event/' + params.id, params.data).then((response)=> {
                commit('updateEvent', response.data);
            }).catch((responseError)=> {
                console.log(responseError);
            });
        },
        deleteEvent({commit}, id){
            console.log('delete events action dispatched', id);
            Axios.delete('http://localhost:1337/event/' + id).then((response)=> {
                commit('deleteEvent', response.data);
            }).catch((responseError)=> {
                console.log(responseError);
            });
        },

        //USERS ACTIONS
        getUsers({commit}, params = {}){
            console.log(params);
            Axios.get('http://localhost:1337/user', {params}).then((response)=> {
                commit('getUsers', response.data);
                console.log(response.data, 'xxx');
            }).catch((responseError)=> {
                console.log(responseError);
            });
            console.log('get users action dispatched');
        },
        addUser({commit}, object){
            console.log('add user action dispatched');
            Axios.post('http://localhost:1337/user', object).then((response)=> {
                console.log(response.data);
                commit('addUser', response.data);
            }).catch((responseError)=> {
                console.log(responseError);
            });
        },
        updateUser({commit}, params){
            console.log('update user action dispatched');
            Axios.put('http://localhost:1337/user/' + params.id, params.data).then((response)=> {
                commit('updateUser', response.data);
            }).catch((responseError)=> {
                console.log(responseError);
            });
        },
        deleteUser({commit}, id){
            console.log('delete user action dispatched', id);
            Axios.delete('http://localhost:1337/user/' + id).then((response)=> {
                commit('deleteUser', response.data);
            }).catch((responseError)=> {
                console.log(responseError);
            });
        }
    }
});

export default store;

