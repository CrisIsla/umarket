import { useForm } from "@/hooks/useForm";
import { Button } from "./Button";
import { useState } from "react";
import type { User } from "@/interfaces/user";
import loginService from "@/services/loginService";

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

  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { formState, onInputChange, onResetForm } =
    useForm<RegisterFormData>(initialFormData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username: formState.name,
        password: formState.password,
      });
      setUser(user);
      onResetForm();
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
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
            value={formState.password}
          />

          <Button
            type="submit"
            className=" w-full px-4 py-3 rounded-lg"
          >
            Crear cuenta
          </Button>
        </form>
      </div>
    </div>
  );
};
