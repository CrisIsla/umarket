import { ProductForm } from "@/components/ProductForm";
import Header from "@/components/Header";

export const NewProductPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-7 py-0.5 bg-gray-400/50">
      <Header onSearch={() => {}} />
      <ProductForm />
    </div>
  );
};
