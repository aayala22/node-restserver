require('./config/config.js');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app
    .get('/', function(req, res) {
        res.json('Index')
    })
    .get('/usuarios', function(req, res) {
        res.json('get usuarios')
    })
    .post('/usuarios', function(req, res) {

        let body = req.body;

        if (body.nombre == undefined) {
            res.status(400).json({
                ok: false,
                mensaje: `El nombre es necesario`
            });
        } else {
            res.json({
                persona: body
            })
        }
    })
    .put('/usuarios/:id', function(req, res) {
        let identificacion = req.params.id;
        res.json({
            identificacion: identificacion
        })
    })
    .delete('/usuarios', function(req, res) {
        res.json('delete usuarios')
    })

app.listen(process.env.PORT, () => {
    console.log(`Ejecutando en el puerto ${process.env.PORT}`);
})