import { mount } from "@vue/test-utils";

import CreationDetails from "../../../../src/modules/creations/components/CreationDetails.vue";
import CoAuthorsDisplay from "../../../../src/modules/creations/components/CoAuthorsDisplay.vue";
import fallback_thumbnail from "../../../../imgs/fallback_thumbnail.png";

describe("<CreationDetails/>", () => {
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
      creation, // este creation tiene thumbnail = ""
      isAuthor: false,
      displayCoAuthors: false,
    },
  });
  test("notes about testing", async () => {
    //await wrapper.find("input[type='text']").setValue("abc");
    // 🎯 Simular eventos: trigger() para clicks, keypress, etc.
    // Otros eventos: "keypress.enter", "submit", "focus", "blur"
    //await wrapper.find("button").trigger("click // keypress.enter");
    // 📡 Verificar eventos emitidos: wrapper.emitted("nombreEvento")
    // [0] = primer evento emitido, [1] = segundo, etc. || ?.[0] = optional chaining por si no se emitió el evento
    //expect(wrapper.emitted("doOperation")?.[0]).toEqual("something");
    // 🔧 Acceder a datos del componente: wrapper.vm (Vue Model) || (wrapper.vm as any) = bypass TypeScript para acceder propiedades
    //  expect((wrapper.vm as any).something).toBe("");

    // 🔍 Más verificaciones:
    // .exists() - si existe el elemento
    // .isVisible() - si está visible
    // .text() - contenido de texto
    // .html() - HTML completo
    // .classes() - array de clases CSS
    // .attributes("src") - atributos específicos

    // 📊 Verificar props de componentes hijos:
    // wrapper.findComponent(MiComponente).props("miProp")

    expect(true).toBe(true);
  });

  test("should handle creation without user gracefully", () => {
    const creationWithoutUser = { ...creation, user: null } as any;

    const wrapper = mount(CreationDetails, {
      props: {
        creation: creationWithoutUser,
        isAuthor: false,
        displayCoAuthors: false,
      },
    });

    // No debería crashear, pero el strong podría estar vacío
    expect(wrapper.find("strong").text()).toBe("");
  });

  test("should render the component without the optional props", () => {
    const wrapper = mount(CreationDetails, {
      props: {
        creation,
      },
    });

    expect(wrapper.find("img").attributes("src")).toContain(fallback_thumbnail);
    expect(wrapper.find("img").attributes("alt")).toContain(creation.title);
    expect(wrapper.find("h2").text()).toContain(creation.title);
    expect(wrapper.find("strong").text()).toContain(creation.user.nickname);
    expect(wrapper.find("p.synopsis").text()).toContain(creation.synopsis); // it caught my attention that the clasess go right after the element name after a "."
    expect(wrapper.find("p.date").text()).toContain(
      new Date(creation.creation_date).toLocaleDateString()
    );
  });

  test("should show a fallback image and alt attribute if no thumbnail was provided", () => {
    const img = wrapper.find("img");

    expect(img.attributes("src")).toContain(fallback_thumbnail);
    expect(img.attributes("alt")).toContain(creation.title);
  });

  test("should show all data regarding creation", () => {
    const thumbnail = "doraemon.png";
    const wrapper = mount(CreationDetails, {
      props: {
        creation: { ...creation, thumbnail },
        isAuthor: false,
        displayCoAuthors: false,
      },
    });

    expect(wrapper.find("img").attributes("src")).toContain(thumbnail);
    expect(wrapper.find("img").attributes("alt")).toContain(creation.title);
    expect(wrapper.find("h2").text()).toContain(creation.title);
    expect(wrapper.find("strong").text()).toContain(creation.user.nickname);
    expect(wrapper.find("p.synopsis").text()).toContain(creation.synopsis); // it caught my attention that the clasess go right after the element name after a "."
    expect(wrapper.find("p.date").text()).toContain(
      new Date(creation.creation_date).toLocaleDateString()
    );
  });

  test("should show <CoAuthorsDisplay/> if 'displayCoAuthors': true", () => {
    const wrapper = mount(CreationDetails, {
      props: {
        creation, // este creation tiene thumbnail = ""
        isAuthor: false,
        displayCoAuthors: true,
      },
    });

    const coAuthorsComponent = wrapper.findComponent(CoAuthorsDisplay);
    expect(coAuthorsComponent.exists()).toBe(true);
  });

  test("should show button to collaborate if the user seeing this component is not the author", () => {
    expect(wrapper.find("span.n-button__content").text()).toContain("Colaborar en esta historia");
  });

  test("should NOT show CoAuthorsDisplay if displayCoAuthors is false", () => {
    const coAuthorsComponent = wrapper.findComponent(CoAuthorsDisplay);
    expect(coAuthorsComponent.exists()).toBe(false);
  });

  test("should NOT show collaborate button if user is the author", () => {
    const wrapper = mount(CreationDetails, {
      props: {
        creation,
        isAuthor: true, // autor
        displayCoAuthors: false,
      },
    });

    const collaborateButton = wrapper.find("span.n-button__content");
    expect(collaborateButton.exists()).toBe(false);
  });
});
