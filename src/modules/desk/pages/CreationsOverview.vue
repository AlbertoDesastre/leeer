<template>
  <TopHeader />
  <h2><i>ESCRITORIO</i></h2>
  <h3>Edita, crea y publica tus historias aquí.</h3>
  <section class="creations-overview">
    <!-- LISTA/SELECCION DE CREACIONES -->
    <ul class="creations-list">
      <!-- Hago una asignación de clase condicional. Si está con la clase "active" entonces la carta seleccionada es la única que "brilla", mediante la selección de su index -->
      <li
        v-for="index in 5"
        :key="index"
        :class="['creation-details', { active: selectedIndex === index - 1 }]"
        @click="selectedIndex = index - 1"
      >
        <CreationDetails :is-author="true" :display-co-authors="false" />
      </li>
    </ul>

    <!-- INFORMACIÓN SOBRE SUS PARTES/COLABORADORES/NOTIFICACIONES -->
    <section class="parts-and-authors-container">
      <article class="authors-view">
        <CoAuthorsDisplay :images="coauthorImages" />
        <img class="notification-icon" width="64px" height="64px" src="../../../../imgs/carta.png" />
      </article>

      <PartsTable :columns="columns" :data="data" :pagination="pagination" />
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CoAuthorsDisplay from "../../creations/components/CoAuthorsDisplay.vue";
import CreationDetails from "../../creations/components/CreationDetails.vue";
import PartsTable from "../../creations/components/PartsTable.vue";
import TopHeader from "../../../components/TopHeader.vue";

const selectedIndex = ref(0);

/* Datos para creations */

/* Coautores y notificaciones */
const coauthorImages = [
  "../../../../imgs/gato-escritor.png",
  "../../../../imgs/gato-escritor.png",
  "../../../../imgs/gato-escritor.png",
  "../../../../imgs/gato-escritor.png",
  "../../../../imgs/gato-escritor.png",
];

/* Datos para la tabla de partes */
const columns = [
  {
    title: "Título",
    key: "title",
  },
  {
    title: "Tipo",
    key: "type",
  },
  {
    title: "Autor/xs",
    key: "authors",
  },
  {
    title: "Fecha",
    key: "date",
  },
];
const data = [
  { title: "Parte 1", type: "Canon", authors: "@VictorFrankl", date: "2024-01-01" },
  { title: "Parte 2", type: "Canon", authors: "@VictorFrankl", date: "2024-01-10" },
  {
    title: "Fanfic: El guardián",
    type: "Fanfiction",
    authors: "@UsuarioFan1",
    date: "2024-02-05",
  },
  {
    title: "Spinoff: El compañero",
    type: "Spinoff",
    authors: "@Colaborador2",
    date: "2024-02-20",
  },
  { title: "Parte 3", type: "Canon", authors: "@VictorFrankl", date: "2024-03-01" },
  {
    title: "Fanfic: Esperanza",
    type: "Fanfiction",
    authors: "@FanWriter",
    date: "2024-03-15",
  },
  {
    title: "Spinoff: El regreso",
    type: "Spinoff",
    authors: "@Colaborador3",
    date: "2024-04-01",
  },
  { title: "Parte 4", type: "Canon", authors: "@VictorFrankl", date: "2024-04-10" },
  {
    title: "Fanfic: Luz en la oscuridad",
    type: "Fanfiction",
    authors: "@FanLuz",
    date: "2024-04-20",
  },
  {
    title: "Spinoff: El nuevo camino",
    type: "Spinoff",
    authors: "@Colaborador4",
    date: "2024-05-01",
  },
];
const pagination = { pageSize: 10 };
</script>

<style lang="css" scoped>
h3,
h2 {
  font-size: 3rem;
  text-align: center;
}

h3 {
  font-size: 1.5rem;
  color: rgb(41, 41, 41);
}

.creations-overview {
  display: flex;
  gap: 35px;
  max-width: 80%;
  margin: 20px auto;
}

.creations-list {
  max-height: 700px;
  min-width: 380px;
  margin-top: 95px;
  padding-top: 20px;
  overflow: auto;
  overflow-x: hidden;
  position: relative;
  scrollbar-color: brown transparent;
}

.creation-details {
  position: relative;
  margin: 20px 10px;
  cursor: pointer;
  transition: all ease 250ms;
}

.creation-details.active {
  transform: rotate(3deg) scale(1.1);
  z-index: 3;
}

.parts-and-authors-container {
  width: 100%;
}

.authors-view {
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.notification-icon {
  margin-top: 20px;
  margin-left: 220px;
}
</style>
