import { mensajeCofirm } from "../helpers/swal";

const CardProd = ({ products }) => {
  let lista = JSON.parse(localStorage.getItem("carrito")) || [];

  const agregarACarrito = (prod) => {
    const filtro = lista.find((p) => p._id === prod._id);
    if (filtro) {
      lista[lista.indexOf(filtro)].amount += 1;
    } else {
      lista.push({ ...prod, amount: 1 });
    }
    localStorage.setItem("carrito", JSON.stringify(lista));
    mensajeCofirm("Producto agregado al carrito");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col group hover:border-zinc-600 hover:shadow-xl hover:shadow-black/40 transition-all duration-300"
        >
          <div className="h-52 overflow-hidden bg-zinc-800">
            <img
              src={product.imagen}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-2"
            />
          </div>

          <div className="p-4 flex flex-col flex-1">
            <span className="text-xs font-medium text-green-500 uppercase tracking-wider mb-1">
              {product.categorie.name}
            </span>
            <h3 className="text-white font-semibold text-sm leading-snug mb-2 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-zinc-500 text-xs line-clamp-2 mb-3 flex-1">
              {product.description}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <div>
                <p className="text-green-400 font-bold text-lg">
                  ${product.price}
                </p>
                <p className="text-zinc-600 text-xs">
                  {product.stock} disponibles
                </p>
              </div>

              {product.stock > 0 ? (
                <button
                  onClick={() => agregarACarrito(product)}
                  className="bg-green-600 hover:bg-green-500 active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
                >
                  Agregar
                </button>
              ) : (
                <span className="text-red-500 text-xs font-medium">
                  Sin stock
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardProd;
