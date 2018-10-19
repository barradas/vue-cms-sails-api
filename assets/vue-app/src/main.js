// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import { VCard } from 'vuetify/es5/components/VCard'
import { VCardMedia } from 'vuetify/es5/components/VCard'
import { VCardActions } from 'vuetify/es5/components/VCard'
import { VCardTitle } from 'vuetify/es5/components/VCard'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VForm,
  VTextField,
  VSubHeader,
  VSelect,
  VAvatar


} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VForm,
    VTextField,
    VSubHeader,
    VSelect,
    VCard,
    VCardMedia,
    VCardTitle,
    VCardActions,
    VAvatar
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
