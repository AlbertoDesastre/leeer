<template>
  <CreationDetails :is-author="true" />

  <!-- El componente me acepta las rules como objeto y las linkea. El atributo de objeto "password" se linkeará con aquel input que tenga un "path" con el mismo nombre.  -->
  <!-- ":model" y ":rules" son Props definidas por la gente de Nativeui. En realidad es un binding de Vue (https://vuejs.org/api/built-in-directives.html#v-bind). Al bindear, dentro de la lógica del componente hace checkeos con los atributos del objeto. Lo más seguro es que dentro del componente n-form haga un checkeo con, por ejemplo, "form.nickname" y "rules.nickname" y haga las comprobaciones de las reglas. En caso de que no se cumpla busca a su elemento hijo "n-item" y despliega el error allí <3 -->
  <n-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-placement="top"
    size="small"
    class="update-creation-form"
  >
    <h2>Editar creación</h2>
    <!-- Imagen de la creación -->
    <div class="avatar-wrapper">
      <n-avatar round :size="64" :src="form.img" :fallback-icon="fallback_icon" />
    </div>
    <!-- Inputs -->
    <n-form-item label="Título" path="title">
      <n-input v-model:value="form.title" placeholder="Título de la creación" />
    </n-form-item>
    <n-form-item label="Descripción" path="description">
      <n-input
        v-model:value="form.description"
        type="textarea"
        placeholder="Descripción de la creación"
      />
    </n-form-item>
    <n-form-item label="Sinopsis" path="synopsis">
      <n-input
        v-model:value="form.synopsis"
        type="textarea"
        placeholder="Breve sinopsis de la creación"
      />
    </n-form-item>
    <n-form-item label="Autor" path="author">
      <n-input v-model:value="form.author" disabled />
    </n-form-item>
    <n-form-item label="¿Es un borrador?" path="isDraft">
      <n-radio-group v-model:value="form.isDraft">
        <n-radio :value="true">Sí, es un borrador solo visible para mí</n-radio>
        <n-radio :value="false">No, ¡Publicar!</n-radio>
      </n-radio-group>
    </n-form-item>
    <!-- Submit -->
    <n-button type="primary" block @click="handleSubmit">Actualizar creación</n-button>
  </n-form>
</template>

<script setup lang="ts">
// Formulario para actualizar una creación: título, descripción y autor
import { NForm, NFormItem, NInput, NButton, NAvatar, NRadioGroup, NRadio, NSpace } from "naive-ui";

import type { FormInst, FormRules } from "naive-ui";
import { ref } from "vue";
import fallback_icon from "../../../../imgs/gato-escritor.png";
import CreationDetails from "../../creations/components/CreationDetails.vue";

const formRef = ref<FormInst | null>(null);
// Estos son los valores del formulario, que inicializo por defecto
const form = ref({
  img: fallback_icon, // url de la imagen, por ahora el icono por defecto
  title: "Hombre busca sentido",
  description:
    "Relato sobre la experiencia en los campos de concentración y la búsqueda de sentido en la vida.",
  synopsis: "Una historia de superación y sentido vital en tiempos difíciles.",
  author: "@VictorFrankl",
  isDraft: true,
});

const rules: FormRules = {
  title: [{ required: true, message: "El título es obligatorio", trigger: "blur" }],
  description: [{ required: false }],
  synopsis: [{ required: true, message: "La sinopsis es obligatoria", trigger: "blur" }],
};

function handleSubmit() {
  /* El "formRef" tiene el tipo FormInst. Ese tipo incorpora un método "validate" incrustado a cada valor. Por eso se puede usar esta función aquí, me la proveé Nativeui */
  formRef.value?.validate((errors) => {
    if (!errors) {
      // Aquí iría la lógica de actualización/envío
      alert("Formulario válido");
    }
  });
}
</script>

<style lang="css" scoped>
.desk-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.update-creation-form {
  max-width: 350px;

  background: white;
  padding: 30px;
  border-radius: 6px;
  box-shadow: 0px 2px 16px 0 rgba(0, 0, 0, 0.15);
}

.update-creation-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.avatar-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
