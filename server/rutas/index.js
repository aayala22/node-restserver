const express = require('express')
const app = express()

app
    .use(require('./rutas_usuarios.js'))
    .use(require('./login.js'));

module.exports = app;