<template>
  <TopHeader />
  <section class="creation-page">
    <CreationDetails :is-author="false" />
    <!-- DESCRIPCIÓN -->
    <div class="description-and-parts-wrapper">
      <section class="description-container">
        <p>
          Este es el estremecedor relato en el que Viktor Frankl nos narra su experiencia en los campos
          de concentración. Durante todos esos años de sufrimiento, sintió en su propio ser lo que
          significaba una existencia desnuda, absolutamente desprovista de todo, salvo de la existencia
          misma. El, que todo lo había perdido, que padeció hambre, frío y brutalidades, que tantas veces
          estuvo a punto de ser ejecutado, pudo reconocer que, pese a todo, la vida es digna de ser
          vivida y que la libertad interior y la dignidad humana son indestructibles. En su condición de
          psiquiatra y prisionero, Frankl reflexiona con palabras de sorprendente esperanza sobre la
          capacidad humana de trascender las dificultades y descubrir una verdad profunda que nos orienta
          y da sentido a nuestras vidas.
        </p>
      </section>
      <PartsTable :columns="columns" :data="data" :pagination="pagination" />
    </div>
  </section>
</template>

<script setup lang="ts">
import TopHeader from "../../../components/TopHeader.vue";
import CreationDetails from "../components/CreationDetails.vue";
import PartsTable from "../components/PartsTable.vue";

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

<style scoped>
.creation-page {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 16px;
  margin: 32px 80px;
  min-height: 600px;
}

.description-and-parts-wrapper p {
  font-size: 1.2rem;
}

.description-and-parts-wrapper {
  display: grid;
  grid-template-rows: 250px 1fr;
  height: 100%;
}

.description-container {
  overflow: auto;
  height: 100%;
  max-height: 100%;
}
</style>
