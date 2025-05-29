<template>
  <n-card class="collaboration-popup" title="Solicitud de colaboración">
    <!--     <template #header-extra> #header-extra </template> -->
    <!-- Preview con información de la Creación y el Autor -->
    <section class="collab-preview">
      <img width="180px" height="180px" src="../../../../imgs/hombre-busca-sentido.webp" />
      <article>
        <h3>Estás a punto de pedir una colaboración para:</h3>
        <p><strong>En buscado de sentido</strong>, de <router-link>@VictorFrankl</router-link></p>
      </article>
    </section>

    <template #footer>
      <!-- Radio Buttons -->
      <n-space justify="center" align="center">
        <h4>¿Qué tipo de historia te interesa incluir ?</h4>
        <n-radio-group v-model:value="value" name="radiobuttongroup1">
          <n-radio-button
            v-for="collaboration in collaborations"
            :key="collaboration.value"
            :value="collaboration.value"
            :label="collaboration.label"
          />
        </n-radio-group>
      </n-space>
    </template>
    <template #action> #action </template>
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NRadioGroup, NRadioButton, NSpace } from "naive-ui";
import { ref } from "vue";

const collaborations = [
  { value: "Fanfiction", label: "Fanfiction" },
  { value: "Canon", label: "Canon" },
  { value: "Spinoff", label: "Spinoff" },
];
/*  Este será el valor actual del radio button. Solo se puede elegir uno a la vez, obviamente */
const value = ref(null);
</script>

<style scoped>
.collaboration-popup {
  max-width: 700px;
  margin: 20px auto;
}

.collab-preview {
  display: flex;
  gap: 15px;
}

.collab-preview {
  font-size: 1.2rem;
}

.collab-preview h3 {
  margin-bottom: 20px;
}
</style>
