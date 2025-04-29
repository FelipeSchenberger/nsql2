const express = require('express');
const router = express.Router();
const client = require('../redisClient');

router.post('/lugares', async (req, res) => {
  const { nombre, categoria, lat, lon } = req.body;

  if (!nombre || !categoria || lat === undefined || lon === undefined) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return res.status(400).json({ error: 'Latitud o longitud fuera de rango' });
  }

  try {
    // Guardar en Redis usando GEOADD
    const key = categoria; // Usar la categoría como clave
    await client.geoAdd(key, { longitude: lon, latitude: lat, member: nombre });

    res.status(201).json({ message: 'Lugar agregado con éxito' });
  } catch (error) {
    console.error('Error agregando lugar:', error);
    res.status(500).json({ error: 'Error al guardar el lugar en la base de datos' });
  }
});

router.post('/buscar', async (req, res) => {
  const { lat, lon } = req.body;

  console.log('Datos recibidos en /buscar:', { lat, lon });

  if (lat === undefined || lon === undefined) {
    return res.status(400).json({ error: 'Latitud y longitud son obligatorias' });
  }

  try {
    const categorias = ['cervecerias', 'universidades', 'farmacias', 'emergencias', 'supermercados'];
    const resultados = {};

    for (const categoria of categorias) {
      console.log(`Buscando en categoría: ${categoria}`);
      const lugares = await client.sendCommand([
        'GEORADIUS',
        categoria,
        lon.toString(),
        lat.toString(),
        '500',
        'm',
        'WITHDIST',
      ]);

      if (lugares && lugares.length > 0) {
        const lugaresConCoordenadas = [];

        for (const lugar of lugares) {
          const [nombre, distancia] = lugar;

          // Obtener las coordenadas del lugar usando GEOPOS
          const coordenadas = await client.sendCommand([
            'GEOPOS',
            categoria,
            nombre,
          ]);

          if (coordenadas && coordenadas[0]) {
            const [lonLugar, latLugar] = coordenadas[0];
            lugaresConCoordenadas.push({
              nombre,
              distancia: parseFloat(distancia),
              lat: parseFloat(latLugar),
              lon: parseFloat(lonLugar),
            });
          } else {
            console.warn(`No se encontraron coordenadas para el lugar: ${nombre}`);
          }
        }

        resultados[categoria] = lugaresConCoordenadas;
      } else {
        resultados[categoria] = []; // Categoría sin resultados
      }
    }

    res.status(200).json(resultados);
  } catch (error) {
    console.error('Error en /buscar:', error);
    res.status(500).json({ error: 'Error al buscar lugares en la base de datos', detalles: error.message });
  }
});

module.exports = router;