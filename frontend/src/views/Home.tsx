import { useState, useEffect, use } from "react";
import Header from "../components/Header";
import { getProducts } from "../services/productServices.ts";
import type { Product } from "../interfaces/product.ts";

export default function Home() {
  // States
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  // States for filters
  const [activeCondition, setActiveCondition] = useState<string | null>(null);
  //   const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Initial fetch of products
  useEffect(() => {
    getProducts()
      .then((response) => {
        if (response.success && response.data) {
          setProducts(response.data);
          setFilteredProducts(response.data);
        } else {
          setError(response.message);
        }
      })
      .catch(() => {
        setError("Error fetching products");
      });
  }, []);

  // Compute counts for filters
  const conditionCounts = products.reduce((acc, product) => {
    if (product.condition) {
      acc[product.condition] = (acc[product.condition] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // const categoryCounts = products.reduce((acc, product) => {
  //   if (product.category) {
  //       acc[product.category] = (acc[product.category] || 0) + 1;
  //   }
  //   return acc;
  // }, {} as Record<string, number>);

  // Apply condition filter
  useEffect(() => {
    let filtered = products;
    if (activeCondition) {
      filtered = filtered.filter((p) => p.condition === activeCondition);
    }
    // if (activeCategory) {
    //   filtered = filtered.filter(p => p.category === activeCategory);
    // }
    setFilteredProducts(filtered);
  }, [activeCondition /*, activeCategory*/, products]);

  // Handle filter clicks
  const handleConditionClick = (condition: string) => {
    setActiveCondition(condition === activeCondition ? null : condition);
  };
  //   const handleCategoryClick = (category: string) => {
  //       setActiveCategory(category === activeCategory ? null : category);
  //   }

  // Handle search
  const handleSearch = (query: string) => {
    setActiveCondition(null);
    // setActiveCategory(null);
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <div className="flex w-screen min-h-[600px] mx-auto pt-12">
        {/* Zona filtros */}
        <div className="pt-8 pr-4 w-1/4">
          <strong>Condición</strong>
          {Object.entries(conditionCounts).map(([condition, count]) =>
            count > 0 ? (
              <div
                key={condition}
                onClick={() => setActiveCondition(condition)}
                className={`cursor-pointer ${
                  activeCondition === condition ? "font-bold" : ""
                }`}
              >
                {condition} ({count})
              </div>
            ) : null
          )}
          <br />
          <strong>Color</strong>
          <div>Gris (1)</div>
          <div>Rojo (2)</div>
          <div>Azul (1)</div>
          <br />
          <strong>Marca</strong>
          <div>Gris (1)</div>
          <div>Rojo (2)</div>
          <div>Azul (1)</div>
          <br />
          <strong>Categorías</strong>
          {/* {Object.entries(categoryCounts).map(([category, count]) =>
                count > 0 ? (
                    <div key={category} onClick={() => setActiveCategory(category)} className={`cursor-pointer ${activeCategory === category ? "font-bold" : ""}`}>
                        {category} ({count})
                    </div>
                ) : null
            )} */}
          <div>Gris (1)</div>
          <div>Rojo (2)</div>
          <div>Azul (1)</div>
          <br />
          <button
            onClick={() => {
              setActiveCondition(null);
              setFilteredProducts(products);
              // setActiveCategory(null);
            }}
            className="mb-4 text-blue-600 underline"
          >
            Limpiar filtros
          </button>
        </div>
        {/* Zona productos */}
        <div className="flex-1 pr-8 w-3/4">
          <div className="flex justify-end mb-6 gap-2">
            <select className="border rounded px-2 py-1">
              <option>Recientes</option>
              <option>Precio: menor a mayor</option>
              <option>Precio: mayor a menor</option>
            </select>
            <button className="p-2 border rounded">🔲</button>
            <button className="p-2 border rounded">☰</button>
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <div>
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-gray-100 rounded-md my-6 h-[180px] flex items-center justify-center"
              >
                <span className="text-gray-400">Componente Producto</span>
                {/* <ProductCard product={p} /> */}
                <div className="">{p.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
