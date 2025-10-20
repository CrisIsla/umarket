import { LoginForm } from "@/components/LoginForm";
import logo from "../assets/logo.svg";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  setCsrfToken : Dispatch<SetStateAction<string | null>>
}

export const LoginPage = ({setCsrfToken}: Props) => {
  return (
    <div className="flex flex-col items-center p-5 mt-8">
      <a href="/">
        <img className="w-44 h-auto" src={logo} alt="U-Market" />
      </a>
      <LoginForm setCsrfToken={setCsrfToken}/>
    </div>
  );
};
