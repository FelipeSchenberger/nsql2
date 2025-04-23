const express = require('express')
const router = express.Router()
const { agregarLugar } = require('../controllers/lugaresController')

router.post('/lugares', agregarLugar)

module.exports = router
