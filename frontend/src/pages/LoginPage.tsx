import { LoginForm } from "@/components/LoginForm";
import logo from "../assets/logo.svg";
import { Link } from "react-router";

export const LoginPage = () => {
  return (
    <div className="flex flex-col items-center p-5 mt-8">
      <Link to="/" className="flex items-center px-4 py-1">
        <img src={logo} alt="Umarket Logo" className="w-44 h-auto" />
      </Link>
      <LoginForm />
    </div>
  );
};
