import { useState, useEffect } from "react";
import { getOrders, deleteOrders } from "../helpers/orders";
import ModalOrders from "../components/modales/ModalOrders";
import { mensajeCofirm, mensajeValidar } from "../helpers/swal";
import { FaEdit, FaTrash } from "react-icons/fa";

const statusColor = {
  PENDIENTE: "bg-amber-900/50 text-amber-400",
  ENVIADO: "bg-blue-900/50 text-blue-400",
  ENTREGADO: "bg-green-900/50 text-green-400",
};

const TableOrders = () => {
  const [actualizar, setActualizar] = useState("");
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState({ datos: [], loading: true });

  useEffect(() => {
    getOrders().then((respuesta) => {
      setOrders({ datos: respuesta.orders, loading: false });
    });
  }, []);

  const borrarOrder = async (id) => {
    const validar = await mensajeValidar("¿Eliminar este pedido?");
    if (validar) {
      deleteOrders(id).then((res) => {
        if (res.msg) {
          mensajeCofirm(res.msg);
          setOrders((prev) => ({
            ...prev,
            datos: prev.datos.filter((o) => o._id !== id),
          }));
        }
      });
    }
  };

  if (orders.loading) {
    return (
      <div className="text-zinc-500 text-sm py-4 text-center animate-pulse">
        Cargando...
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left text-xs text-zinc-500 uppercase tracking-wider py-2 pr-4">Estado</th>
              <th className="text-left text-xs text-zinc-500 uppercase tracking-wider py-2 pr-4">Productos</th>
              <th className="text-left text-xs text-zinc-500 uppercase tracking-wider py-2 pr-4">Dirección</th>
              <th className="text-left text-xs text-zinc-500 uppercase tracking-wider py-2 pr-4">Total</th>
              <th className="py-2" />
            </tr>
          </thead>
          <tbody>
            {orders.datos.map((order) => (
              <tr
                key={order._id}
                className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors"
              >
                <td className="py-2.5 pr-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[order.status] || "bg-zinc-800 text-zinc-500"}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-2.5 pr-4 text-zinc-400 text-xs">
                  {order.products?.map((p) => `${p.name} ×${p.amount}`).join(", ")}
                </td>
                <td className="py-2.5 pr-4 text-zinc-500 text-xs">
                  {order.shippingAddress}, {order.location}
                </td>
                <td className="py-2.5 pr-4 text-green-400 font-medium">
                  ${order.totalPrice}
                </td>
                <td className="py-2.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => { setActualizar(order._id); setShow(true); }}
                      className="text-zinc-600 hover:text-amber-400 transition-colors p-1"
                    >
                      <FaEdit size={13} />
                    </button>
                    <button
                      onClick={() => borrarOrder(order._id)}
                      className="text-zinc-600 hover:text-red-400 transition-colors p-1"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalOrders
        show={show}
        handleClose={() => setShow(false)}
        actualizar={actualizar}
      />
    </>
  );
};

export default TableOrders;
