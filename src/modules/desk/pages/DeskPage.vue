<template>
  <section class="desk-container">
    <!--   <CreationEdition /> -->
  </section>
</template>

<script setup lang="ts">
import CreationEdition from "./CreationEdition.vue";
</script>

<style lang="css" scoped>
.desk-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.update-creation-form {
  max-width: 350px;

  background: white;
  padding: 30px;
  border-radius: 6px;
  box-shadow: 0px 2px 16px 0 rgba(0, 0, 0, 0.15);
}

.update-creation-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.avatar-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
