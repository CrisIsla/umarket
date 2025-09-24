import { NewProductPage } from "@/pages/NewProductPage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { Route, Routes } from "react-router";
export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<h1>Home</h1>} />
      <Route path="/products/new" element={<NewProductPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="*" element={<h1>Not Found 404</h1>} />
    </Routes>
  );
}
