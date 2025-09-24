import type { Product } from "../interfaces/product";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import defaultProductPhoto from "/vite.svg";

interface ProductComponentProps {
  product: Product;
}

const ProductComponent = ({ product }: ProductComponentProps) => {
  const firstImage = product.photos[0]
    ? product.photos[0]
    : defaultProductPhoto;
  return (
    <Link
      to={`/products/${product.id}`}
      key={product.id}
      className="w-full border-b border-gray-300 p-4 flex items-center"
    >
      <img src={firstImage} className="w-28 h-28 object-contain mr-6"></img>
      <div className="flex-1">
        <h3 className="text-base font-medium">{product.title}</h3>
        <p className="inline-block mt-1 mb-2 rounded-md bg-gray-200 px-2 py-0.5 text-xs text-gray-700">
          {product.condition}
        </p>
        <p className="text-2xl font-bold mb-4">${product.price}</p>
        {/*PLACEHOLDER*/}
      </div>
      <Button className="rounded-lg bg-[#0d2f5f] px-5 py-2 text-white hover:bg-[#0b264a] transition-colors">
        Agregar al carrito
      </Button>
    </Link>
  );
};

export default ProductComponent;
