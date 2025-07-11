import { describe, test, expect } from "vitest";
import { useParts } from "../../../../src/modules/creations/composables/useParts";

describe("useParts (composable)", () => {
  const { formatPartsForTableColumns } = useParts();
  const isoDate = "2025-07-09T17:28:40.000Z"; // 09/07/2025 will be the final format
  const partReturned = {
    title: expect.any(String),
    type: expect.arrayContaining([expect.any(String)]),
    authors: expect.any(String),
    date: expect.any(String),
  };
  const fakeParts = [
    {
      part_id: "a",
      title: 'Parte 2 de "Obra de AgathaChristie"',
      content: "Contenido ficticio de la parte 2 escrita por AgathaChristie.",
      word_count: null,
      reading_time: null,
      thumbnail: "https://example.com/thumbnails/agathachristie-2.jpg",
      is_draft: false,
      creation_date: isoDate,
      modification_date: isoDate,
      user: {
        user_id: "dea601c8-697b-477c-aa09-ba4dd238d7f2",
        nickname: "AgathaChristie",
        email: "agatha.christie@mail.com",
        profile_picture: "https://example.com/avatar1.png",
        description: "Maestra del misterio y el crimen.",
      },
      isCollaboration: false,
      isOriginal: true,
      collaborationType: [],
    },
    {
      part_id: "8952126d-166c-4c9e-b35f-0f88685875d7",
      title: 'Parte 3 de "Obra de AgathaChristie"',
      content: "Contenido ficticio de la parte 3 escrita por AgathaChristie.",
      word_count: null,
      reading_time: null,
      thumbnail: "https://example.com/thumbnails/agathachristie-3.jpg",
      is_draft: false,
      creation_date: isoDate,
      modification_date: isoDate,
      user: {
        user_id: "dea601c8-697b-477c-aa09-ba4dd238d7f2",
        nickname: "AgathaChristie",
        email: "agatha.christie@mail.com",
        profile_picture: "https://example.com/avatar1.png",
        description: "Maestra del misterio y el crimen.",
      },
      isCollaboration: true,
      isOriginal: false,
      collaborationType: ["spinoff", "canon"],
    },
  ];

  test("should return an array of objects with limited attributes", () => {
    const parts = formatPartsForTableColumns(fakeParts);

    expect(parts[0]).toMatchObject(partReturned);
  });

  test("should return a date formatted as dd/mm/YYYY", () => {
    const parts = formatPartsForTableColumns(fakeParts);

    expect(parts[0].date).toBe(new Date(isoDate).toLocaleDateString());
  });

  test("should return type with only ['ORIGINAL'] if 'isOriginal' == true", async () => {
    const parts = formatPartsForTableColumns(fakeParts);

    // first element of parts contains "isOriginal" == true and "isColaboration" == false
    expect(parts[0].type.length).toEqual(1);
  });

  test("should return more than one type if it's not original and get them in uppercase", async () => {
    const parts = formatPartsForTableColumns(fakeParts);
    const collab = parts[1];

    expect(collab.type.length).toEqual(2);
    expect(collab.type).toMatchObject(["SPINOFF", "CANON"]);
  });

  test("should return an empty string if no user was found in the response", async () => {
    const part = {
      part_id: "a",
      title: 'Parte 2 de "Obra de AgathaChristie"',
      content: "Contenido ficticio de la parte 2 escrita por AgathaChristie.",
      word_count: null,
      reading_time: null,
      thumbnail: "https://example.com/thumbnails/agathachristie-2.jpg",
      is_draft: false,
      creation_date: isoDate,
      modification_date: isoDate,
      // no user provided
      isCollaboration: false,
      isOriginal: true,
      collaborationType: [],
    };

    const parts = formatPartsForTableColumns([part] as any); // I force the type since in execution time it could happen that the user is not in response. Replicating this in dev mode is not possible since type errors exist.

    expect(parts[0].authors.length).toEqual(0);
    expect(parts[0].authors).toEqual("");
  });

  test("should return author nickname", async () => {
    const parts = formatPartsForTableColumns(fakeParts);

    expect(parts[0].authors).toEqual("@" + fakeParts[0].user.nickname);
  });
});
