import { LoginForm } from "@/components/LoginForm";
import logo from "../assets/logo.svg";

export const LoginPage = () => {
  return (
    <div className="flex flex-col items-center p-5 mt-8">
      <a href="/">
        <img className="w-44 h-auto" src={logo} alt="U-Market" />
      </a>
      <LoginForm />
    </div>
  );
};
