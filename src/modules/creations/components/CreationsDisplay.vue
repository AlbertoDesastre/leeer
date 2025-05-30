<template>
  <section class="creations-display">
    <ul class="creations-list">
      <li v-for="index in 5" class="creation-item">
        <CreationCard />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import CreationCard from "../../common/components/CreationCard.vue";
</script>

<style scoped>
.creations-display {
  margin: 20px 25px;
}

.creations-display h2 {
  font-size: 2rem;
  margin-bottom: 15px;
}

.creation-item {
  position: relative;
}

.creation-item .n-card {
  position: relative;
  min-width: 220px;
  max-width: 250px;
}

.creation-item span {
  position: absolute;
  top: 15px;
  left: 5px;
  padding: 3px 7px;
  font-size: 10px;
  transform: rotate(-25deg);
  background-color: lime;
  z-index: 2;
  border-radius: 2px;
}

.creation-item .n-card img {
  display: block;
}

.creations-list {
  display: flex;
  gap: 20px;
  /* Esto me habilita un scroll cuando haya demasiadas historias */
  overflow-x: auto;
  padding-bottom: 10px;
  scrollbar-width: thin;
  scrollbar-color: #ccc #f5f5f5;
}
</style>
