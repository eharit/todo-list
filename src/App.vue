<template>
  <transition appear>
    <div id='app'>
      <h1>
        <img src='./assets/logo.png' width="40" height="40">
        {{ appName }}
      </h1>
      <router-view></router-view>
    </div>
  </transition>
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
  margin: 20px 10px 60px;
}
h1, h2 {
  font-weight: normal;
}
</style>
