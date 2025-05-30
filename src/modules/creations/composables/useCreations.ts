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

  // Devuelve el objeto de mi composable con datos o funciones
  return {
    getCreations,
  };
};
