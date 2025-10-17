import { useForm } from "@/hooks/useForm";
import { Button } from "./Button";

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
  const { formState, onInputChange } =
    useForm<RegisterFormData>(initialFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("amazingg");
  };

  return (
    <div className="mt-8">
      <h1 className="flex items-center justify-center text-3xl font-semibold text-gray-900 mb-4">
        Crear cuenta
      </h1>
      <div className="w-full h-full grid grid-rows-5 justify-center">
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
