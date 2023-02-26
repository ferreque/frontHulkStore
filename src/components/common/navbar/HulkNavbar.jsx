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
    localStorage.setItem("auth", JSON.stringify(""));
    const redireccion = () => navigate("../", { replace: true });
    redireccion();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        HulkStore
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
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
            className="btn btn-outline-danger my-2 my-sm-0 justify-content-end"
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
