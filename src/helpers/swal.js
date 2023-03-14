import Swal from "sweetalert2";

export const mensajeCofirm = (mensaje) => {
  Swal.fire({
    title: mensaje,
    icon: "success",
    confirmButtonColor: "#3085d6",
  });
};

export const mensajeError = (mensaje) => {
  Swal.fire({
    title: mensaje,
    icon: "error",
    cancelButtonColor: "#d33",
  });
};

export const mensajeValidar = (mensaje, text) => {
  return new Promise((resolve) => {
    Swal.fire({
      title: mensaje,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then((result) => {
      resolve(result.isConfirmed);
    });
  });
};
