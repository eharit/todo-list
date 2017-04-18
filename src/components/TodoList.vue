<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <input type="text"
      name="newTodo"
      placeholder="New todo"
      v-model="newTodoName"
      @keyup.enter="addTodo"/>
    <button type="button"
      name="newTodoBtn"
      @click="addTodo">Add
    </button>
    <p v-show="!todos.length">Nothing to do, yay!</p>
    <ul>
      <todo v-for="(todo, index) in todos"
        :todo="todo"
        :index="index"
        :key="todo.timestamp"
        @deleteTodo="removeTodo($event)"
        @updateTodo="updateTodo($event)">
      </todo>
    </ul>
    <pre v-if="this.log">{{ this.log }}</pre>
  </div>
</template>

<script>
import Firebase from 'firebase';
import todo from './Todo';

const config = {
  apiKey: 'AIzaSyB86W3_ICaXaIENuhAzuA-WCylzFr9cJhs',
  authDomain: 'vue-todo-app-4c165.firebaseapp.com',
  databaseURL: 'https://vue-todo-app-4c165.firebaseio.com',
  projectId: 'vue-todo-app-4c165',
  storageBucket: 'vue-todo-app-4c165.appspot.com',
  messagingSenderId: '886610025376',
};

const app = Firebase.initializeApp(config);
const db = app.database();
const dbRef = db.ref('todos');

export default {
  name: 'TodoList',
  components: {
    todo,
  },
  data() {
    return {
      title: 'Todo List',
      todos: JSON.parse(localStorage.getItem('todoList')) || [],
      newTodoName: '',
      log: '',
      dbRef,
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
    updateTodo(data) {
      const obj = this.todos.find(
        n => n.timestamp === data.timestamp,
      );
      const index = this.todos.indexOf(obj);
      this.todos[index] = data;
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
