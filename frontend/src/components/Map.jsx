import React from 'react';
import '../styles/Map.css';

function Map() {
    return (
        <div className='map-super-container'>
            <div className='line'></div>
            <div className="map-container">
                <div className='map-header'>
                    <h2 className="map-title">Selecciona tu ubicación</h2>
                    <p className="map-description">
                        Selecciona tu ubicación en el mapa para obtener información sobre los lugares turísticos cercanos.
                    </p>
                </div>
                <div className='map-inputs'>
                    <input type="text" placeholder="Latitud" className="map-input" />
                    <input type="text" placeholder="Longitud" className="map-input" />
                    <button className="map-button">Buscar</button>
                    <button className="map-button">Guardar</button>
                </div>
                <iframe 
                    className="map-iframe"
                    title="Mapa de Concepción del Uruguay"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3300.1234567890123!2d-58.00000000000001!3d-32.00000000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7c123456789ab%3A0x123456789abcdef0!2sConcepcion%20del%20Uruguay%2C%20Entre%20Rios%2C%20Argentina!5e0!3m2!1ses-419!2sus!4v1234567890123"
                    width="1000"
                    height="500"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
        
    );
}
export default Map;


// import React, { useState, useRef } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import '../styles/Map.css';

// const customIcon = new L.Icon({
//   iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
// });

// function LocationMarker({ position, onMapClick }) {
//   useMapEvents({
//     click(e) {
//       onMapClick(e.latlng);
//     },
//   });

//   return position ? (
//     <Marker position={position} icon={customIcon}>
//       <Popup>
//         Coordenadas seleccionadas:<br />
//         Lat: {position.lat.toFixed(4)}, Lng: {position.lng.toFixed(4)}
//       </Popup>
//     </Marker>
//   ) : null;
// }

// function Map() {
//   const [lat, setLat] = useState('');
//   const [lng, setLng] = useState('');
//   const [position, setPosition] = useState(null);
//   const mapRef = useRef();

//   const [lugaresCercanos, setLugaresCercanos] = useState([]);
//   const [categoria, setCategoria] = useState('');

//   const handleBuscarLugares = async () => {
//     if (!lat || !lng || !categoria) {
//       alert('Por favor, selecciona una ubicación y una categoría.');
//       return;
//     }

//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/lugares/cercanos?lat=${lat}&lon=${lng}&categoria=${categoria}`
//       );
//       const data = await response.json();
//       setLugaresCercanos(data);
//     } catch (error) {
//       console.error('Error al buscar lugares cercanos:', error);
//     }
//   };

//   const handleInputChange = (type, value) => {
//     if (type === 'lat') setLat(value);
//     if (type === 'lng') setLng(value);
//   };

//   const handleBuscarClick = () => {
//     if (lat && lng) {
//       const newPos = { lat: parseFloat(lat), lng: parseFloat(lng) };
//       setPosition(newPos);
//       const map = mapRef.current;
//       if (map) {
//         map.setView(newPos, 15);
//       }
//     }
//   };

//   const handleMapClick = (latlng) => {
//     setPosition(latlng);
//     setLat(latlng.lat.toFixed(6));
//     setLng(latlng.lng.toFixed(6));
//   };

//   const handleGuardarClick = () => {
//     console.log('Guardado:', position);
//     // Acá podrías usar context, localStorage, navigate con state o props para pasar esto a otra página
//     // Ejemplo simple: localStorage.setItem('ubicacion', JSON.stringify(position))
//   };

//   return (
//     <div className='map-super-container'>
//       <div className='map-header'>
//         <h2 className="map-title">Selecciona tu ubicación</h2>
//         <p className="map-description">
//           Podés ingresar coordenadas manualmente o hacer clic en el mapa.
//         </p>
//       </div>
//       <div>
//         <label>Categoría:</label>
//         <select
//           value={categoria}
//           onChange={(e) => setCategoria(e.target.value)}
//           required
//         >
//           <option value="">Selecciona una categoría</option>
//           <option value="cervecerias">Cervecerías Artesanales</option>
//           <option value="universidades">Universidades</option>
//           <option value="farmacias">Farmacias</option>
//           <option value="emergencias">Centros de Atención de Emergencias</option>
//           <option value="supermercados">Supermercados</option>
//         </select>
//       </div>
//       <button className="map-button" onClick={handleBuscarLugares}>Buscar Lugares Cercanos</button>
//       {lugaresCercanos.length > 0 && (
//         <div>
//           <h3>Lugares Cercanos:</h3>
//           <ul>
//             {lugaresCercanos.map((lugar, index) => (
//               <li key={index}>
//                 {lugar[0]} - {lugar[1]} km
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       <div className='map-inputs'>
//         <input
//           type="text"
//           placeholder="Latitud"
//           value={lat}
//           onChange={(e) => handleInputChange('lat', e.target.value)}
//           className="map-input"
//         />
//         <input
//           type="text"
//           placeholder="Longitud"
//           value={lng}
//           onChange={(e) => handleInputChange('lng', e.target.value)}
//           className="map-input"
//         />
//         <button className="map-button" onClick={handleBuscarClick}>Buscar</button>
//         <button className="map-button" onClick={handleGuardarClick}>Guardar</button>
//       </div>

//       <MapContainer
//         center={[-32.4845, -58.2326]}
//         zoom={13}
//         style={{ height: '500px', width: '65%' }}
//         whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
//       >
//         <TileLayer
//           attribution='&copy; OpenStreetMap contributors'
//           url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//         />
//         <LocationMarker position={position} onMapClick={handleMapClick} />
//       </MapContainer>
//     </div>
//   );
// }

// export default Map;