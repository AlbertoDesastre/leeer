import { vi } from "vitest";

import LoginPage from "../../../../src/modules/auth/pages/LoginPage.vue";
import { mount } from "@vue/test-utils";
import { RouterLink } from "vue-router";

// mock the vue router to check redirections
const mockRouter = { push: vi.fn(), replace: vi.fn(), go: vi.fn() };
vi.mock("vue-router", () => ({
  useRouter: () => mockRouter,
  useRoute: () => ({ name: "home" }),
}));

vi.mock("../../../../src/modules/auth/composables/useAuth", () => ({
  useAuth: () => ({ login: () => vi.fn(), register: () => vi.fn(), error: () => "texto de error" }),
}));

describe("<LoginPage/>", () => {
  const validEmail = "myemail@gmail.com";
  const validPassword = "mysupEr_password!";

  test("should show and hide error messages after triggering blurr when input is invalid", async () => {
    const wrapper = mount(LoginPage);

    // obtain the EMAIL input, place invalid data and blur
    const email = wrapper.find("input[placeholder='Introduce tu email']");
    await email.setValue("ifgewiogbew");
    await email.trigger("blur");

    // an error should appear after blur
    let emailError = wrapper
      .findAll("div.n-form-item-feedback__line")
      .find((div) => div.text() === "Introduce un email válido");
    expect(emailError?.exists()).toBeTruthy();
    expect(emailError?.text()).toBe("Introduce un email válido");

    // now correct data is placed
    await email.setValue(validEmail);
    await email.trigger("blur");

    // the error should appear no more
    emailError = wrapper
      .findAll("div.n-form-item-feedback__line")
      .find((div) => div.text() === "Introduce un email válido");
    expect(emailError?.exists()).toBeFalsy();

    // obtain the PASSWORD input, place invalid data and blur
    const password = wrapper.find("input[placeholder='Introduce tu contraseña']");
    await password.trigger("click");
    await password.trigger("blur");

    // an error should appear after blur
    let passwordError = wrapper
      .findAll("div.n-form-item-feedback__line")
      .find((div) => div.text() === "La contraseña es obligatoria");
    expect(passwordError?.exists()).toBeTruthy();
    expect(passwordError?.text()).toBe("La contraseña es obligatoria");

    // now correct data is placed
    await password.setValue(validPassword);
    await password.trigger("blur");

    // the error should appear no more
    passwordError = wrapper
      .findAll("div.n-form-item-feedback__line")
      .find((div) => div.text() === "La contraseña es obligatoria");
    expect(passwordError?.exists()).toBeFalsy();
  });

  /*   test("should call login method on submit if there were no errors", () => {
    const wrapper = mount(LoginPage);
    const emailInput = wrapper.find("input[placeholder='Introduce tu email']");
    const passwordInput = wrapper.find("input[placeholder='Introduce tu contraseña']");
    // check inputs existence first
    expect(emailInput.exists()).toBeTruthy();
    expect(passwordInput.exists()).toBeTruthy();

    // now the real test
    emailInput.setValue(validEmail);
    passwordInput.setValue(validPassword);
  });
 */
  test("should do a redirection to another page if Login was succesful", () => {
    return true;
  });
});
