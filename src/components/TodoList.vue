<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <input type="text" name="newTodo" placeholder="New todo" v-model="newTodoName" @keyup.enter="addTodo"/>
    <button type="button" name="newTodoBtn" @click="addTodo">Add</button>
    <p v-show="!todos.length">Nothing to do, yay!</p>
    <ul>
      <to-do v-for="(todo, index) in todos"
        is="to-do"
        :todo="todo"
        :index="index"
        @deleteTodo="removeTodo($event)"
        @updateTodoName="updateName($event)"
        @updateTodoStatus="updateStatus($event)">
      </to-do>
    </ul>
    <pre v-if="this.log">{{ this.log }}</pre>
  </div>
</template>

<script>
import Todo from './Todo';

export default {
  name: 'TodoList',
  components: {
    'to-do': Todo,
  },
  data() {
    return {
      title: 'Todo List',
      todos: JSON.parse(localStorage.getItem('todoList')) || [],
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
        this.updateLocalStorage();
      }
    },
    removeTodo(timestamp) {
      const obj = this.todos.find(
        n => n.timestamp === timestamp,
      );
      const index = this.todos.indexOf(obj);
      this.todos.splice(index, 1);
      this.updateLocalStorage();
    },
    updateName(data) {
      const obj = this.todos.find(
        n => n.timestamp === data.timestamp,
      );
      const index = this.todos.indexOf(obj);
      this.todos[index].name = data.name;
      this.updateLocalStorage();
    },
    updateStatus(data) {
      const obj = this.todos.find(
        n => n.timestamp === data.timestamp,
      );
      const index = this.todos.indexOf(obj);
      this.todos[index].done = data.done;
      this.updateLocalStorage();
    },
    updateLocalStorage() {
      localStorage.setItem('todoList', JSON.stringify(this.todos));
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

a {
  color: #42b983;
}

</style>
