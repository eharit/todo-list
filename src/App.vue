<template>
  <transition appear>
    <div id='app'>
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
  margin: 85px 10px 60px;
}
h1, h2 {
  font-weight: normal;
}
img {
  vertical-align: initial;
}
.show > .dropdown-menu {
  display: block !important;
}
</style>
