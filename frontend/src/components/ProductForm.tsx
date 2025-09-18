import React from "react";
import { useForm } from "@/hooks/useForm";

interface ProductFormData {
  name: string;
  cost: string;
  category: string;
  status: string;
  stock: string;
  tags: string;
  description: string;
  images: string[];
  [key: string]: string | string[] | null;
}

const initialFormData: ProductFormData = {
  name: "",
  cost: "",
  category: "",
  status: "",
  stock: "",
  tags: "",
  description: "",
  images: [],
};

const categories = [
  "Electrónica",
  "Ropa",
  "Deportes",
  "Libros",
  "Tecnología",
  "Otros",
];

const statuses = [
  { value: "nuevo", label: "Nuevo" },
  { value: "usado", label: "Usado" },
];

export const ProductForm: React.FC = () => {
  const { formState, onInputChange, onResetForm } =
    useForm<ProductFormData>(initialFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = {
      ...formState,
      cost: Number(formState.cost),
      stock: formState.stock === "" ? null : Number(formState.stock),
      tags: formState.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    console.log("Enviando datos:", dataToSend);

    onResetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <section>
        <h1>Publicar un producto</h1>
      </section>
      <section>
        <p>Obligatorio</p>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Título"
            value={formState.name}
            onChange={onInputChange}
          />
        </div>

        <div>
          <input
            type="number"
            id="cost"
            name="cost"
            placeholder="Precio"
            value={formState.cost}
            onChange={onInputChange}
          />
        </div>

        <div>
          <select
            id="category"
            name="category"
            value={formState.category}
            onChange={onInputChange}
          >
            <option value="">Categoría</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            id="status"
            name="status"
            value={formState.status}
            onChange={onInputChange}
          >
            <option value="">Estado</option>
            {statuses.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="file"
            id="images"
            name="images"
            placeholder="Seleccionar fotos"
            multiple
            onChange={onInputChange}
          />
        </div>

        <div>
          <textarea
            id="description"
            name="description"
            placeholder="Descripción"
            value={formState.description}
            onChange={onInputChange}
          />
        </div>
      </section>

      <section>
        <p>Opcional</p>
        <div>
          <input
            type="number"
            id="stock"
            name="stock"
            placeholder="Stock"
            value={formState.stock}
            onChange={onInputChange}
          />
        </div>
        <div>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="tag1, tag2, tag3"
            value={formState.tags}
            onChange={onInputChange}
          />
        </div>
      </section>

      <button type="submit">Publicar</button>
    </form>
  );
};
