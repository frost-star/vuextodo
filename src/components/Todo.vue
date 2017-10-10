<template lang="html">
    <div id="todo">
      <input type="text" @keyup.enter="addTodo" v-model="todoText"/>
      <li v-for="todo in todos" :key="todo['.key']">
        {{todo['.value']}}
        <button @click="removeTodo(todo['.key'])">X</button>
      </li>
    </div>
</template>

<script>
import { ADD_TODO, REMOVE_TODO } from '../vuex/action-types';

export default {
  data() {
    return {
      todoText: '',
    };
  },
  computed: {
    todos() {
      return this.$store.getters.getTodos;
    },
  },
  methods: {
    addTodo() {
      this.$store.dispatch(ADD_TODO, this.todoText);
      this.todoText = '';
    },
    removeTodo(key) {
      this.$store.dispatch(REMOVE_TODO, key);
    },
  },
};
</script>

<style lang="css">
</style>
