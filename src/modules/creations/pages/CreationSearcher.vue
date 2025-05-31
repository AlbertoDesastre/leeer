<template>
  <TopHeader />

  <Suspense>
    <section class="creation-searcher-page">
      <ul v-if="creations && creations.length > 0" class="creations-list">
        <li v-for="creation in creations" :key="creation.creation_id" class="creation-item">
          <img :src="creation.thumbnail || fallback_thumbnail" alt="Imagen de la creación" />
          <article class="creation-info">
            <h3>{{ creation.title }}</h3>
            <p class="creation-user">
              Por <RouterLink :to="''">@{{ creation.user?.nickname }}</RouterLink>
            </p>
            <p>{{ creation.synopsis }}</p>
          </article>
        </li>
      </ul>
      <h3 class="not-found" v-else>No hay nada relacionado con tu búsqueda.</h3>
    </section>
  </Suspense>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import TopHeader from "../../common/components/TopHeader.vue";
import fallback_thumbnail from "../../../../imgs/fallback_thumbnail.png";
import { useRoute } from "vue-router";
import { useCreations } from "../composables/useCreations";
import type { Creation } from "../types";

const { getCreationsByTerm } = useCreations();
const route = useRoute();
const creations = ref<Creation[]>();

onMounted(async () => {
  const search = route.query.search;

  creations.value = (await getCreationsByTerm({
    term: search as string,
    limit: 15,
    offset: 0,
  })) as Creation[];

  console.log("Término de búsqueda recibido:", creations.value);
  // Aquí puedes usar searchTerm para filtrar o buscar creaciones
});
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

.not-found {
  font-size: 5rem;
  text-align: center;
  margin-top: 5rem;
}
</style>
