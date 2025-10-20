import { RegisterForm } from "@/components/RegisterForm";
import logo from "../assets/logo.svg";

export const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center p-5 mt-8">
      <a href="/">
        <img className="w-44" src={logo} alt="U-Market" />
      </a>
      <RegisterForm />
    </div>
  );
};
