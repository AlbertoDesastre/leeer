# AGENTS.md — leeer

Estas instrucciones son obligatorias para cualquier agente que modifique este repositorio.

## 1. Regla de alcance: decide primero qué app toca la tarea

Antes de leer código, clasifica la tarea:

- **Web/SEO/landing/app web** -> `apps/web`.
- **iOS/Android/Expo/React Native** -> `apps/mobile`.
- **API, operaciones privilegiadas, reglas de servidor, integraciones o persistencia** -> `apps/back`.
- **Migraciones/configuración local de BBDD** -> `supabase`.
- **Requisitos/documentación** -> `docs`.

Si la tarea afecta una sola app, está **prohibido** explorar las demás "por si acaso".

### Presupuesto de contexto

Está absolutamente prohibido leer más archivos de los necesarios para entender y resolver la tarea.

Secuencia recomendada:

1. Lee este `AGENTS.md`.
2. Lee el `package.json` de la app objetivo si necesitas conocer scripts o dependencias.
3. Lee la ruta/feature directamente relacionada con la petición.
4. Sigue únicamente imports o tests necesarios para esa modificación.

No hagas escaneos recursivos del repositorio (`find .`, `tree` completo, `grep -R` global, volcado de todos los archivos) como forma de "ganar contexto". No leas `apps/back` para una tarea puramente visual de `apps/web`; no leas `apps/web` para un endpoint aislado del backend; no inspecciones `supabase` salvo que la tarea afecte persistencia o contratos de datos.

Si falta contexto, amplía la lectura de manera incremental y justificada.

## 2. Gestor de paquetes: solo pnpm

- **npm está absolutamente prohibido.**
- También están prohibidos Yarn y Bun.
- Usa exclusivamente pnpm.
- El único lockfile válido es `pnpm-lock.yaml` en la raíz.
- Nunca crees ni incluyas `node_modules` dentro de `apps/*` o `packages/*` en commits/artefactos.
- Las versiones compartidas se gestionan con el `catalog` de `pnpm-workspace.yaml`.
- Cada app debe declarar solo las dependencias que usa en su propio `package.json`.

Comandos:

```bash
pnpm install
pnpm --filter @leeer/web add <package>
pnpm --filter @leeer/mobile add <package>
pnpm --filter @leeer/back add <package>
```

No añadas una dependencia a la raíz para hacerla accidentalmente accesible a todas las apps.

## 3. Supabase: remoto terminantemente prohibido

Un agente no puede ejecutar operaciones remotas de Supabase bajo ninguna circunstancia.

- Prohibido `supabase link`.
- Prohibido `supabase db push` remoto.
- Prohibido desplegar Edge Functions.
- Prohibido modificar secrets remotos.
- Prohibido consultar/modificar proyectos remotos con CLI.
- Prohibido cualquier comando Supabase que pueda apuntar al proyecto remoto.

**Solo se permite ejecutar un comando de Supabase cuando incluye explícitamente `--local`.** Si el subcomando necesario no admite `--local`, no lo ejecutes: explica la limitación y pide al usuario que lo haga manualmente si procede.

Nunca uses credenciales de producción para pruebas.

## 4. Arquitectura general

```text
apps/web     -> cliente Next.js
apps/mobile  -> cliente Expo/React Native
apps/back    -> API Express
supabase     -> persistencia/migraciones locales
```

Los clientes no deben conocer detalles de tablas de Supabase para operaciones de dominio. Deben consumir la API cuando la operación forme parte del dominio o requiera garantías de servidor.

Supabase puede ser la implementación actual de persistencia, pero no es el dominio.

## 5. Frontend: organización por feature

Tanto `apps/web` como `apps/mobile` siguen esta convención:

```text
src/features/{feature}/
├── components/
├── dtos/
├── hooks/
├── pages/
├── services/
└── index.ts
```

No crees carpetas vacías por cumplir la forma; crea solo las necesarias.

- `components/`: UI de la feature.
- `dtos/`: schemas Zod y tipos inferidos de las respuestas/peticiones HTTP que consume el cliente.
- `hooks/`: coordinación de estado React y efectos.
- `pages/`: composición de pantalla completa.
- `services/`: cliente HTTP y transformaciones propias del frontend.
- `index.ts`: API pública de la feature.

### Rutas delgadas

- Next.js: `app/**/page.tsx` solo resuelve la ruta y renderiza una página de feature.
- Expo Router: `app/**/*.tsx` solo resuelve navegación y renderiza una página de feature.
- No metas reglas de negocio en archivos de ruta.

### Dependencias base de frontend

- TypeScript estricto.
- Zod para validar datos no confiables y contratos.
- Tailwind en web.
- NativeWind + Tailwind en mobile.
- Vitest para lógica TypeScript compartible/pura. En mobile, no fuerces Vitest para tests nativos que dependan del runtime de React Native si la herramienta no los soporta correctamente; documenta y acuerda una alternativa antes de añadir otro runner.

## 6. Backend: Express + screaming architecture

`apps/back` se organiza **por feature**. Cada feature agrupa controllers, services, DTOs y su router.

```text
src/features/{feature}/
├── controllers/
├── dtos/
├── services/
├── routes.ts
└── index.ts
```

Reglas:

- La estructura debe "gritar" `stories`, `characters`, `beta-testing`, etc., no `controllers/` o `services/` globales.
- Controllers: traducen HTTP a servicio y construyen la respuesta HTTP.
- Services: reglas de negocio, orquestación y acceso a datos (repositorios, Supabase, etc.).
- DTOs: schemas Zod y tipos inferidos del boundary HTTP; schema y tipo viven en el mismo archivo.
- No accedas a Supabase directamente desde controllers.
- No introduzcas un ORM o framework adicional sin una necesidad concreta.

### API

- Prefijo: `/api/v1` para dominio; `/api/health` para salud.
- JSON por defecto.
- Errores esperables deben tener forma estable: `{ "error": { "code": string, "message": string } }`.
- No expongas errores internos, SQL, stack traces ni credenciales al cliente.

## 7. Separación respecto a la BBDD

Para facilitar una futura salida de Supabase:

- El acceso a datos vive en `services/`, no en controllers.
- Los DTOs no son filas de BBDD; transforma en el servicio antes de responder.
- No propagues tipos generados de Supabase hasta frontend.
- Las migraciones de la implementación actual viven en `/supabase`.
- Cambiar Supabase por otra BBDD debería afectar principalmente servicios y migraciones, no controllers ni clientes.

## 8. Testing

Todo comportamiento nuevo o modificado requiere tests salvo cambios puramente documentales/configuración sin runtime.

- Runner base: Vitest.
- Backend: testea services sin levantar Express cuando sea posible; testea rutas solo para comportamiento HTTP relevante.
- Frontend: prioriza tests de services, validaciones, hooks y comportamiento visible importante.
- Tests cerca de la feature o en una carpeta `tests/` propia de la app; mantén una convención consistente dentro de cada app.
- No hagas tests que dependan de Supabase remoto.

Antes de cerrar una tarea ejecuta, para el workspace afectado, como mínimo `typecheck` y sus tests si las dependencias están instaladas.

## 9. TypeScript y validación

- `strict: true`.
- Evita `any`.
- `unknown` está permitido únicamente en boundaries y debe estrecharse/validarse antes de propagarse.
- Valida con Zod entradas HTTP, variables de entorno y datos externos no confiables.
- No dupliques manualmente un tipo cuando puede inferirse de un schema Zod.

## 10. Variables de entorno y secretos

- Nunca commits `.env` reales.
- Cada app puede tener `.env.example` con nombres y valores de ejemplo no sensibles.
- `apps/web`: variables públicas deben usar `NEXT_PUBLIC_` solo si realmente pueden exponerse al navegador.
- `apps/mobile`: variables embebidas son públicas por definición; nunca metas service-role keys.
- `apps/back`: secretos solo del servidor.

## 11. Documentación

- La documentación del proyecto se escribe en español.
- Actualiza `README.md`/`docs` cuando cambien arquitectura, scripts, setup o contratos relevantes.
- No documentes una estructura futura como si ya existiera.

## 12. Principio de mínima modificación

No aproveches una tarea local para refactorizar áreas no relacionadas. Si detectas un problema fuera del alcance, señálalo por separado; no amplíes el diff sin autorización.
