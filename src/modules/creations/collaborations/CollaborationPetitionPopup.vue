<template>
  <n-card class="collaboration-popup" title="Solicitud de colaboración">
    <!--     <template #header-extra> #header-extra </template> -->
    <section class="collab-preview">
      <img width="180px" height="180px" src="../../../../imgs/hombre-busca-sentido.webp" />
      <article>
        <h3>Estás a punto de pedir una colaboración para:</h3>
        <p><strong>En buscado de sentido</strong>, de <router-link>@VictorFrankl</router-link></p>
      </article>
    </section>

    <template #footer> #footer </template>
    <template #action> #action </template>
  </n-card>
</template>

<script setup lang="ts">
import { NCard } from "naive-ui";
</script>

<style scoped>
.collaboration-popup {
  max-width: 700px;
  margin: 20px auto;
}

.collab-preview {
  display: flex;
  gap: 15px;
}

.collab-preview {
  font-size: 1.2rem;
}

.collab-preview h3 {
  margin-bottom: 20px;
}
</style>
