<template lang="html">
  <footer class="footer" v-show="name">
    <div class="container">
      <div class="row">
        <div class="col text-left">
          <b-dropdown :right="false" variant="link">
            <span slot="text"
              class="pic" :alt="name" :title="name"
              :style="{ backgroundImage: 'url(' + photo + ')' }"
              id="dropdownMenuButton"
              aria-haspopup="true"
              aria-expanded="false">
            </span>
            <b-dropdown-item @click="logOut">
              Sign out
            </b-dropdown-item>
            <b-dropdown-item v-if="undos" @click="emptyTrash">
              Purge undo list
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div class="col logo">
          <img src='../assets/logo.png' width="35" height="35">
        </div>
        <div class="col text-right">
          <button :disabled="!undos" class="btn btn-link btn-sm vertical-middle" type="button" name="button"
            @click="undoTodo"><span v-if="undos" class="badge badge-danger">{{ undos }}</span><i class="material-icons">&#xE042;</i></button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: ['name', 'photo', 'undos'],
  data() {
    return {
      expanded: false,
    };
  },
  methods: {
    logOut() {
      this.$emit('logOut');
    },
    undoTodo() {
      this.$emit('undoTodo');
    },
    emptyTrash() {
      this.$emit('emptyTrash');
      this.expanded = !this.expanded;
    },
    toggleDropdown() {
      this.expanded = !this.expanded;
    },
  },
};
</script>

<style lang="css" scoped>
.logo {
  display: block;
  margin: auto;
  img {
    vertical-align: top !important;
  }
}
.dropdown {
  display: inline-block;
}
.material-icons {
  vertical-align: top;
}
.btn{
  padding: 1.1rem 0.2rem 1rem;
}
footer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: whitesmoke;
  padding: 5px;
  z-index: 2;
}
footer .pic {
  background: #444;
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
