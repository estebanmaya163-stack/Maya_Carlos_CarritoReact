import { useState } from "react";
import QuantityInput from "./QuantityInput.jsx";
import { formatCOP } from "../utils.js";

export default function ProductCard({ producto, enCarrito, onAgregar, notificar }) {
  const [cantidad, setCantidad] = useState(1);
  const sinStock = enCarrito >= producto.stock;
  const disponibles = producto.stock - enCarrito;

  const agregar = () => {
    onAgregar(producto.id, cantidad);
    setCantidad(1);
  };

  return (
    <article className="card">
      <h3 className="card-title">{producto.nombre}</h3>
      <p className="card-price">{formatCOP(producto.precio)}</p>
      <p className={`card-stock ${sinStock ? "agotado" : ""}`}>
        {sinStock ? "Sin unidades disponibles" : `Stock disponible: ${disponibles}`}
      </p>

      <div className="card-actions">
        <QuantityInput
          id={`cantidad-${producto.id}`}
          label={`Cantidad de ${producto.nombre}`}
          value={cantidad}
          max={producto.stock}
          onCommit={setCantidad}
          onMin={() => notificar("La cantidad mínima es 1.")}
          onMax={() => notificar("Este es el máximo de producto disponible en stock.")}
        />
        <button type="button" className="btn btn-primary" onClick={agregar} disabled={sinStock}>
          Agregar
        </button>
      </div>
    </article>
  );
}
