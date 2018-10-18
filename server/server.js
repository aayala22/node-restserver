require('./config/config.js');

const express = require('express')
const mongoose = require('mongoose') //conexion a MongoDB
const path = require('path')


const app = express();
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app
    .use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
    .use(bodyParser.json())
    .use(express.static(`${__dirname}/public`))
    .use(require('./rutas/index.js'))
    // app
    // .get('/', function(req, res) {
    //     res.render('index.html')
    //         // res.json('Index')
    // })

mongoose.set('useCreateIndex', true)
mongoose.set('useNewUrlParser', true)
mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
    if (err) throw err;
    console.log("Base de datos online");

});

app.listen(process.env.PORT, () => {
    console.log(`Ejecutando en el puerto ${process.env.PORT}`);
})