"use client";

import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-form";
import { useState } from "react";


export const AuthComponent = () => {
  const [loginMode, setLoginMode] = useState(true);

  const getCurrentForm = () => {
    if (loginMode) {
      return <LoginForm />
    }
    return <RegisterForm />
  }

  return (
    <div className="flex h-full justify-center items-center" >
      <div className="flex flex-col bg-green-500/50 p-10 rounded-2xl shadow-2xl" >
        {getCurrentForm()}
        <button
          onClick={() => {
            setLoginMode((prevMode) => !prevMode)
          }}
          className="pt-7 italic hover:underline font-sans"
        >
          {loginMode ? "Don't have an account?": "Already have an account?"}
        </button>
      </div>
    </div>
  )
}
