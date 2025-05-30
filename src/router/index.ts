import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../modules/home/HomeView.vue";

/* Configuración de las rutas */
export const router = createRouter({
  /* Esto me toma la raiz del proyecto, es decir, el puerto que la corra + "/" */
  history: createWebHistory(import.meta.env.BASE_URL),
  /* Path le asigna la ruta que renderizará el componente a la derecha. El "name" es un nombre que le damos para que se accedan rápidamente a través de un "<RouterLink :to='name'/>" */
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "/creations",
          name: "creations",
          component: () => import("../modules/creations/creationsView.vue"),
        },
      ],
    },
    /* Estos imports lo que hacen es cargar en memoria el componente SOLO cuando se visite su página, por eso lo pongo todo el rato */
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
  ],
});

/* Guard para cuando no estás */
router.beforeEach((to, _from, next) => {
  /* La manera de leer esto es "cuando el usuario es "cuando el usuario vaya hacia 'desk' y no tenga esta propiedad lo redirijo a otro sitio" */
  if (to.name === "desk" && to.query.isLogged !== "true") {
    // Si no está logeado, redirige a login
    return next({ name: "login" });
  }
  /* Si se verifica el estado de loggin entonces le deja pasar a donde quería ir, en este caso, a desk. */
  next();
});

export default router;
