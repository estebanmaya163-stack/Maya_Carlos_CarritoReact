import { useEffect } from "react";
import QuantityInput from "./QuantityInput.jsx";
import { formatCOP } from "../utils.js";

export default function CartPanel({
  abierto,
  items,
  totalUnidades,
  totalCompra,
  onCerrar,
  onCambiar,
  onSumar,
  onRestar,
  onEliminar,
  notificar,
}) {
  useEffect(() => {
    if (!abierto) return;
    const onKey = (e) => e.key === "Escape" && onCerrar();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [abierto, onCerrar]);

  return (
    <>
      <div className={`overlay ${abierto ? "visible" : ""}`} onClick={onCerrar} aria-hidden="true" />
      <aside
        className={`cart-panel ${abierto ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        aria-hidden={!abierto}
      >
        <div className="cart-header">
          <h2>Tu carrito</h2>
          <button type="button" className="icon-btn" onClick={onCerrar} aria-label="Cerrar carrito">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="cart-empty">Tu carrito está vacío. Agrega productos desde el catálogo.</p>
        ) : (
          <ul className="cart-list">
            {items.map(({ producto, cantidad }) => (
              <li key={producto.id} className="cart-item">
                <div className="cart-item-info">
                  <strong>{producto.nombre}</strong>
                  <span>{formatCOP(producto.precio)} c/u</span>
                </div>

                <div className="cart-item-controls">
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => onRestar(producto.id)}
                    aria-label={`Restar una unidad de ${producto.nombre}`}
                  >
                    −
                  </button>
                  <QuantityInput
                    id={`carrito-${producto.id}`}
                    label={`Cantidad de ${producto.nombre} en el carrito`}
                    value={cantidad}
                    max={producto.stock}
                    onCommit={(n) => onCambiar(producto.id, n)}
                    onMin={() => onRestar(producto.id, true)}
                    onMax={() => notificar("Este es el máximo de producto disponible en stock.")}
                  />
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => onSumar(producto.id)}
                    aria-label={`Sumar una unidad de ${producto.nombre}`}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-footer">
                  <span className="subtotal">Subtotal: {formatCOP(producto.precio * cantidad)}</span>
                  <button type="button" className="btn-link" onClick={() => onEliminar(producto.id)}>
                    Quitar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="cart-summary">
          <p>
            <span>Total de unidades</span>
            <strong>{totalUnidades}</strong>
          </p>
          <p className="cart-total">
            <span>Total de la compra</span>
            <strong>{formatCOP(totalCompra)}</strong>
          </p>
        </div>
      </aside>
    </>
  );
}
