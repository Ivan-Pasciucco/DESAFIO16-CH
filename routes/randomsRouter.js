const express = require('express')
const router = express.Router()
const {fork} = require('child_process')
const Random = require('../utils/randoms')
const random = new Random()
const log4js = require('../utils/logs')
const logConsole = log4js.getLogger('consola')
const logError = log4js.getLogger('error')

router.get('/',(req, res) => {
    if(!isNaN(req.query.cant) || !req.query.cant){
        const data = random.generarRandom(req.query.cant)
        logConsole.info('Generando numeros randoms')
        res.json({'Numeros aleatorios:' : data})
      /*   const forked = fork('./js/randoms')
        forked.on('message',(msg) => {
            if(msg == 'start'){
                forked.send(`${req.query.cant}`)
            }else{
                res.json({"Numeros Random" : msg})
            }
        }) */
    }else{
        logError.error('No se ingresaron correctamente los numeros')
        res.send({Error: 'por favor ingresar un numero'})
    }
})

module.exports = router