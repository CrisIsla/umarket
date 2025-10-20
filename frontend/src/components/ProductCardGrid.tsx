import { useNavigate } from "react-router";
import type { Product } from "../interfaces/product";
import { Button } from "./Button";

interface Props{
    product: Product
}
export default function ProductCardGrid({ product }:Props){
    const navigate = useNavigate();
    const { id, title, condition, photos, price } = product;
    const handleClick = () => {
        navigate(`products/${id}`)
    }
    return (
    <div className="rounded-xl p-2 flex flex-col justify-between gap-2 pb-4 max-h-140 items-center">
        <section onClick={handleClick} className="rounded-xl p-2 flex flex-col justify-between gap-2 pb-4">
            <section className="relative">
                <p className="bg-gray-200 absolute right-2 top-3 px-2 rounded-xl">{ condition === "new" ? "Nuevo" : (condition === "used" ? "Usado" : condition) } </p>
            </section>
            { photos.length > 0 ? <img src={photos[0]} className="rounded-md max-h-72 w-auto object-contain"/> : <p className="self-center p-8">Sin foto</p> }
            <p className="line-clamp-2 max-w-[20ch] w-full leading-5 min-h-[40px]">{ title } </p>
            <p className="pb-1 self-center">${ price }</p>
        </section>
        <Button className="p-2 w-fit">Agregar al carrito</Button>
    </div>
    )
}