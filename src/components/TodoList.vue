<template>
  <div class="container">

    <div class="row">
      <div class="col-sm-12">
        <div class="input-group">
          <input class="form-control"
            type="text"
            name="newTodo"
            placeholder="New todo"
            v-model="newTodoName"
            @keyup.enter="addTodo"/>
          <span class="input-group-btn">
            <button class="btn btn-primary" type="button"
              name="newTodoBtn"
              @click="addTodo">Add
            </button>
          </span>
        </div>
      </div>
    </div>

    <hr/>

    <div class="row">
      <div class="col-sm-12">
        <p v-show="!todos.length">Fetching Todos!</p>
        <draggable v-model="todos" @end="updateIndex()">
          <todo v-for="(todo, index) in todos"
            :todo="todo"
            :index="index"
            :key="todo.timestamp"
            @deleteTodo="removeTodo($event)"
            @updateTodo="updateTodo($event)">
          </todo>
        </draggable>
      </div>
    </div>

    <footer class="footer" v-show="name">
      <span class="pic" alt="name" :style="{ backgroundImage: 'url(' + photo + ')' }"></span>
      {{ name }}
      <button class="btn btn-default" type="button" name="button" @click="logOut">Sign out</button>
    </footer>

    <pre v-if="this.log != ''">{{ this.log }}</pre>

  </div>
</template>

<script>
import firebase from 'firebase';
import draggable from 'vuedraggable';
import todo from './Todo';
import config from '../helpers/firebaseConfig';

const app = firebase.initializeApp(config);
const db = app.database();
const todosRef = db.ref('todos');

export default {
  name: 'TodoList',
  components: {
    todo,
    draggable,
  },
  data() {
    return {
      title: 'Todo List',
      newTodoName: '',
      todos: [],
      user: {},
      log: '',
      photo: '',
      userId: '',
      name: '',
      email: '',
      init: true,
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
    if (this.init) {
      this.todos.sort((a, b) => parseInt(a.indx, 10) - parseInt(b.indx, 10));
      this.init = false;
    }
  },
  firebase: {
    todos: todosRef,
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
    },
    updateIndex() {
      this.todos.forEach((e, i) => {
        e.indx = i;
        this.updateTodo(e);
      });
    },
    addTodo() {
      if (this.newTodoName !== '') {
        const newTodo = {
          timestamp: JSON.stringify(new Date().getTime()),
          name: this.newTodoName,
          indx: this.todos.length,
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
