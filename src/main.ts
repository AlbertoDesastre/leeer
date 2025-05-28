import { createApp } from "vue";
import App from "./App.vue";

import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import { create, NButton, NForm, NFormItem, NInput } from "naive-ui";

const app = createApp(App);

app.use(createPinia());
app.use(
  createRouter({
    history: createWebHistory(),
    routes: [
      /* tus rutas */
    ],
  })
);

app.use(
  create({
    components: [NButton, NForm, NFormItem, NInput /* los que uses */],
  })
);

app.mount("#app");
