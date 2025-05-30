<template>
  <!--   <HelloWorld msg="Vite + Vue" /> -->
  <!-- <HomePage></HomePage> -->

  <!-- <RegisterForm /> -->
  <!--    <LoginForm /> -->

  <!--    <CollaborationPetitionPopup nickname="@VictorFrankl" />  -->
  <!--   <CollaborationPetitionPopup nickname="Holaa" />  -->

  <!--   <CreationPage /> -->
  <!--   <CreationSearcher /> -->
  <DeskPage />
</template>

<script setup lang="ts">
import LoginForm from "./modules/auth/pages/RegisterForm.vue";
import RegisterForm from "./modules/auth/pages/LoginForm.vue";
import HomePage from "./modules/home/pages/HomePage.vue";
import CollaborationPetitionPopup from "./modules/creations/components/CollaborationPetitionPopup.vue";
import CreationPage from "./modules/creations/pages/CreationPage.vue";
import CreationSearcher from "./modules/creations/pages/CreationSearcher.vue";
import DeskPage from "./modules/desk/pages/DeskPage.vue";
</script>

<style scoped>
.login-wrapper {
  margin: 30px auto;
}
</style>
