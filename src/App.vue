<template>
  <div id='app'>
    <img src='./assets/logo.png'>
    <h1>{{ appName }}</h1>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      appName: 'Todo',
    };
  },
};
</script>

<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px 10px;
}
h1, h2 {
  font-weight: normal;
}
</style>
