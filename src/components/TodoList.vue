<template>
  <div class="container">

    <div class="row">
      <div class="col-sm-12">
        <td-new-todo
          :loading="loading"
          @newTodoAdded="addNewTodo($event)">
        </td-new-todo>
      </div>
    </div>

    <hr/>

    <td-spinner v-if="!todos.length && loading"></td-spinner>
    <td-no-todos v-if="!todos.length && !loading">No todos at the moment, why don't you add some?</td-no-todos>

    <div class="row">
      <div class="col-sm-12">
        <td-draggable v-model="todos" @end="updateIndex">
          <td-todo v-for="(todo, index) in todos"
            :todo="todo"
            :index="index"
            :loading="loading"
            :key="todo.timestamp"
            @deleteTodo="removeTodo($event)"
            @updateTodo="updateTodo($event)">
          </td-todo>
        </td-draggable>
      </div>
    </div>

    <td-footer
      :name="name" :photo="photo"
      @logOut="logOut">
    </td-footer>

    <div v-if="!connected && !loading" class="alert alert-warning" role="alert">
      <strong>Holy guacamole!</strong> You are offline.
    </div>

    <pre v-if="this.log != ''">{{ this.log }}</pre>

  </div>
</template>

<script>
import firebase from 'firebase';
// import Draggable from 'vuedraggable';
import Todo from './Todo';
import NewTodo from './NewTodo';
import Spinner from './Spinner';
import Footer from './Footer';
import NoTodos from './NoTodos';
import config from '../helpers/firebaseConfig';

const app = firebase.initializeApp(config);
const db = app.database();
let todosRef;

export default {
  data() {
    return {
      title: 'Todo List',
      todos: [],
      loading: true,
      connected: false,
      user: {},
      log: '',
      photo: '',
      userId: '',
      name: '',
      email: '',
    };
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
    },
    updateIndex() {
      this.todos.forEach((e, i) => {
        e.indx = i;
        todosRef.child(e['.key']).update({
          indx: i,
        });
      });
    },
    addNewTodo(newTodoName) {
      if (typeof newTodoName === 'object') {
        // this.$log.log(newTodoName);
      } else if (newTodoName !== '') {
        this.loading = true;
        const newTodo = {
          timestamp: JSON.stringify(new Date().getTime()),
          name: newTodoName,
          indx: this.todos.length,
          done: false,
        };
        todosRef.push(newTodo);
        this.$bindAsArray('todos', todosRef.orderByChild('indx'));
        todosRef.once('value', () => {
          this.loading = false;
        });
      }
    },
    removeTodo(data) {
      this.loading = true;
      todosRef.child(data['.key']).remove();
      this.$bindAsArray('todos', todosRef.orderByChild('indx'));
      todosRef.once('value', () => {
        this.loading = false;
      });
    },
    updateTodo(data) {
      this.loading = true;
      todosRef.child(data['.key']).update({
        name: data.name,
        done: data.done,
        indx: data.indx,
      });
      this.$bindAsArray('todos', todosRef.orderByChild('indx'));
      todosRef.once('value', () => {
        this.loading = false;
      });
    },
  },
  name: 'TodoList',
  components: {
    'td-todo': Todo,
    'td-new-todo': NewTodo,
    'td-spinner': Spinner,
    'td-no-todos': NoTodos,
    'td-draggable': () => import('vuedraggable'),
    'td-footer': Footer,
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
        db.ref(`todos/${user.uid}`).once('value', () => {
          this.loading = false;
        });
        todosRef.onDisconnect(() => {
          this.loading = true;
        });
      }
    });
  },
  updated() {
    const connectedRef = db.ref('.info/connected');
    connectedRef.on('value', (snap) => {
      if (snap.val() === true) {
        // this.$log.log('connected');
        this.connected = true;
      } else {
        // this.$log.log('not connected');
        this.connected = false;
      }
    });
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
.alert {
  position: fixed!important;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
