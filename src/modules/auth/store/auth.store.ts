import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useLocalStorage } from "@vueuse/core";

import type { BasicUser } from "../types";

export const useAuthStore = defineStore("auth", () => {
  // NOTA 1: Hay que inicializar el estado siempre, aunque sea vacío. Cuando consuma este dato debo hacer la comprobación de si es NULL o no y hacer el return explícito.
  // NOTA 2: Las referencias no deberían ser editables desde fuera. Para leerlas o manipularlas hay que hacer sus funciones dedicadas.
  const user = ref(useLocalStorage<BasicUser>("user", { email: "", token: "" }));

  // Tengo que acostumbrarme a que la store siempre tiene que modificar el estado en cada una de sus acciones, independientemente de que guarde/elimine data en localStorage
  const cleanUser = () => {
    user.value = { email: "", token: "" };
    localStorage.removeItem("user");
  };

  const setUser = (userData: BasicUser) => {
    user.value = userData;
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return {
    // Properties
    user,
    // Getters
    storedUser: computed(() => user),
    noUser: computed(() => user.value.token === ""),
    // Actions
    setUser,
    cleanUser,
  };
});
