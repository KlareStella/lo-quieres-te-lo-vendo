import { useSearchParams } from 'react-router'
import Alert from 'react-bootstrap/Alert'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

import TarjetaProducto from '../componentes/TarjetaProducto.jsx'
import { categorias, productos } from '../datos/productos.js'

// El filtro vive en la URL: /catalogo?buscar=mouse&categoria=computacion
// Así se puede compartir el enlace y el botón "atrás" deshace el filtro.
export default function Catalogo() {
  const [parametros, setParametros] = useSearchParams()

  const textoBuscado = parametros.get('buscar') ?? ''
  const categoriaElegida = parametros.get('categoria') ?? ''

  function actualizar(clave, valor) {
    const copia = new URLSearchParams(parametros)
    if (valor) copia.set(clave, valor)
    else copia.delete(clave) // sin valor, borramos la clave
    setParametros(copia)
  }

  const visibles = productos.filter((p) => {
    const coincideTexto = p.nombre.toLowerCase().includes(textoBuscado.toLowerCase())
    const coincideCategoria = !categoriaElegida || p.categoria === categoriaElegida
    return coincideTexto && coincideCategoria
  })

  return (
    <>
      <h1 className="h3 mb-3">Catálogo</h1>

      <Row className="g-2 mb-4">
        <Col xs={12} md={8}>
          <Form.Control
            type="search"
            placeholder="Buscar producto…"
            aria-label="Buscar producto"
            value={textoBuscado}
            onChange={(e) => actualizar('buscar', e.target.value)}
          />
        </Col>
        <Col xs={12} md={4}>
          <Form.Select
            aria-label="Filtrar por categoría"
            value={categoriaElegida}
            onChange={(e) => actualizar('categoria', e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {visibles.length === 0 ? (
        <Alert variant="info">No hay productos que coincidan con tu búsqueda.</Alert>
      ) : (
        // Grilla responsiva: 1 columna en móvil, 2 desde 576 px, 3 desde 992 px
        <Row xs={1} sm={2} lg={3} className="g-3">
          {visibles.map((producto) => (
            <Col key={producto.id}>
              <TarjetaProducto producto={producto} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}
