import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../modules/home/HomeView.vue";

export const router = createRouter({
  /* Esto me toma la raiz del proyecto, es decir, el puerto que la corra + "/" */
  history: createWebHistory(import.meta.env.BASE_URL),
  /* Path le asigna la ruta que renderizará el componente a la derecha. El "name" es un nombre que le damos para que se accedan rápidamente a través de un "<RouterLink :to='name'/>" */
  routes: [{ path: "/", name: "home", component: HomeView }],
});
