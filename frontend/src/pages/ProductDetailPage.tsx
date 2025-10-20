import ProductDetailComponent from "@/components/ProductDetailComponent";
import { useParams } from "react-router";
import Header from "@/components/Header";

export const ProductDetailPage = () => {
  const { id } = useParams();

  if (!id) throw new Error("parameter id was not provided");
  return (
    <div className="min-h-screen px-7 py-4 bg-gray-400/50">
      <Header />
      <ProductDetailComponent id={id} />
    </div>
  );
};
