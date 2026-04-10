import { useState, useEffect } from "react";
import { getCategories } from "../helpers/categories";

const TableCategories = () => {
  const [categories, setCategories] = useState({ datos: [], loading: true });

  useEffect(() => {
    getCategories().then((respuesta) => {
      setCategories({ datos: respuesta.categories, loading: false });
    });
  }, []);

  if (categories.loading) {
    return (
      <div className="text-zinc-500 text-sm py-4 text-center animate-pulse">
        Cargando...
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {categories.datos.map((cat) => (
        <div
          key={cat._id}
          className="flex items-center gap-2 py-2 border-b border-zinc-800/50"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
          <span className="text-zinc-300 text-sm">{cat.name}</span>
        </div>
      ))}
    </div>
  );
};

export default TableCategories;
