<template lang="html">
  <li>
    {{ index + 1 }}.
    <input v-bind:class="{ done: todo.done }"
      @change="updateTodo(todo)"
      v-model="todo.name" />
    <input type="checkbox"
      name="done"
      v-model="todo.done"
      @change="updateTodo(todo)"/>
    <button type="button"
      name="removeTodoBtn"
      @click="removeTodo(todo.timestamp)"
      class="btn-sm">
      &times;
    </button>
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
  margin: 0 10px;
}
.done {
  text-decoration: line-through;
}
.btn-sm {
  padding: 0 1px 1px;
  line-height: 0;
}
input {
  border: none;
  font-size: 16px;
  color: #2c3e50;
}
</style>
