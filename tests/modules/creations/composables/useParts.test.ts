import { describe, test, expect } from "vitest";
import { useParts } from "../../../../src/modules/creations/composables/useParts";

describe("useParts (composable)", () => {
  const { formatPartsForTableColumns } = useParts();
  const isoDate = "2025-07-09T17:28:40.000Z"; // 09/07/2025 will be the final format
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
    const partReturned = {
      title: expect.any(String),
      type: expect.arrayContaining([expect.any(String)]),
      authors: expect.any(String),
      date: expect(isoDate).toBe(new Date(isoDate).toLocaleDateString()),
    };

    console.log(parts);
    expect(parts[0]).toMatchObject(partReturned);
  });

  test("should return exclusively 'ORIGINAL' type if 'isOriginal' == true", async () => {});
});
