import { NewProductPage } from "@/pages/NewProductPage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { Route, Routes } from "react-router";
import Home from "../views/Home.tsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/products/new" element={<NewProductPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="*" element={<h1>Not Found 404</h1>} />
    </Routes>
  );
}
