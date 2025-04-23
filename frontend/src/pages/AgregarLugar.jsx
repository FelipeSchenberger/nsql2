import { useState } from 'react'

const AgregarLugar = () => {
  const [nombre, setNombre] = useState('')
  const [categoria, setCategoria] = useState('')
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const nuevoLugar = { nombre, categoria, lat, lon }

    try {
      const res = await fetch('http://backend:5000/api/lugares', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoLugar),
      });

      const data = await res.json()

      if (res.ok) {
        setMensaje('Lugar agregado con éxito')
        setNombre('')
        setCategoria('')
        setLat('')
        setLon('')
      } else {
        setMensaje(data.error || 'Error al agregar el lugar')
      }
    } catch (error) {
      setMensaje('Error al conectar con el servidor')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Agregar Lugar</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          className="w-full border px-2 py-1 rounded"
          required
        />

        <select
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          className="w-full border px-2 py-1 rounded"
          required
        >
          <option value="">Selecciona una categoría</option>
          <option value="cervecerias">Cervecerías Artesanales</option>
          <option value="universidades">Universidades</option>
          <option value="farmacias">Farmacias</option>
          <option value="emergencias">Centros de Atención de Emergencias</option>
          <option value="supermercados">Supermercados</option>
        </select>

        <input
          type="number"
          placeholder="Latitud"
          value={lat}
          onChange={e => setLat(e.target.value)}
          className="w-full border px-2 py-1 rounded"
          required
        />
        <input
          type="number"
          placeholder="Longitud"
          value={lon}
          onChange={e => setLon(e.target.value)}
          className="w-full border px-2 py-1 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Agregar
        </button>
        {mensaje && <p className="mt-2 text-center text-sm text-green-600">{mensaje}</p>}
      </form>
    </div>
  )
}

export default AgregarLugar
