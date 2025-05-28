<template>
  <section class="home-page">
    <!-- Logo y login/registro -->
    <section class="header-wrapper">
      <header>
        <router-link to="/">leeer</router-link>
        <div>
          <router-link to="/login">Iniciar sesión</router-link>
          <router-link to="/register">Registrarse</router-link>
        </div>
      </header>

      <nav>
        <div class="main-navigation">
          <router-link to="/desk">Escritorio</router-link>
          <nav class="dropdown-wrapper">
            <p>Explorar</p>
            <ul>
              <li>
                <router-link to="/creations">Creaciones</router-link>
              </li>
              <li>
                <router-link to="/authors">Autores</router-link>
              </li>
            </ul>
          </nav>
        </div>

        <input type="text" placeholder="Buscar creaciones..." />

        <div class="user-navigation">
          <router-link to="/notificaciones">Notificación</router-link>
          <router-link to="/profile">Contacto</router-link>
        </div>
      </nav>
    </section>

    <section class="creations-display">
      <h2>Continúa escribiendo...</h2>
      <ul class="creations-list">
        <li>
          <!-- Display de la creación -->
          <router-link to="/creation/1">
            <img src="../../../public/imgs/hombre-busca-sentido.webp" width="100px" height="100px" />
            <span>¡Colaborativo!</span>
          </router-link>
          <h4>Hombre busca sentido</h4>
          <!-- Otros links de interés -->
          <router-link to="/creation/1">
            <p>Parte 1</p>
          </router-link>
          <p>Por <router-link to="/author/1">Autor 1</router-link></p>
        </li>
        <li>
          <!-- Display de la creación -->
          <router-link to="/creation/1">
            <img src="../../../public/imgs/hombre-busca-sentido.webp" width="100px" height="100px" />
            <span>¡Colaborativo!</span>
          </router-link>
          <h4>Hombre busca sentido</h4>
          <!-- Otros links de interés -->
          <router-link to="/creation/1">
            <p>Parte 1</p>
          </router-link>
          <p>Por <router-link to="/author/1">Autor 1</router-link></p>
        </li>
        <li>
          <!-- Display de la creación -->
          <router-link to="/creation/1">
            <img src="../../../public/imgs/hombre-busca-sentido.webp" width="100px" height="100px" />
            <span>¡Colaborativo!</span>
          </router-link>
          <h4>Hombre busca sentido</h4>
          <!-- Otros links de interés -->
          <router-link to="/creation/1">
            <p>Parte 1</p>
          </router-link>
          <p>Por <router-link to="/author/1">Autor 1</router-link></p>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
</script>

<style scoped>
/* Header */
.header-wrapper nav,
.header-wrapper .main-navigation,
.header-wrapper .user-navigation,
.header-wrapper > header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.header-wrapper > header {
  justify-content: space-between;
  align-items: center;
  padding: 16px 0 8px 0;
}

.header-wrapper > header > a {
  font-size: 2rem;
  font-weight: bold;
  color: #872e06;
  text-decoration: none;
}
.header-wrapper > header > div {
  display: flex;
  gap: 16px;
}

.header-wrapper nav {
  background-color: rgb(135, 46, 6);
  color: white;
  padding: 5px 10px;
  justify-content: space-between;
  align-items: center;
}

.header-wrapper nav input {
  padding: 7px;
  border: none;
  border-radius: 5px;
}

/* Navegación principal */
.header-wrapper nav .main-navigation,
.header-wrapper nav .user-navigation {
  font-weight: 600;
  color: #fff;
}

.main-navigation .dropdown-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
}

.dropdown-wrapper ul {
  position: absolute;
  display: none;
  left: 20px;
  bottom: -25px;
}
.dropdown-wrapper:active ul {
  display: block;
}

.dropdown-wrapper ul li {
  margin: 2px 0px;
}
</style>
