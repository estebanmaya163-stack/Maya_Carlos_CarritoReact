# Carrito de Compras – TIENDA PALMIRA

Reto práctico de React: carrito de compras con validaciones de stock y toasts.

- **Aprendiz:** _Nombre Apellido_
- **Ficha:** 3409924
- **Instructor:** Daniel Alfonso Martínez Payán
- **Tecnología:** React 18 + Vite

## Instalación y ejecución

```bash
git clone <URL-DEL-REPOSITORIO>
cd Apellido_Nombre_CarritoReact
npm install
npm run dev
```

Abre la URL que muestra la terminal (normalmente http://localhost:5173).

## Funcionalidades

- Catálogo desde un array JSON en el frontend (`src/data.js`).
- Navbar fija con el ícono del carrito a la derecha y contador de unidades.
- Agregar productos sin duplicar líneas (se suma la cantidad).
- Campo de cantidad que bloquea `e`, `E`, `+`, `-`, `.`, `,`, letras, 0, negativos, pegado inválido y rueda del mouse.
- Stock máximo con toast en el campo, en el botón `+` y al agregar de nuevo.
- Cantidad mínima con toast y opción de eliminar; botón para quitar directo.
- Subtotales, total de la compra y total de unidades en formato COP.
- Extra: persistencia en `localStorage`, accesibilidad básica (`aria-label`, `aria-live`, foco visible) y diseño responsive.

## Estructura

```
src/
├── App.jsx                  # estado y lógica del carrito
├── data.js                  # array JSON de productos
├── utils.js                 # formato de moneda
├── styles.css
└── components/
    ├── Navbar.jsx
    ├── ProductCard.jsx
    ├── QuantityInput.jsx    # campo de cantidad reutilizable
    ├── CartPanel.jsx
    └── Toast.jsx
```

## Evidencias

Guarda las capturas en la carpeta `/evidencias`.

| # | Funcionalidad | Captura | ¿Funciona? |
|---|---------------|---------|------------|
| 1 | Navbar e ícono con contador | evidencias/01-navbar.png | Sí |
| 2 | Agregar producto desde el catálogo | evidencias/02-agregar.png | Sí |
| 3 | Bloqueo de la tecla "e" y de negativos / 0 | evidencias/03-bloqueo.png | Sí |
| 4 | Toast de stock máximo | evidencias/04-toast-max.png | Sí |
| 5 | Toast de cantidad mínima con opción de eliminar | evidencias/05-toast-min.png | Sí |
| 6 | Subtotales y total con varios productos | evidencias/06-totales.png | Sí |
| 7 | Producto eliminado y total recalculado | evidencias/07-eliminado.png | Sí |
