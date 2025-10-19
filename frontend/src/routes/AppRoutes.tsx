import { Route, Routes } from "react-router";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import { ProtectedRoutes } from "@/components/ProtectedRoutes";
import { PublicRoutes } from "@/components/PublicRoutes";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { CheckingAuth } from "@/components/CheckingAuth";
import Home from "@/views/Home";

export const AppRoutes = () => {
  const { status } = useCheckAuth();

  if (status === "checking") return <CheckingAuth />;

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<ProtectedRoutes />} />
      ) : (
        <Route path="/auth/*" element={<PublicRoutes />} />
      )}
      <Route index element={<Home />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="*" element={<h1>Not Found 404</h1>} />
    </Routes>
  );
};
