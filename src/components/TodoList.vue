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
    <p v-show="!todos.length">Fetching Todos!</p>
    <ul>
      <todo v-for="(todo, index) in todos"
        :todo="todo"
        :index="index"
        :key="todo.timestamp"
        @deleteTodo="removeTodo($event)"
        @updateTodo="updateTodo($event)">
      </todo>
    </ul>
    <footer class="footer" v-show="name">
      <span class="pic" alt="name" :style="{ backgroundImage: 'url(' + photo + ')' }"></span>
      {{ name }}
      <button type="button" name="button" @click="logOut">Sign out</button>
    </footer>

    <pre v-if="this.log != ''">{{ this.log }}</pre>
  </div>
</template>

<script>
import firebase from 'firebase';
import todo from './Todo';
import config from '../helpers/firebaseConfig';

const app = firebase.initializeApp(config);
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
      user: {},
      log: '',
      photo: '',
      userId: '',
      name: '',
      email: '',
    };
  },
  updated() {
    this.user = firebase.auth().currentUser;
    if (this.user) {
      this.name = this.user.displayName;
      this.email = this.user.email;
      this.photo = this.user.photoURL;
      this.userId = this.user.uid;
    }
  },
  firebase: {
    todos: todosRef,
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
    },
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
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: whitesmoke;
  padding: 5px;
}
footer .pic {
  background: whitesmoke;
  background-size: cover;
  display: inline-block;
  border-radius: 20px;
  border: 1px whitesmoke solid;
  vertical-align: middle;
  width: 40px;
  height: 40px;
}
.float-right {
  float: right;
  display: inline-block;
}
</style>
