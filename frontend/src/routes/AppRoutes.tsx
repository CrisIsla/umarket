import { Routes, Route, Navigate } from "react-router";
import { ProtectedRoutes } from "@/components/ProtectedRoutes";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import Home from "@/views/Home";
import { RegisterPage } from "@/pages/RegisterPage";
import { LoginPage } from "@/pages/LoginPage";

export const AppRoutes = () => {
  const { status } = useCheckAuth();
  console.log(status)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />

      {/* Protected routes */}
      <Route
        path="/new/*"
        element={
          status === "authenticated" ? (
            <ProtectedRoutes />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Public routes */}
      <Route
        path="/register"
        element={
          status === "authenticated" ? (
            <Navigate to="/" replace />
          ) : (
            <RegisterPage/>
          )
        }
      />
      <Route
        path="/login"
        element={
          status === "authenticated" ? (
            <Navigate to="/" replace />
          ) : (
            <LoginPage />
          )
        }
      />

      <Route path="*" element={<h1>Not Found 404</h1>} />
    </Routes>
  );
};
