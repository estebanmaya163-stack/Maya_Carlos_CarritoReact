import { useEffect } from "react";

function ToastItem({ toast, onCerrar }) {
  useEffect(() => {
    const t = setTimeout(() => onCerrar(toast.id), toast.accion ? 7000 : 4000);
    return () => clearTimeout(t);
  }, [toast, onCerrar]);

  return (
    <div className="toast" role="status">
      <span className="toast-msg">{toast.mensaje}</span>
      {toast.accion && (
        <button
          type="button"
          className="toast-action"
          onClick={() => {
            toast.accion.onClick();
            onCerrar(toast.id);
          }}
        >
          {toast.accion.etiqueta}
        </button>
      )}
      <button type="button" className="toast-close" onClick={() => onCerrar(toast.id)} aria-label="Cerrar aviso">
        ✕
      </button>
    </div>
  );
}

export default function ToastContainer({ toasts, onCerrar }) {
  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onCerrar={onCerrar} />
      ))}
    </div>
  );
}
