import type { Product } from "@/interfaces/product";
import { useState } from "react";
import defaultProductPhoto from "/vite.svg";

interface PhotosComponentProps {
  photos: string[];
}

const PhotosComponent = ({ photos }: PhotosComponentProps) => {
  const len = photos.length;
  if (len === 0) {
    return (
      <div>
        <img src={defaultProductPhoto}></img>
        <h3>No se han proporcionado imagenes para este producto</h3>
      </div>
    );
  }
};

interface ProductDetailComponentProps {
  product: Product;
}

const ProductDetailComponent = ({ product }: ProductDetailComponentProps) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const productDate: Date = new Date(product.date);
  const descriptionLength = product.description.length;
  const maximumDescriptonLength = 144;
  return (
    <>
      <PhotosComponent photos={product.photos} />
      <h1>{product.title}</h1>
      <div>
        <p>
          Publicado el{" "}
          {productDate.toLocaleDateString("es-CL").replace(/-/gi, "/")}
        </p>
        <p>{product.condition}</p>
      </div>
      <h1>${product.price}</h1>
      <h3>
        {descriptionLength > maximumDescriptonLength && !showMore
          ? product.description.slice(0, 144) + "..."
          : product.description}
      </h3>
      {descriptionLength > maximumDescriptonLength && (
        /*PLACEHOLDER*/
        <button onClick={() => setShowMore(!showMore)}>
          {showMore ? "Mostrar menos" : "Mostrar más"}
        </button>
      )}
      <p>Vendido por: {product.seller}</p>
    </>
  );
};

export default ProductDetailComponent;
