import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import { getProduct, postProducts, putProducts } from "../../helpers/products";
import { getCategories } from "../../helpers/categories";
import { mensajeCofirm, mensajeError } from "../../helpers/swal";

const inputClass =
  "w-full bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all text-sm";
const labelClass = "block text-xs font-medium text-zinc-400 mb-1";

const emptyForm = {
  name: "", price: "", description: "",
  categorie: "", imagen: "", available: true, stock: "",
};

const ModalProducts = ({ show, handleClose, actualizar }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formValue, setFormValue] = useState(emptyForm);

  useEffect(() => {
    getCategories().then((res) => setCategories(res.categories));
  }, []);

  useEffect(() => {
    setFormValue(emptyForm);
    if (actualizar) {
      getProduct(actualizar).then((res) => {
        const p = res.product;
        setFormValue({
          name: p.name, price: p.price, description: p.description,
          categorie: p.categorie, imagen: p.imagen,
          available: p.available, stock: p.stock,
        });
      });
    }
  }, [actualizar]);

  const handleChange = ({ target }) => {
    setFormValue({
      ...formValue,
      [target.name]: target.name === "available" ? target.checked : target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const action = actualizar
      ? putProducts(actualizar, formValue)
      : postProducts(formValue);

    action.then((res) => {
      setLoading(false);
      if (res.errors) return mensajeError(res.errors[0].msg);
      if (res.msg) mensajeCofirm(res.msg);
      handleClose();
    });
  };

  return (
    <Modal
      show={show}
      onClose={handleClose}
      title={actualizar ? "Editar producto" : "Nuevo producto"}
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
            form="form-products"
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm rounded-xl bg-green-600 hover:bg-green-500 text-white font-medium transition-colors disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </>
      }
    >
      <form id="form-products" onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className={labelClass}>Nombre</label>
          <input name="name" type="text" required value={formValue.name} onChange={handleChange} placeholder="Ej: Hulk: La fuerza verde" className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Precio</label>
            <input name="price" type="number" value={formValue.price} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Stock</label>
            <input name="stock" type="number" value={formValue.stock} onChange={handleChange} className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Descripción</label>
          <textarea name="description" rows={2} value={formValue.description} onChange={handleChange} className={inputClass + " resize-none"} />
        </div>
        <div>
          <label className={labelClass}>URL de imagen</label>
          <input name="imagen" type="text" value={formValue.imagen} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Categoría</label>
          <select name="categorie" required value={formValue.categorie} onChange={handleChange} className={inputClass}>
            <option value="">Elegir categoría</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="available"
            checked={formValue.available}
            onChange={handleChange}
            className="w-4 h-4 accent-green-500"
          />
          <span className="text-sm text-zinc-400">Disponible</span>
        </label>
      </form>
    </Modal>
  );
};

export default ModalProducts;
