import Vuex from 'vuex';
import Vue from 'vue';
import { ADD_TODO, REMOVE_TODO } from './action-types';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    todos: [],
  },
  mutations: {
    [ADD_TODO](state, text) {
      const todo = {
        id: 0,
        text,
      };
      if (this.state.todos.length !== 0) {
        todo.id = this.state.todos[this.state.todos.length - 1].id + 1;
      }
      this.state.todos.push(todo);
    },
    [REMOVE_TODO](state, id) {
      this.state.todos = this.state.todos.filter(todo => id !== todo.id);
    },
  },
  actions: {
    [ADD_TODO](context, text) {
      context.commit(ADD_TODO, text);
    },
    [REMOVE_TODO](context, id) {
      context.commit(REMOVE_TODO, id);
    },
  },
  getters: {
    getTodos: state => state.todos,
  },
});
