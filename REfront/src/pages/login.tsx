import type { ReactInstance, ReactNode } from "react";
import { LoginForm } from "@/components/LoginForm";
import Navbar from "@/components/navBar";



export function Login() {


    return (
        <>
            <Navbar />
            <LoginForm />
        </>
    )
}