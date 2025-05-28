<template>
  <section class="home-page">
    <TopHeader />
    <section class="creations-display">
      <h2>Continúa escribiendo...</h2>
      <ul class="creations-list">
        <li>
          <!-- Display de la creación -->
          <router-link to="/creation/1">
            <img src="../../../public/imgs/hombre-busca-sentido.webp" width="100px" height="100px" />
            <span>¡Colaborativo!</span>
          </router-link>
          <h4>Hombre busca sentido</h4>
          <!-- Otros links de interés -->
          <router-link to="/creation/1">
            <p>Parte 1</p>
          </router-link>
          <p>Por <router-link to="/author/1">Autor 1</router-link></p>
        </li>
        <li>
          <!-- Display de la creación -->
          <router-link to="/creation/1">
            <img src="../../../public/imgs/hombre-busca-sentido.webp" width="100px" height="100px" />
            <span>¡Colaborativo!</span>
          </router-link>
          <h4>Hombre busca sentido</h4>
          <!-- Otros links de interés -->
          <router-link to="/creation/1">
            <p>Parte 1</p>
          </router-link>
          <p>Por <router-link to="/author/1">Autor 1</router-link></p>
        </li>
        <li>
          <!-- Display de la creación -->
          <router-link to="/creation/1">
            <img src="../../../public/imgs/hombre-busca-sentido.webp" width="100px" height="100px" />
            <span>¡Colaborativo!</span>
          </router-link>
          <h4>Hombre busca sentido</h4>
          <!-- Otros links de interés -->
          <router-link to="/creation/1">
            <p>Parte 1</p>
          </router-link>
          <p>Por <router-link to="/author/1">Autor 1</router-link></p>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
import TopHeader from "../../components/TopHeader.vue";
</script>

<style scoped></style>
