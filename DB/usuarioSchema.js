const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({
    email: {type: String, require: true, max:250},
    password: {type: String, require: true, max:250}
})

module.exports = mongoose.model('usuarios', usuarioSchema)