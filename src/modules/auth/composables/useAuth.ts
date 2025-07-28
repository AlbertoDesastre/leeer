import { ref } from "vue";
import type { ApiError } from "../../common/types";
import type { BasicUser } from "../types";

interface LoginDTO {
  email: string;
  password: string;
}

interface RegisterDTO {
  nickname: string;
  email: string;
  profile_picture: string;
  description: string;
  password: string;
}

interface RegisterForm extends RegisterDTO {
  passwordRepeat: string;
}

interface RegisterResponse extends Omit<RegisterDTO, "password"> {
  token: string;
}

export function useAuth() {
  const error = ref<ApiError>({ message: "", error: "", statusCode: 0 });
  const isLoading = ref(false);

  const login = async (credentials: LoginDTO) => {
    isLoading.value = true;
    cleanError();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      // Un !response.ok es un error proveniente de mi server, que son los errores con código 30X, 40X, 50X, etc.
      if (!response.ok) {
        error.value = {
          error: data.error,
          message: makeApiErrorFriendly({ error: data.error, message: data.message }),
          statusCode: data.status,
        };

        return null;
      } else {
        return data as BasicUser;
      }
    } catch (err: any) {
      // Ejemplos que van al catch:
      // - No hay internet
      // - El servidor está caído (no responde)
      // - DNS no resuelve el dominio
      // - El JSON está malformado
      // - Timeout de conexión
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

  const register = async (registerForm: RegisterForm) => {
    isLoading.value = true;
    cleanError();

    const registerDTO: RegisterDTO = {
      nickname: registerForm.nickname,
      email: registerForm.email,
      profile_picture: registerForm.profile_picture,
      description: registerForm.description,
      password: registerForm.password,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerDTO),
      });

      let data = await response.json();

      // Un !response.ok es un error proveniente de mi server, que son los errores con código 30X, 40X, 50X, etc.
      if (!response.ok) {
        error.value = {
          error: data.error,
          message: makeApiErrorFriendly({ error: data.error, message: data.message }),
          statusCode: data.status,
        };

        return null;
      } else {
        return data as RegisterResponse;
      }
    } catch (err: any) {
      // Ejemplos que van al catch:
      // - No hay internet
      // - El servidor está caído (no responde)
      // - DNS no resuelve el dominio
      // - El JSON está malformado
      // - Timeout de conexión
      error.value = {
        message: "Hubo un error inesperado. Inténtelo de nuevo más tarde",
        error: "Error en la red.",
        statusCode: 0,
      };
      console.error("Error de red: " + err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  // el error se tiene que limpiar cada vez que se haga una nueva llamada. Puede que la primera vez le diese un error y ahora lo esté reintentando nuevamente. Me gusta ponerlo en su propia función porque es más rápido de leer arriba.
  const cleanError = () => {
    error.value = { message: "", error: "", statusCode: 0 };
  };

  const makeApiErrorFriendly = ({ error, message }: { error: string; message: string }): string => {
    switch (error) {
      case "Unauthorized":
        if (
          message.includes("El email enviado es incorrecto") ||
          message.includes("contraseña no es correcta.")
        ) {
          return "El correo o la contraseña no son correctos.";
        }
        break;

      case "Bad Request":
        if (message.includes("Duplicate entry") && message.includes("for key 'users.email'")) {
          return "El email ya está en uso. ¿Se te olvidó la contraseña?";
        }
        if (message.includes("Duplicate entry") && message.includes("for key 'users.nickname'")) {
          return "Ese nickname ya tiene dueñ@. ¡Prueba con otro!";
        }
        break;

      case "Internal Server Error":
        return "Ha ocurrido un error inesperado. Por favor, intenta de nuevo más tarde.";
    }

    return message; // mensaje original como fallback
  };

  return { login, register, isLoading, error };
}
