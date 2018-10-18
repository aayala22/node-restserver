const jwt = require('jsonwebtoken');
// =============================
// Verifica token 
// =============================

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    // console.log(token);

    jwt.verify(token, process.env.SEED, (err, decode) => {
        console.log(token);
        if (err) {
            return res.status(401).json({
                ok: false,
                err: "Token no valido"
            });
        }

        req.usuario = decode.usuario;
        next();
    })


};

// =============================
// Verifica ROL 
// =============================

let verificaROL = (req, res, next) => {

    let usuario = req.Usuario

    // console.log(token);


    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {

        return res.json({
            ok: false,
            err: "El usuario no es administrador"
        });
    }


};

module.exports = {
    verificaToken,
    verificaROL
}