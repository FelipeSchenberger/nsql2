const redisClient = require('../redisClient')

const agregarLugar = async (req, res) => {
  const { nombre, categoria, lat, lon } = req.body

  try {
    if (!nombre || !categoria || !lat || !lon) {
      return res.status(400).json({ error: 'Faltan datos' })
    }

    await redisClient.geoAdd(categoria, {
      longitude: parseFloat(lon),
      latitude: parseFloat(lat),
      member: nombre
    })

    res.status(201).json({ mensaje: 'Lugar agregado correctamente' })
  } catch (error) {
    console.error('Error agregando lugar:', error)
    res.status(500).json({ error: 'Error del servidor' })
  }
}

module.exports = { agregarLugar }
