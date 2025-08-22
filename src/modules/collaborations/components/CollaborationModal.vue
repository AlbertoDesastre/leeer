<template>
  <!-- Los usuarios que quieran colaborar ven esto-->
  <n-card class="collaboration-popup sending" title="Solicitud de colaboración">
    <!-- Preview con información de la Creación y el Autor -->
    <section class="collab-preview">
      <img width="180px" height="180px" src="../../../../imgs/hombre-busca-sentido.webp" />
      <article>
        <h3>Estás a punto de pedir una colaboración para:</h3>
        <p><strong>En buscado de sentido</strong>, de <router-link to="">@VictorFrankl</router-link></p>
      </article>
    </section>

    <!-- Radio Buttons -->
    <template #footer>
      <n-space justify="center" align="center">
        <h4>¿Qué tipo de historia te interesa incluir ?</h4>
        <n-radio-group v-model:value="collab" name="collaboration-options">
          <n-radio-button
            v-for="collaboration in collaborations"
            :key="collaboration.value"
            :value="collaboration.value"
            :label="collaboration.label"
          />
        </n-radio-group>
      </n-space>
    </template>

    <!-- Mensaje de error -->
    <n-alert v-if="error.message" type="error" :title="error.error" class="error-alert">
      {{ error.message }}
    </n-alert>

    <!-- Mensaje de éxito -->
    <n-alert v-if="success" type="success" title="¡Solicitud enviada!" class="success-alert">
      Tu solicitud de colaboración ha sido enviada correctamente.
    </n-alert>

    <template #action>
      <n-space class="options" justify="space-between" align="center">
        <button class="close-button" @click="onToggleModal">Cerrar</button>
        <n-button class="submit" color="#5d81a3" :disabled="!collab || success" @click="handleSubmit">
          Enviar solicitud
        </n-button>
      </n-space>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NRadioGroup, NRadioButton, NSpace, NAlert, NButton } from "naive-ui";
import { ref } from "vue";

import { useCollaborations } from "../composables/useCollaboration";
import { useRoute } from "vue-router";
import { COLLABORATION_TYPE, type CollaborationType } from "../types";

// props
const props = defineProps<{ onToggleModal: () => void }>();
function onToggleModal() {
  props.onToggleModal();
}

// inputs del componente y valores
const collaborations = [
  { value: COLLABORATION_TYPE.FANFICTION, label: COLLABORATION_TYPE.FANFICTION },
  { value: COLLABORATION_TYPE.CANON, label: COLLABORATION_TYPE.CANON },
  { value: COLLABORATION_TYPE.SPINOFF, label: COLLABORATION_TYPE.SPINOFF },
];
const collab = ref<CollaborationType | "">(""); // Este será el valor actual del radio button. Solo se puede elegir uno a la vez, obviamente

// composable de colaboraciones
const route = useRoute();
const { error, success, sendCollaboration } = useCollaborations();

const handleSubmit = async () => {
  const id = route.params.id as string;

  // no escogió ningún tipo de colaboración
  if (!collab.value) {
    error.value = {
      message: "Escoge algún tipo de colaboración antes de enviar la solicitud.",
      error: "Error de validación",
      statusCode: 400,
    };
    return;
  }

  const result = await sendCollaboration({ creation_id: id, collaboration: collab.value });

  // si todo salió bien mandamos a cerrar el modal
  if (result) setTimeout(() => onToggleModal(), 3000);
};

// TODOS:
// mandar el error y el isLoading al padre para que sepa manejar esos estados
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
