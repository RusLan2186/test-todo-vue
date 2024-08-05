import { reactive, watch } from 'vue';
import mockTodos from '../data/todos';

const savedTodos = JSON.parse(localStorage.getItem('todos'));

const store = reactive({
  todos: savedTodos && savedTodos.length ? savedTodos : mockTodos,
});

export const addTodo = (title, text, date) => {
  store.todos.push({
    id: Date.now(),
    title,
    text,
    date,
    completed: false,
  });
  saveTodos();
};


export const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(store.todos));
};

watch(store.todos, (newTodos) => {
  localStorage.setItem('todos', JSON.stringify(newTodos));
}, { deep: true });

export default store;

