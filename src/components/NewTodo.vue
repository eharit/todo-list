<template lang="html">
  <div class="input-group">
    <input class="form-control"
      type="text"
      name="newTodo"
      placeholder="New todo"
      v-model="newName"
      @keyup.enter="addNewTodo(newName)"/>
    <span class="input-group-btn">
      <button class="btn btn-primary"
        type="button"
        name="newTodoBtn"
        @click="addNewTodo(newName)">Add
      </button>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newName: '',
    };
  },
  methods: {
    addNewTodo(newTodoName) {
      this.newName = '';
      this.$emit('newTodoAdded', newTodoName);
    },
  },
};
</script>

<style lang="css">
</style>
