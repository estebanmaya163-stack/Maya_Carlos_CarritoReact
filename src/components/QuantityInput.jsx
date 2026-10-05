import { useEffect, useState } from "react";

const TECLAS_BLOQUEADAS = ["e", "E", "+", "-", ".", ","];

/**
 * Campo de cantidad reutilizable (catálogo y carrito).
 * Solo acepta enteros positivos, nunca supera `max`.
 *  - onCommit(n): cantidad válida
 *  - onMin():     intento de poner 0 (o negativo)
 *  - onMax():     intento de superar el stock
 */
export default function QuantityInput({ id, label, value, max, onCommit, onMin, onMax }) {
  const [borrador, setBorrador] = useState(String(value));

  useEffect(() => {
    setBorrador(String(value));
  }, [value]);

  const handleKeyDown = (e) => {
    if (TECLAS_BLOQUEADAS.includes(e.key)) {
      e.preventDefault();
      return;
    }
    // Cualquier otro carácter imprimible que no sea dígito (letras, símbolos)
    if (e.key.length === 1 && !/\d/.test(e.key) && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    const texto = e.clipboardData.getData("text");
    if (!/^\d+$/.test(texto)) e.preventDefault(); // solo dígitos
  };

  const handleChange = (e) => {
    const raw = e.target.value;
    if (raw === "") {
      setBorrador(""); // permite borrar para escribir otro número
      return;
    }
    if (!/^\d+$/.test(raw)) return;

    const n = parseInt(raw, 10);
    if (n < 1) {
      setBorrador(String(value)); // conserva el valor anterior
      onMin?.();
      return;
    }
    if (n > max) {
      setBorrador(String(max));
      onCommit(max);
      onMax?.();
      return;
    }
    setBorrador(String(n));
    onCommit(n);
  };

  const handleBlur = () => {
    if (borrador === "") setBorrador(String(value));
  };

  return (
    <input
      id={id}
      className="qty-input"
      type="number"
      inputMode="numeric"
      aria-label={label}
      min={1}
      max={max}
      step={1}
      value={borrador}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onChange={handleChange}
      onBlur={handleBlur}
      onWheel={(e) => e.currentTarget.blur()} // la rueda no cambia el valor
    />
  );
}
