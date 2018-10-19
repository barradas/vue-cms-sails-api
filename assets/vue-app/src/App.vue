<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="!isloggedIn" @click="goLogin()">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><span class="grey--text">Login</span></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="isloggedIn" @click="logout()">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><span class="grey--text">logout</span></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="goDashboard()">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><span class="grey--text">Dashboard</span></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="goEvents()">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Events</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="goMessages()">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Messages</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="goMessages()">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Messages</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app>
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import store from './store/store'
  import router from 'vue-router'
  import Login from './components/Login'
  import Dashboard from './components/Dashboard'
  import EventList from './components/EventList'
  import EventDetails from './components/EventDetails'
  import MessageList from './components/MessageList'
  import Message from './components/Message'
  import Chat from './components/Chat'

export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  mounted(){
    console.log(this.$router);
  },
  props: {
    source: String
  },
  methods: {
    goLogin(){
      this.$router.push({path: `/login`});
    },
    logout(){
      return store.dispatch('logout');
    },
    goDashboard(){
      if (this.isloggedIn) {
        this.$router.push({path: `/dashboard`});
      }

    },
    goEvents(){
      if (this.isloggedIn) {
        this.$router.push({path: `/events`});
      }

    },
    goMessages(){
      if (this.isloggedIn) {
        this.$router.push({path: `/messages`});
      }

    },
    redirectToLogin(){
      if (this.isloggedIn) {
        this.$router.push({path: `/`});
        console.log('redirected to login screen');
      }

    }
  },
  computed: {
    isloggedIn(){
      return this.$store.getters.authentication.loggedIn;
    }
  },
  components: {
    Login,
    Dashboard,
    EventList,
    EventDetails,
    Message,
    MessageList,
    Chat
  },
  watch: {
    isloggedIn (value){
      console.log(value, 'islogged in ?? ');
      if(!value){
        this.redirectToLogin();
      }
    }
  },
  name: 'App'
}
</script>
