<template>
  <div class="creation-card">
    <span v-if="!props.creation.is_draft">¡Colaborativo!</span>
    <n-card :title="props.creation.title">
      <template #cover>
        <RouterLink :to="{ name: 'creation-details', params: { id: props.creation.creation_id } }">
          <img
            :src="props.creation.thumbnail ? props.creation.thumbnail : fallback_thumbnail"
            :alt="props.creation.title"
          />
        </RouterLink>
      </template>
      <p class="author">
        Por
        <RouterLink :to="{ name: 'home' }">
          <strong>@{{ props.creation.user?.nickname }}</strong></RouterLink
        >
      </p>
      <p class="synopsis">{{ props.creation.synopsis }}</p>
      <p class="date">
        <i>Creado el {{ new Date(props.creation.creation_date).toLocaleDateString() }} </i>
      </p>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { NCard } from "naive-ui";
import { RouterLink } from "vue-router";
import type { Creation } from "../../creations/types";
import fallback_thumbnail from "../../../../imgs/fallback_thumbnail.png";

const props = defineProps<{ creation: Creation }>();
</script>

<style scoped>
.n-card {
  position: relative;
  width: 250px;
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
.author {
  margin-top: -10px;
}

.synopsis {
  margin-top: 5px;
}

.date {
  margin-top: 5px;
  font-size: 13px;
  text-align: right;
}
</style>
