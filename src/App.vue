<template>
  <!--   <HelloWorld msg="Vite + Vue" /> -->
  <!-- <HomePage></HomePage> -->

  <!-- <RegisterForm /> -->
  <!--   
  <CollaborationPetitionPopup nickname="@VictorFrankl" />
  <CollaborationPetitionPopup nickname="Holaa" /> -->

  <!--   <CreationPage /> -->
  <!--   <CreationSearcher /> -->
  <DeskPage />

  <LoginForm />
</template>

<script setup lang="ts">
import LoginForm from "./modules/auth/RegisterForm.vue";
import RegisterForm from "./modules/auth/LoginForm.vue";
import HomePage from "./modules/home/HomePage.vue";
import CollaborationPetitionPopup from "./modules/creations/collaborations/CollaborationPetitionPopup.vue";
import CreationPage from "./modules/creations/pages/CreationPage.vue";
import CreationSearcher from "./modules/creations/pages/CreationSearcher.vue";
import DeskPage from "./modules/desk/pages/DeskPage.vue";
</script>

<style scoped>
.login-wrapper {
  margin: 30px auto;
}
</style>
