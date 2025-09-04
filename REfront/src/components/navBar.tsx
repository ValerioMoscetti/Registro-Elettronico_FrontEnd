import { FaHome } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import type { User } from "@/types/User";
import { use } from "react";


export default function Navbar() {

  const { user, logout } = useUser()






  return (
    <nav className="w-full bg-gray-800 text-white px-4 py-3 flex items-center justify-between">

      <div className="flex items-center space-x-2">
        <FaHome className="text-xl" />
        <span className="hidden sm:inline">Home Registro</span>
      </div>


      <div className="text-right flex-1">
        <span className="text-sm sm:text-base">{user?.firstName || "Login"} | <button onClick={() => logout()}>Logout</button></span>
      </div>

      <div className="w-6 sm:w-12" />
    </nav>
  );
}
