<template>
  <div class="header">
    <div class="container">
      <div class="logo">
        <router-link to="/">
          <q-toolbar-title class="title"> To Do</q-toolbar-title>
        </router-link>
      </div>
      <div>
        <router-link to="/settings">
          <q-btn flat round dense size="18px" color="secondary" icon="settings"
        /></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header-page',
};
</script>

<style lang="scss" scoped>
.header {
  padding: 13px 36px;
  height: 70px;
  box-shadow: 0 4px 8px rgba(250, 245, 245, 0.1);
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  color: $secondary;
  font-size: 36px;
  transition: 0.3s all ease 0s;

  &:hover {
    transform: scale(1.1);
  }
}
</style>
