<template>
  <article class="co-authors-display">
    <img
      v-for="(img, index) in images"
      :key="index"
      :class="'coauthor-' + (index + 1)"
      :src="img"
      alt="Coautor"
    />
  </article>
</template>

<script setup lang="ts">
// Componente visual para mostrar los avatares de los coautores solapados
import { defineProps } from "vue";
const props = defineProps<{ images: string[] }>();
</script>

<style scoped>
.co-authors-display {
  position: relative;
  padding-top: 15px;
  margin-bottom: 55px;
}
.co-authors-display img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
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
</style>
