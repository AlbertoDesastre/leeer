import type { User } from "../../auth/types";
import type { Part } from "../types";

/* Ahora sí que uso la interface porque necesito extender todo lo que me viene de Part */
export interface PartWithCollab extends Part {
  user: User;
  isCollaboration: boolean;
  isOriginal: boolean;
  collaborationType: string[];
}

export type ColumnData = {
  title: string;
  type: string[];
  authors: string;
  date: string;
};

/* Un composable es equivalente a un Hook de react, que son funciones/lógica que se aparta de la interfaz y luego se ejecuta en el componente */
export const useParts = () => {
  const formatPartsForTableColumns = (parts: PartWithCollab[]): ColumnData[] => {
    return parts.map((part) => {
      let type: string[];

      if (part.isOriginal) {
        type = ["ORIGINAL"];
      } else {
        // recorre el array de strings, los pone a mayúsculas
        type = part.collaborationType.map((type) => type.toUpperCase() + " ");
      }

      return {
        title: part.title,
        type,
        authors: part.user ? `@${part.user.nickname}` : "",
        date: new Date(part.creation_date).toLocaleDateString(),
      };
    });
  };

  const getPartsOf = async (creation_id: string) => {
    const parts = await fetch(`http://localhost:3000/creations/${creation_id}/parts/collab-info`)
      .then((response) => response.json())
      .then((data) => data as PartWithCollab[])
      .catch((err) => {
        console.log(err);
      });

    return parts;
  };

  // Devuelve el objeto de mi composable con datos o funciones
  return {
    getPartsOf,
    formatPartsForTableColumns,
  };
};
