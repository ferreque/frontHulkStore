import { useState, useEffect } from "react";
import CardFin from "../components/CardFin";
import { getProduct } from "../helpers/products";
import { TailSpin } from "react-loader-spinner";
import { HulkNavbar } from "../components/common/navbar/HulkNavbar";
import { HulkFooter } from "../components/common/footer/HulkFooter";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Carrito = () => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const [pedidos, setPedidos] = useState([]);
  const [loadVisible, setLoadVisible] = useState(true);
  const [btnDisable, setBtnDisable] = useState(true);

  useEffect(() => {
    if (carrito.length === 0) {
      setLoadVisible(false);
      return;
    }
    const pedido = [];
    Promise.all(
      carrito.map((product) =>
        getProduct(product._id).then((res) => {
          if (res.product) pedido.push(res.product);
        })
      )
    ).then(() => {
      setPedidos(pedido);
      setLoadVisible(false);
      setBtnDisable(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <HulkNavbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full">
        <h1 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <FaShoppingCart className="text-green-500" />
          Tu carrito
        </h1>

        {loadVisible ? (
          <div className="flex justify-center py-20">
            <TailSpin visible height={60} width={60} color="#16a34a" ariaLabel="cargando" />
          </div>
        ) : carrito.length === 0 ? (
          <div className="text-center py-20">
            <FaShoppingCart className="text-zinc-700 mx-auto mb-4" size={60} />
            <p className="text-zinc-500 text-lg">Tu carrito está vacío</p>
            <Link
              to="/"
              className="mt-6 inline-block bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <CardFin
            pedidos={pedidos}
            setPedidos={setPedidos}
            btnDisable={btnDisable}
            setBtnDisable={setBtnDisable}
          />
        )}
      </main>
      <HulkFooter />
    </div>
  );
};

export default Carrito;
