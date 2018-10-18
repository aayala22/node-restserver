const express = require('express');
const bodyParser = require('body-parser')
const Usuario = require('../modelo/usuarios.js') //en mayuscula para referenciar el modelo
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificaToken, verificaROL } = require('../middlewares/autenticacion');
const app = express()
app
    .get('/usuarios', verificaToken, function(req, res) {
        //http://localhost:8080/usuarios?desde=6&limite=5

        return res.json({
            usuario: req.usuario,
            nombre: req.usuario.nombre,
            email: req.usuario.email
        });
        let desde = req.query.desde || 0;
        let limite = req.query.limite || 0;

        desde = Number(desde);
        limite = Number(limite);
        Usuario.find({}, 'nombre email role img estado google')
            .skip(desde) //saltar dos registros
            .limit(limite) //mostrar solo dos registros
            .exec((err, usuarios) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }
                Usuario.count({ estado: true }, (err, contar) => {
                    res.json({ usuarios, conteo: contar });
                })

            })

    })
    .post('/usuarios', [verificaToken, verificaROL], function(req, res) {
        let body = req.body;

        //creanmos la variable usuarios como nuevo Usuario "del modelo"
        let usuarios = new Usuario({

            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10), //PRIMER ARGUMENTO EL CAMPO QUE QUIERO ENCRIPTAR Y EL SEGUNDO ARGUMENTO ES EL NUMERO DE VUELTAS QUE QUIERO APLICARLE A HASH
            role: body.role,
            Genero: body.Genero,
            estado: body.estado,
            google: body.google

        });


        //Guardamos el usuario
        usuarios.save((err, usuarioDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    })
                }

                // usuarioDB.password = null;

                res.json({
                    ok: true,
                    usuarios: usuarioDB
                })
            })
            // let body = req.body;

        // if (body.nombre == undefined) {
        //     res.status(400).json({
        //         ok: false,
        //         mensaje: `El nombre es necesario`
        //     });
        // } else {
        //     res.json({
        //         persona: body
        //     })
        // }
    })
    .put('/usuarios/:id', [verificaToken, verificaROL], function(req, res) {
        let identificacion = req.params.id;
        let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

        //Buscamos el usuario en el schema Usuarios
        Usuario.findByIdAndUpdate(identificacion, body, { new: true, runValidators: true }, (err, usuarioDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.status(200).json({
                ok: true,
                usuario: usuarioDB
            })
        })

        // res.json({
        //     identificacion: identificacion
        // })
    })
    .delete('/usuarios/:id', [verificaToken, verificaROL], function(req, res) {

        let id = req.params.id;

        //Buscamos el usuario en el schema Usuarios
        Usuario.findByIdAndUpdate(id, { estado: true }, { new: true, runValidators: true }, (err, usuarioBorrado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            if (usuarioBorrado == null) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: 'Usuario no encontrado'
                    }
                })
            }
            res.status(200).json({
                ok: true,
                usuario: usuarioBorrado
            })
        })
    })
    .delete('/usuario/:id', [verificaToken, verificaROL], function(req, res) {

        let id = req.params.id;

        //Buscamos el usuario en el schema Usuarios
        Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            if (usuarioBorrado == null) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: 'Usuario no encontrado'
                    }
                })
            }
            res.status(200).json({
                ok: true,
                usuario: usuarioBorrado
            })
        })
    })

module.exports = app