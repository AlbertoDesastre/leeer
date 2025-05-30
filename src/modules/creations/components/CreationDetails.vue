<template>
  <section class="creation-details">
    <n-card>
      <!-- Información de la obra -->
      <template #cover>
        <route-link to="/creation/1">
          <img src="../../../../imgs/hombre-busca-sentido.webp" />
        </route-link>
      </template>
      <h2>Hombre en busca de sentido</h2>
      <p>
        Por <strong><router-link to="/author/1">Autor 1</router-link></strong>
      </p>
      <!-- Colaboradores -->
      <template v-if="displayCoAuthors" #footer>
        <p>¡Ya han colaborado en esta creación X usuarios!</p>
        <CoAuthorsDisplay :images="coauthorImages" />
      </template>
      <!-- Botón para colaborar -->
      <template v-if="!isAuthor" #action>
        <n-space justify="center">
          <n-button round color="#5d81a3"> Colaborar en esta historia </n-button>
        </n-space>
      </template>
    </n-card>
  </section>
</template>

<script setup lang="ts">
import { NCard, NButton, NSpace } from "naive-ui";
import CoAuthorsDisplay from "../components/CoAuthorsDisplay.vue";

const props = defineProps<{
  isAuthor: boolean;
  displayCoAuthors: boolean;
}>();

const coauthorImages = [
  "../../../../imgs/gato-escritor.png",
  "../../../../imgs/gato-escritor.png",
  "../../../../imgs/gato-escritor.png",
  "../../../../imgs/gato-escritor.png",
  "../../../../imgs/gato-escritor.png",
];
</script>

<style scoped>
.creation-details {
  justify-self: center;
  max-width: 320px;
}

.creation-details h2 {
  font-size: 1.8rem;
}

.creation-details p,
.creation-details button {
  font-size: 1rem;
}
</style>
