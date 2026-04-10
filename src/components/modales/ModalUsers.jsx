import { useState } from "react";
import Modal from "../common/Modal";
import { postUsers } from "../../helpers/users";
import { mensajeCofirm, mensajeError } from "../../helpers/swal";

const inputClass =
  "w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all text-sm";
const labelClass = "block text-xs font-medium text-zinc-400 mb-1";

const ModalUsers = ({ show, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "", email: "", password: "",
    province: "", location: "", shippingAddress: "", rol: "",
  });

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    postUsers(formValue).then((respuesta) => {
      setLoading(false);
      if (respuesta.errors) return mensajeError(respuesta.errors[0].msg);
      mensajeCofirm("Usuario creado");
      setFormValue({ name: "", email: "", password: "", province: "", location: "", shippingAddress: "", rol: "" });
      handleClose();
    });
  };

  return (
    <Modal
      show={show}
      onClose={handleClose}
      title="Alta de usuario"
      footer={
        <>
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm rounded-xl border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-all"
          >
            Cancelar
          </button>
          <button
            form="form-users"
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm rounded-xl bg-green-600 hover:bg-green-500 text-white font-medium transition-colors disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </>
      }
    >
      <form id="form-users" onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Nombre</label>
            <input name="name" type="text" required value={formValue.name} onChange={handleChange} placeholder="Juan Perez" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input name="email" type="email" required value={formValue.email} onChange={handleChange} placeholder="juan@mail.com" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Password</label>
            <input name="password" type="password" required autoComplete="off" value={formValue.password} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Rol</label>
            <select name="rol" required value={formValue.rol} onChange={handleChange} className={inputClass}>
              <option value="">Elegir rol</option>
              <option value="USER_ROLE">Usuario</option>
              <option value="ADMIN_ROLE">Administrador</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Provincia</label>
            <input name="province" type="text" required value={formValue.province} onChange={handleChange} placeholder="Tucumán" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Localidad</label>
            <input name="location" type="text" required value={formValue.location} onChange={handleChange} placeholder="Capital" className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Dirección</label>
          <input name="shippingAddress" type="text" required value={formValue.shippingAddress} onChange={handleChange} placeholder="Calle 123" className={inputClass} />
        </div>
      </form>
    </Modal>
  );
};

export default ModalUsers;
