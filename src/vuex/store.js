import Vuex from 'vuex';
import Vue from 'vue';
import * as firebase from 'firebase';
import { firebaseMutations, firebaseAction } from 'vuexfire';
import { ADD_TODO, REMOVE_TODO } from './action-types';
import firebaseConfig from '../firebase-config';

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
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
    [ADD_TODO]: firebaseAction((context, text) => {
      todosRef.push(text);
    }),
    [REMOVE_TODO]: firebaseAction((context, key) => {
      todosRef.child(key).remove();
    }),
  },
  getters: {
    getTodos: state => state.todos,
  },
  plugins: [myPlugin],
});
