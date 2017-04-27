<template lang="html">
  <footer class="footer" v-show="name">
    <span class="pic" alt="name" :style="{ backgroundImage: 'url(' + photo + ')' }"></span>
    {{ name }}
    <button class="btn btn-default" type="button" name="button" @click="logOut">Sign out</button>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: ['name', 'photo'],
  methods: {
    logOut() {
      this.$emit('logOut');
    },
  },
};
</script>

<style lang="css" scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: whitesmoke;
  padding: 5px;
  z-index: 2;
}
footer .pic {
  background: white;
  background-size: cover;
  display: inline-block;
  border-radius: 20px;
  border: 1px whitesmoke solid;
  vertical-align: middle;
  width: 40px;
  height: 40px;
}
.float-right {
  float: right;
  display: inline-block;
}
</style>
