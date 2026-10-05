import { Link, Navigate } from 'react-router'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

import { buscarProducto, formatearPrecio } from '../datos/productos.js'

// Ruta protegida: sin productos en el carrito no tiene sentido estar aquí.
// <Navigate> redirige mientras se dibuja; "replace" evita que el usuario
// quede atrapado al presionar «atrás».
export default function Checkout({ carrito, onVaciar }) {
  if (carrito.length === 0) {
    return <Navigate to="/carrito" replace />
  }

  const total = carrito.reduce((suma, item) => {
    const producto = buscarProducto(item.id)
    return suma + (producto ? producto.precio * item.cantidad : 0)
  }, 0)

  return (
    <>
      <h1 className="h3 mb-3">Confirmar compra</h1>
      <Alert variant="secondary">
        Vas a comprar {carrito.length} producto(s) por{' '}
        <strong>{formatearPrecio(total)}</strong>.
      </Alert>
      <div className="d-flex gap-2">
        <Button as={Link} to="/carrito" variant="outline-secondary">
          Volver al carrito
        </Button>
        <Button variant="success" onClick={onVaciar}>
          Confirmar compra
        </Button>
      </div>
    </>
  )
}
