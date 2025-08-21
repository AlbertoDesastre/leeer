<template>
  <section class="creation-page">
    <!-- Si no compruebo que la creation existe tira error. Esto es porque cuando llega aquí todavía tiene que cargar la creation, y nada más montar el componente se encuentra en undefined -->
    <div v-if="!creation" class="loading-state">Cargando...</div>

    <CreationDetails
      v-if="creation"
      :creation="creation"
      :is-author="false"
      :display-co-authors="true"
      :on-toggle-modal="onToggleModal"
      class="details"
    />

    <section v-if="toggleModal" class="modal-layout">
      <CollaborationModal class="modal-center" :on-toggle-modal="onToggleModal" />
    </section>

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
      <PartsTable :columns="columns" :data="parts" :pagination="pagination" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { useCreations } from "../composables/useCreations";
import { useParts, type ColumnData, type PartWithCollab } from "../composables/useParts";

import CreationDetails from "../components/CreationDetails.vue";
import PartsTable from "../components/PartsTable.vue";
import CollaborationModal from "../../collaborations/components/CollaborationModal.vue";

const { getCreationsById } = useCreations();
const { getPartsOf, formatPartsForTableColumns } = useParts();

const route = useRoute();
const creation = ref();
const parts = ref<ColumnData[]>([]);
const toggleModal = ref(false);

function onToggleModal() {
  toggleModal.value = !toggleModal.value;
}

onMounted(async () => {
  // Selecciono la creation
  const creation_id = route.params.id as string;
  creation.value = await getCreationsById(creation_id); // TODO: Hacer una sola llamada para obtener las partes de una creation. Si ya me viene en la ruta para qué llamo a la API?

  // Y una vez la tengo recopilo todas sus partes
  const data = await getPartsOf(creation_id);
  parts.value = formatPartsForTableColumns(data as PartWithCollab[]);
});

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
const pagination = { pageSize: 10 };
</script>

<style scoped>
.creation-page {
  display: grid;
  grid-template-columns: 1fr 2fr;
  min-height: 600px;
}

.details,
.description-and-parts-wrapper {
  margin-top: 32px;
}

.description-and-parts-wrapper {
  margin-right: 60px;
}

.modal-layout {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgb(30, 30, 30, 0.3);
  z-index: 1000;
}

.modal-center {
  top: 0;
  left: 0;
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
