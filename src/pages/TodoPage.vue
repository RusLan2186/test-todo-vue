<template>
  <TodoForm />
  <TodoList />
</template>

<script>
import TodoList from '../components/TodoList.vue';
import TodoForm from '../components/Form.vue';

export default {
  name: 'Todo-page',
  components: {
    TodoList,
    TodoForm,
  },
};
</script>
