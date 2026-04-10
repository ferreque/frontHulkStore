import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { getProducts } from "../helpers/products";
import { HulkNavbar } from "../components/common/navbar/HulkNavbar";
import { HulkFooter } from "../components/common/footer/HulkFooter";
import CardProd from "../components/CardProd";

const CATEGORIAS = ["Comics", "Juguetes", "Accesorios", "Vasos", "Camisetas", "Otros"];

const Inicio = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("TODOS");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((respuesta) => {
      if (respuesta.products) {
        setProducts(respuesta.products);
        setLoading(false);
      } else {
        setTimeout(() => navigate("/login", { replace: true }), 1500);
      }
    });
  }, []);

  const filtro = (categ) => {
    setActiveFilter(categ);
    getProducts().then((respuesta) => {
      if (categ === "TODOS") {
        setProducts(respuesta.products);
      } else {
        setProducts(
          respuesta.products.filter((p) => p.categorie.name === categ)
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <HulkNavbar />

      {/* Filter bar */}
      <div className="bg-zinc-900 border-b border-zinc-800 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
            {["TODOS", ...CATEGORIAS].map((cat) => (
              <button
                key={cat}
                onClick={() => filtro(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeFilter === cat
                    ? "bg-green-600 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        <h1 className="text-2xl font-bold text-white mb-6">
          {activeFilter === "TODOS" ? "Todos los productos" : activeFilter}
          {!loading && (
            <span className="ml-3 text-sm font-normal text-zinc-500">
              {products.length} productos
            </span>
          )}
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-zinc-900 rounded-2xl h-80 animate-pulse"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-zinc-600">
            No hay productos en esta categoría
          </div>
        ) : (
          <CardProd products={products} />
        )}
      </main>

      {/* Floating cart */}
      <Link
        to="/carrito"
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-green-900/40 transition-all hover:scale-110"
        aria-label="Ver carrito"
      >
        <FaShoppingCart size={22} />
      </Link>

      <HulkFooter />
    </div>
  );
};

export default Inicio;
