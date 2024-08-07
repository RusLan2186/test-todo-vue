<template>
  <AppHeader />
  <div class="app">
     <div class="container">
       <router-view></router-view>
    </div>

  </div>

</template>

<script>
import { defineComponent } from 'vue';
import AppHeader from './pages/HeaderPage.vue';


export default defineComponent({
  name: 'App',
  components: {
    AppHeader,

  }
});
</script>

<style lang="scss" scoped>

.app {
  display: flex;
  justify-content: center;
  padding: 20px;

  @media (max-width: 767.98px){
    padding: 15px 10px;
  }
}

.container {
  max-width: 1200px;
  width: 100%;
}
</style>
