<template>
  <section class="creation-searcher-page">
    <TopHeader />

    <ul class="creations-list">
      <li v-for="creation in creations" :key="creation.id" class="creation-item">
        <img :src="creation.img" alt="Imagen de la creación" />
        <article class="creation-info">
          <h3>{{ creation.title }}</h3>
          <p class="creation-user">
            Por <router-link :to="''">@{{ creation.user }}</router-link>
          </p>
          <p>{{ creation.description }}</p>
        </article>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import TopHeader from "../../../components/TopHeader.vue";
import { ref } from "vue";

const creations = ref([
  {
    id: 1,
    img: "../../../imgs/hombre-busca-sentido.webp",
    title: "Hombre busca sentido",
    user: "VictorFrankl",
    description:
      "Relato sobre la experiencia en los campos de concentración y la búsqueda de sentido en la vida.",
  },
  {
    id: 2,
    img: "../../../imgs/gato-escritor.png",
    title: "El gato escritor",
    user: "GatoLector",
    description: "Un gato que sueña con escribir la novela perfecta mientras duerme sobre libros.",
  },
  {
    id: 3,
    img: "../../../imgs/gato-encima-de-libros.png",
    title: "Sobre los libros",
    user: "BookCat",
    description: "Aventuras de un gato que explora mundos literarios saltando de libro en libro.",
  },
  {
    id: 4,
    img: "../../../imgs/gato-detective.png",
    title: "El gato detective",
    user: "DetectiveCat",
    description: "Un gato resuelve misterios en la biblioteca de la ciudad.",
  },
]);
</script>

<style scoped>
.creations-list {
  display: flex;
  flex-direction: column;
  gap: 28px;
  max-width: 800px;
  margin: 30px auto;
}

.creation-item {
  display: flex;
  background: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.07);
  padding: 18px 22px;
  align-items: flex-start;
  gap: 22px;
}

.creation-item img {
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.creation-info {
  display: flex;
  font-size: 1.3rem;
  flex-direction: column;
  justify-content: center;
}

.creation-info h3 {
  font-weight: bold;
  color: var(--color-action-blue);
}

.creation-info h3,
.creation-info p {
  margin-bottom: 8px;
}

.creation-user {
  margin-bottom: 8px;
  font-size: 1rem;
  color: var(--color-gray);
}

.creation-info p:last-child {
  font-size: 1.05rem;
}
</style>
