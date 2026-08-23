# leeer

Monorepo de leeer con tres aplicaciones y contratos compartidos:

- `apps/web`: web pública y aplicación web con Next.js.
- `apps/mobile`: aplicación iOS/Android con Expo + React Native.
- `apps/back`: API Node.js + Express para lógica de servidor y acceso desacoplado a datos.
- `packages/contracts`: contratos Zod compartidos entre clientes y API.
- `supabase`: configuración y migraciones de Supabase, siempre en la raíz.
- `docs`: documentación del producto y arquitectura.

## Dependencias

El workspace usa **pnpm 11** y un único lockfile de raíz. Cada app declara únicamente las dependencias que necesita en su propio `package.json`. Las versiones compartidas se centralizan con el `catalog` de `pnpm-workspace.yaml`.

Se usa `nodeLinker: hoisted` para mantener un árbol físico de dependencias plano en el `node_modules/` de la raíz. No se debe versionar ningún `node_modules`.

### Instalar

```bash
corepack enable
pnpm run install:all
```

Solo una app y sus dependencias de workspace:

```bash
pnpm run install:web
pnpm run install:mobile
pnpm run install:back
```

Añadir una dependencia únicamente a una app:

```bash
pnpm run pkg:add:web -- <paquete>
pnpm run pkg:add:mobile -- <paquete>
pnpm run pkg:add:back -- <paquete>
```

Ejemplo: Express pertenece solo al backend porque solo `apps/back/package.json` lo declara.

## Desarrollo

```bash
pnpm run dev:web
pnpm run dev:mobile
pnpm run dev:back
```

O todas las apps a la vez:

```bash
pnpm run dev
```

## Calidad

```bash
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run check
```

## API

El backend expone `/api/v1/*`. Los clientes no deben depender de tablas, queries o detalles internos de Supabase para operaciones de dominio. La API usa puertos de repositorio para que el proveedor de base de datos pueda cambiar sin reescribir los casos de uso.

Ejemplos incluidos:

- `GET /api/health`
- `GET /api/v1/stories`
- `POST /api/v1/stories`

## Supabase

`supabase/` vive en la raíz. Consulta `AGENTS.md` antes de ejecutar cualquier comando: los comandos remotos están prohibidos en este repositorio para agentes.
