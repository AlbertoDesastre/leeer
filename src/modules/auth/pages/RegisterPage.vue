<template>
  <section class="register-wrapper">
    <!-- El componente me acepta las rules como objeto y las linkea. El atributo de objeto "password" se linkeará con aquel input que tenga un "path" con el mismo nombre.  -->
    <!-- ":model" y ":rules" son Props definidas por la gente de Nativeui. En realidad es un binding de Vue (https://vuejs.org/api/built-in-directives.html#v-bind). Al bindear, dentro de la lógica del componente hace checkeos con los atributos del objeto. Lo más seguro es que dentro del componente n-form haga un checkeo con, por ejemplo, "form.nickname" y "rules.nickname" y haga las comprobaciones de las reglas. En caso de que no se cumpla busca a su elemento hijo "n-item" y despliega el error allí <3 -->
    <n-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-placement="top"
      size="small"
      class="register-form"
    >
      <!-- Avatar -->
      <div class="avatar-wrapper">
        <n-avatar round :size="64" :src="fallback_icon" :fallback-icon="fallback_icon" />
      </div>
      <!-- Inputs -->
      <n-form-item label="Nickname" path="nickname">
        <!-- v-model da un binding en dos direcciones: 1) Si el usuario edita la propiedad se actualiza en el código. 2) Si se actualiza en el código mediante alguna lógica (reseteo, por ejemplo) se ve en la interfaz -->
        <n-input v-model:value="form.nickname" placeholder="Introduce tu nickname" />
      </n-form-item>
      <n-form-item label="Descripción" path="description">
        <n-input
          v-model:value="form.description"
          type="textarea"
          placeholder="¡Me gustan las historias de romance y estoy en proceso de escribir mi primer libro!"
        />
      </n-form-item>
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
      <n-form-item label="Repite la contraseña" path="passwordRepeat">
        <n-input
          v-model:value="form.passwordRepeat"
          type="password"
          show-password-on="mousedown"
          placeholder="Repite tu contraseña"
        />
      </n-form-item>
      <!-- Submit -->
      <n-button type="primary" block @click="handleSubmit">Registrarse</n-button>
      <RouterLink :to="{ name: 'login' }" class="close-button">¿Ya tienes una cuenta?</RouterLink>
    </n-form>

    <!-- Transition is a Vue component for this kind of situations -->
    <Transition v-if="isLoading">
      <p class="loading">CARGANDO <span class="dots"></span></p>
    </Transition>
  </section>

  <n-alert v-if="error.message" type="error" class="error-tab" :title="'¡Vaya!'" :closable="true"
    >{{ error.message }}
  </n-alert>
</template>

<script setup lang="ts">
// Formulario de registro de usuario con avatar, nickname, descripción, email y doble contraseña
import { NForm, NFormItem, NInput, NButton, NAvatar, NAlert } from "naive-ui";
import type { FormInst, FormRules } from "naive-ui";
import { ref } from "vue";

import fallback_icon from "../../../../imgs/gato-escritor.png";
import { useAuth } from "../composables/useAuth";
import { useRouter } from "vue-router";

const { register, error, isLoading } = useAuth();
const router = useRouter();
const formRef = ref<FormInst | null>(null);
// Estos son los valores del formulario, que inicializo por defecto
const form = ref({
  nickname: "",
  description: "",
  profile_picture: "", // no existe un input para cambiar el valor de este. TODO: Poder guardar imágenes en BD.
  email: "",
  password: "",
  passwordRepeat: "",
});

/* Algunas reglas de FormRules vienen explicadas en su librería de componentes original, aquí: https://www.naiveui.com/en-US/light/components/form#API
¡OJO! Pero todas las reglas vienen en realidad de otra librería llamada "async-validator" que es la que realmente valida los datos: https://github.com/yiminghe/async-validator */
const rules: FormRules = {
  /* En resumen, se rellenan los atributos del input (por ejemplo, "required"), el mensaje del error (explicado en "FormItemRule Type" de la doc naiveui) y qué activa ese mensaje, en este caso cuando el input tenga el evento "blur" */
  nickname: [{ required: true, message: "El nickname es obligatorio", trigger: "blur" }],
  description: [{ required: true, message: "La descripción es obligatoria", trigger: "blur" }],
  email: [
    { required: true, message: "El email es obligatorio", trigger: "blur" },
    { type: "email", message: "Introduce un email válido", trigger: "blur" },
  ],
  password: [{ required: true, message: "La contraseña es obligatoria", trigger: "blur" }],
  passwordRepeat: [
    { required: true, message: "Repite la contraseña", trigger: "blur" },
    {
      // Pongo "_" porque en realidad no le quiero pasar
      validator(_, value) {
        // Esta función de validator es muy útil si, por ejemplo, tengo que validar estos datos en la BBDD y mandar un error custom.
        return value === form.value.password;
      },
      message: "Las contraseñas no coinciden",
      trigger: "blur",
    },
  ],
};

async function handleSubmit() {
  // Creo y hago await inmediatamente a la promsea, de tal forma que me queda una constante booleana al ejecutar la función.
  const isFormValid: Boolean = await new Promise((resolve) => {
    /* El "formRef" tiene el tipo FormInst. Ese tipo incorpora un método "validate" incrustado a cada valor. Por eso se puede usar esta función aquí, me la proveé Nativeui */
    formRef.value?.validate((errors) => {
      // el método validate de async-validator devuelve una promesa!
      resolve(!errors); // "errors" del callback es un booleano. Si NO hay errores (false) significa entonces que el formulario es VÁLIDO, por lo tanto resuelvo con un !errors para indicar "true"
    });
  });

  if (isFormValid) {
    const result = await register({ ...form.value });
    // si result === null significa que hubo un error. Esto lo actualiza useAuth() solo
    if (result !== null) {
      router.push({ name: "home" });
    }
  }
}
</script>

<style scoped>
.register-form {
  max-width: 350px;
  margin: 7rem auto 0px auto;
  padding: 30px 20px 15px 20px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0px 2px 16px 0 rgba(0, 0, 0, 0.15);
}

.avatar-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 0.7rem 1.7rem;
  border-radius: 4px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  font-size: 1.1rem;
  z-index: 10;
}

.dots::after {
  content: "";
  display: inline-block;
  width: 1em;
  text-align: left;
  animation: dots 1.2s steps(4, end) infinite;
}

@keyframes dots {
  0% {
    content: "";
  }
  25% {
    content: ".";
  }
  50% {
    content: "..";
  }
  75% {
    content: "...";
  }
  100% {
    content: "";
  }
}

.error-tab {
  margin: 0 auto;
  max-width: 350px;
}

.close-button {
  display: block;
  margin-left: auto;
  margin-top: 10px;
  color: gray;
  font-size: 14px;
  cursor: pointer;
  width: fit-content;
  padding: 4px;
  transition: all 200ms;
}

.close-button:hover {
  color: var(--color-action-blue);
}
</style>
