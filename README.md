# Lo quieres, te lo vendo — React Router (Actividad 2.2.2)

Tienda en línea de varias pantallas hecha con React 19, React Router 8,
React Bootstrap y Vite. Resultado de la guía `guia-react-router-alumnos.html`
(DSY1104 Desarrollo FullStack II · Duoc UC).

## Rutas

| Ruta | Pantalla |
| --- | --- |
| `/` | Inicio |
| `/catalogo` | Catálogo con búsqueda y filtro (`?buscar=…&categoria=…`) |
| `/producto/:id` | Detalle de producto (maneja id inexistente) |
| `/carrito` | Carrito (persistido en localStorage) |
| `/checkout` | Confirmación; redirige a `/carrito` si está vacío |
| `/nosotros` | Información del equipo |
| `*` | Página 404 |

## Cómo ejecutarlo

```bash
npm install
npm run dev       # desarrollo
npm run build     # genera dist/
npm run preview   # revisa dist/
```

## Estructura

```
src/
├── componentes/   Layout, BarraNavegacion, PiePagina, TarjetaProducto
├── paginas/       una por ruta
├── datos/         productos de ejemplo
├── App.jsx        mapa de rutas + estado del carrito
└── main.jsx       BrowserRouter
```
