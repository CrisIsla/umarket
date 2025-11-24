import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { ModifyProductForm } from "@/components/ModifyProductForm";
import type { ModifyProductFormData } from "@/components/ModifyProductForm";
import { getProductById, updateProductById } from "@/services/productServices";

export const ModifyProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [productData, setProductData] = useState<Partial<ModifyProductFormData>>({});

  useEffect(() => {
    if (!id) return;
    getProductById({ id })
      .then(response => {
        if (response.data) {
          const p = response.data;
          setProductData({
            title: p.title,
            price: p.price.toString(),
            category: p.category,
            condition: p.condition,
            tags: p.tags?.join(", ") || "",
            description: p.description,
          });
        }
      })
      .catch(() => alert("Error cargando producto"));
  }, [id]);

  const handleUpdate = async (formData: FormData): Promise<void> => {
    await updateProductById({ id: id!, data: formData });
  };

  if (!id || !productData.title) return <p>Cargando...</p>;

  return (
    <div className="min-h-screen px-7 py-4 bg-gray-400/50">
      <Header />
      <ModifyProductForm initialData={productData} onSubmit={handleUpdate} />
    </div>
  );
};