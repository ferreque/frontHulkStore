import TableCategories from "../components/TableCategories";
import TableProducts from "../components/TableProducts";
import TableUsers from "../components/TableUsers";
import TableOrders from "../components/TableOrders";
import { HulkNavbar } from "../components/common/navbar/HulkNavbar";
import { useAuthStore } from "../store/authStore";

const Admin = () => {
  const rol = useAuthStore((state) => state.rol);

  if (rol !== "ADMIN_ROLE") {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="bg-red-950/40 border border-red-800/60 text-red-400 px-8 py-6 rounded-2xl text-center">
          <p className="text-2xl font-bold mb-2">Acceso denegado</p>
          <p className="text-sm text-red-500/70">No tenés permisos para ver esta página.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <HulkNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">Panel de administración</h1>
          <p className="text-zinc-500 mt-1 text-sm">Gestioná usuarios, productos, categorías y pedidos.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Usuarios</h2>
            <TableUsers />
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Categorías</h2>
            <TableCategories />
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Productos</h2>
          <TableProducts />
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Pedidos</h2>
          <TableOrders />
        </div>
      </div>
    </div>
  );
};

export default Admin;
