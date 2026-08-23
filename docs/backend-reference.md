# Referencia de arquitectura del backend

La prueba técnica `fero-checkout` se usó como referencia por su organización orientada a capacidades (`checkout/orders`, `checkout/quotes`) y separación router/controller/service.

Para leeer se conserva esa idea de **screaming architecture**, pero se añade una frontera explícita entre `domain`, `application`, `infrastructure` y `presentation` para que Express y Supabase no se filtren hacia los casos de uso.
