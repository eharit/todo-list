// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueFire from 'vuefire';
import firebase from 'firebase';
// import firebaseui from 'firebaseui';
// import config from './helpers/firebaseConfig';

import App from './App';
import router from './router';

require('firebaseui/dist/firebaseui.css');

Vue.config.productionTip = false;
Vue.use(VueFire);

// const todosRef = Firebase('https://vue-todo-app-4c165.firebaseio.com/');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  created() {
    // firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/todos');
      } else {
        this.$router.push('/');
      }
    });
  },
});
