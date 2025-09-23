import { useState, useEffect } from "react";
import Header from "../components/Header";
import { getProducts } from "../services/productServices.ts";
import type { Product } from "../interfaces/product.ts";
import { LayoutGridIcon, List } from "lucide-react";

export default function Home() {
  // States
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // States for sorting and filters
  const [sortOption, setSortOption] = useState<string>("recientes");
  const [activeCondition, setActiveCondition] = useState<string | null>(null);
  //   const [activeCategory, setActiveCategory] = useState<string | null>(null);
  //   const [activeTags, setActiveTags] = useState<string[]>([]);

  // Sorting logic
  function sortProducts(productsToSort: Product[], criteria: string) {
    switch (criteria) {
      case "recientes":
        return [...productsToSort].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      //   case "precio-asc":
      //     return [...productsToSort].sort((a, b) => a.price - b.price);
      //   case "precio-desc":
      //     return [...productsToSort].sort((a, b) => b.price - a.price);
      default:
        return productsToSort;
    }
  }
  const sortedProducts = sortProducts(filteredProducts, sortOption);

  // const toggleTag = (tag: string) => {
    //   setActiveTags(prevTags =>
    //     prevTags.includes(tag)
    //       ? prevTags.filter(t => t !== tag)
    //       : [...prevTags, tag]
    //   );
    // };

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

  //   const tagCounts = products.reduce((acc, product) => {
  //     if (product.tags && typeof product.tags === "string") {
  //         const tags = product.tags.split(",").map(tag => tag.trim());
  //         tags.forEach(tag => {
  //             acc[tag] = (acc[tag] || 0) + 1;
  //         });
  //     }
  //     return acc;
  //   }, {} as Record<string, number>);

  // Apply condition filter
  useEffect(() => {
    let filtered = products;
    if (activeCondition) {
      filtered = filtered.filter((p) => p.condition === activeCondition);
    }
    // if (activeCategory) {
    //   filtered = filtered.filter(p => p.category === activeCategory);
    // }
    // if (activeTag) {
    //   filtered = filtered.filter(p =>
    //     if (!p.tags || typeof p.tags !== "string") return false;
    //     const tags = p.tags.split(",").map(tag => tag.trim());
    //     return tags.includes(activeTag);
    //   );
    // }
    setFilteredProducts(filtered);
  }, [activeCondition /*, activeCategory*/ /*, activeTag */, products]);

  // Handle search
  const handleSearch = (query: string) => {
    setActiveCondition(null);
    // setActiveCategory(null);
    // setActiveTag(null);
    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Labels
  const filterLabels: Record<string, string> = {
    new: "Nuevo",
    used: "Usado",
    // electronics: "Electrónica",
    // clothing: "Ropa",
    // sports: "Deportes",
    // books: "Libros",
    // tech: "Tecnología",
    // other: "Otros",
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <div className="flex w-screen mx-auto pt-12">
        {/* Zona filtros */}
        <div className="pt-8 pr-4 ml-20">
          <strong>Condición</strong>
          {Object.entries(conditionCounts).map(([condition, count]) =>
            count > 0 ? (
              <div
                key={condition}
                onClick={() => setActiveCondition(condition === activeCondition ? null : condition)}
                className={`cursor-pointer ${
                  activeCondition === condition ? "font-bold" : ""
                }`}
              >
                {filterLabels[condition] || condition} ({count})
              </div>
            ) : null
          )}
          <br />
          <strong>Categorías</strong>
          {/* {Object.entries(categoryCounts).map(([category, count]) =>
                count > 0 ? (
                    <div key={category} 
                    onClick={() => setActiveCategory(category === activeCategory ? null : category)} 
                    className={`cursor-pointer ${activeCategory === category ? "font-bold" : ""}`}>
                        {filterLabels[category] || category} ({count})
                    </div>
                ) : null
            )} */}
          <div>Gris (1)</div>
          <div>Rojo (2)</div>
          <div>Azul (1)</div>
          <br />
          <strong>Etiquetas</strong>
          {/* {Object.entries(tagCounts).map(([tag, count]) =>
                count > 0 ? (
                    <div key={tag}
                    onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                    className={`cursor-pointer ${activeTag === tag ? "font-bold" : ""}`}
                    >
                        {tag} ({count})
                    </div>
                ) : null
            )} */}
          <div>Ubicación</div>
          <div>Rango de precio</div>
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
        <div className="flex-1 pr-8">
          <div className="flex justify-end mb-6 gap-2">
            <select
              className="border rounded-[10px] pl-1 bg-[#031E3C] text-white"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="recientes">Recientes</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
            </select>
            <div className="inline-flex">
              <button
                className={`!rounded-l-[10px] !rounded-r-none p-2 ${
                  viewMode === "grid"
                    ? "!bg-white !border-2 !border-[#031E3C]"
                    : "!bg-[#031E3C]"
                }`}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGridIcon
                  color={viewMode === "grid" ? "#031E3C" : "white"}
                />
              </button>
              <button
                className={`!rounded-r-[10px] !rounded-l-none p-2 ${
                  viewMode === "list"
                    ? "!bg-white !border-2 !border-[#031E3C]"
                    : "!bg-[#031E3C]"
                }`}
                onClick={() => setViewMode("list")}
              >
                <List color={viewMode === "list" ? "#031E3C" : "white"} />
              </button>
            </div>
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-4 gap-4" : "flex flex-col"
            }
          >
            {sortedProducts.map((p) =>
              viewMode === "list" ? (
                <div
                  key={p.id}
                  className="bg-gray-100 rounded-md my-6 flex items-center justify-center"
                >
                  <span className="text-gray-400">Componente Producto</span>
                  {/* Componente list */}
                  <div className="">
                    {p.title} -{" "}
                    {p.date instanceof Date
                      ? p.date.toLocaleDateString()
                      : p.date}
                  </div>
                </div>
              ) : (
                <div
                  key={p.id}
                  className="bg-gray-100 rounded-md my-6 flex items-center justify-center"
                >
                  {/* Componente grid */}
                  {p.title}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
