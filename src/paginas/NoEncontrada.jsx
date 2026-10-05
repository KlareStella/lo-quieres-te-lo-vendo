import { Link, useLocation } from 'react-router'
import Button from 'react-bootstrap/Button'

// Ruta comodín (path="*"): se muestra dentro del Layout, así el usuario
// conserva la barra de navegación y puede volver.
export default function NoEncontrada() {
  const ubicacion = useLocation()

  return (
    <div className="text-center py-5">
      <h1 className="display-4">404</h1>
      <p>
        No encontramos nada en <code>{ubicacion.pathname}</code>
      </p>
      <Button as={Link} to="/" variant="primary">
        Volver al inicio
      </Button>
    </div>
  )
}
