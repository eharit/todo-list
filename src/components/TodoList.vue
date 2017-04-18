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
const todosRef = db.ref('todos');

export default {
  name: 'TodoList',
  components: {
    todo,
  },
  data() {
    return {
      title: 'Todo List',
      newTodoName: '',
      log: '',
    };
  },
  firebase: {
    todos: todosRef,
  },
  methods: {
    addTodo() {
      if (this.newTodoName !== '') {
        const newTodo = {
          timestamp: JSON.stringify(new Date()),
          name: this.newTodoName,
          done: false,
        };
        todosRef.push(newTodo);
        this.newTodoName = '';
      }
    },
    removeTodo(data) {
      todosRef.child(data['.key']).remove();
    },
    updateTodo(data) {
      todosRef.child(data['.key']).update({
        name: data.name,
        done: data.done,
      });
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
