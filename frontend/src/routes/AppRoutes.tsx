import { NewProductPage } from "@/pages/NewProductPage";
import ProductDetailComponent from "@/components/ProductDetailComponent";
import { Route, Routes } from "react-router";
export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<h1>Home</h1>} />
      <Route path="/products/new" element={<NewProductPage />} />
      <Route path="/products/:id" element={<ProductDetailComponent />} />
      <Route path="*" element={<h1>Not Found 404</h1>} />
    </Routes>
  );
}
