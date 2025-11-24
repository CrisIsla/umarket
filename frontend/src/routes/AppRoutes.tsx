import { Routes, Route, Navigate } from "react-router";
import { ProtectedRoutes } from "@/components/ProtectedRoutes";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { ModifyProductPage } from "@/pages/ModifyProductPage";
import Home from "@/views/Home";
import { RegisterPage } from "@/pages/RegisterPage";
import { LoginPage } from "@/pages/LoginPage";
import { useEffect, useState } from "react";

export const AppRoutes = () => {
  const [csrfToken, setCsrfToken] = useState<string|null>(localStorage.getItem('csrfToken'));

  useEffect(() => {
    if (!csrfToken) {
      return;
    }
  }, [csrfToken])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/profile/:userId" element={<ProfilePage />} />
      <Route path="/products/edit/:id" element={<ModifyProductPage />} />

      {/* Protected routes */}
      <Route
        path="/new/*"
        element={
          csrfToken ? (
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
          csrfToken ? (
            <Navigate to="/" replace />
          ) : (
            <RegisterPage />
          )
        }
      />
      <Route
        path="/login"
        element={
          csrfToken ? (
            <Navigate to="/" replace />
          ) : (
            <LoginPage setCsrfToken={setCsrfToken}/>
          )
        }
      />

      <Route path="*" element={<h1>Not Found 404</h1>} />
    </Routes>
  );
};
