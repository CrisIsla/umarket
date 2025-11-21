import { RegisterForm } from "@/components/RegisterForm";
import logo from "../assets/logo.svg";
import { Link } from "react-router";

export const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center p-5 mt-8">
      <Link to="/" className="flex items-center px-4 py-1">
        <img src={logo} alt="Umarket Logo" className="w-44 h-auto" />
      </Link>
      <RegisterForm />
    </div>
  );
};
