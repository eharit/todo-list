<template lang="html">
  <li>
    <div class="input-group">

      <div class="input-group-addon">
        <input
          type="checkbox"
          name="done"
          v-model="todo.done"
          @change="updateTodo(todo)"/>
      </div>

      <input v-bind:class="{ done: todo.done, 'form-control': true }"
        @change="updateTodo(todo)"
        v-model="todo.name" />

      <div class="input-group-btn">
        <button type="button"
          name="removeTodoBtn"
          @click="removeTodo(todo)"
          class="btn btn-secondary btn-sm">
          &times;
        </button>
      </div>

    </div>
  </li>
</template>

<script>
export default {
  name: 'Todo',
  props: ['todo', 'index'],
  data() {
    return {
      timestamp: null,
      updatedName: '',
    };
  },
  methods: {
    removeTodo(timestamp) {
      this.$emit('deleteTodo', timestamp);
    },
    updateTodo(todo) {
      this.$emit('updateTodo', todo);
    },
  },
};
</script>

<style lang="css" scoped>
li {
  display: block;
  margin-bottom: 5px;
  cursor: grab;
}
.done {
  text-decoration: line-through;
}
.noborder {
  border: none;
}
.material-icons {
  font-size: 20px;
  cursor: grab;
}
</style>
