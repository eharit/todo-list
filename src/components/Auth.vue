<template lang="html">
  <div id="firebaseui-auth-container"></div>
</template>

<script>
import firebase from 'firebase';
import firebaseui from 'firebaseui';

export default {
  name: 'auth',
  mounted() {
    const uiConfig = {
      signInSuccessUrl: '/todos',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
    };
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
  },
};
</script>

<style lang="css">
</style>
