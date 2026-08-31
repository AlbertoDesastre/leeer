export const landingSections = [
  {
    id: "focus",
    shortTitle: "Escribe",
    kicker: "Sin ruido. Sin excusas.",
    title: "Escritura enfocada",
    description:
      "Un editor que se aparta cuando empiezas a escribir y mantiene cerca justo lo que necesitas.",
    points: ["Capítulos siempre ordenados", "Objetivos que sí puedes seguir", "Tu texto, limpio y a salvo"],
  },
  {
    id: "universe",
    shortTitle: "Construye",
    kicker: "Cada detalle cuenta.",
    title: "Tu universo narrativo",
    description:
      "Personajes, lugares y tramas conectados con la historia para que ninguna idea se pierda por el camino.",
    points: ["Fichas de personajes", "Lugares y reglas del mundo", "Relaciones fáciles de consultar"],
  },
  {
    id: "readers",
    shortTitle: "Comparte",
    kicker: "Feedback sin caos.",
    title: "Betatesters cerca",
    description:
      "Comparte versiones concretas y recibe comentarios útiles sin perseguir documentos ni mensajes sueltos.",
    points: ["Lecturas privadas", "Comentarios en contexto", "Control de cada versión"],
  },
] as const;

export function getNextLandingSectionIndex(currentIndex: number, key: string, total: number) {
  if (total <= 0) {
    return 0;
  }

  if (key === "Home") {
    return 0;
  }

  if (key === "End") {
    return total - 1;
  }

  if (key === "ArrowDown") {
    return (currentIndex + 1) % total;
  }

  if (key === "ArrowUp") {
    return (currentIndex - 1 + total) % total;
  }

  return currentIndex;
}
