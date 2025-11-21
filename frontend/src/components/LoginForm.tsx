import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { startLogin } from "@/store/auth/thunks";
import { useForm } from "@/hooks/useForm";
import { Button } from "./Button";

interface LoginFormData {
  email: string;
  password: string;
  [key: string]: string;
}

const initialFormData: LoginFormData = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const { formState, onInputChange, onResetForm } =
    useForm<LoginFormData>(initialFormData);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.auth.status);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      await dispatch(
        startLogin({
          email: formState.email,
          password: formState.password,
        })
      );
      onResetForm();
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Credenciales invalidas");
      setTimeout(() => setErrorMessage(null), 4000);
    }
  };

  if (authStatus === "authenticated") {
    navigate("/");
  }

  return (
    <div className="mt-8">
      <h1 className="flex items-center justify-center text-3xl font-semibold text-gray-900 mb-4">
        Iniciar Sesión
      </h1>
      <div className="w-full h-full grid grid-rows-5 justify-center">
        <form
          className="space-y-4 w-72 justify-between"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Correo"
            className="border p-2 rounded w-full"
            onChange={onInputChange}
            value={formState.email}
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Contraseña"
            className="border p-2 rounded w-full"
            onChange={onInputChange}
            value={formState.password}
          />

          <Button
            type="submit"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Iniciar sesión
          </Button>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          <hr />
        </form>
        <a href="/register">
          <Button
            type="submit"
            className="w-full mt-5 bg-gray-500/60 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Crear una cuenta
          </Button>
        </a>
      </div>
    </div>
  );
};
