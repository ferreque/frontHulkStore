import { Link } from "react-router-dom";
import { HulkNavbar } from "../components/common/navbar/HulkNavbar";
import { HulkFooter } from "../components/common/footer/HulkFooter";

const Error404 = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <HulkNavbar />
      <div className="flex-1 flex items-center justify-center flex-col text-center px-4">
        <p className="text-green-500 font-bold text-lg tracking-widest uppercase mb-2">
          Error
        </p>
        <h1 className="text-[10rem] font-black text-zinc-800 leading-none select-none">
          404
        </h1>
        <p className="text-zinc-400 text-xl mt-2">Página no encontrada</p>
        <p className="text-zinc-600 text-sm mt-2 max-w-sm">
          La página que buscás no existe o fue movida.
        </p>
        <Link
          to="/"
          className="mt-8 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors inline-block"
        >
          Volver al inicio
        </Link>
      </div>
      <HulkFooter />
    </div>
  );
};

export default Error404;
