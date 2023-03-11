import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const HulkNavbar = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({ rol: "" });
  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("auth")) || [];
    setState(datos.user);
  }, []);
  const cerrarSesion = () => {
    navigate("/login");
    localStorage.setItem("auth", JSON.stringify(""));
  };
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <a className="navbar-brand" href="/">
        HulkStore
      </a>

      <div className="" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <a className="nav-link active" href="/">
            INICIO
          </a>
          {state.rol === "ADMIN_ROLE" ? (
            <a className="nav-link disable" href="/admin">
              Admin
            </a>
          ) : (
            ""
          )}

          <button
            onClick={cerrarSesion}
            className="btn btn-outline-danger my-sm-0 justify-content-end"
            id="cerrarSesion"
            type="submit"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};
