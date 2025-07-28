<template>
  <section class="home-page">
    <div class="home-banner-wrapper">
      <h1 v-if="useUser.noUser">¡Bienvenido a leeer !</h1>
      <h1 v-else>¡Hola de nuevo, {{ useUser.user.email }}</h1>
      <img class="home-banner" src="../../../../imgs/gato-encima-de-libros.png" />
    </div>

    <h2>¡Últimas novedades!</h2>
    <CreationsDisplay v-if="creations" :creations="creations" />

    <h2>Lo último de: @{{ authorNickname }}</h2>
    <CreationsDisplay v-if="maryShelleyCreations" :creations="maryShelleyCreations" />
  </section>
</template>

<script setup lang="ts">
import CreationsDisplay from "../../creations/components/CreationsDisplay.vue";
import { useUserStore } from "../../auth/store/user.store";
import { useCreations } from "../../creations/composables/useCreations";

const useUser = useUserStore();
const { getCreations } = useCreations();
const authorNickname = "MaryShelley";
const creations = await getCreations({ limit: 10, offset: 0 });
/* Hago una segunda llamada porque puede que en la lista de creations no vengan muchas obras de la autora, así que le dedico una */
const maryShelleyCreations = await getCreations({ authorNickname, limit: 10, offset: 0 });
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
