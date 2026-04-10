import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import { getOrder, postOrders, putOrders } from "../../helpers/orders";
import { mensajeCofirm, mensajeError } from "../../helpers/swal";

const inputClass =
  "w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all text-sm";
const labelClass = "block text-xs font-medium text-zinc-400 mb-1";

const emptyForm = {
  totalPrice: "", status: "", shippingAddress: "",
  location: "", province: "", activeOrder: true,
};

const ModalOrders = ({ show, handleClose, actualizar }) => {
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState(emptyForm);

  useEffect(() => {
    setFormValue(emptyForm);
    if (actualizar) {
      getOrder(actualizar).then((res) => {
        const o = res.order;
        setFormValue({
          totalPrice: o.totalPrice, status: o.status,
          shippingAddress: o.shippingAddress, location: o.location,
          province: o.province, activeOrder: o.activeOrder,
        });
      });
    }
  }, [actualizar]);

  const handleChange = ({ target }) => {
    setFormValue({
      ...formValue,
      [target.name]: target.name === "activeOrder" ? target.checked : target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const action = actualizar
      ? putOrders(actualizar, formValue)
      : postOrders(formValue);

    action.then((res) => {
      setLoading(false);
      if (res.errors) return mensajeError(res.errors[0].msg);
      if (res.msg) mensajeCofirm(res.msg);
      if (!actualizar) setFormValue(emptyForm);
      handleClose();
    });
  };

  return (
    <Modal
      show={show}
      onClose={handleClose}
      title={actualizar ? "Editar pedido" : "Nuevo pedido"}
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
            form="form-orders"
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm rounded-xl bg-green-600 hover:bg-green-500 text-white font-medium transition-colors disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </>
      }
    >
      <form id="form-orders" onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Provincia</label>
            <input name="province" type="text" required value={formValue.province} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Localidad</label>
            <input name="location" type="text" required value={formValue.location} onChange={handleChange} className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Dirección de envío</label>
          <input name="shippingAddress" type="text" required value={formValue.shippingAddress} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Precio total</label>
          <input name="totalPrice" type="number" value={formValue.totalPrice} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Estado</label>
          <select name="status" required value={formValue.status} onChange={handleChange} className={inputClass}>
            <option value="">Estado del pedido</option>
            <option value="PENDIENTE">Pendiente</option>
            <option value="ENVIADO">Enviado</option>
            <option value="ENTREGADO">Entregado</option>
          </select>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="activeOrder"
            checked={formValue.activeOrder}
            onChange={handleChange}
            className="w-4 h-4 accent-green-500"
          />
          <span className="text-sm text-zinc-400">Pedido activo</span>
        </label>
      </form>
    </Modal>
  );
};

export default ModalOrders;
