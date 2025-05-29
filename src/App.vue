<template>
  <!--   <HelloWorld msg="Vite + Vue" /> -->
  <!-- <HomePage></HomePage> -->
  <!-- <LoginForm /> -->
  <RegisterForm />
</template>

<script setup lang="ts">
import LoginForm from "./modules/auth/RegisterForm.vue";
import RegisterForm from "./modules/auth/LoginForm.vue";
import HomePage from "./modules/home/HomePage.vue";
</script>

<style scoped>
.login-wrapper {
  margin: 30px auto;
}
</style>
