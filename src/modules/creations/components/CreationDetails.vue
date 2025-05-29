<template>
  <section class="creation-details">
    <n-card>
      <template #cover>
        <route-link to="/creation/1">
          <img src="../../../../imgs/hombre-busca-sentido.webp" />
        </route-link>
      </template>
      <h2>Hombre en busca de sentido</h2>
      <p>
        Por <strong><router-link to="/author/1">Autor 1</router-link></strong>
      </p>
      <template #footer>
        <p>¡Ya han colaborado en esta creación X usuarios!</p>
        <article class="co-authors-display">
          <img class="coauthor-1" src="../../../../imgs/gato-escritor.png" />
          <img class="coauthor-2" src="../../../../imgs/gato-escritor.png" />
          <img class="coauthor-3" src="../../../../imgs/gato-escritor.png" />
          <img class="coauthor-4" src="../../../../imgs/gato-escritor.png" />
          <img class="coauthor-5" src="../../../../imgs/gato-escritor.png" />
        </article>
      </template>
      <template #action>
        <n-space justify="center">
          <n-button round color="#5d81a3"> Colaborar en esta historia </n-button>
        </n-space>
      </template>
    </n-card>
  </section>
</template>

<script setup lang="ts">
import { NCard, NButton, NSpace } from "naive-ui";
</script>

<style scoped>
.creation-details {
  justify-self: center;
  max-width: 320px;
}

.creation-details h2 {
  font-size: 1.8rem;
}

.creation-details .co-authors-display {
  position: relative;
  padding-top: 15px;
  margin-bottom: 55px;
}

.creation-details .co-authors-display img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.co-authors-display img {
  position: absolute;
  z-index: 10;
}

.co-authors-display .coauthor-2 {
  opacity: 0.9;
  left: 40px;
  z-index: 9;
}

.co-authors-display .coauthor-3 {
  opacity: 0.8;
  left: 80px;
  z-index: 8;
}
.co-authors-display .coauthor-4 {
  opacity: 0.55;
  left: 110px;
  z-index: 7;
}
.co-authors-display .coauthor-5 {
  opacity: 0.4;
  left: 140px;
  z-index: 6;
}

.creation-details p,
.creation-details button {
  font-size: 1rem;
}
</style>
