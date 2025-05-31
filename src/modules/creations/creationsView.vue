<template>
  <!-- TopHeader se renderiza en cualquier página hija de Creations y por eso lo pongo aquí -->
  <TopHeader />
  <RouterView />
</template>

<script setup lang="ts">
import TopHeader from "../common/components/TopHeader.vue";
</script>
