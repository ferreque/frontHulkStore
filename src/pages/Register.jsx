import React, { useState } from "react";
import { mensajeCofirm, mensajeError } from "../helpers/swal";
import { Form, Container, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postUsers } from "../helpers/users";

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
    rol: "USER_ROLE",
  });
  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValue.password && formValue.password2) {
      if (formValue.password === formValue.password2) {
        postUsers(formValue).then((respuesta) => {
          if (respuesta.errors) {
            return mensajeError(respuesta.errors[0].msg);
          }
          if (respuesta.msg) {
            mensajeCofirm(respuesta.msg);
            setTimeout(() => {
              navigate("../login", { replace: true });
            }, 1500);
          }
        });
      } else {
        return mensajeError("Las constraseñas deben ser iguales");
      }
    } else {
      return mensajeError("Debe completar todos los campos");
    }
  };

  return (
    <Container fluid className="pt-2 background-up">
      <Form
        className="border border-warning border-3 rounded card-body bg-light col-8 col-lg-5 mx-auto"
        onSubmit={handleSubmit}
      >
        <div className=" d-flex justify-content-center">
          <h1 className=" text-black font-weight-bolder">REGISTRO</h1>
        </div>
        <Form.Label>Nombre de Usuario:</Form.Label>
        <Form.Control
          name="name"
          value={formValue.name}
          onChange={handleChange}
          required
          type="text"
          maxLength={70}
          placeholder="Juan Perez"
        />

        <Form.Group className="mb-2" controlId="formBasicEmail">
          <Form.Label>Escribí tu mail:</Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={formValue.email}
            required
            onChange={handleChange}
            autoComplete="email"
            maxLength={50}
            placeholder="juanperez@gmail.com"
          />
        </Form.Group>

        <Form.Group
          className="mb-2 mx-auto text-dark"
          controlId="formBasicPassword"
        >
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            name="password"
            type="password"
            value={formValue.password}
            required
            onChange={handleChange}
            maxLength={50}
            placeholder="******"
          />
        </Form.Group>

        <Form.Group className="mb-2 mx-auto ">
          <Form.Label>Confirma tu contraseña:</Form.Label>
          <Form.Control
            name="password2"
            type="password"
            value={formValue.password2}
            required
            onChange={handleChange}
            maxLength={50}
            placeholder="******"
          />
        </Form.Group>
        <Form.Label className="">Provincia:</Form.Label>
        <Form.Control
          name="province"
          value={formValue.province}
          onChange={handleChange}
          required
          type="text"
          maxLength={50}
          placeholder="Valencia"
        />
        <Form.Label className="">Localidad:</Form.Label>
        <Form.Control
          name="location"
          value={formValue.location}
          onChange={handleChange}
          required
          type="text"
          maxLength={50}
          placeholder="Ruzafa"
        />
        <Form.Label className="">Dirección:</Form.Label>
        <Form.Control
          name="shippingAddress"
          value={formValue.shippingAddress}
          onChange={handleChange}
          required
          type="text"
          maxLength={50}
          placeholder="Calle Siempreviva 456"
        />

        <Form.Group className="mb-2 mx-auto ">
          <Form.Label>Carga tu foto:</Form.Label>
          <Form.Control
            name="img"
            type="text"
            value={formValue.img}
            onChange={handleChange}
            maxLength={700}
            placeholder="http://linkdetufoto.com"
          />
        </Form.Group>
        <Row>
          <Button
            variant="primary"
            type="submit"
            className="mb-2 btn btn-success rounded login-btn col-4 mx-auto"
          >
            CREAR CUENTA
          </Button>
          <Button className="mb-2 btn btn-success rounded login-btn col-4 mx-auto">
            <a href="../login" className="text-white">
              LOGIN
            </a>
          </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default Registro;
