<template>
  <section class="home-page">
    <div class="home-banner-wrapper">
      <h1>¡Bienvenido a leeer!</h1>
      <img class="home-banner" src="../../../../imgs/gato-encima-de-libros.png" />
    </div>

    <h2>¡Últimas novedades!</h2>
    <CreationsDisplay />

    <h2>Lo último de: @Autor</h2>
    <CreationsDisplay />
  </section>
</template>

<script setup lang="ts">
import CreationsDisplay from "../../creations/components/CreationsDisplay.vue";
</script>

<style scoped>
.home-banner-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: auto;
}

.home-banner-wrapper h1 {
  text-align: center;
  font-size: 3rem;
  margin-right: 20px;
}

.home-banner {
  margin-top: 20px;
  width: 500px;
}

.home-page h2 {
  font-size: 2rem;
  margin-left: 25px;
  margin-bottom: 15px;
}
</style>
