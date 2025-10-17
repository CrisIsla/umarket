import { NewProductPage } from "@/pages/NewProductPage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { Route, Routes } from "react-router";
import { LoginPage } from "@/pages/LoginPage.tsx";
import Home from "../views/Home.tsx";
import { RegisterPage } from "@/pages/RegisterPage.tsx";

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/products/new" element={<NewProductPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />

      <Route path="*" element={<h1>Not Found 404</h1>} />
    </Routes>
  );
}
