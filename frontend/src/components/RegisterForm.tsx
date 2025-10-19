import { useForm } from "@/hooks/useForm";
import { Button } from "./Button";
import { useState } from "react";
import { register } from "@/services/loginService";
import { useNavigate } from "react-router";

interface RegisterFormData {
  name: string;
  password: string;
  password_repetition: string;
  [key: string]: string;
}

const initialFormData: RegisterFormData = {
  name: "",
  password: "",
  password_repetition: "",
};

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const { formState, onInputChange, onResetForm } =
    useForm<RegisterFormData>(initialFormData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formState.password !== formState.password_repetition) {
      setErrorMessage("Las contraseñas no coinciden");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    try {
      await register({
        username: formState.name,
        password: formState.password,
      });
      onResetForm();
      navigate("/");
    } catch (exception) {
      setErrorMessage("Error al crear la cuenta");
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  return (
    <div className="h-full mt-8">
      <h1 className="flex items-center justify-center text-3xl font-semibold text-gray-900 mb-4">
        Crear cuenta
      </h1>
      <div className="w-full grid grid-rows-5">
        <form
          className="space-y-4 w-72 justify-between"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            required
            placeholder="Nombre"
            className="border p-2 rounded w-full"
            onChange={onInputChange}
            value={formState.name}
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
          <input
            type="password"
            name="password_repetition"
            required
            placeholder="Repetir contraseña"
            className="border p-2 rounded w-full"
            onChange={onInputChange}
            value={formState.password_repetition}
          />

          <Button type="submit" className=" w-full px-4 py-3 rounded-lg">
            Crear cuenta
          </Button>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};
