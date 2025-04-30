import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Map.css';
import userIconUrl from '../assets/location.svg';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const userIcon = new L.Icon({
  iconUrl: userIconUrl,
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const CenterMap = ({ lat, lon }) => {
  const map = useMap();
  if (lat && lon && !isNaN(lat) && !isNaN(lon)) {
    map.setView([lat, lon], 14);
  }
  return null;
};

const Map = () => {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [lugares, setLugares] = useState([]);

  const handleBuscar = async (e) => {
    e.preventDefault();

    if (!lat || !lon) {
      setMensaje('Por favor ingresa latitud y longitud');
      return;
    }

    const ubicacion = {
      lat: parseFloat(lat),
      lon: parseFloat(lon),
    };

    if (isNaN(ubicacion.lat) || isNaN(ubicacion.lon)) {
      setMensaje('Latitud o longitud inválidas');
      return;
    }

    if (ubicacion.lat < -90 || ubicacion.lat > 90 || ubicacion.lon < -180 || ubicacion.lon > 180) {
      setMensaje('Latitud o longitud fuera de rango');
      return;
    }

    try {
      console.log('Datos enviados:', ubicacion);
      console.log('URL de la API:', `${process.env.REACT_APP_API_URL}/api/buscar`);

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/buscar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ubicacion),
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Lugares encontrados:', data);

        const lugaresEncontrados = [];
        for (const categoria in data) {
          data[categoria].forEach((lugar) => {
            const { nombre, distancia, lat, lon } = lugar;

            if (lat !== undefined && lon !== undefined && !isNaN(lat) && !isNaN(lon)) {
              lugaresEncontrados.push({
                nombre,
                distancia,
                lat: parseFloat(lat),
                lon: parseFloat(lon),
                categoria,
              });
            } else {
              console.warn(`Lugar con coordenadas inválidas: ${JSON.stringify(lugar)}`);
            }
          });
        }

        setLugares(lugaresEncontrados);
        setMensaje('Lugares encontrados cerca tuyo.');
      } else {
        setMensaje(data.error || 'Error desconocido al buscar lugares');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setMensaje('Error al conectar con el servidor');
    }
  };

  return (
    <div className="map-super-container">
      <div className="line"></div>
      <div className="map-container">
        <div className="map-header">
          <h2 className="map-title">Selecciona tu ubicación</h2>
          <p className="map-description">
            Selecciona tu latitud y longitud para obtener información sobre los lugares turísticos cercanos.
          </p>
        </div>
        <form className="map-inputs" onSubmit={handleBuscar}>
          <input
            type="text"
            placeholder="Latitud"
            className="map-input"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
          <input
            type="text"
            placeholder="Longitud"
            className="map-input"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
          />
          <button type="submit" className="map-button">
            Buscar
          </button>
        </form>
        {mensaje && <p className="map-message">{mensaje}</p>}

        <MapContainer
          center={[-32.479223726693064, -58.243941131279534]} // Coordenadas iniciales
          zoom={14}
          style={{ height: '500px', width: '70%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <CenterMap lat={parseFloat(lat)} lon={parseFloat(lon)} />
          {lat && lon && !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lon)) && (
            <Marker position={[parseFloat(lat), parseFloat(lon)]} icon={userIcon}>
              <Popup>
                <strong>Tu ubicación</strong>
                <br />
                Latitud: {lat}
                <br />
                Longitud: {lon}
              </Popup>
            </Marker>
          )}
          {lugares.map((lugar, index) => (
            <Marker
              key={index}
              position={[lugar.lat, lugar.lon]}
            >
              <Popup>
                <strong>{lugar.nombre}</strong>
                <br />
                Categoría: {lugar.categoria}
                <br />
                Distancia: {lugar.distancia} metros
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
