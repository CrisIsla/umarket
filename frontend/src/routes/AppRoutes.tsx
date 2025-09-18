import { ProductForm } from "@/components/ProductForm";
import { Route, Routes } from "react-router";
export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<h1>Home</h1>} />
      <Route path="/products/:id" element={<h1>Página de un producto</h1>} />
      <Route path="/products/new" element={<ProductForm />} />
      <Route path="*" element={<h1>Not Found 404</h1>} />
    </Routes>
  );
}
