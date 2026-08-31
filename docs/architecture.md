# Arquitectura técnica

## Objetivo

Leeer separa sus clientes de la lógica de servidor y de la tecnología de persistencia. La web y el móvil consumen la API HTTP; Express concentra los casos que no deben resolverse directamente desde cliente y abstrae el acceso a datos.

## Estructura

```text
leeer/
├── apps/
│   ├── web/       # Next.js
│   ├── mobile/    # Expo / React Native
│   └── back/      # Node.js / Express
├── design-system/leeer/  # MASTER.md: tokens y reglas visuales
├── supabase/      # configuración, migraciones y seed local
├── docs/
├── AGENTS.md
├── package.json
└── pnpm-workspace.yaml
```

## Frontends

Los dos clientes siguen organización por feature. Los archivos de ruta son delgados y delegan en páginas de feature.

```text
features/{feature}/
├── components/
├── dtos/
├── hooks/
├── pages/
├── services/
└── index.ts
```

`services/` contiene acceso a API y transformaciones propias del cliente; no debe contener reglas de negocio que tengan que ser consistentes entre plataformas o usuarios.

`dtos/` define los schemas Zod y tipos inferidos de las respuestas (y peticiones) que consume ese cliente. Cada app mantiene los suyos; no hay paquete compartido.

## Design system

La fuente visual es `design-system/leeer/MASTER.md`. Paleta Claude (papel `#f4f0e7`, tinta `#1e1b18`, acento `#a9362c`) mapeada a tokens semánticos. Web: Tailwind v4 `@theme` en `apps/web/app/globals.css`. Móvil: NativeWind `theme.extend` en `apps/mobile/tailwind.config.js`. Componentes usan utilidades semánticas (`bg-background`, `text-primary`), no hex.

## Backend: screaming architecture

La API se organiza por capacidades del producto, no por carpetas globales de controllers o services.

```text
features/stories/
├── controllers/
├── dtos/
├── services/
├── routes.ts
└── index.ts
```

- `controllers/`: traducen HTTP a llamadas de servicio y construyen la respuesta.
- `services/`: reglas de negocio, orquestación y acceso a datos (repositorios, Supabase, etc.).
- `dtos/`: schemas Zod y tipos inferidos del boundary HTTP de esa feature.
- `routes.ts`: define el router Express de la feature.
- `index.ts`: ensambla dependencias y exporta el router.

La estructura debe "gritar" `stories`, `characters`, `beta-testing`, etc. Los controllers no acceden a Supabase directamente; el acceso a datos vive en `services/`.

## DTOs

Un DTO es la forma estable de un recurso en el boundary HTTP. Con Zod, el schema es la fuente de verdad y el tipo se infiere con `z.infer`:

```typescript
export const storyDtoSchema = z.object({ ... });
export type StoryDto = z.infer<typeof storyDtoSchema>;
```

No se separan carpetas de "tipos" y "validators" como en NestJS: eso duplica definiciones. Cada feature del backend tiene su carpeta `dtos/`; los clientes replican solo los DTOs que consumen en su propia feature.

## Pnpm

Cada workspace declara sus dependencias. Las versiones comunes se fijan con el catálogo de pnpm y el árbol físico se mantiene hoisted en raíz para evitar múltiples `node_modules` visibles y mejorar compatibilidad con React Native.
