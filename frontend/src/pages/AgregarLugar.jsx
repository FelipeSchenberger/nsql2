import { useState } from 'react'
import '../styles/AgregarLugar.css'

const AgregarLugar = () => {
  const [nombre, setNombre] = useState('')
  const [categoria, setCategoria] = useState('')
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoLugar = {
      nombre,
      categoria,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
    };

    // Validar rango de latitud y longitud
    if (nuevoLugar.lat < -90 || nuevoLugar.lat > 90 || nuevoLugar.lon < -180 || nuevoLugar.lon > 180) {
      setMensaje('Latitud o longitud fuera de rango');
      return;
    }

    console.log(nuevoLugar);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/lugares`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoLugar),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje('Lugar agregado con éxito');
        setNombre('');
        setCategoria('');
        setLat('');
        setLon('');
      } else {
        setMensaje(data.error || 'Error al agregar el lugar');
      }
    } catch (error) {
      setMensaje('Error al conectar con el servidor');
    }
  };

  return (
      <div className="agregar-super-container">
        <h2 className="h2-agregar">Agregar Lugar</h2>
        <form onSubmit={handleSubmit} className="form-agregar">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            className="input-agregar"
            required
          />

          <select
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
            className="input-agregar"
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
            className="input-agregar"
            required
          />
          <input
            type="number"
            placeholder="Longitud"
            value={lon}
            onChange={e => setLon(e.target.value)}
            className="input-agregar"
            required
          />
          <button
            type="submit"
            className="button-agregar"
          >
            Agregar
          </button>
        </form>
          {mensaje && <p className="agregar-mensaje">{mensaje}</p>}
      </div>
  )
}

export default AgregarLugar
