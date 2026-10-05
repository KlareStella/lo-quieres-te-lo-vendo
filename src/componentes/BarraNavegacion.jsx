import { useState } from 'react'
import { NavLink } from 'react-router'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

// Barra responsiva: bajo 992 px (expand="lg") se colapsa en hamburguesa.
// as={NavLink} hace que Bootstrap ponga el estilo y React Router la navegación.
export default function BarraNavegacion({ cantidadCarrito }) {
  const [abierta, setAbierta] = useState(false)
  const cerrar = () => setAbierta(false) // cierra el menú al tocar un enlace

  return (
    <Navbar
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
      sticky="top"
      expanded={abierta}
      onToggle={setAbierta}
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" onClick={cerrar}>
          Lo quieres, te lo vendo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto">
            {/* "end" evita que Inicio aparezca activo en todas las páginas */}
            <Nav.Link as={NavLink} to="/" end onClick={cerrar}>
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/catalogo" onClick={cerrar}>
              Catálogo
            </Nav.Link>
            <Nav.Link as={NavLink} to="/nosotros" onClick={cerrar}>
              Nosotros
            </Nav.Link>
            <Nav.Link as={NavLink} to="/carrito" onClick={cerrar}>
              Carrito{' '}
              {cantidadCarrito > 0 && (
                <Badge bg="warning" text="dark" pill>
                  {cantidadCarrito}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
