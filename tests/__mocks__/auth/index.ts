import { vi } from "vitest";
import { ref } from "vue";

export const fakeUser = {
  email: "isaac.asimov@ficcion.com",
  token: "JINFWgwemi@gew",
};

export const mockRouter = { push: vi.fn(), replace: vi.fn(), go: vi.fn() };
export const mockRoute = { name: "" };

export const mockError = ref({ message: "", error: "", statusCode: 0 }); // to test real reactivity it's not enough to have a variable and change the value inside a test, but to have
export const mockUseAuth = {
  login: vi.fn(),
  register: vi.fn(),
  error: mockError,
  isLoading: ref(false),
};

export const mockSetUser = vi.fn();
export const mockCleanUser = vi.fn();
export const mockUseUserStore = {
  setUser: mockSetUser,
  cleanUser: mockCleanUser,
  noUser: false,
  storedUser: { email: "", token: "" },
};

// ¡¡OJO!!
// Los `vi.mock()` se deben ejecutar lo primero A TODA COSTA. Por ejemplo, si uso "useAuth" en el test de un componente tengo que importar el mock "mockUseAuth" ANTES del import la función real.
// Vitest hace el mocking cuando CARGA EL ARCHIVO, no en ejecución.

// What I'm doing here is mocking the entire MODULE (or file) and saying "the exported members called 'useRouter' and 'useRoute' are going to be THIS INSTEAD"
vi.mock("vue-router", () => ({
  useRouter: () => mockRouter, // useRouter will be invoked and replaced by the testing framework (vitest in this case) and be replaced by a function that RETURNS mockrouter (a function)
  useRoute: () => mockRoute, // the same here, useRoute will be invoked and be replaced by a function that returns and object with a property 'name' and value "desk"
}));
// explanation on how I know how mocking works: https://vitest.dev/api/vi.html#vi-mock

vi.mock("../../../src/modules/auth/composables/useAuth", () => ({
  useAuth: () => mockUseAuth,
}));

vi.mock("../../../src/modules/auth/store/user.store", () => ({
  useUserStore: () => mockUseUserStore,
}));
