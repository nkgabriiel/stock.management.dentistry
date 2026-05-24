const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'O nome é obrigatório.'],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'O email é obrigatório.'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'A senha é obrigatória.']
    },
    role: {
        type: String,
        enum: ['admin', 'funcionario'],
        default: 'funcionario'
    },
    ativo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model ('User', userSchema);