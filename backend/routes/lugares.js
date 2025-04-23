const express = require('express')
const router = express.Router()

router.post('/lugares', (req, res) => {
  const { nombre, categoria, lat, lon } = req.body;

  if (!nombre || !categoria || !lat || !lon) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Lógica para agregar el lugar
  console.log(req.body); // Verifica qué datos está recibiendo el backend

  res.status(201).json({ message: 'Lugar agregado con éxito' });
});

module.exports = router


