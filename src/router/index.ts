import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../modules/home/HomeView.vue";

export const router = createRouter({
  /* Esto me toma la raiz del proyecto, es decir, el puerto que la corra + "/" */
  history: createWebHistory(import.meta.env.BASE_URL),
  /* Path le asigna la ruta que renderizará el componente a la derecha. El "name" es un nombre que le damos para que se accedan rápidamente a través de un "<RouterLink :to='name'/>" */
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/login", name: "login", component: () => import("../modules/auth/pages/LoginPage.vue") },
    {
      path: "/register",
      name: "register",
      component: () => import("../modules/auth/pages/RegisterPage.vue"),
    },
    {
      path: "/desk",
      name: "desk",
      component: () => import("../modules/desk/DeskView.vue"),
    },
    {
      path: "/creations",
      name: "creations",
      component: () => import("../modules/creations/creationsView.vue"),
    },
  ],
});
