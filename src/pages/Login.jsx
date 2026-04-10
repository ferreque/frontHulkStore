import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postAuth } from "../helpers/authentication";
import { useAuthStore } from "../store/authStore";

const Login = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [btnDisable, setBtnDisable] = useState(false);
  const [login, setLogin] = useState({});
  const [formValue, setformValue] = useState({ email: "", password: "" });

  useEffect(() => {
    if (login.token) {
      setAuth({ token: login.token, user: login.user ?? null });
      setTimeout(() => navigate("/", { replace: true }), 1500);
    }
  }, [login, navigate, setAuth]);

  const handleChange = ({ target }) => {
    setformValue({ ...formValue, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    if (email && password) {
      setBtnDisable(true);
      postAuth(formValue).then((respuesta) => {
        setLogin(respuesta);
        setBtnDisable(false);
        setformValue({ email: "", password: "" });
      });
    }
  };

  return (
    <div className="bg-hulk relative flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/65" />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-white tracking-tight">
            HULK<span className="text-green-500">STORE</span>
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Tu tienda de coleccionables Marvel
          </p>
        </div>

        <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-700/60 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-6">
            Iniciar sesión
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formValue.email}
                onChange={handleChange}
                placeholder="juanperez@gmail.com"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formValue.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all text-sm"
              />
            </div>

            {login.ok === false && (
              <div className="bg-red-950/50 border border-red-800/60 text-red-400 text-sm px-4 py-3 rounded-xl">
                {login.msg}
              </div>
            )}

            <button
              type="submit"
              disabled={btnDisable}
              className="w-full bg-green-600 hover:bg-green-500 active:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all mt-2"
            >
              {btnDisable ? "Ingresando..." : "Ingresar"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/registro"
              className="text-zinc-500 hover:text-green-400 text-sm transition-colors"
            >
              ¿No tenés cuenta?{" "}
              <span className="text-green-500 font-medium">Registrate</span>
            </Link>
          </div>
        </div>

        <p className="text-center text-zinc-700 text-xs mt-5">
          Demo — admin@admin.com · user@user.com · pass: 123456
        </p>
      </div>
    </div>
  );
};

export default Login;
