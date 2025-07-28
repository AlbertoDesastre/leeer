import { mount } from "@vue/test-utils";

import CoAuthorsDisplay from "../../../../src/modules/creations/components/CoAuthorsDisplay.vue";

describe("<CoAuthorsDisplay/>", () => {
  const images = [
    "../../../../imgs/gato-escritor.png",
    "../../../../imgs/perro-escritor.png",
    "../../../../imgs/cocodrilo-escritor.png",
  ];

  test("should show no images if none were provided", () => {
    const wrapper = mount(CoAuthorsDisplay, {
      props: {
        images: [],
      },
    });

    expect(wrapper.findAll("img").length).toBe(0);
  });

  test("should show a list with the same number of images provided", () => {
    const wrapper = mount(CoAuthorsDisplay, {
      props: {
        images,
      },
    });
    const imgElements = wrapper.findAll("img");

    expect(imgElements.length).toBe(images.length);
    // checks the rest of images
    imgElements.forEach((img, index) => {
      expect(img.attributes("src")).toBe(images[index]);
      expect(img.attributes("alt")).toBe("Coautor");
      expect(img.classes()).toContain(`coauthor-${index + 1}`);
    });
  });
});
