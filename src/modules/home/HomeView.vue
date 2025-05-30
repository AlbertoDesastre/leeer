<template>
  <!-- El menú Header solo se renderiza en las rutas hijas de Home. Ver más detalles en router/index.ts -->
  <TopHeader />

  <!-- Cuando un componente realiza operaciones asíncronas Vue te obliga a enverlo en un tag "Suspense".  -->
  <Suspense>
    <HomePage />
  </Suspense>
</template>

<script setup lang="ts">
import TopHeader from "../common/components/TopHeader.vue";
import HomePage from "./pages/HomePage.vue";
</script>
