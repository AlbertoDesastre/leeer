<template>
  <section class="header-wrapper">
    <header>
      <router-link to="/">leeer</router-link>
      <div>
        <router-link to="/login">Iniciar sesión</router-link>
        <router-link to="/register">Registrarse</router-link>
      </div>
    </header>

    <nav class="navigation-wrapper">
      <!-- Navegación principal -->
      <div class="main-navigation">
        <router-link to="/desk" tabindex="0">Escritorio</router-link>
        <nav class="dropdown-wrapper">
          <!-- tabindex me permite desplegar el dropdown a conveniencia al hacer click en explorar -->
          <p tabindex="0">Explorar</p>
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

      <!-- Buscador y otras opciones -->
      <input type="text" placeholder="Buscar creaciones..." />

      <div class="user-navigation">
        <router-link to="/notificaciones">Notificación</router-link>
        <router-link to="/profile">Contacto</router-link>
      </div>
    </nav>
  </section>
</template>

<style scoped>
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
  padding: 0px 10px;
  justify-content: space-between;
  align-items: center;
}

.header-wrapper nav input {
  margin: 5px 0px;
  padding: 7px;
  border: none;
  border-radius: 5px;
}

.header-wrapper nav .main-navigation,
.header-wrapper nav .user-navigation {
  font-weight: 600;
  color: #fff;
}
.header-wrapper .main-navigation {
  gap: 0px;
  position: relative;
  z-index: 1;
}

.main-navigation .dropdown-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0px;
}

.main-navigation router-link,
.main-navigation p {
  width: 90px;
  padding: 20px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-navigation > :focus-within {
  background-color: #5d81a3;
}

.dropdown-wrapper ul {
  position: absolute;
  display: none;
  left: 0px;
  bottom: -60px;
  min-width: 90px;
}

.dropdown-wrapper:focus-within ul {
  display: block;
  background-color: #5d81a3;
}

.dropdown-wrapper ul li {
  padding: 0px;
  margin: 2px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1.5px solid #fff;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}

.dropdown-wrapper ul li router-link {
  padding: 0px;
}
</style>
