import { ref } from "vue";
import { useUserStore } from "../../auth/store/user.store";
import type { ApiError } from "../../common/types";
import { COLLABORATION_TYPE } from "../types";
import type {
  SendCollaborationRequestBody,
  SendCollaborationDto,
  GetCreationCollaborationResponseDto,
} from "../types";

function getCollaborationTypeBody(
  type: (typeof COLLABORATION_TYPE)[keyof typeof COLLABORATION_TYPE]
): string {
  let object: SendCollaborationRequestBody = {
    is_fanfiction: false,
    is_spin_off: false,
    is_canon: false,
  };

  switch (type) {
    case COLLABORATION_TYPE.FANFICTION:
      object.is_fanfiction = true;
      break;
    case COLLABORATION_TYPE.SPINOFF:
      object.is_spin_off = true;
      break;
    case COLLABORATION_TYPE.CANON:
      object.is_canon = true;
      break;
  }

  return JSON.stringify(object);
}

const isValidCollaboration = (term: string) => {
  const types: string[] = [
    COLLABORATION_TYPE.CANON,
    COLLABORATION_TYPE.FANFICTION,
    COLLABORATION_TYPE.SPINOFF,
  ];

  return types.includes(term);
};

export function useCollaborations() {
  const error = ref<ApiError>({ message: "", error: "", statusCode: 0 });
  const success = ref(false);
  const store = useUserStore();
  const isLoading = ref(false);

  const clearError = () => {
    error.value = { message: "", error: "", statusCode: 0 };
  };
  const clearSuccess = () => {
    success.value = false;
  };

  const sendCollaboration = async ({ creation_id, collaboration }: SendCollaborationDto) => {
    // reseteos
    clearError();
    clearSuccess();

    // validaciones
    if (!isValidCollaboration(collaboration) || !collaboration) {
      error.value = {
        message: "Debes escoger algún tipo de colaboración antes de enviar una petición al autor.",
        error: "Error de validación",
        statusCode: 400,
      };
      return null;
    }

    const token = store.user.token;

    if (!token) {
      error.value = {
        message: "Para enviar una solicitud de colaboración primero necesitas estar logeado.",
        error: "Error de autenticación",
        statusCode: 400,
      };
      return null;
    }

    try {
      isLoading.value = true;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/creations/${creation_id}/collaborations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: getCollaborationTypeBody(collaboration),
        }
      );
      const data = await response.json();

      // Un !response.ok es un error proveniente de mi server, que son los errores con código 30X, 40X, 50X, etc.
      if (!response.ok) {
        error.value = { error: data.error, message: data.message, statusCode: data.status };
        return null;
      }

      success.value = true;
      return data as GetCreationCollaborationResponseDto;
    } catch (err: any) {
      error.value = {
        message: "Hubo un error inesperado. Inténtelo de nuevo más tarde",
        error: "Error en la red.",
        statusCode: 500,
      };
      console.error("Error de red: " + err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return { error, success, isLoading, sendCollaboration };
}
