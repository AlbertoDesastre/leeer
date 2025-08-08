# Leeer (Frontend)

Plataforma colaborativa de escritura y lectura de obras literarias, desarrollada en Vue 3 + TypeScript + Naive UI.

## ¿Qué es Leeer?

Leeer es una aplicación web que permite a cualquier usuario:

- Buscar, leer y explorar obras literarias de otros autores.
- Crear sus propias obras y gestionarlas desde un escritorio personal.
- Colaborar en obras de otros usuarios mediante un sistema de peticiones y partes colaborativas (fanfiction, spinoff, canon, etc).
- Visualizar y navegar fácilmente entre capítulos, autores y colaboraciones.

El objetivo es fomentar la creatividad, la colaboración y la comunidad en torno a la escritura.

---

## Características principales

- **Registro y login de usuarios** con validación y avatares.
- **Navegación moderna**: búsqueda, detalles de obra, lectura de partes, escritorio de autor.
- **Gestión de obras**: creación, edición, visualización y colaboración.
- **Sistema de partes**: cada obra puede tener partes originales y colaborativas, con navegación entre capítulos.
- **UI/UX limpia y responsiva** usando Naive UI.
- **Integración total con la API RESTful** (ver más abajo).

---

## Instalación y puesta en marcha

### 1. Clona el repositorio

```sh
git clone https://github.com/AlbertoDesastre/leeer
cd leeer
```

### 2. Instala las dependencias

```sh
npm install
```

### 3. Configura el entorno

- Copia el archivo `example.env` a `.env` si necesitas variables de entorno personalizadas.
- Por defecto, la app espera que la API esté disponible en `http://localhost:3000`.

### 4. Arranca el proyecto en modo desarrollo

```sh
npm run dev
```

### 5. Accede a la web

- Abre tu navegador en [http://localhost:5173](http://localhost:5173) (o el puerto que indique la consola).

---

## Pruebas unitarias y de componentes

- El proyecto incluye **pruebas unitarias** y de lógica de composables, así como pruebas de componentes Vue.
- Las pruebas están escritas usando **[Vitest](https://vitest.dev/)**, el framework recomendado para proyectos Vue 3 + TypeScript.
- Se siguen buenas prácticas como:
  - Mockeo de peticiones `fetch` para aislar la lógica de red.
  - Tests enfocados en lógica de transformación y formateo de datos.
  - Estructura de tests por módulos y funcionalidades.
- Puedes encontrar ejemplos en `tests/modules/creations/composables/`.

### ¿Cómo correr las pruebas?

```sh
npm run test
```

O directamente:

```sh
npx vitest run
```

---

## Backend/API

Este frontend consume la API RESTful disponible en:
**https://github.com/AlbertoDesastre/leeer-backend**

Consulta el README de ese repositorio para instrucciones de instalación y configuración de la API.

---

## Notas técnicas

- Proyecto estructurado en módulos: `auth`, `creations`, `desk`, `common`, etc.
- Uso de composables para la lógica reutilizable (fetch, transformación de datos, etc).
- Navegación protegida para el escritorio (solo usuarios logueados).
- Tests unitarios y de componentes recomendados con Vitest + Vue Test Utils.

---

¿Dudas? Consulta el código fuente o contacta con el autor.
