import { mockFetchAndGiveThisResultOnce } from "../../../__mocks__/common/mockFetch";

import { createPinia, setActivePinia } from "pinia";

import { useUserStore } from "../../../../src/modules/auth/store/user.store";
import { useCollaborations } from "../../../../src/modules/collaborations/composables/useCollaboration";
import type { Ref } from "vue";
import type { ApiError } from "../../../../src/modules/common/types";
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

  beforeEach(() => {
    // store
    setActivePinia(createPinia());
    store = useUserStore();
    // collaboration composable
    const composable = useCollaborations();
    error = composable.error;
    success = composable.success;
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

  // TEST TODO:
  // ✔️ ⭕
  // ✔️ Que se reseteen los estados de error y success al invocar nuevamente la función.
  // ⭕ Que se renderiza un error si no hay colaboración correcta y además no se hace ni fetch ni se llama a la función "getCollaborationTypeBody"
  // ⭕ Que se renderiza un error si no hay un token disponible y además no se hace ni fetch ni se llama a la función "getCollaborationTypeBody"
  // ⭕ Si hay token y hay collaboration si de verdad se pone a cargar y se pone en false isLoading al terminar la función
  // ⭕ si no hay "response.ok" que renderiza el error proveniente de la API
  // ⭕ si todo tiene exito comprobar que success == true y la data que se muestra es efectivamente la que salió del mock de la API

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

    await sendCollaboration({ creation_id: "1", collaboration: invalidType } as any); // I have to force this typing to ensure that in EXECUTION TIME (not development time) the following behaviour doesn't happen!

    expect(error.value.message).toBe(collabError.message);
    expect(error.value.error).toBe(collabError.error);
    expect(error.value.statusCode).toBe(collabError.statusCode);
    expect(success.value).toBe(false);
  });

  /*    test("should reset error and success states when invoking the function again", async () => {
    store.user.token = "HOLA";

    const { sendCollaboration } = useCollaborations();
    mockFetchAndGiveThisResultOnce("Hola que tal");


    await sendCollaboration({ creation_id: "1", collaboration: "Fanfiction" });

    expect(fetch).toHaveBeenCalledTimes(1);
  }); */
});
