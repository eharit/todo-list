<template>
  <div class="container">

    <div class="row">
      <div class="col-sm-12">
        <td-new-todo @newTodoAdded="addNewTodo($event)"></td-new-todo>
      </div>
    </div>

    <hr/>

    <td-spinner v-if="!todos.length"></td-spinner>

    <div class="row">
      <div class="col-sm-12">
        <td-draggable v-model="todos" @end="updateIndex()">
          <td-todo v-for="(todo, index) in todos"
            :todo="todo"
            :index="index"
            :key="todo.timestamp"
            @deleteTodo="removeTodo($event)"
            @updateTodo="updateTodo($event)">
          </td-todo>
        </td-draggable>
      </div>
    </div>

    <td-footer @logOut="logOut">
    </td-footer>

    <td-footer :name="name" :photo="photo"></td-footer>

    <pre v-if="this.log != ''">{{ this.log }}</pre>

  </div>
</template>

<script>
import firebase from 'firebase';
import Draggable from 'vuedraggable';
import Todo from './Todo';
import NewTodo from './NewTodo';
import Spinner from './Spinner';
import Footer from './Footer';
import config from '../helpers/firebaseConfig';

const app = firebase.initializeApp(config);
const db = app.database();
let todosRef;

export default {
  name: 'TodoList',
  components: {
    'td-todo': Todo,
    'td-new-todo': NewTodo,
    'td-spinner': Spinner,
    'td-draggable': Draggable,
    'td-footer': Footer,
  },
  data() {
    return {
      title: 'Todo List',
      todos: [],
      user: {},
      log: '',
      photo: '',
      userId: '',
      name: '',
      email: '',
    };
  },
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.name = this.user.displayName;
        this.email = this.user.email;
        this.photo = this.user.photoURL;
        this.userId = this.user.uid;
        todosRef = db.ref(`todos/${user.uid}`);
        this.$bindAsArray('todos', todosRef.orderByChild('indx'));
      }
    });
  },
  updated() {

  },
  methods: {
    logOut() {
      firebase.auth().signOut();
    },
    updateIndex() {
      this.todos.forEach((e, i) => {
        todosRef.child(e['.key']).update({
          indx: i,
        });
      });
      this.$log.log(this.todos);
    },
    addNewTodo(newTodoName) {
      this.$log.log(newTodoName);
      if (newTodoName !== '') {
        const newTodo = {
          timestamp: JSON.stringify(new Date().getTime()),
          name: newTodoName,
          indx: this.todos.length,
          done: false,
        };
        todosRef.push(newTodo);
      }
    },
    removeTodo(data) {
      todosRef.child(data['.key']).remove();
    },
    updateTodo(data) {
      todosRef.child(data['.key']).update({
        name: data.name,
        done: data.done,
        indx: data.indx,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
</style>
