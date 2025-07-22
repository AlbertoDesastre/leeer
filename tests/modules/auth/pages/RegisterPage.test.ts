import { vi } from "vitest";
import { ref } from "vue";
import { DOMWrapper, flushPromises, mount, VueWrapper } from "@vue/test-utils";
import RegisterPage from "../../../../src/modules/auth/pages/RegisterPage.vue";

// mock vue-router
const mockRouter = { push: vi.fn(), replace: vi.fn(), go: vi.fn() };
vi.mock("vue-router", () => ({
  useRouter: () => mockRouter,
}));

// mock useAuth()
const mockError = ref({ message: "", error: "", statusCode: 0 });
const mockUseAuth = {
  login: vi.fn(),
  register: vi.fn(),
  error: mockError,
  isLoading: ref(false),
};
vi.mock("../../../../src/modules/auth/composables/useAuth", () => ({
  useAuth: () => mockUseAuth,
}));

describe("<RegisterPage/>", () => {
  const validNickname = "user123";
  const validDescription = "Soy un escritor con muchas ideas";
  const validEmail = "user@mail.com";
  const validPassword = "strongPassword1";

  let wrapper: VueWrapper;
  let nickname: DOMWrapper<Element>;
  let description: DOMWrapper<Element>;
  let email: DOMWrapper<Element>;
  let password: DOMWrapper<Element>;
  let passwordRepeat: DOMWrapper<Element>;
  let submit: DOMWrapper<Element>;
  let error: DOMWrapper<Element>;

  const fillForm = async () => {
    await nickname.setValue(validNickname);
    await description.setValue(validDescription);
    await email.setValue(validEmail);
    await password.setValue(validPassword);
    await passwordRepeat.setValue(validPassword);
  };

  const submitForm = async () => {
    await submit.trigger("click");
    await flushPromises();
  };

  beforeEach(() => {
    wrapper = mount(RegisterPage, {
      global: {
        stubs: ["RouterLink"],
      },
    });

    nickname = wrapper.find("input[placeholder='Introduce tu nickname']");
    description = wrapper.find("textarea");
    email = wrapper.find("input[placeholder='Introduce tu email']");
    password = wrapper.find("input[placeholder='Introduce tu contrase\u00f1a']");
    passwordRepeat = wrapper.find("input[placeholder='Repite tu contrase\u00f1a']");
    submit = wrapper.find("span.n-button__content");
    error = wrapper.find(".error-tab");

    vi.clearAllMocks();
  });

  test("should show errors and then hide them after correcting inputs", async () => {
    await nickname.trigger("blur");
    await email.setValue("bademail");
    await email.trigger("blur");
    await password.trigger("blur");
    await passwordRepeat.setValue("no-match");
    await passwordRepeat.trigger("blur");

    const errors = wrapper.findAll("div.n-form-item-feedback__line");
    expect(errors.length).toBeGreaterThan(0);

    await fillForm();
    await nickname.trigger("blur");
    await email.trigger("blur");
    await password.trigger("blur");
    await passwordRepeat.trigger("blur");

    const remainingErrors = wrapper.findAll("div.n-form-item-feedback__line");
    expect(remainingErrors.length).toBe(0);
  });

  test("should call register and redirect to home when success", async () => {
    mockUseAuth.register.mockResolvedValueOnce({});
    await fillForm();
    await submitForm();

    expect(mockUseAuth.register).toBeCalledTimes(1);
    expect(mockRouter.push).toBeCalledWith({ name: "home" });
  });

  test("should show an error message if register throws", async () => {
    mockUseAuth.register.mockImplementationOnce(() => {
      mockError.value = {
        message: "El usuario ya existe.",
        error: "Conflict",
        statusCode: 409,
      };
      return null;
    });

    await fillForm();
    await submitForm();

    // error instance is not the same anymore after re-rendering the wrapper so it has to be found again
    error = wrapper.find(".error-tab");
    expect(mockUseAuth.register).toBeCalled();
    expect(error.exists()).toBeTruthy();
    expect(error.text()).toContain("El usuario ya existe.");
    expect(mockRouter.push).not.toBeCalled();
  });

  test("should show loader while submitting", async () => {
    mockUseAuth.isLoading.value = true;
    await fillForm();
    await submit.trigger("click");

    let loading = wrapper.find(".loading");
    expect(loading.exists()).toBeTruthy();
    expect(loading.text()).toContain("CARGANDO");

    mockUseAuth.isLoading.value = false;
    await wrapper.vm.$nextTick(); // is not enough to change the value of a ref, it must be re-rendered in the component to reflect the new state. vm.$nextTick() does that
    loading = wrapper.find("p.loading"); // and to search *again* for the element
    expect(loading.exists()).toBeFalsy();
  });
});
