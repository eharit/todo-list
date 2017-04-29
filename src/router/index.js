import Vue from 'vue';
import Router from 'vue-router';
import TodoList from '@/components/TodoList';
import Auth from '@/components/Auth';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/todos',
      name: 'TodoList',
      component: TodoList,
    },
    {
      path: '/',
      name: 'Auth',
      component: Auth,
    },
  ],
});
