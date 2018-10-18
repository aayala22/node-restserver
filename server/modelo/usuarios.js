const mongoose = require('mongoose'); //conexion a MongoDB
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Esto es requerido']
    },
    email: {
        type: String,
        unique: [true, 'Este correo ya exite'],
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es oligatoria']
    },
    img: {
        type: String,

    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        require: [true, 'El estado es obligatorio']
    },
    google: {
        type: Boolean,
        require: [true, 'Obligatorio']
    },
    Genero: {
        type: String
    }

});

usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' })

//VAMOS A EXPORTAR EL MODELO :
module.exports = mongoose.model('Usuario', usuarioSchema);