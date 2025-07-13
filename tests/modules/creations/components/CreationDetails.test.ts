import { mount } from "@vue/test-utils";
import CreationDetails from "../../../../src/modules/creations/components/CreationDetails.vue";

describe("<CreationDetails/>", () => {
  test("should show a fallback image if no one was provided", () => {
    const creation = {
      creation_id: "13189de3-c0c3-409e-897a-242d26d59105",
      title: "Obra de MaryShelley",
      is_draft: false,
      synopsis: "Una obra creada por MaryShelley como parte del seeder.",
      description: null,
      thumbnail: "",
      creation_date: "2025-07-09T17:28:38.000Z",
      modification_date: "2025-07-09T17:28:38.000Z",
      user: {
        user_id: "f2e6e9b7-1d42-4bcf-b3db-c2d4b02e63e2",
        nickname: "MaryShelley",
        email: "mary.shelley@gothic.com",
        profile_picture: "https://example.com/avatar7.jpg",
        description: "Pionera del horror y la ciencia ficción.",
      },
    };

    const wrapper = mount(CreationDetails, {
      props: {
        creation,
        isAuthor: false,
        displayCoAuthors: false,
      },
    });
  });
});
