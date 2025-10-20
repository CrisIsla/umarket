import { useState, useEffect } from "react";
import Header from "../components/Header";
import { getProducts } from "../services/productServices.ts";
import type { Product } from "../interfaces/product.ts";
import { LayoutGridIcon, List } from "lucide-react";
import ProductCardGrid from "@/components/ProductCardGrid.tsx";
import ProductComponent from "@/components/ProductComponent.tsx";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const seachFromURL = queryParams.get("search") || "";
  // States
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState(seachFromURL);

  // States for sorting and filters
  const [sortOption, setSortOption] = useState<string>("recientes");
  const [activeCondition, setActiveCondition] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  // Sorting logic
  function sortProducts(productsToSort: Product[], criteria: string) {
    switch (criteria) {
      case "recientes":
        return [...productsToSort].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case "precio-asc":
        return [...productsToSort].sort((a, b) => a.price - b.price);
      case "precio-desc":
        return [...productsToSort].sort((a, b) => b.price - a.price);
      default:
        return productsToSort;
    }
  }
  const sortedProducts = sortProducts(filteredProducts, sortOption);

  const toggleTag = (tag: string) => {
    setActiveTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

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

  // Sync searchQuery with URL param
  useEffect(() => {
    setSearchQuery(seachFromURL);
  }, [location.search]);

  // useEffect(() => {
  //   // Limpia los filtros y búsqueda al montar Home
  //   setActiveCondition(null);
  //   setActiveCategory(null);
  //   setActiveTags([]);
  //   setSearchQuery("");
  // }, []);

  // Compute counts for filters
  const conditionCounts = filteredProducts.reduce((acc, product) => {
    if (product.condition) {
      acc[product.condition] = (acc[product.condition] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const categoryCounts = filteredProducts.reduce((acc, product) => {
    if (product.category) {
      acc[product.category] = (acc[product.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const tagCounts = filteredProducts.reduce((acc, product) => {
    if (Array.isArray(product.tags)) {
      product.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
    }
    return acc;
  }, {} as Record<string, number>);

  // Apply condition filter
  useEffect(() => {
    let filtered = products;
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (activeCondition) {
      filtered = filtered.filter((p) => p.condition === activeCondition);
    }
    if (activeCategory) {
      filtered = filtered.filter((p) => p.category === activeCategory);
    }
    if (activeTags && activeTags.length > 0) {
      filtered = filtered.filter(
        (p) =>
          Array.isArray(p.tags) &&
          activeTags.some((tag) => p.tags.includes(tag))
      );
    }
    setFilteredProducts(filtered);
  }, [searchQuery, activeCondition, activeCategory, activeTags, products]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Labels
  const filterLabels: Record<string, string> = {
    new: "Nuevo",
    used: "Usado",
    electronics: "Electrónica",
    clothing: "Ropa",
    sports: "Deportes",
    books: "Libros",
    tech: "Tecnología",
    other: "Otros",
  };

  return (
    <>
      <Header />
      <div className="flex w-screen mx-auto pt-12">
        {/* Filters */}
        <div className="pt-8 pr-4 ml-20">
          <strong>Condición</strong>
          {Object.entries(conditionCounts).map(([condition, count]) =>
            count > 0 ? (
              <div
                key={condition}
                onClick={() =>
                  setActiveCondition(
                    condition === activeCondition ? null : condition
                  )
                }
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
          {Object.entries(categoryCounts).map(([category, count]) =>
            count > 0 ? (
              <div
                key={category}
                onClick={() =>
                  setActiveCategory(
                    category === activeCategory ? null : category
                  )
                }
                className={`cursor-pointer ${
                  activeCategory === category ? "font-bold" : ""
                }`}
              >
                {filterLabels[category] || category} ({count})
              </div>
            ) : null
          )}
          <br />
          <strong>Etiquetas</strong>
          {Object.entries(tagCounts).map(([tag, count]) =>
            count > 0 ? (
              <div
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`cursor-pointer ${
                  activeTags.includes(tag) ? "font-bold" : ""
                }`}
              >
                {tag} ({count})
              </div>
            ) : null
          )}
          <button
            onClick={() => {
              setActiveCondition(null);
              setFilteredProducts(products);
              setActiveCategory(null);
              setActiveTags([]);
              setSearchQuery("");
            }}
            className="mb-4 text-blue-600 underline"
          >
            Limpiar filtros
          </button>
        </div>
        {/* Products */}
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
                  className="bg-gray-100 rounded-md my-2 flex items-center justify-center"
                >
                  <ProductComponent product={p} />
                </div>
              ) : (
                <div
                  key={p.id}
                  className="bg-gray-100 rounded-md my-6 flex items-center justify-center"
                >
                  <ProductCardGrid product={p} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}