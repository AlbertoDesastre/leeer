<template>
  <!-- El menú Header está disponible en muchas páginas, así que de momento me interesa que esté FUERA del Router View, para que sea la ruta que sea siempre esté presente. -->
  <TopHeader />

  <!-- RouterView es un componente que muestra contenido en base al archivo de rutas configurado (en mi caso está en routes/index.ts) -->
  <RouterView />
</template>

<script setup lang="ts">
import TopHeader from "./modules/common/components/TopHeader.vue";
</script>

<style scoped></style>
