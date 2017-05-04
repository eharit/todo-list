<template lang="html">
  <transition name="fade" duration="125">
    <li>
      <div class="input-group">
        <div class="input-group-addon">
          <input
            type="checkbox"
            name="done"
            v-model="todo.done"
            @change="updateTodo(todo)"
            :disabled="loading"/>
        </div>

        <input :class="{ done: todo.done, 'form-control': true }"
          @change="updateTodo(todo)"
          v-model="todo.name"
          :disabled="loading"/>

        <div class="input-group-btn">
          <button type="button"
            name="removeTodoBtn"
            @click="removeTodo(todo)"
            class="btn btn-secondary btn-sm"
            :disabled="loading">
            &times;
          </button>
        </div>
      </div>
    </li>
  </transition>
</template>

<script>
export default {
  name: 'Todo',
  props: ['todo', 'index', 'loading'],
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
