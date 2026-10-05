import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PRODUCTOS } from "./data.js";
import Navbar from "./components/Navbar.jsx";
import ProductCard from "./components/ProductCard.jsx";
import CartPanel from "./components/CartPanel.jsx";
import ToastContainer from "./components/Toast.jsx";

const MSG_MAX = "Este es el máximo de producto disponible en stock.";
const MSG_MIN = "Esta es la cantidad mínima. ¿Desea eliminar el producto?";

function cargarCarrito() {
  try {
    const guardado = JSON.parse(localStorage.getItem("carrito-palmira"));
    if (!Array.isArray(guardado)) return [];
    // valida contra el catálogo y el stock
    return guardado
      .map((i) => {
        const p = PRODUCTOS.find((x) => x.id === i.id);
        return p ? { id: p.id, cantidad: Math.min(Math.max(parseInt(i.cantidad, 10) || 0, 0), p.stock) } : null;
      })
      .filter((i) => i && i.cantidad > 0);
  } catch {
    return [];
  }
}

export default function App() {
  const [carrito, setCarrito] = useState(cargarCarrito); // [{ id, cantidad }]
  const [abierto, setAbierto] = useState(false);
  const [toasts, setToasts] = useState([]);
  const contador = useRef(0);

  useEffect(() => {
    localStorage.setItem("carrito-palmira", JSON.stringify(carrito));
  }, [carrito]);

  const cerrarToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const notificar = useCallback((mensaje, accion) => {
    const id = ++contador.current;
    setToasts((t) => [...t.slice(-2), { id, mensaje, accion }]);
  }, []);

  const cantidadEn = (id) => carrito.find((i) => i.id === id)?.cantidad ?? 0;
  const buscar = (id) => PRODUCTOS.find((p) => p.id === id);

  const eliminar = useCallback((id) => setCarrito((c) => c.filter((i) => i.id !== id)), []);

  // Agregar desde el catálogo: suma a la línea existente, nunca supera el stock
  const agregar = (id, cantidad) => {
    const producto = buscar(id);
    let total = cantidadEn(id) + cantidad;
    if (total > producto.stock) {
      total = producto.stock;
      notificar(MSG_MAX);
    }
    setCarrito((c) =>
      c.some((i) => i.id === id)
        ? c.map((i) => (i.id === id ? { ...i, cantidad: total } : i))
        : [...c, { id, cantidad: total }]
    );
  };

  const cambiarCantidad = (id, cantidad) =>
    setCarrito((c) => c.map((i) => (i.id === id ? { ...i, cantidad } : i)));

  const sumar = (id) => {
    if (cantidadEn(id) >= buscar(id).stock) {
      notificar(MSG_MAX);
      return;
    }
    cambiarCantidad(id, cantidadEn(id) + 1);
  };

  // Restar (o intento de poner 0): en 1 no baja, pregunta si desea eliminar
  const restar = (id) => {
    const actual = cantidadEn(id);
    if (actual <= 1) {
      notificar(MSG_MIN, { etiqueta: "Eliminar", onClick: () => eliminar(id) });
      return;
    }
    cambiarCantidad(id, actual - 1);
  };

  const items = useMemo(
    () => carrito.map((i) => ({ producto: buscar(i.id), cantidad: i.cantidad })),
    [carrito]
  );
  const totalUnidades = items.reduce((s, i) => s + i.cantidad, 0);
  const totalCompra = items.reduce((s, i) => s + i.producto.precio * i.cantidad, 0);

  return (
    <>
      <Navbar totalUnidades={totalUnidades} onAbrirCarrito={() => setAbierto(true)} />

      <main className="catalog">
        <h2 className="catalog-title">Productos típicos de la región</h2>
        <div className="grid">
          {PRODUCTOS.map((p) => (
            <ProductCard
              key={p.id}
              producto={p}
              enCarrito={cantidadEn(p.id)}
              onAgregar={agregar}
              notificar={notificar}
            />
          ))}
        </div>
      </main>

      <CartPanel
        abierto={abierto}
        items={items}
        totalUnidades={totalUnidades}
        totalCompra={totalCompra}
        onCerrar={() => setAbierto(false)}
        onCambiar={cambiarCantidad}
        onSumar={sumar}
        onRestar={restar}
        onEliminar={eliminar}
        notificar={notificar}
      />

      <ToastContainer toasts={toasts} onCerrar={cerrarToast} />
    </>
  );
}
