<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <input type="text" name="newTodo" placeholder="New todo" v-model="newTodoName" @keyup.enter="addTodo"/>
    <button type="button" name="newTodoBtn" @click="addTodo">Add</button>
    <p v-show="!todos.length">Nothing to do, yey!</p>
    <ul>
      <todo v-for="(todo, index) in todos"></todo>
    </ul>
    <pre v-if="this.log">{{ this.log }}</pre>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data() {
    return {
      title: 'Todo List',
      todos: [],
      newTodoName: '',
      log: '',
    };
  },
  methods: {
    addTodo() {
      if (this.newTodoName !== '') {
        const tmpTodo = {
          timestamp: new Date(),
          name: this.newTodoName,
          done: false,
        };
        this.todos.push(tmpTodo);
        this.newTodoName = '';
      }
    },
    removeTodo(timestamp) {
      const obj = this.todos.find(
        n => n.timestamp === timestamp,
      );
      const index = this.todos.indexOf(obj);
      this.todos.splice(index, 1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.done {
  text-decoration: line-through;
}
.btn-sm {
  padding: 0 1px;
}
</style>
