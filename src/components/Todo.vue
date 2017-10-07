<template lang="html">
    <div id="todo">
      <input type="text" @keyup.enter="addTodo" v-model="todoText"/>
      <li v-for="todo in todos">
        {{todo.text}}
        <button @click="removeTodo(todo.id)">X</button>
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
    removeTodo(id) {
      this.$store.dispatch(REMOVE_TODO, id);
    },
  },
};
</script>

<style lang="css">
</style>
