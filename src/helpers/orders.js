import { useAuthStore } from '../store/authStore';

const url = `${import.meta.env.VITE_BACKEND_URL}orders/`;

const getToken = () => useAuthStore.getState().token;

export const getOrders = async () => {
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

export const getOrder = async (id) => {
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

export const postOrders = async (data) => {
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

export const putOrders = async (id, data) => {
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

export const deleteOrders = async (id) => {
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
