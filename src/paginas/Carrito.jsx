import { Link } from 'react-router'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import { buscarProducto, formatearPrecio } from '../datos/productos.js'

export default function Carrito({ carrito, onQuitar, onVaciar }) {
  if (carrito.length === 0) {
    return (
      <Alert variant="info">
        Tu carrito está vacío.{' '}
        <Alert.Link as={Link} to="/catalogo">
          Ver el catálogo
        </Alert.Link>
      </Alert>
    )
  }

  // Unimos cada línea del carrito (id, cantidad) con los datos del producto
  const lineas = carrito
    .map((item) => ({ ...item, producto: buscarProducto(item.id) }))
    .filter((linea) => linea.producto)

  const total = lineas.reduce(
    (suma, l) => suma + l.producto.precio * l.cantidad,
    0,
  )

  return (
    <>
      <h1 className="h3 mb-3">Carrito</h1>

      {/* table-responsive: la tabla se desplaza en pantallas angostas */}
      <div className="table-responsive">
        <Table className="align-middle">
          <thead>
            <tr>
              <th>Producto</th>
              <th className="text-end">Precio</th>
              <th className="text-center">Cant.</th>
              <th className="text-end">Subtotal</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {lineas.map(({ id, cantidad, producto }) => (
              <tr key={id}>
                <td>
                  <Link to={`/producto/${id}`}>
                    {producto.emoji} {producto.nombre}
                  </Link>
                </td>
                <td className="text-end">{formatearPrecio(producto.precio)}</td>
                <td className="text-center">{cantidad}</td>
                <td className="text-end">
                  {formatearPrecio(producto.precio * cantidad)}
                </td>
                <td className="text-end">
                  <Button size="sm" variant="outline-danger" onClick={() => onQuitar(id)}>
                    Quitar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={3} className="text-end">
                Total
              </th>
              <th className="text-end">{formatearPrecio(total)}</th>
              <td />
            </tr>
          </tfoot>
        </Table>
      </div>

      <div className="d-flex flex-wrap gap-2 justify-content-end">
        <Button variant="outline-secondary" onClick={onVaciar}>
          Vaciar carrito
        </Button>
        <Button as={Link} to="/checkout" variant="primary">
          Ir a pagar
        </Button>
      </div>
    </>
  )
}
