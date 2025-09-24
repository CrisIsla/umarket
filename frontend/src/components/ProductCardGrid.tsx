import type { Product } from "../interfaces/product";
import { ShoppingCart } from "lucide-react";

interface Props{
    product: Product
}
export default function ProductCardGrid({ product }:Props){
    const { title, condition, photos, price } = product;
    return (
    <div className="outline rounded-xl p-2">
        <section className="relative">
            <p className="bg-gray-500 absolute right-2 top-2 px-2 rounded-xl">{ condition === "new" ? "Nuevo" : (condition === "used" ? "Usado" : condition) } </p>
        </section>
        { photos.length > 0 ? <img src="https://picsum.photos/400/300" className="rounded-md"/> : <p>Sin foto</p> }
        {/* { photos.length > 0 ? <img src={photos[0]} className="rounded-md"/> : <p>Sin foto</p> } */}
        <p>{ title } </p>
        <p className="pb-1">${ price }</p>
        <button><ShoppingCart size={18}/></button>
    </div>
    )
}