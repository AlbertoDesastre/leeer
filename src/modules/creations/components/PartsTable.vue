<template>
  <section class="parts-container">
    <n-space vertical :size="12">
      <n-data-table size="large" :columns="columns" :data="data" :pagination="pagination" />
    </n-space>
  </section>
</template>

<script setup lang="ts">
import { NSpace, NDataTable } from "naive-ui";
import { defineProps } from "vue";

const props = defineProps<{
  columns: any[];
  data: any[];
  pagination?: any;
}>();
</script>

<style scoped>
.parts-container {
  margin-top: 32px;
  height: 100%;
  overflow: auto;
}
</style>
