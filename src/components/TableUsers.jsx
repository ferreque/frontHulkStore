import { useState, useEffect } from "react";
import { getUsers, deleteUsers } from "../helpers/users";
import ModalUsers from "../components/modales/ModalUsers";
import { mensajeCofirm, mensajeValidar } from "../helpers/swal";
import { FaUserPlus, FaTrash } from "react-icons/fa";

const TableUsers = () => {
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState({ datos: [], loading: true });

  useEffect(() => {
    getUsers().then((respuesta) => {
      setUsers({ datos: respuesta.users, loading: false });
    });
  }, []);

  const borrarUser = async (id) => {
    const usuario = users.datos.find((u) => u._id === id);
    const validar = await mensajeValidar(
      `¿Eliminar al usuario ${usuario.name}?`,
      "No podrá revertir esta decisión"
    );
    if (validar) {
      deleteUsers(id).then((res) => {
        if (res.msg) {
          mensajeCofirm(res.msg);
          setUsers((prev) => ({
            ...prev,
            datos: prev.datos.filter((u) => u._id !== id),
          }));
        }
      });
    }
  };

  if (users.loading) {
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
              <th className="text-left text-xs text-zinc-500 uppercase tracking-wider py-2 pr-4">
                Nombre
              </th>
              <th className="text-left text-xs text-zinc-500 uppercase tracking-wider py-2 pr-4">
                Email
              </th>
              <th className="text-left text-xs text-zinc-500 uppercase tracking-wider py-2 pr-4">
                Rol
              </th>
              <th className="text-right py-2">
                <button
                  onClick={() => setShow(true)}
                  className="bg-green-600 hover:bg-green-500 text-white p-1.5 rounded-lg transition-colors"
                  title="Nuevo usuario"
                >
                  <FaUserPlus size={13} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.datos.map((user) => (
              <tr
                key={user._id}
                className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors"
              >
                <td className="py-2.5 pr-4 text-zinc-200">{user.name}</td>
                <td className="py-2.5 pr-4 text-zinc-400 text-xs">{user.email}</td>
                <td className="py-2.5 pr-4">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      user.rol === "ADMIN_ROLE"
                        ? "bg-green-900/50 text-green-400"
                        : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {user.rol === "ADMIN_ROLE" ? "Admin" : "Usuario"}
                  </span>
                </td>
                <td className="py-2.5 text-right">
                  <button
                    onClick={() => borrarUser(user._id)}
                    className="text-zinc-600 hover:text-red-400 transition-colors p-1"
                  >
                    <FaTrash size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalUsers show={show} handleClose={() => setShow(false)} />
    </>
  );
};

export default TableUsers;
