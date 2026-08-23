# Arquitectura técnica

## Objetivo

Leeer separa sus clientes de la lógica de servidor y de la tecnología de persistencia. La web y el móvil consumen contratos HTTP; la API Express concentra los casos que no deben resolverse directamente desde cliente y abstrae el acceso a datos mediante repositorios.

## Estructura

```text
leeer/
├── apps/
│   ├── web/       # Next.js
│   ├── mobile/    # Expo / React Native
│   └── back/      # Node.js / Express
├── packages/
│   └── contracts/ # Zod + tipos de contratos HTTP compartidos
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
├── hooks/
├── pages/
├── services/
└── index.ts
```

`services/` contiene acceso a API y transformaciones propias del cliente; no debe contener reglas de negocio que tengan que ser consistentes entre plataformas o usuarios.

## Backend: screaming architecture

La API se organiza por capacidades del producto, no por carpetas globales de controllers/services.

```text
features/stories/
├── domain/
│   ├── entities/
│   └── repositories/
├── application/
│   └── use-cases/
├── infrastructure/
│   └── repositories/
├── presentation/
│   ├── controllers/
│   ├── routes/
│   └── schemas/
└── index.ts
```

La dirección de dependencias es:

```text
presentation -> application -> domain
infrastructure -----------> domain
```

`application` depende de interfaces de repositorio del dominio, nunca de Supabase. La implementación de Supabase, PostgreSQL u otra BBDD vive en `infrastructure/`.

## Contratos compartidos

`packages/contracts` contiene schemas Zod que constituyen el contrato entre API y clientes. No contiene lógica de UI, acceso a base de datos ni casos de uso.

## Pnpm

Cada workspace declara sus dependencias. Las versiones comunes se fijan con el catálogo de pnpm y el árbol físico se mantiene hoisted en raíz para evitar múltiples `node_modules` visibles y mejorar compatibilidad con React Native.
