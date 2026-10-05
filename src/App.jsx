import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'

import Layout from './componentes/Layout.jsx'
import Inicio from './paginas/Inicio.jsx'
import Catalogo from './paginas/Catalogo.jsx'
import DetalleProducto from './paginas/DetalleProducto.jsx'
import Carrito from './paginas/Carrito.jsx'
import Checkout from './paginas/Checkout.jsx'
import Nosotros from './paginas/Nosotros.jsx'
import NoEncontrada from './paginas/NoEncontrada.jsx'

const CLAVE_CARRITO = 'lqtlv-carrito'

// Lee el carrito guardado. Si lo almacenado está corrupto, partimos vacío
// en vez de romper toda la aplicación.
function leerCarritoGuardado() {
  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO)
    return guardado ? JSON.parse(guardado) : []
  } catch {
    return []
  }
}

// App.jsx contiene el mapa de rutas y el estado compartido (el carrito),
// porque varias pantallas lo necesitan: el detalle agrega, el carrito quita
// y la barra de navegación muestra la cantidad.
export default function App() {
  const [carrito, setCarrito] = useState(leerCarritoGuardado)

  // Cada vez que cambia el carrito, lo guardamos en localStorage.
  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito))
  }, [carrito])

  function agregar(producto) {
    setCarrito((actual) => {
      const existente = actual.find((item) => item.id === producto.id)
      if (existente) {
        return actual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        )
      }
      return [...actual, { id: producto.id, cantidad: 1 }]
    })
  }

  function quitar(id) {
    setCarrito((actual) => actual.filter((item) => item.id !== id))
  }

  function vaciar() {
    setCarrito([])
  }

  const totalUnidades = carrito.reduce((suma, item) => suma + item.cantidad, 0)

  return (
    <Routes>
      {/* Ruta padre: dibuja el marco (barra + pie) una sola vez */}
      <Route path="/" element={<Layout cantidadCarrito={totalUnidades} />}>
        {/* index = lo que se ve cuando la URL es exactamente "/" */}
        <Route index element={<Inicio />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="producto/:id" element={<DetalleProducto onAgregar={agregar} />} />
        <Route
          path="carrito"
          element={<Carrito carrito={carrito} onQuitar={quitar} onVaciar={vaciar} />}
        />
        <Route
          path="checkout"
          element={<Checkout carrito={carrito} onVaciar={vaciar} />}
        />
        <Route path="nosotros" element={<Nosotros />} />
        {/* Comodín: cualquier dirección que no coincidió antes */}
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  )
}
