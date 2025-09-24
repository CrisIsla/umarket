import { ShoppingCart, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

type HeaderProps = {
  onSearch: (query: string) => void;
};

export default function Header({ onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      onSearch(searchTerm);
      setSearchTerm("");
    }
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
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <button type="button" 
          style={{ outline: "none", boxShadow: "none" }}
          onClick={() => {if (searchTerm.trim() !== "") onSearch(searchTerm); }}
          className="!outline-none !focus:outline-none !hover:outline-none !active:outline-none !border-none absolute right-1 text-gray-500 p-0">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Actions */}
      <nav className="flex items-center space-x-12 px-6 py-2">
        <Link to="/products/new" className="text-white">Vender</Link>
        <Link to="/inicio-sesion" className="text-white">Iniciar sesión</Link>
        <Link to="/carrito" className="text-white flex items-center space-x-1">
          <ShoppingCart className="h-5 w-5" />
          <span>Carrito</span>
        </Link>
      </nav>
    </header>
  );
}
