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

module.exports = router;
