import Vue from 'vue'
import firebase from 'firebase'
import App from './App'
import router from './router'
import store from '@/store'

import AppDate from './components/AppDate'

Vue.component('AppDate', AppDate)

Vue.config.productionTip = false


// Initialize Firebase
const config = {
  apiKey: "AIzaSyAOIMyJhcVvDrzmNydA6HhGZ5dhkcsz9fs",
  authDomain: "vue-forum-48af0.firebaseapp.com",
  databaseURL: "https://vue-forum-48af0.firebaseio.com",
  projectId: "vue-forum-48af0",
  storageBucket: "vue-forum-48af0.appspot.com",
  messagingSenderId: "873419093200"
};
firebase.initializeApp(config);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
