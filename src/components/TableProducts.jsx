import { useState, useEffect } from "react";
import { getProducts, deleteProducts } from "../helpers/products";
import ModalProducts from "../components/modales/ModalProducts";
import { mensajeCofirm, mensajeValidar } from "../helpers/swal";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const TableProducts = () => {
  const [actualizar, setActualizar] = useState("");
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState({ datos: [], loading: true });

  useEffect(() => {
    getProducts().then((respuesta) => {
      setProducts({ datos: respuesta.products, loading: false });
    });
  }, []);

  const borrarProduct = async (id) => {
    const prod = products.datos.find((p) => p._id === id);
    const validar = await mensajeValidar(
      `¿Eliminar el producto "${prod.name}"?`
    );
    if (validar) {
      deleteProducts(id).then((res) => {
        if (res.msg) {
          mensajeCofirm(res.msg);
          setProducts((prev) => ({
            ...prev,
            datos: prev.datos.filter((p) => p._id !== id),
          }));
        }
      });
    }
  };

  if (products.loading) {
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
              <th className="text-left text-xs text-zinc-500 uppercase tracking-wider py-2 pr-4">Nombre</th>
              <th className="text-left text-xs text-zinc-500 uppercase tracking-wider py-2 pr-4">Precio</th>
              <th className="text-left text-xs text-zinc-500 uppercase tracking-wider py-2 pr-4">Stock</th>
              <th className="text-left text-xs text-zinc-500 uppercase tracking-wider py-2 pr-4">Categoría</th>
              <th className="text-right py-2">
                <button
                  onClick={() => { setActualizar(""); setShow(true); }}
                  className="bg-green-600 hover:bg-green-500 text-white p-1.5 rounded-lg transition-colors"
                  title="Nuevo producto"
                >
                  <FaPlus size={12} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.datos.map((product) => (
              <tr
                key={product._id}
                className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors"
              >
                <td className="py-2.5 pr-4 text-zinc-200 max-w-[180px] truncate">
                  {product.name}
                </td>
                <td className="py-2.5 pr-4 text-green-400 font-medium">
                  ${product.price}
                </td>
                <td className="py-2.5 pr-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    product.stock > 5
                      ? "bg-green-900/50 text-green-400"
                      : product.stock > 0
                      ? "bg-amber-900/50 text-amber-400"
                      : "bg-red-900/50 text-red-400"
                  }`}>
                    {product.stock}
                  </span>
                </td>
                <td className="py-2.5 pr-4 text-zinc-500 text-xs">
                  {product.categorie?.name}
                </td>
                <td className="py-2.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => { setActualizar(product._id); setShow(true); }}
                      className="text-zinc-600 hover:text-amber-400 transition-colors p-1"
                    >
                      <FaEdit size={13} />
                    </button>
                    <button
                      onClick={() => borrarProduct(product._id)}
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
      <ModalProducts
        show={show}
        handleClose={() => setShow(false)}
        actualizar={actualizar}
      />
    </>
  );
};

export default TableProducts;
