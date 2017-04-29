<template lang="html">
  <footer class="footer" v-show="name">
    <div class="container">
      <div class="row">
        <div class="col text-left">
          <span v-show="photo" class="pic" alt="name"
            :style="{ backgroundImage: 'url(' + photo + ')' }"></span>
            {{ name }}
        </div>
        <div class="col text-right">
          <button v-if="undos" class="btn btn-link btn-sm vertical-middle" type="button" name="button"
            @click="undoTodo"><i class="material-icons">&#xE042;</i><span class="badge badge-danger">{{ undos }}</span></button>
          <button class="btn btn-secondary btn-sm" type="button" name="button"
            @click="logOut">Sign out</button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: ['name', 'photo', 'undos'],
  methods: {
    logOut() {
      this.$emit('logOut');
    },
    undoTodo() {
      this.$emit('undoTodo');
    },
  },
};
</script>

<style lang="css" scoped>
.material-icons {
  vertical-align: top;
}
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
button {
  vertical-align: middle;
}
</style>
