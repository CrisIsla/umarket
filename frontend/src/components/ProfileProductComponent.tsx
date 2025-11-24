import type { Product } from "../interfaces/product";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import defaultProductPhoto from "/vite.svg";

interface ProfileProductComponentProps {
    product: Product;
    onDelete: (productId: string) => void;
}

const ProfileProductComponent = ({ product, onDelete }: ProfileProductComponentProps) => {
    const firstImage = product.photos[0] ? product.photos[0] : defaultProductPhoto;
    const handleDelete = () => {
        if (window.confirm(`¿Eliminar producto '${product.title}'?`)) {
            onDelete(product.id);
        }
    };
    return (
        <div className="w-full border-b border-gray-300 p-4 flex items-center">
            <Link
                className="w-full p-4 flex items-center"
                to={`/products/${product.id}`}
                key={product.id}
            >
                <img src={firstImage} className="w-28 h-28 object-contain mr-6"></img>
                <div className="flex-1">
                    <h3 className="text-base font-medium">{product.title}</h3>
                    <p className="inline-block mt-1 mb-2 rounded-md bg-gray-200 px-2 py-0.5 text-xs text-gray-700">
                        {product.condition}
                    </p>
                    <p className="text-2xl font-bold mb-4">${product.price}</p>
                </div>
            </Link>
            <div className="flex flex-col gap-2 ml-4">
                <Link to={`/products/edit/${product.id}`}>
                    <Button className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition-colors">
                        Editar
                    </Button>
                </Link>
            </div>
            <Button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 transition-colors"
            >
                Eliminar
            </Button>
        </div>
    );
};

export default ProfileProductComponent;