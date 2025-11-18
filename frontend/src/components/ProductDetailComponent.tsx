import type { Product } from "@/interfaces/product";
import { useEffect, useState } from "react";
import { getProductById } from "../services/productServices";
// import { getUserById } from "../services/userServices";
import PhotosGalleryComponent from "./PhotosGalleryComponent";
import { Button } from "./Button";
import { useCart } from "@/hooks/useCart";
import Checkout from "./Checkout";
import { useCheckout } from "@/hooks/useCheckout";

interface ProductDetailComponentProps {
  id: string;
}

const ProductDetailComponent = ({ id }: ProductDetailComponentProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  // const [sellerName, setSellerName] = useState<string>("");
  const [showMore, setShowMore] = useState<boolean>(false);
  const { addToCart } = useCart();
  const { openModal, addToProducts } = useCheckout();
  const proceedToCheckout = () => {
    if (product) {
      addToProducts([{ ...product, quantity: 1 }]);
      openModal();
    }
  }
  useEffect(() => {
    if (!id) throw new Error("parameter id was not provided");
    getProductById({ id: id }).then((response) => {
      if (response.data === undefined) {
        throw new Error(`Error getting product with id ${id}`);
      }
      setProduct(response.data);
    });
  }, []);

  // useEffect(() => {
  //   if (!product) return;
  //   getUserById({ id: product.seller.id }).then((response) => {
  //     if (response.data === undefined) {
  //       throw new Error(`Error getting seller with id ${id}`);
  //     }
  //     setSellerName(response.data.name);
  //   });
  // }, [product]);

  if (product === null) return <h1>Cargando detalle de producto...</h1>;

  const productDate: Date = new Date(product.date);
  const descriptionLength = product.description.length;
  const maximumDescriptonLength = 550;
  return (
    <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-md p-6 rounded-md">
      <div className="flex justify-center items-start">
        <PhotosGalleryComponent photos={product.photos} />
      </div>
      <div className="space-y-6 text-gray-800">
        <h1 className="text-2xl md:text-3xl font-semibold">{product.title}</h1>
        <div className="flex justify-start gap-4">
          <p className="flex items-center gap-4 text-sm text-gray-500">
            Publicado el{" "}
            {productDate.toLocaleDateString("es-CL").replace(/-/gi, "/")}
          </p>
          <p className="content-center bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-xs">
            {product.condition === "new" ? "Nuevo" : "Usado"}
          </p>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">${new Intl.NumberFormat('es-CL').format(product.price)}</h1>
        <h3 className="text-base leading-relaxed text-gray-700">
          {descriptionLength > maximumDescriptonLength && !showMore
            ? product.description.slice(0, maximumDescriptonLength) + "..."
            : product.description}
        </h3>
        {descriptionLength > maximumDescriptonLength && (
          /*PLACEHOLDER*/
          <Button className="px-8 py-3" onClick={() => setShowMore(!showMore)}>
            {showMore ? "Mostrar menos" : "Mostrar más"}
          </Button>
        )}
        {/* <p className="text-sm text-gray-600">Vendido por: {sellerName}</p> */}
        <p className="text-sm text-gray-600">Vendido por: {product.seller?.name}</p>
        <p className="text-sm text-gray-600">Contacto: {product.seller?.contact.email}</p>
        {/*PLACEHOLDER*/}
        <div className="flex gap-4 pt-4">
          <Button className="px-8 py-3" onClick={proceedToCheckout}>Comprar</Button>
          <Button className="px-8 py-3" onClick={() => addToCart(product)}>Agregar al carrito</Button>
        </div>
      </div>
      <Checkout />
    </div>
  );
};

export default ProductDetailComponent;
