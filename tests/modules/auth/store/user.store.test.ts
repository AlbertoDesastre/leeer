import { createPinia, setActivePinia } from "pinia";
import { useUserStore } from "../../../../src/modules/auth/store/user.store";
import { fakeUser } from "../../mocks/auth/fake.user";

describe("useUserStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  test("should return default values", () => {
    const store = useUserStore();

    expect(store.user).toStrictEqual({ email: "", token: "" });
    expect(store.noUser).toBe(true);
    expect(store.storedUser.value).toStrictEqual({ email: "", token: "" });
    expect(typeof store.setUser).toBe("function");
    expect(typeof store.cleanUser).toBe("function");
  });

  test("should save user in state and localStorage when calling 'setUser'", () => {
    const store = useUserStore();
    store.setUser(fakeUser);

    expect(store.user).toStrictEqual(fakeUser);
    expect(store.storedUser.value).toStrictEqual(fakeUser);
    expect(store.noUser).toBe(false);

    const local = localStorage.getItem("user");
    expect(local).not.toBeNull();
    expect(JSON.parse(local!)).toStrictEqual(fakeUser);
  });

  test("should clear user from state and localStorage when calling 'cleanUser'", () => {
    const store = useUserStore();
    store.setUser(fakeUser);
    store.cleanUser();

    expect(store.user).toStrictEqual({ email: "", token: "" });
    expect(store.noUser).toBe(true);
    expect(localStorage.getItem("user")).toBeNull();
  });
});
