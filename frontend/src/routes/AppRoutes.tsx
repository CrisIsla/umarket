import { Route, Routes } from "react-router";
import Home from "../views/Home.tsx";

export function AppRoutes(){
  return (
    <Routes>
        <Route
            index
            element={<Home />}
        />
        <Route
            path='/products/:id'
            element={<h1>Página de un producto</h1>}
        />
        <Route
            path='*'
            element={<h1>Not Found 404</h1>}
        />
    </Routes>
  );
};