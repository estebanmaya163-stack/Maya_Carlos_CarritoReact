export default function Navbar({ totalUnidades, onAbrirCarrito }) {
  return (
    <header className="navbar">
      <h1 className="navbar-brand">Tienda Palmira</h1>
      <button
        type="button"
        className="cart-button"
        onClick={onAbrirCarrito}
        aria-label={`Abrir carrito, ${totalUnidades} unidades`}
      >
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
          <path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 7H6" />
        </svg>
        {totalUnidades > 0 && (
          <span className="cart-badge" data-testid="cart-count">
            {totalUnidades}
          </span>
        )}
      </button>
    </header>
  );
}
