<template lang="html">
  <li>
    {{ index + 1 }}.
    <span v-bind:class="{ done: todo.done }">{{ todo.name }}</span>
    <input type="checkbox" name="done" v-model="todo.done">
    <button type="button" name="removeTodoBtn" @click="removeTodo(todo.timestamp)" class="btn-sm">Delete</button>
  </li>
</template>

<script>
export default {
  name: 'Todo',
  props: ['todo', 'index'],
  data() {
    return {
      timestamp: null,
    };
  },
  methods: {
    removeTodo(timestamp) {
      this.timestamp = timestamp;
      this.$emit('deleteTodo', this.timestamp);
    },
  },
};
</script>

<style lang="css">
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
</style>
