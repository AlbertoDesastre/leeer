<template>
  <!-- Los usuarios que quieran colaborar ven esto-->
  <n-card v-if="!isAuthor" class="collaboration-popup sending" title="Solicitud de colaboración">
    <!--     <template #header-extra> #header-extra </template> -->
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
        <n-radio-group v-model:value="value" name="collaboration-options">
          <n-radio-button
            v-for="collaboration in collaborations"
            :key="collaboration.value"
            :value="collaboration.value"
            :label="collaboration.label"
          />
        </n-radio-group>
      </n-space>
    </template>

    <template #action>
      <n-space class="options" justify="space-between" align="center">
        <button class="close-button">Cerrar</button>
        <n-button color="#5d81a3"> Enviar solicitud </n-button>
      </n-space>
    </template>
  </n-card>

  <!-- Los autores ven esto cuando les llegan las peticiones -->
  <n-card v-else class="collaboration-popup sending" title="Solicitud de colaboración">
    <!--     <template #header-extra> #header-extra </template> -->
    <!-- Preview con información de la Creación y el Autor -->
    <section class="collab-preview">
      <img width="180px" height="180px" src="../../../../imgs/hombre-busca-sentido.webp" />
      <article>
        <h3>¡Alguien quiere apoyar tu proyecto!</h3>
        <p>
          <strong>En busca de sentido</strong> ha captado el interés de
          <router-link to="">@UsuarioRandom</router-link>
        </p>
      </article>
    </section>

    <!-- Radio Buttons -->
    <template #footer>
      <n-space justify="center" align="center">
        <p>
          <strong>@UsuarioRandom</strong> quiere escribir un
          <n-button strong secondary type="info"> Fanfiction </n-button>
        </p>
      </n-space>
    </template>

    <template #action>
      <n-space class="options" justify="space-between" align="center">
        <button class="close-button">Cerrar</button>
        <n-button color="#5d81a3"> Aceptar la solicitud </n-button>
      </n-space>
    </template>
  </n-card>
</template>

<script setup lang="ts">
import { NCard, NRadioGroup, NRadioButton, NSpace, NButton } from "naive-ui";
import { ref, computed } from "vue";

const props = defineProps<{ nickname: string }>();
const author = "@VictorFrankl";

const collaborations = [
  { value: "Fanfiction", label: "Fanfiction" },
  { value: "Canon", label: "Canon" },
  { value: "Spinoff", label: "Spinoff" },
];
/*  Este será el valor actual del radio button. Solo se puede elegir uno a la vez, obviamente */
const value = ref(null);

const isAuthor = computed(() => props.nickname === author);
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
