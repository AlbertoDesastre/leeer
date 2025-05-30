<template>
  <section class="header-wrapper">
    <header>
      <div>
        <router-link to="/login">Iniciar sesión</router-link>
        <router-link to="/register">Registrarse</router-link>
      </div>
    </header>

    <nav class="navigation-wrapper">
      <!-- Navegación principal -->
      <div class="main-navigation">
        <router-link to="/home">Home</router-link>
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

      <!--      <div class="user-navigation">
        <router-link to="/notificaciones">Notificación</router-link>
        <router-link to="/profile">Contacto</router-link>
      </div> -->
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
  font-size: 1.5rem;
}

.header-wrapper > header {
  justify-content: flex-end;
  align-items: center;
  font-size: 16px;
  padding: 16px 0 8px 0;
  margin-right: 10px;
}

.header-wrapper > header > div {
  display: flex;
  gap: 16px;
}

.header-wrapper nav {
  background-color: var(--color-main-brown);
  color: white;
  padding: 0px 10px;
  justify-content: space-between;
  align-items: center;
}

.header-wrapper nav input {
  min-width: 500px;
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

.main-navigation .dropdown-wrapper {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0px;
  margin-left: 8px;
}

.main-navigation router-link,
.main-navigation p {
  width: 130px;
  padding: 30px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-navigation > :focus-within {
  background-color: var(--color-action-blue);
}

.dropdown-wrapper ul {
  position: absolute;
  display: none;
  left: 0px;
  bottom: -98px;
  min-width: 90px;
}

.dropdown-wrapper:focus-within ul {
  display: block;
  background-color: var(--color-action-blue);
}

.dropdown-wrapper ul li {
  padding: 10px;
  margin: 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1.5px solid #fff;
  margin-left: auto;
  margin-right: auto;
}

.dropdown-wrapper ul li,
.dropdown-wrapper p {
  width: 130px;
}
.dropdown-wrapper ul li router-link {
  padding: 0px;
}
</style>
