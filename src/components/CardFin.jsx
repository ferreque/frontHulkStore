import { useEffect, useState } from "react";
import { mensajeCofirm, mensajeError } from "../helpers/swal";
import { postOrders } from "../helpers/orders";
import { putProducts } from "../helpers/products";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const CardFin = ({ pedidos, setPedidos, btnDisable }) => {
  const navigate = useNavigate();
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const user = JSON.parse(localStorage.getItem("auth"))?.user;

  const sumaTotal = carrito.reduce(
    (acc, prod) => acc + prod.price * prod.amount,
    0
  );

  const [total, setTotal] = useState(sumaTotal);

  useEffect(() => {
    setTotal(sumaTotal);
  }, [pedidos]);

  const confirmarPedido = () => {
    let stockNegativo = false;

    for (const product of carrito) {
      if (product.stock - product.amount < 0) {
        stockNegativo = true;
        mensajeError(
          `Stock insuficiente: solo quedan ${product.stock} unidades de "${product.name}"`
        );
        localStorage.setItem("carrito", JSON.stringify([]));
        navigate("/", { replace: true });
        return;
      }
    }

    if (!stockNegativo) {
      carrito.forEach((product) => {
        putProducts(product._id, { ...product, stock: product.stock - product.amount });
      });

      const orden = {
        products: carrito,
        location: user.location,
        province: user.province,
        shippingAddress: user.shippingAddress,
        totalPrice: total,
      };

      postOrders(orden).then((respuesta) => {
        if (respuesta.errors) return mensajeError(respuesta.errors[0].msg);
        mensajeCofirm("¡Pedido confirmado!");
        localStorage.setItem("carrito", JSON.stringify([]));
        navigate("/", { replace: true });
      });
    }
  };

  const borrarProducto = (pedido) => {
    const nuevo = carrito.filter((p) => p._id !== pedido._id);
    localStorage.setItem("carrito", JSON.stringify(nuevo));
    setPedidos(pedidos.filter((p) => p._id !== pedido._id));
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {carrito.map((pedido) => (
          <div
            key={pedido._id}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="h-36 bg-zinc-800 overflow-hidden">
              <img
                src={pedido.imagen}
                alt={pedido.name}
                className="w-full h-full object-contain p-2"
              />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                {pedido.name}
              </h3>
              <p className="text-green-400 font-bold text-base mb-1">
                ${pedido.price}
              </p>
              <p className="text-zinc-500 text-xs mb-3">
                Cantidad: {pedido.amount}
              </p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-zinc-400 text-sm font-medium">
                  Subtotal:{" "}
                  <span className="text-white">${pedido.price * pedido.amount}</span>
                </span>
                <button
                  onClick={() => borrarProducto(pedido)}
                  className="text-red-500 hover:text-red-400 hover:bg-red-950/50 p-2 rounded-lg transition-all"
                  aria-label="Eliminar producto"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order summary */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-sm ml-auto">
        <h3 className="text-white font-semibold text-lg mb-4">Resumen</h3>
        <div className="flex justify-between text-zinc-400 text-sm mb-2">
          <span>Subtotal</span>
          <span>${total}</span>
        </div>
        <div className="flex justify-between text-zinc-400 text-sm mb-4">
          <span>Envío</span>
          <span className="text-green-500">Gratis</span>
        </div>
        <div className="border-t border-zinc-800 pt-4 flex justify-between text-white font-bold text-lg mb-5">
          <span>Total</span>
          <span>${total}</span>
        </div>
        <button
          onClick={confirmarPedido}
          disabled={btnDisable}
          className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all"
        >
          Confirmar pedido
        </button>
      </div>
    </div>
  );
};

export default CardFin;
