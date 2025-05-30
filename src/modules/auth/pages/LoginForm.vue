<template>
  <section class="login-wrapper">
    <!-- Formulario en si -->
    <n-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-placement="top"
      size="large"
      class="login-form"
    >
      <!-- Avatar -->
      <div class="avatar-wrapper">
        <n-avatar round :size="64" :src="fallback_icon" :fallback-icon="fallback_icon" />
      </div>
      <!-- Inputs -->
      <n-form-item label="Email" path="email">
        <n-input v-model:value="form.email" placeholder="Introduce tu email" />
      </n-form-item>
      <n-form-item label="Contraseña" path="password">
        <!-- show-password-on es una prop del componente. Es un ojito que si le pasas "mousedown" y lo mantienes pulsado te muestra el input. Me encanta -->
        <n-input
          v-model:value="form.password"
          type="password"
          show-password-on="mousedown"
          placeholder="Introduce tu contraseña"
        />
      </n-form-item>
      <!-- Submit -->
      <n-button type="primary" block @click="handleSubmit">Iniciar sesión</n-button>
    </n-form>
    <!-- Banner con imagen + texto -->
    <section class="form-banner-container">
      <img class="form-banner" :src="personas_escribiendo" />
      <article>
        <h2>¿Se te ha ocurrido una idea nueva?</h2>
        <p>compártela con el mundo</p>
      </article>
    </section>
  </section>
  <!-- El componente me acepta las rules como objeto y las linkea. El atributo de objeto "password" se linkeará con aquel input que tenga un "path" con el mismo nombre.  -->
  <!-- ":model" y ":rules" son Props definidas por la gente de Nativeui. En realidad es un binding de Vue (https://vuejs.org/api/built-in-directives.html#v-bind). Al bindear, dentro de la lógica del componente hace checkeos con los atributos del objeto. Lo más seguro es que dentro del componente n-form haga un checkeo con, por ejemplo, "form.nickname" y "rules.nickname" y haga las comprobaciones de las reglas. En caso de que no se cumpla busca a su elemento hijo "n-item" y despliega el error allí <3 -->
</template>

<script setup lang="ts">
// Formulario de registro de usuario con avatar, nickname, descripción, email y doble contraseña
import { NForm, NFormItem, NInput, NButton, NAvatar } from "naive-ui";
import type { FormInst, FormRules } from "naive-ui";
import { ref } from "vue";
import fallback_icon from "../../../imgs/gato-detective.png";
import personas_escribiendo from "../../../imgs/personas-escribiendo.png";

const formRef = ref<FormInst | null>(null);
// Estos son los valores del formulario, que inicializo por defecto
const form = ref({
  email: "",
  password: "",
});

/* Algunas reglas de FormRules vienen explicadas en su librería de componentes original, aquí: https://www.naiveui.com/en-US/light/components/form#API
¡OJO! Pero todas las reglas vienen en realidad de otra librería llamada "async-validator" que es la que realmente valida los datos: https://github.com/yiminghe/async-validator */
const rules: FormRules = {
  /* En resumen, se rellenan los atributos del input (por ejemplo, "required"), el mensaje del error (explicado en "FormItemRule Type" de la doc naiveui) y qué activa ese mensaje, en este caso cuando el input tenga el evento "blur" */
  email: [
    { required: true, message: "El email es obligatorio", trigger: "blur" },
    { type: "email", message: "Introduce un email válido", trigger: "blur" },
  ],
  password: [{ required: true, message: "La contraseña es obligatoria", trigger: "blur" }],
};

function handleSubmit() {
  /* El "formRef" tiene el tipo FormInst. Ese tipo incorpora un método "validate" incrustado a cada valor. Por eso se puede usar esta función aquí, me la proveé Nativeui */
  formRef.value?.validate((errors) => {
    if (!errors) {
      // Aquí iría la lógica de registro/envío
      alert("Formulario válido");
    }
  });
}
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  max-height: 400px;
  position: relative;
}

.login-form,
.form-banner-container {
  box-shadow: 0px 10px 16px 0px rgba(0, 0, 0, 0.2);
}

.login-form {
  max-width: 350px;
  padding: 30px 20px 20px 20px;
  background: #fff;
  border-radius: 6px 0px 0px 6px;
}

.avatar-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.form-banner-container {
  position: relative;
  width: 290px;
}

.form-banner-container::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(135, 46, 6, 0.4);
  z-index: 1;
}

.form-banner {
  height: 100%;
  width: 100%;
}

.form-banner-container article {
  position: absolute;
  text-align: center;
  font-size: 1.25rem;
  top: 28%;
  left: 0;
  width: 100%;
  z-index: 2; /* El texto está por encima de todo */
  color: #fff;
}

.form-banner-container article p {
  font-size: 16px;
}
</style>
