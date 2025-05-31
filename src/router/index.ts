import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../modules/home/HomeView.vue";

/* Configuración de las rutas */
export const router = createRouter({
  /* Esto me toma la raiz del proyecto, es decir, el puerto que la corra + "/" */
  history: createWebHistory(import.meta.env.BASE_URL),
  /* Path le asigna la ruta que renderizará el componente a la derecha. El "name" es un nombre que le damos para que se accedan rápidamente a través de un "<RouterLink :to='name'/>" */
  routes: [
    // Home y otras rutas que necesitan el TopHeader
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/creations",
      name: "creations",
      component: () => import("../modules/creations/CreationsView.vue"),
      /* Ahora creations es ruta Padre y search y details hijas, que comparten el componente TopHeader */
      children: [
        {
          path: "search",
          name: "creations-search",
          component: () => import("../modules/creations/pages/CreationSearcher.vue"),
        },
        {
          path: ":id",
          name: "creation-details",
          component: () => import("../modules/creations/pages/CreationPage.vue"),
        },
      ],
    },

    // Rutas sin TopHeader
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
    /* Si tira cualquier otra ruta desconocida redirige a Home */
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});

export default router;
