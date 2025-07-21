import { ref } from "vue";

interface ApiError {
  message: string;
  error: string;
  statusCode: number;
}

interface LoginResponse {
  email: string;
  token: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterBody {
  nickname: string;
  email: string;
  profile_picture: string;
  description: string;
  password: string;
}

interface RegisterResponse extends Omit<RegisterBody, "password"> {
  token: string;
}

export function useAuth() {
  const error = ref<ApiError>({ message: "", error: "", statusCode: 0 });
  const isLoading = ref(false);

  const login = async (credentials: LoginCredentials) => {
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
        error.value = { message: data.message, error: data.error, statusCode: data.status };
        return null;
      } else {
        return data as LoginResponse;
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

  const register = () => {};

  // el error se tiene que limpiar cada vez que se haga una nueva llamada. Puede que la primera vez le diese un error y ahora lo esté reintentando nuevamente. Me gusta ponerlo en su propia función porque es más rápido de leer arriba.
  const cleanError = () => {
    error.value = { message: "", error: "", statusCode: 0 };
  };

  return { login, register, isLoading, error };
}
