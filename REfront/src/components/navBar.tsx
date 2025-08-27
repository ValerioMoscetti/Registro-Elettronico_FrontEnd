import { FaHome } from "react-icons/fa"; // Usa react-icons per l'icona Home

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
      {/* Home Icon */}
      <div className="flex items-center space-x-2">
        <FaHome className="text-xl" />
        <span className="hidden sm:inline">Home Registro</span>
      </div>

      {/* Placeholder centrale */}
      <div className="text-right flex-1">
        <span className="text-sm sm:text-base">[Testo Placeholder]</span>
      </div>

      {/* Spazio vuoto a destra per bilanciare layout */}
      <div className="w-6 sm:w-12" />
    </nav>
  );
}
