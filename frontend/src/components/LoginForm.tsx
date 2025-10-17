import { useForm } from "@/hooks/useForm";
import { Button } from "./Button";

interface LoginFormData {
  name: string;
  password: string;
  [key: string]: string;
}

const initialFormData: LoginFormData = {
  name: "",
  password: "",
};

export const LoginForm = () => {
  const { formState, onInputChange } = useForm<LoginFormData>(initialFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("amazingg");
  };

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

          <Button
            type="submit"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Iniciar sesión
          </Button>

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
