import { Routes, Route, Navigate } from "react-router";
import { ProtectedRoutes } from "@/components/ProtectedRoutes";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import Home from "@/views/Home";
import { RegisterPage } from "@/pages/RegisterPage";
import { LoginPage } from "@/pages/LoginPage";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkingAuthentication } from "@/store/auth/thunks";

export const AppRoutes = () => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.auth.status);

  useEffect(() => {
    dispatch(checkingAuthentication());
  }, [dispatch]);

  if (authStatus === "checking") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />

      {/* Protected routes */}
      <Route
        path="/new/*"
        element={
          authStatus === "authenticated" ? (
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
          authStatus === "authenticated" ? (
            <Navigate to="/" replace />
          ) : (
            <RegisterPage />
          )
        }
      />
      <Route
        path="/login"
        element={
          authStatus === "authenticated" ? (
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
