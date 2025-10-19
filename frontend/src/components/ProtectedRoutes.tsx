import { Navigate, Route, Routes } from "react-router";
import { NewProductPage } from "@/pages/NewProductPage";

export const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/products/new" element={<NewProductPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
