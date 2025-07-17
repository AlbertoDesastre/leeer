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
  let error: string = "";

  const login = async (credentials: LoginCredentials) => {
    const data: LoginResponse = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((res) => res)
      .catch((err) => {
        console.error(err);
        error = err;
        return;
      });

    return data as LoginResponse;
  };

  const register = () => {};

  return { login, register, error };
}
