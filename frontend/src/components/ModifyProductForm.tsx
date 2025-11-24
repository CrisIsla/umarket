import { useState } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router";

export interface ModifyProductFormData {
  title: string;
  description: string;
  price: string;
  condition: "new" | "used" | "";
  category: string;
  tags: string;
}

export interface ModifyProductFormProps {
  initialData: Partial<ModifyProductFormData>;
  onSubmit: (data: FormData) => Promise<void>;
}

export const ModifyProductForm = ({ initialData, onSubmit }: ModifyProductFormProps) => {
  const [formState, setFormState] = useState<ModifyProductFormData>({
    title: "",
    description: "",
    price: "",
    condition: "",
    category: "",
    tags: "",
    ...initialData,
  });

  const navigate = useNavigate();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formState.title ||
      !formState.description ||
      !formState.price ||
      !formState.condition ||
      !formState.category
    ) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    const tagsArray = formState.tags
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean);

    const formData = new FormData();
    formData.append("title", formState.title);
    formData.append("description", formState.description);
    formData.append("price", formState.price);
    formData.append("condition", formState.condition);
    formData.append("category", formState.category);
    tagsArray.forEach(tag => formData.append("tags", tag));

    try {
      await onSubmit(formData);
      navigate("/");
    } catch {
      alert("Error al modificar producto");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Modificar Producto</h2>

      <label className="block mb-2 font-semibold">Título *</label>
      <input
        type="text"
        name="title"
        value={formState.title}
        onChange={onInputChange}
        className="w-full p-2 border rounded mb-4"
        required
      />

      <label className="block mb-2 font-semibold">Descripción *</label>
      <textarea
        name="description"
        value={formState.description}
        onChange={onInputChange}
        className="w-full p-2 border rounded mb-4"
        rows={4}
        required
      />

      <label className="block mb-2 font-semibold">Precio *</label>
      <input
        type="number"
        name="price"
        value={formState.price}
        onChange={onInputChange}
        className="w-full p-2 border rounded mb-4"
        required
      />

      <label className="block mb-2 font-semibold">Condición *</label>
      <select
        name="condition"
        value={formState.condition}
        onChange={onInputChange}
        className="w-full p-2 border rounded mb-4"
        required
      >
        <option value="">Seleccione</option>
        <option value="new">Nuevo</option>
        <option value="used">Usado</option>
      </select>

      <label className="block mb-2 font-semibold">Categoría *</label>
      <input
        type="text"
        name="category"
        value={formState.category}
        onChange={onInputChange}
        className="w-full p-2 border rounded mb-4"
        required
      />

      <label className="block mb-2 font-semibold">Etiquetas (separar con comas)</label>
      <input
        type="text"
        name="tags"
        value={formState.tags}
        onChange={onInputChange}
        className="w-full p-2 border rounded mb-4"
        placeholder="ej: tag1, tag2, tag3"
      />

      <Button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Guardar Cambios
      </Button>
    </form>
  );
};