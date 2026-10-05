import { Outlet } from 'react-router'
import Container from 'react-bootstrap/Container'

import BarraNavegacion from './BarraNavegacion.jsx'
import PiePagina from './PiePagina.jsx'

// Plantilla del sitio: la barra y el pie se escriben una sola vez.
// <Outlet /> marca el hueco donde el router pinta la página hija.
export default function Layout({ cantidadCarrito }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BarraNavegacion cantidadCarrito={cantidadCarrito} />
      <main className="flex-grow-1 py-4">
        <Container>
          <Outlet />
        </Container>
      </main>
      <PiePagina />
    </div>
  )
}
