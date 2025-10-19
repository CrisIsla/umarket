import { Routes, Route, Navigate } from "react-router";
import { NewProductPage } from "@/pages/NewProductPage";

export const ProtectedRoutes = () => (
  <Routes>
    <Route path="product" element={<NewProductPage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
