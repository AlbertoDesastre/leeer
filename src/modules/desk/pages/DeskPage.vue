<template>
  <section class="desk-container">
    <!--   <CreationEdition /> -->
  </section>

  <!-- Probablemente tenga que evitar usar el desk-container para cualquier componente, de momento dejo esta página fuera para maquetarla. -->
  <!-- <CreationsOverview /> -->
  <PartWritter />
</template>

<script setup lang="ts">
import CreationEdition from "./CreationEdition.vue";
import CreationsOverview from "./CreationsOverview.vue";
import PartWritter from "./PartWritter.vue";
</script>

<style lang="css" scoped>
.desk-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>
