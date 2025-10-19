import { useForm } from "@/hooks/useForm";
import { Button } from "./Button";
import { createProduct } from "@/services/productServices";

interface ProductFormData {
  name: string;
  cost: string;
  category: string;
  status: "new" | "used" | "";
  stock: string;
  tags: string;
  description: string;
  images: File[];
  [key: string]: string | File[];
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
  { value: "new", label: "Nuevo" },
  { value: "used", label: "Usado" },
];

export const ProductForm: React.FC = () => {
  const { formState, onInputChange, onImageChange, imageCount, onRemoveImage, onResetForm } =
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

    // para luego enviar datos al endpoint

    const productData = new FormData();
    productData.append("title", dataToSend.name)
    productData.append("date", new Date().toLocaleString())
    productData.append("description", dataToSend.description)
    productData.append("seller", "1")
    dataToSend.images.forEach(image => {
      productData.append("photos", image)
    });
    productData.append("condition", dataToSend.status !== "" ? dataToSend.status : "new")
    productData.append("price", dataToSend.cost.toString())
    productData.append("category", dataToSend.category)
    dataToSend.tags.forEach(tag => {
      productData.append("tags", tag)
    });
    createProduct(productData)
    onResetForm();
  };

  return (
    <div className="w-full bg-white rounded-t-xl rounded-b-4xl py-5">
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 justify-center flex">
          Artículo en venta
        </h1>
        <p className="text-gray-600 mb-7 justify-center flex">
          Completa la información de tu producto
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          id='product-form'
        >
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Obligatorio
              </label>

              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm text-gray-500 mb-1"
                >
                  Título
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ingresa el título del producto"
                  value={formState.name}
                  onChange={onInputChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="cost"
                  className="block text-sm text-gray-500 mb-1"
                >
                  Precio
                </label>
                <input
                  type="number"
                  id="cost"
                  name="cost"
                  placeholder="$0"
                  value={formState.cost}
                  onChange={onInputChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-sm text-gray-500 mb-1"
                >
                  Categoría
                </label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    value={formState.category}
                    onChange={onInputChange}
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Selecciona una categoría</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-3.5 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeWidth="2" d="m6 9 6 6 6-6"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm text-gray-500 mb-1"
                >
                  Estado
                </label>
                <div className="relative">
                  <select
                    id="status"
                    name="status"
                    value={formState.status}
                    onChange={onInputChange}
                    className="w-full px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Selecciona el estado</option>
                    {statuses.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-3.5 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeWidth="2" d="m6 9 6 6 6-6"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe tu producto..."
                value={formState.description}
                onChange={onInputChange}
                rows={5}
                className="w-full px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Opcional
              </label>

              <div className="mb-4">
                <label
                  htmlFor="stock"
                  className="block text-sm text-gray-500 mb-1"
                >
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  placeholder="Cantidad disponible"
                  value={formState.stock}
                  onChange={onInputChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="tags"
                  className="block text-sm text-gray-500 mb-1"
                >
                  Etiquetas de productos
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="tag1, tag2, tag3"
                  value={formState.tags}
                  onChange={onInputChange}
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-gray-500 mt-1">Límite: 5</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 border-t pt-6">
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              Imágenes del producto
            </label>

            <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center">
                <label
                  htmlFor="images"
                  className="flex items-center cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg
                      className="w-6 h-6 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeWidth="2" d="M12 5v14m-7-7h14"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Agregar fotos</span>
                </label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  multiple
                  disabled={imageCount >= 5}
                  onChange={onImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
              <p className="text-gray-500">Fotos: {imageCount}/5</p>
            </div>

            <div>
              <div className="flex flex-wrap gap-4 mt-4">
                {formState.images &&
                  formState.images.length > 0 &&
                  formState.images.map((file, idx) => (
                    <div key={idx} className="relative w-24 h-24">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`preview-${idx}`}
                        className="w-full h-full object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => onRemoveImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-700"
                        title="Eliminar"
                      >
                        <span className="mb-1">x</span>
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <Button
              type="submit"
              className="px-8 py-3 hover:bg-blue-800/80 transition-colors duration-500"
            >
              <span>Publicar</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
