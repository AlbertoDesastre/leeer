import { createPinia, setActivePinia } from "pinia";
import type { Ref } from "vue";

import { useUserStore } from "../../../../src/modules/auth/store/user.store";
import type { ApiError } from "../../../../src/modules/common/types";

import * as useCollaborationModule from "../../../../src/modules/collaborations/composables/useCollaboration";
import type {
  GetCreationCollaborationResponseDto,
  SendCollaborationDto,
} from "../../../../src/modules/collaborations/types";

describe("useCollaboration (composable)", () => {
  // user's store setup
  let store: ReturnType<typeof useUserStore>; // this is pretty cool because is like saying "this is the same type of this stuff"
  // collaboration composable setup
  let error: Ref<ApiError>;
  let success: Ref<boolean>;
  let isLoading: Ref<boolean>;
  let sendCollaboration: (
    obj: SendCollaborationDto
  ) => Promise<GetCreationCollaborationResponseDto | null>;
  // useful variables
  const collabError = {
    message: "Debes escoger algún tipo de colaboración antes de enviar una petición al autor.",
    error: "Error de validación",
    statusCode: 400,
  };
  const tokenError = {
    message: "Para enviar una solicitud de colaboración primero necesitas estar logeado.",
    error: "Error de autenticación",
    statusCode: 400,
  };
  const apiError = {
    message: "No hay ninguna creación que aplique a tu búsqueda.",
    error: "Not Found",
    status: 404,
  };

  beforeEach(() => {
    // store
    setActivePinia(createPinia());
    store = useUserStore();
    // collaboration composable
    const composable = useCollaborationModule.useCollaborations();
    error = composable.error;
    success = composable.success;
    isLoading = composable.isLoading;
    sendCollaboration = composable.sendCollaboration;

    vi.clearAllMocks();
  });

  afterEach(() => {
    // reset all states
    error.value = {
      message: "",
      error: "",
      statusCode: 0,
    };
    success.value = false;
  });

  test("should reset error and success states when invoking the function again", async () => {
    error.value = {
      message: "Mi super error.",
      error: "Validación.",
      statusCode: 999,
    };
    success.value = true;

    await sendCollaboration({ creation_id: "1", collaboration: "Fanfiction" });

    expect(error.value.message).not.toBe("Mi super error");
    expect(error.value.error).not.toBe("Validación");
    expect(error.value.statusCode).not.toBe(999);
    expect(success.value).toBe(false);
  });

  test("should throw error if no collaboration type was provided and not call either fetch or 'getCollaborationTypeBody' ", async () => {
    const invalidType = "INVALID";

    vi.spyOn(useCollaborationModule, "getCollaborationTypeBody");
    (window as any).fetch = vi.fn(); // <-- super quick way to spy on fetch calls
    // (window as any).fetch = vi.fn(async () => ({ json: async () => "" }))  <-- another super easy way to mock specific responses! I even like this better than having it in a separate mock file because you can see what the test is doing without jumping to another file.    await sendCollaboration({ creation_id: "1", collaboration: invalidType } as any); // I have to force this typing to ensure that in EXECUTION TIME (not development time) the following behaviour doesn't happen!
    await sendCollaboration({ creation_id: "1", collaboration: invalidType } as any); // I have to force this typing to ensure that in EXECUTION TIME (not development time) the following behaviour doesn't happen!

    // error & success states
    expect(error.value.message).toBe(collabError.message);
    expect(error.value.error).toBe(collabError.error);
    expect(error.value.statusCode).toBe(collabError.statusCode);
    expect(success.value).toBe(false);
    // methods checking
    expect(useCollaborationModule.getCollaborationTypeBody).not.toBeCalled();
    expect(fetch).not.toBeCalled();
  });

  test("should throw error if no token is available and not call either fetch or 'getCollaborationTypeBody'", async () => {
    // token gets clear after each test

    vi.spyOn(useCollaborationModule, "getCollaborationTypeBody");
    (window as any).fetch = vi.fn();

    await sendCollaboration({ creation_id: "1", collaboration: "Fanfiction" });

    // error & success states
    expect(error.value.message).toBe(tokenError.message);
    expect(error.value.error).toBe(tokenError.error);
    expect(error.value.statusCode).toBe(tokenError.statusCode);
    expect(success.value).toBe(false);

    // methods checking
    expect(useCollaborationModule.getCollaborationTypeBody).not.toBeCalled();
    expect(fetch).not.toBeCalled();
  });

  test("should set isLoading true while request is in progress and set it false after", async () => {
    store.user.token = "VALID_TOKEN";

    (window as any).fetch = vi.fn(async () => ({ json: async () => "" }));

    // "await" when invoking "sendCollaboration" because I want to test that middle state where the function hasn't finished
    const pendingPromise = sendCollaboration({ creation_id: "1", collaboration: "Fanfiction" });

    expect(isLoading.value).toBe(true);

    await pendingPromise; // execution should be finished correctly

    expect(isLoading.value).toBe(false);
  });

  test("should render the error returned by the API when response.ok is false", async () => {
    store.user.token = "VALID_TOKEN";

    // remember that fetch returns 2 things!! 1: OK (state of the request) 2: JSON (data parser when everythings is good) !!
    (window as any).fetch = vi.fn(async () => ({
      ok: false,
      json: async () => apiError,
    }));

    const result = await sendCollaboration({ creation_id: "1", collaboration: "Fanfiction" });

    expect(error.value.message).toBe(apiError.message);
    expect(error.value.error).toBe(apiError.error);
    expect(error.value.statusCode).toBe(apiError.status);
    expect(success.value).toBe(false);
    expect(result).toBe(null);
  });

  test("should return the data from the API and set success to true if all goes well", async () => {
    const data = {
      creation_collaboration_id: "123",
      approved_by_original_author: null,
      is_fanfiction: true,
      is_spin_off: false,
      is_canon: false,
      creation_date: "2025-08-20T14:25:34.000Z",
      modification_date: "2025-08-20T14:25:34.000Z",
      creation: {
        author_id: "author_id",
        creation_id: "creation_id",
        title: "My Creation",
        synopsis: "Test synopsis",
        thumbnail: "",
      },
      collaborator: {
        user_id: "user_id",
        nickname: "nickname",
        profile_picture: "",
      },
    };
    store.user.token = "VALID_TOKEN";

    (window as any).fetch = vi.fn(async () => ({
      ok: true,
      json: async () => data,
    }));

    const result = await sendCollaboration({
      creation_id: "1",
      collaboration: "Fanfiction",
    });

    expect(success.value).toBe(true);
    expect(error.value.message).toBe("");
    expect(result).toEqual(data);
  });
});
