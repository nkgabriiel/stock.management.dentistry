const mongoose = require("mongoose");

const loteSchema = new mongoose.Schema({
    loteProduto: {
        type: String,
        required: [true, 'O lote é obrigatório'],
        trim: true
    },
    quantidade: {
        type: Number,
        required: [true, 'A quantidade é obrigatória'],
        min: [0, 'Quantidade não pode ser negativa']
    },
    validade: {
        type: Date,
        required: [true, 'A validade é obrigatória']
    }
});

const produtoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'O nome é obrigatório.'],
        trim: true,
    },
    lote: {
        type: [loteSchema],
        default: [],
    },
    ativo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', produtoSchema);
