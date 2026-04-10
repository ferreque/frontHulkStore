import { useAuthStore } from '../store/authStore';

const url = `${import.meta.env.VITE_BACKEND_URL}users/`;

const getToken = () => useAuthStore.getState().token;

export const getUsers = async () => {
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

export const getUser = async (id) => {
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

export const postUsers = async (data) => {
  const respuesta = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const datos = await respuesta.json();
  return datos;
};

export const putUsers = async (id, data) => {
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

export const deleteUsers = async (id) => {
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
