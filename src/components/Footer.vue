<template lang="html">
  <footer class="footer" v-show="name">
    <div class="container">
      <div class="row">
        <div class="col text-left">
          <span v-show="photo" class="pic" :alt="name" :title="name"
            :style="{ backgroundImage: 'url(' + photo + ')' }"></span>
        </div>
        <div class="col text-right">
          <button :disabled="!undos" class="btn btn-link btn-sm vertical-middle" type="button" name="button"
            @click="undoTodo"><span v-if="undos" class="badge badge-danger">{{ undos }}</span><i class="material-icons">&#xE042;</i></button>
          <!-- <button class="btn btn-secondary btn-sm" type="button" name="button"
            @click="logOut">Sign out</button> -->

          <!-- <b-dropdown text="name" right="true">
            <b-dropdown-item @click="logOut">
              Sign out
            </b-dropdown-item>
            <b-dropdown-item v-if="undos" @click="emptyTrash">
              Purge undo list
            </b-dropdown-item>
          </b-dropdown> -->

          <div class="dropdown dropup">
            <button @click="toggleDropdown"
              class="btn btn-link"
              type="button" id="dropdownMenuButton"
              aria-haspopup="true" aria-expanded="false">
              <i class="material-icons">&#xE5D2;</i>
            </button>
            <div v-if="expanded" class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" @click="logOut">Sign out</a>
              <a class="dropdown-item" v-if="undos" @click="emptyTrash">Clear undos</a>
            </div>
          </div>

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
.dropdown {
  display: inline-block;
}
.dropdown-menu {
  display: block;
}
.material-icons {
  vertical-align: top;
}
.btn{
  padding: 0.5rem 0.2rem;
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
