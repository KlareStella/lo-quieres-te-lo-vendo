import { Link, useNavigate, useParams } from 'react-router'
import Alert from 'react-bootstrap/Alert'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

import { buscarProducto, formatearPrecio } from '../datos/productos.js'

// Ruta dinámica: producto/:id. useParams devuelve el id como TEXTO;
// buscarProducto lo convierte con Number() antes de comparar.
export default function DetalleProducto({ onAgregar }) {
  const { id } = useParams()
  const navegar = useNavigate()
  const producto = buscarProducto(id)

  // Caso de id inexistente (/producto/999): mensaje claro, no pantalla rota
  if (!producto) {
    return (
      <Alert variant="warning">
        <Alert.Heading>Producto no encontrado</Alert.Heading>
        <p>No existe ningún producto con el código «{id}».</p>
        <Button as={Link} to="/catalogo" variant="primary">
          Ir al catálogo
        </Button>
      </Alert>
    )
  }

  function agregar() {
    onAgregar(producto)
    navegar('/carrito') // navegar después de un evento
  }

  return (
    <>
      <Button
        variant="outline-secondary"
        className="mb-3"
        onClick={() => navegar(-1)} // equivale al botón "atrás"
      >
        Volver
      </Button>

      <div className="d-flex flex-column flex-md-row gap-4 align-items-md-center">
        <div className="display-1 text-center" aria-hidden="true">
          {producto.emoji}
        </div>
        <div>
          <h1 className="h3">{producto.nombre}</h1>
          <Badge bg="light" text="dark" className="mb-2 text-capitalize">
            {producto.categoria}
          </Badge>
          <p>{producto.descripcion}</p>
          <p className="fs-4 fw-semibold">{formatearPrecio(producto.precio)}</p>
          <p className="text-secondary">
            {producto.stock > 0 ? `Stock disponible: ${producto.stock}` : 'Sin stock'}
          </p>
          <Button variant="primary" onClick={agregar} disabled={producto.stock === 0}>
            Agregar al carrito
          </Button>
        </div>
      </div>
    </>
  )
}
