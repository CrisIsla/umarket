import type { Product } from "@/interfaces/product";
import { useState } from "react";
import defaultProductPhoto from "/vite.svg";

interface PhotosComponentProps {
  photos: string[];
}

const PhotosComponent = ({ photos }: PhotosComponentProps) => {
  const [currentPhoto, setCurrentPhoto] = useState<number>(0);
  const len = photos.length;
  if (len === 0) {
    return (
      <div className="w-full max-w-[500px] mx-auto">
        <div className="max-w-[500px]">
          <img
            src={defaultProductPhoto}
            className="w-full h-full object-cover"
          ></img>
          <h3>No se han proporcionado imagenes para este producto</h3>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full max-w-[500px] mx-auto">
      <div className="w-full h-full object-cover">
        <img
          src={photos[currentPhoto]}
          className="w-full h-full object-cover"
        ></img>
      </div>
      {len > 1 && (
        <div className="flex justify-evenly">
          {photos.map((photo, index) => {
            return (
              <img
                key={index}
                src={photo}
                onClick={() => setCurrentPhoto(index)}
                className={`w-20 h-20 object-cover cursor-pointer border-2 ${index === currentPhoto ? "border-black" : "border-transparent hover:border-gray-300"}`}
              ></img>
            );
          })}
        </div>
      )}
    </div>
  );
};

interface ProductDetailComponentProps {
  product: Product;
}

const ProductDetailComponent = ({ product }: ProductDetailComponentProps) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const productDate: Date = new Date(product.date);
  const descriptionLength = product.description.length;
  const maximumDescriptonLength = 550;
  return (
    <div className="flex flex-col justify-evenly md:flex-row p-4 mx-auto">
      <div className="w-full md:w-1/2">
        <PhotosComponent photos={product.photos} />
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-4 m-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <div className="text-sm space-y-1 flex gap-4 items-center">
          <p>
            Publicado el{" "}
            {productDate.toLocaleDateString("es-CL").replace(/-/gi, "/")}
          </p>
          <p className="border rounded-md border-gray bg-gray-400 px-1">
            {product.condition}
          </p>
        </div>
        <h1 className="text-3xl font-semibold">${product.price}</h1>
        <h3>
          {descriptionLength > maximumDescriptonLength && !showMore
            ? product.description.slice(0, maximumDescriptonLength) + "..."
            : product.description}
        </h3>
        {descriptionLength > maximumDescriptonLength && (
          /*PLACEHOLDER*/
          <button onClick={() => setShowMore(!showMore)}>
            {showMore ? "Mostrar menos" : "Mostrar más"}
          </button>
        )}
        <p className="text-sm">Vendido por: {product.seller}</p>
        {/*PLACEHOLDER*/}
        <div className="flex justify-evenly">
          <button>Comprar</button>
          <button>Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailComponent;
