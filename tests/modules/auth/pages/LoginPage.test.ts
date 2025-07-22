import { vi } from "vitest";
import { ref } from "vue";
import { DOMWrapper, flushPromises, mount, VueWrapper } from "@vue/test-utils";
import LoginPage from "../../../../src/modules/auth/pages/LoginPage.vue";
import naive from "naive-ui";

// mock the vue router to check redirections
const mockRouter = { push: vi.fn(), replace: vi.fn(), go: vi.fn() };
const mockRoute = { name: "" };
vi.mock("vue-router", () => ({
  useRouter: () => mockRouter,
  useRoute: () => mockRoute,
}));

// mock useAuth()
const mockError = ref({ message: "", error: "", statusCode: 0 }); // to test real reactivity it's not enough to have a variable and change the value inside a test, but to have
const mockUseAuth = {
  login: vi.fn(),
  register: vi.fn(),
  error: mockError,
  isLoading: ref(false),
};
vi.mock("../../../../src/modules/auth/composables/useAuth", () => ({
  useAuth: () => mockUseAuth,
}));

describe("<LoginPage/>", () => {
  const validEmail = "myemail@gmail.com";
  const validPassword = "mysupEr_password!";
  let wrapper: VueWrapper;
  let email: DOMWrapper<Element>;
  let password: DOMWrapper<Element>;
  let submit: DOMWrapper<Element>;
  let error: DOMWrapper<Element>;

  // Helpers functions
  const fillForm = async (email: DOMWrapper<Element>, password: DOMWrapper<Element>) => {
    await email.setValue(validEmail);
    await password.setValue(validPassword);
  };
  const submitForm = async () => {
    await submit.trigger("click");
    await flushPromises(); // this line resolves all promises immediately. This is good since I depend on "login", which has a fetch, to end it's promises
  };
  const clickAndBlurr = async (element: DOMWrapper<Element>) => {
    await element.trigger("click");
    await element.trigger("blur");
  };

  // mounts and searchs for all relevant DOM Elements
  beforeEach(() => {
    wrapper = mount(LoginPage, {
      global: {
        stubs: ["RouterLink"],
      },
    });

    email = wrapper.find("input[placeholder='Introduce tu email']");
    password = wrapper.find("input[placeholder='Introduce tu contraseña']");
    submit = wrapper
      .findAll("span.n-button__content")
      .find((span) => span.text() === "Iniciar sesión") as DOMWrapper<Element>;
    error = wrapper.find("div.n-alert-body__content");

    vi.clearAllMocks();
  });

  test("should show and hide error messages after triggering blurr when input is invalid", async () => {
    // obtain the EMAIL input, place invalid data and blur
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
    await clickAndBlurr(password);

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

  test("should call redirect to home after making a succesful login", async () => {
    await fillForm(email, password);
    await submitForm();

    expect(submit.exists()).toBeTruthy();
    expect(mockUseAuth.login).toBeCalledTimes(1);
    expect(mockRouter.push).toBeCalledTimes(1);
    expect(mockRouter.push).toBeCalledWith({ name: "home" });
  });

  test("should display an error message if login threw an error", async () => {
    await fillForm(email, password);
    mockUseAuth.login.mockImplementationOnce(() => {
      mockError.value = {
        message: "El email enviado es incorrecto. Verifique que el correo está bien.",
        error: "Unauthorized",
        statusCode: 401,
      };
      return null;
    });
    await submitForm();

    // error instance is not the same anymore after re-rendering the wrapper so it has to be found again
    error = wrapper.find("div.n-alert-body__content");

    expect(mockUseAuth.login).toBeCalledTimes(1);
    expect(error?.exists()).toBeTruthy();
    expect(error?.text()).toContain(
      "El email enviado es incorrecto. Verifique que el correo está bien."
    );
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  test("should show a loader when 'login' is performing an action", async () => {
    await fillForm(email, password);
    mockUseAuth.isLoading.value = true;
    await submit.trigger("click");
    let loading = wrapper.find("p.loading");

    expect(loading?.exists()).toBeTruthy();
    expect(loading?.text()).toContain("CARGANDO");

    mockUseAuth.isLoading.value = false;
    await wrapper.vm.$nextTick(); // is not enough to change the value of a ref, it must be re-rendered in the component to reflect the new state. vm.$nextTick() does that
    loading = wrapper.find("p.loading"); // and to search *again* for the element
    expect(loading?.exists()).toBeFalsy();
  });
});
