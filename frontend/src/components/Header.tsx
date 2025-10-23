import { ShoppingCart, Search } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { useCredentials } from "@/hooks/useCredentials";
import { Button } from "./Button";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, handleLogout } = useCredentials();
  const handleSearch = () => {
    if (searchTerm.trim() === "") return;
    if (location.pathname !== "/") {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`, { replace: true });
    } else {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    }
    setSearchTerm("");
  };

  return (
    <header className="bg-[#031E3C] fixed top-0 left-0 w-screen text-white flex items-center justify-evenly shadow-md z-999999999">
      {/* Logo */}
      <Link to="/" className="flex items-center px-4 py-1">
        <img src={logo} alt="Umarket Logo" className="max-h-15 w-auto rounded" />
      </Link>

      {/* Search bar */}
      <div className="flex-1 max-w-lg mx-6 px-6 py-2">
        <div className="bg-white relative rounded-[10px] h-10.5">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full px-4 py-2 rounded-full text-black focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={e => e.key === 'Enter' ? handleSearch() : null}
          />
          <button type="button" 
          style={{ outline: "none", boxShadow: "none" }}
          onClick={handleSearch}
          className="!outline-none !focus:outline-none !hover:outline-none !active:outline-none !border-none absolute right-1 text-gray-500 p-0">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Actions */}
      <nav className="flex items-center space-x-12 px-6 py-2">
        <Link to="/new/product" className="text-white">Vender</Link>
        {user ? <><p>Hola, {user.name}!</p> <Button onClick={handleLogout}>Cerrar Sesión</Button></>: <Link to="/login" className="text-white">Iniciar sesión</Link>}
        <Link to="/carrito" className="text-white flex items-center space-x-1">
          <ShoppingCart className="h-5 w-5" />
          <span>Carrito</span>
        </Link>
      </nav>
    </header>
  );
}