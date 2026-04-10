import { useAuthStore } from '../store/authStore';

const url = `${import.meta.env.VITE_BACKEND_URL}products/`;

const getToken = () => useAuthStore.getState().token;

export const getProducts = async () => {
  const respuesta = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": getToken(),
    },
  });
  const datos = await respuesta.json();
  return datos;
};

export const getProduct = async (id) => {
  const respuesta = await fetch(`${url}${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": getToken(),
    },
  });
  const datos = await respuesta.json();
  return datos;
};

export const postProducts = async (data) => {
  const respuesta = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": getToken(),
    },
  });
  const datos = await respuesta.json();
  return datos;
};

export const putProducts = async (id, data) => {
  const respuesta = await fetch(`${url}${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": getToken(),
    },
  });
  const datos = await respuesta.json();
  return datos;
};

export const deleteProducts = async (id) => {
  const respuesta = await fetch(`${url}${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "x-token": getToken(),
    },
  });
  const datos = await respuesta.json();
  return datos;
};
