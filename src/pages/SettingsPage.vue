<template>
  <div class="settings">
    <p>Completed Tasks: {{ completedCount }}</p>
    <p>Uncompleted Tasks: {{ uncompletedCount }}</p>
  </div>

  <router-link class="link" to="/">
   Back
  </router-link>
</template>

<script>
import { computed } from 'vue';
import store from '../store/store';

export default {
  name: 'SettingsPage',

  setup() {
    const todos = computed(() => store.todos);

    const completedCount = computed(
      () => todos.value.filter((todo) => todo.completed).length,
    );

    const uncompletedCount = computed(
      () => todos.value.filter((todo) => !todo.completed).length,
    );

    return {
      todos,
      completedCount,
      uncompletedCount,
    };
  },
};
</script>

<style  lang="scss" scoped>

.settings {
  font-size: 25px;
  margin-bottom: 40px;
}
.link{
  border: 1px solid $secondary;
  color:$secondary;
  padding: 10px 35px;
  transition:  0.3s all ease 0s;

  &:hover{
    background-color:$secondary;
    color:$primary;
  }
}

</style>
