import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProfileProductComponent from "@/components/ProfileProductComponent";
import type { Product } from "@/interfaces/product";
import { getProductsBySellerId, deleteProductById } from "../services/productServices";

export const ProfilePage = () => {
  const { userId } = useParams();
  const [productsForSale, setProductsForSale] = useState<Product[]>([]);

  useEffect(() => {
    if (!userId) return;
    getProductsBySellerId(userId)
        .then(response => {
            setProductsForSale(response.data ?? []);
        })
        .catch(console.error);
  }, [userId]);

  const handleDelete = (productId: string) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    deleteProductById({id: productId})
      .then(() => setProductsForSale(prev => prev.filter(p => p.id !== productId)))
      .catch(() => alert("Error al eliminar producto"));
  };

  return (
    <div className="min-h-screen px-7 py-4 bg-gray-400/50">
       <Header />
       <h1 className="text-3xl font-bold mb-6">Productos en venta de usuario {userId}</h1>
       <div className="space-y-4">
         {productsForSale.map(product => (
          <ProfileProductComponent key={product.id} product={product} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};