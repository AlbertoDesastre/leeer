<template>
  <div class="creation-card">
    <span>¡Colaborativo!</span>
    <n-card title="Hombre busca sentido">
      <template #cover>
        <route-link to="/creation/1">
          <img src="../../../public/imgs/hombre-busca-sentido.webp" />
        </route-link>
      </template>
      <p><strong>Por</strong> <router-link to="/author/1">Autor 1</router-link></p>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { NCard } from "naive-ui";
</script>

<style scoped>
.n-card {
  position: relative;
  min-width: 220px;
  max-width: 250px;
}

.creation-card span {
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

.creation-card .n-card img {
  display: block;
}
</style>
