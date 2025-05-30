<template>
  <section class="text-editor-wrapper">
    <section class="left-panel">
      <article class="part-selector">
        <n-button class="add-part" strong secondary> Mostrar partes </n-button>

        <n-button-group vertical>
          <n-button>
            <img class="part-icon" src="../../../../imgs/manuscrito.png" />
            Parte 1: El revoltijo secreto de Galapagar
          </n-button>
          <n-button>
            <img class="part-icon" src="../../../../imgs/manuscrito.png" />
            <p>Spinoff: El nuevo camino</p>
          </n-button>
          <n-button>
            <img class="part-icon" src="../../../../imgs/manuscrito.png" />
            Unidad
          </n-button>

          <n-button class="add-part" round color="#5d81a3"> Añadir otra parte </n-button>
        </n-button-group>
      </article>

      <article class="current-user">
        <span>¡Ánimo, @Detective!</span>
        <CoAuthorsDisplay :images="authorImg" />
      </article>

      <article class="participations">
        <p>Están participando X colaboradores en esta historia.</p>
        <CoAuthorsDisplay :images="coauthorImages" />
      </article>
    </section>

    <section class="text-editor">
      <textarea v-model="editorText" placeholder="Escribe tu historia aquí..."></textarea>
    </section>

    <section class="right-panel">
      <n-button class="add-part action-button" round color="#5d81a3">
        Guardar borrador
        <img style="margin-left: 10px" class="part-icon" src="../../../../imgs/borrador.png" />
      </n-button>
      <n-button class="add-part action-button" round color="#872E06">
        Publicar <img style="margin-left: 10px" class="part-icon" src="../../../../imgs/publicar.png" />
      </n-button>
    </section>
  </section>
</template>

<script setup lang="ts">
import { NButton, NButtonGroup } from "naive-ui";
import CoAuthorsDisplay from "../../creations/components/CoAuthorsDisplay.vue";
import { ref } from "vue";
const authorImg = ["../../../../imgs/gato-detective.png"];

const coauthorImages = [
  "../../../../imgs/gato-escritor.png",
  "../../../../imgs/gato-escritor.png",
  "../../../../imgs/gato-escritor.png",
  "../../../../imgs/gato-escritor.png",
  "../../../../imgs/gato-escritor.png",
];

const editorText = ref("");
</script>

<style lang="css" scoped>
.text-editor-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
}

.part-icon {
  width: 16px;
  height: 16px;
}

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0rem 2rem;
}

.right-panel {
  display: flex;
  flex-direction: column;
  padding: 0rem 2rem;
  gap: 10px;
}

.right-panel .n-button {
  width: 170px;
}

.n-button {
  justify-content: flex-start;
  max-width: 350px;
}

.n-button:last-child,
.n-button.action-button {
  justify-content: center;
}

.n-button img {
  margin-right: 8px;
}

.text-editor textarea {
  min-width: 300px;
  width: 850px;
  min-height: 500px;
  background: #fff;
  border: 1.5px solid #e0e0e0;

  box-shadow: 0 4px 24px #0002;
  font-size: 1.15rem;
  line-height: 1.7;
  padding: 2.5rem;

  transition: all 200ms;
  font-family: "Georgia", "Times New Roman", serif;
}

.text-editor textarea:focus {
  border: 1.5px solid #5d81a3;
  box-shadow: 0 0 0 2px #5d81a355;
}
</style>
