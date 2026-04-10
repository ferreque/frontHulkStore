import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mensajeCofirm, mensajeError } from "../helpers/swal";
import { postUsers } from "../helpers/users";

const inputClass =
  "w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all text-sm";
const labelClass = "block text-sm font-medium text-zinc-400 mb-1";

const Registro = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    province: "",
    location: "",
    shippingAddress: "",
    img: "",
    rol: "USER_ROLE",
  });

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.password || !formValue.password2) {
      return mensajeError("Debe completar todos los campos");
    }
    if (formValue.password !== formValue.password2) {
      return mensajeError("Las contraseñas deben ser iguales");
    }
    postUsers(formValue).then((respuesta) => {
      if (respuesta.errors) return mensajeError(respuesta.errors[0].msg);
      if (respuesta.msg) {
        mensajeCofirm(respuesta.msg);
        setTimeout(() => navigate("/login", { replace: true }), 1500);
      }
    });
  };

  return (
    <div className="bg-hulk relative flex items-center justify-center p-4 py-10">
      <div className="absolute inset-0 bg-black/65" />
      <div className="relative z-10 w-full max-w-lg">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-black text-white tracking-tight">
            HULK<span className="text-green-500">STORE</span>
          </h1>
        </div>

        <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-700/60 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-6">Crear cuenta</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nombre</label>
                <input
                  name="name"
                  value={formValue.name}
                  onChange={handleChange}
                  required
                  type="text"
                  maxLength={70}
                  placeholder="Juan Perez"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  name="email"
                  type="email"
                  value={formValue.email}
                  required
                  onChange={handleChange}
                  autoComplete="email"
                  maxLength={50}
                  placeholder="juanperez@gmail.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Contraseña</label>
                <input
                  name="password"
                  type="password"
                  value={formValue.password}
                  required
                  onChange={handleChange}
                  maxLength={50}
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Confirmar contraseña</label>
                <input
                  name="password2"
                  type="password"
                  value={formValue.password2}
                  required
                  onChange={handleChange}
                  maxLength={50}
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Provincia</label>
                <input
                  name="province"
                  value={formValue.province}
                  onChange={handleChange}
                  required
                  type="text"
                  maxLength={50}
                  placeholder="Tucumán"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Localidad</label>
                <input
                  name="location"
                  value={formValue.location}
                  onChange={handleChange}
                  required
                  type="text"
                  maxLength={50}
                  placeholder="San Miguel de Tucumán"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Dirección de envío</label>
              <input
                name="shippingAddress"
                value={formValue.shippingAddress}
                onChange={handleChange}
                required
                type="text"
                maxLength={50}
                placeholder="Calle Siempreviva 456"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>URL de foto (opcional)</label>
              <input
                name="img"
                type="text"
                value={formValue.img}
                onChange={handleChange}
                maxLength={700}
                placeholder="https://linkdetufoto.com"
                className={inputClass}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-500 active:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all"
              >
                Crear cuenta
              </button>
              <Link
                to="/login"
                className="flex-1 text-center border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-medium py-3 rounded-xl transition-all text-sm flex items-center justify-center"
              >
                Ya tengo cuenta
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
