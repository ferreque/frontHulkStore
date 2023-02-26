import React, { useState } from "react";
import { postUsers } from "../../helpers/users";
import { Modal, Button } from "react-bootstrap";
const ModalUser = ({ show, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
    province: "",
    location: "",
    shippingAddress: "",
    rol: "",
  });

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    postUsers(formValue).then((respuesta) => {
      if (respuesta.errors) {
        setLoading(false);
        return window.alert(respuesta.errors[0].msg);
      }
      setLoading(false);
      setFormValue({
        name: "",
        email: "",
        password: "",
        province: "",
        location: "",
        shippingAddress: "",
        rol: "",
      });
      handleClose();
    });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Alta de Usuario</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Ej: Juan Peralta"
                required
                value={formValue.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="juanperalta@gmail.com"
                required
                value={formValue.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                autoComplete="off"
                required
                value={formValue.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Provincia</label>
              <input
                type="text"
                name="province"
                className="form-control"
                placeholder="Ej: Tucumán"
                required
                value={formValue.province}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Localidad</label>
              <input
                type="text"
                name="location"
                className="form-control"
                placeholder="Ej: Chicligasta"
                required
                value={formValue.location}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Dirección</label>
              <input
                type="text"
                name="shippingAddress"
                className="form-control"
                placeholder="Ej: Lavalle 952"
                required
                value={formValue.shippingAddress}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Rol</label>
              <select
                className="form-select"
                name="rol"
                aria-label="Default select example"
                value={formValue.rol}
                onChange={handleChange}
                required
              >
                <option defaultValue="">Elige un Rol</option>
                <option value="USER_ROLE">Usuario</option>
                <option value="ADMIN_ROLE">Administrador</option>
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" type="submit" disabled={loading}>
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default ModalUser;
