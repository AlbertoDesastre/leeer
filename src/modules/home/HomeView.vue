<template>
  <!-- El menú Header solo se renderiza en las rutas hijas de Home. Ver más detalles en router/index.ts -->
  <TopHeader />

  <HomePage />
</template>

<script setup lang="ts">
import TopHeader from "../common/components/TopHeader.vue";
import HomePage from "./pages/HomePage.vue";
</script>
