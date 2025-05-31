import type { Creation } from "../types";

/* Un composable es equivalente a un Hook de react, que son funciones/lógica que se aparta de la interfaz y luego se ejecuta en el componente */
export const useCreations = () => {
  // Aquí lo único que hago es definir la función, todavía no la estoy usando.
  const getCreations = async ({
    authorNickname,
    limit,
    offset,
  }: {
    authorNickname?: string;
    limit: number;
    offset: number;
  }) => {
    const api = authorNickname
      ? `http://localhost:3000/creations/author/${authorNickname}?limit=${limit}&offset=${offset}`
      : `http://localhost:3000/creations?limit=${limit}&offset=${offset}`;

    const creations = await fetch(api)
      .then((response) => response.json())
      .then((data) => data as Creation[])
      .catch((err) => {
        console.log(err);
      });

    return creations;
  };

  const getCreationsByName = async ({
    name,
    limit,
    offset,
  }: {
    name: string;
    limit: number;
    offset: number;
  }) => {
    const creations = await fetch(
      `http://localhost:3000/creations/${name}?limit=${limit}&offset=${offset}`
    )
      .then((response) => response.json())
      .then((data) => data as Creation[])
      .catch((err) => {
        console.log(err);
      });

    return creations;
  };

  // En realidad este método hace la misma llamada API que getCreationsByName pero para dejar más claro lo que hace la separo
  const getCreationsById = async (creation_id: string) => {
    const creations = await fetch(`http://localhost:3000/creations/${creation_id}`)
      .then((response) => response.json())
      .then((data) => data as Creation[])
      .catch((err) => {
        console.log(err);
      });

    return creations;
  };

  const getCreationsByTerm = async ({
    term,
    limit,
    offset,
  }: {
    term: string;
    limit: number;
    offset: number;
  }) => {
    const creations = await fetch(
      `http://localhost:3000/creations/all-by/${term}?limit=${limit}&offset=${offset}`
    )
      .then((response) => response.json())
      .then((data) => data as Creation[])
      .catch((err) => {
        console.log(err);
      });

    return creations;
  };

  // Devuelve el objeto de mi composable con datos o funciones
  return {
    getCreations,
    getCreationsByName,
    getCreationsByTerm,
    getCreationsById,
  };
};
