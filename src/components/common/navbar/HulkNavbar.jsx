import { Link, useNavigate } from "react-router-dom";
import { FaStore } from "react-icons/fa";
import { useAuthStore } from "../../../store/authStore";

export const HulkNavbar = () => {
  const navigate = useNavigate();
  const rol = useAuthStore((state) => state.rol);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const cerrarSesion = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-black text-green-500 hover:text-green-400 transition-colors tracking-tight"
        >
          <FaStore />
          HulkStore
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
          >
            Inicio
          </Link>
          {rol === "ADMIN_ROLE" && (
            <Link
              to="/admin"
              className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
            >
              Admin
            </Link>
          )}
          <button
            onClick={cerrarSesion}
            className="text-sm font-medium px-4 py-1.5 rounded-lg border border-red-800/60 text-red-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
            type="button"
          >
            Salir
          </button>
        </div>
      </div>
    </nav>
  );
};
