import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postAuth } from "../helpers/authentication";

const Login = () => {
  const isMounted = useRef(true);
  const navigate = useNavigate();
  const [btnDisable, setBtnDisable] = useState(false);
  const [login, setLogin] = useState({});
  const [formValue, setformValue] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (login.token) {
      localStorage.setItem("auth", JSON.stringify(login));
      setTimeout(() => {
        navigate("../", { replace: true });
      }, 1500);
    }
  }, [login, navigate]);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleChange = ({ target }) => {
    setformValue({
      ...formValue,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;

    if (email && password) {
      setBtnDisable(true);
      if (isMounted.current) {
        postAuth(formValue).then((respuesta) => {
          setLogin(respuesta);
          setBtnDisable(false);
          setformValue({
            email: "",
            password: "",
          });
        });
      }
    }
  };

  return (
    <div className="container-fluid background-up">
      <div className="row pt-5">
        <div className="col d-flex justify-content-center">
          <h1 className="mt-5 text-white font-weight-bolder">Hulk-Store</h1>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-3 col-md-6 col-sm-6 mx-auto mt-5 d-flex justify-content-center">
          <div className="card card-body">
            <h3 className="card-title text-center">
              <i className="fa fa-user" aria-hidden="true"></i> Iniciar Sesión
            </h3>
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-2">
                <strong>EMAIL</strong>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formValue.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mb-3">
                <strong>PASSWORD</strong>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formValue.password}
                  onChange={handleChange}
                />
              </div>
              <div className="nav-item">
                <Link className="nav-link link-warning ps-0" to="/registro">
                  Create una cuenta!
                </Link>
              </div>
              <div className="d-grid gap-1">
                <button className="btn btn-success" disabled={btnDisable}>
                  <i className="fa fa-sign-in" aria-hidden="true"></i>
                  Ingresar
                </button>
              </div>

              {login.ok === false && (
                <div className="alert alert-danger mt-3" role="alert">
                  {login.msg}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
