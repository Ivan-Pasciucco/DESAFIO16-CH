const express = require('express')
const router = express.Router()
const cpus = require('os').cpus().length
const compression = require('compression')
const log4js = require('../utils/logs')
const logConsole = log4js.getLogger('consola')

router.get('/', (req, res) => {
    console.log(`Argumentos de entrada: ${process.argv.slice(2)}`)
    console.log(`Nombre de la plataforma: ${process.platform}`)
    console.log(`Version de Node.js: ${process.version}`)
    console.log(`Memoria total reservada: ${process.memoryUsage().rss}`)
    console.log(`Ruta de ejecución: ${process.argv[0]}`)
    console.log(`Process ID: ${process.pid}`)
    console.log(`Carpeta del proyecto: ${process.cwd()}`)
    console.log(`Cantidad de CPUs: ${cpus}`) 

    logConsole.info('ruta de informacion')
    res.render('pages/info',{cpus})
})

module.exports = router