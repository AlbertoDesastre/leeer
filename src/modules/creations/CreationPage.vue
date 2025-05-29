<template>
  <TopHeader />
  <!-- Información de la Creation y colaboradores -->
  <section class="creation-overview">
    <n-card title="Hombre busca sentido">
      <template #footer> </template>
      <template #action> </template>
    </n-card>
  </section>
  <!-- Descripción de la obra -->
  <section class="description-container">
    <p>
      Este es el estremecedor relato en el que Viktor Frankl nos narra su experiencia en los campos de
      concentración. Durante todos esos años de sufrimiento, sintió en su propio ser lo que significaba
      una existencia desnuda, absolutamente desprovista de todo, salvo de la existencia misma. El, que
      todo lo había perdido, que padeció hambre, frío y brutalidades, que tantas veces estuvo a punto de
      ser ejecutado, pudo reconocer que, pese a todo, la vida es digna de ser vivida y que la libertad
      interior y la dignidad humana son indestructibles. En su condición de psiquiatra y prisionero,
      Frankl reflexiona con palabras de sorprendente esperanza sobre la capacidad humana de trascender
      las dificultades y descubrir una verdad profunda que nos orienta y da sentido a nuestras vidas.
    </p>
  </section>

  <!-- Todas las partes -->
  <section class="parts-container">
    <n-space vertical :size="12">
      <n-data-table size="large" :columns="columns" :data="data" :pagination="pagination" />
    </n-space>
  </section>
</template>

<script setup lang="ts">
import { NCard, NSpace, NDataTable } from "naive-ui";
import TopHeader from "../../components/TopHeader.vue";

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
const pagination = { pageSize: 50 };
</script>

<style scoped></style>
