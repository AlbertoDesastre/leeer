<template>
  <section class="creation-details">
    <n-card>
      <!-- Información de la obra -->
      <template #cover>
        <img :src="creation.thumbnail || fallback_thumbnail" :alt="creation.title" />
      </template>
      <h2>
        {{ props.creation.title }}
      </h2>
      <p>
        Por
        <strong>
          {{ props.creation.user?.nickname }}
        </strong>
      </p>
      <p class="synopsis">{{ props.creation.synopsis }}</p>
      <p class="date">Creado: {{ new Date(props.creation.creation_date).toLocaleDateString() }}</p>
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

import type { Creation } from "../types";

import CoAuthorsDisplay from "../components/CoAuthorsDisplay.vue";
import fallback_thumbnail from "../../../../imgs/fallback_thumbnail.png";

const props = defineProps<{
  creation: Creation;
  isAuthor?: boolean;
  displayCoAuthors?: boolean;
}>();

const coauthorImages = [
  // Aquí podrías mapear los coautores reales si los tienes en el modelo
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
.synopsis {
  font-size: 0.95rem;
  color: #444;
  margin: 0.5em 0 0.2em 0;
}
.date {
  font-size: 0.85rem;
  color: var(--color-gray, #888);
  margin: 0;
}
</style>
