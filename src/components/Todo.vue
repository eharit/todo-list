<template lang="html">
  <li>
    {{ index + 1 }}.
    <input v-bind:class="{ done: todo.done }"
      @change="updateName(todo.name, todo.timestamp)"
      v-model="todo.name" />
    <input type="checkbox"
      name="done"
      v-model="todo.done"
      @change="updateStatus(todo.done, todo.timestamp)"/>
    <button type="button"
      name="removeTodoBtn"
      @click="removeTodo(todo.timestamp)"
      class="btn-sm">
      Delete
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
    updateName(name, timestamp) {
      const obj = {
        name,
        timestamp,
      };
      this.$emit('updateTodoName', obj);
    },
    updateStatus(done, timestamp) {
      const obj = {
        done,
        timestamp,
      };
      this.$emit('updateTodoStatus', obj);
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
  padding: 0 1px;
}
input {
  border: none;
  font-size: 16px;
  color: #2c3e50;
}
</style>
