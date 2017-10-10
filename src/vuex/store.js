import Vuex from 'vuex';
import Vue from 'vue';
import * as firebase from 'firebase';
import { firebaseMutations, firebaseAction } from 'vuexfire';
import { ADD_TODO, REMOVE_TODO } from './action-types';

const config = {
  databaseURL: 'https://vue-fire-test-3c227.firebaseio.com/',
};
const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.database();
const todosRef = db.ref('todo');

Vue.use(Vuex);

const INIT_TODO = 'INIT_TODO';
const myPlugin = store => store.dispatch(INIT_TODO, 'test');

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    todos: [],
  },
  mutations: {
    ...firebaseMutations,
  },
  actions: {
    [INIT_TODO]: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('todos', todosRef, { wait: true });
    }),
    [ADD_TODO]: firebaseAction(({ state, bindFirebaseRef }, text) => {
      todosRef.push(text).then(() => bindFirebaseRef('todos', todosRef, { wait: true }));
    }),
    [REMOVE_TODO]: firebaseAction(({ bindFirebaseRef }, key) => {
      todosRef.child(key).remove().then(() => bindFirebaseRef('todos', todosRef, { wait: true }));
    }),
  },
  getters: {
    getTodos: state => state.todos,
  },
  plugins: [myPlugin],
});
