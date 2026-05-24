
const Product  = require ('./product.model')

const create = (data) => {
    return Product.create(data);
};
const findAll = () => Product.find({ ativo: true });

const findById = (id) => Product.findById(id);

const findByName = (nome) => {
    return Product.findOne({ nome });
};

const findExpiring = (days) => {
    const hoje = new Date();
    const limite = new Date();
    limite.setDate(hoje.getDate() + days);

    return Product.find({
        ativo: true,
        'lote.validade': {
            $gte: hoje,
            $lte: limite,
        }
    });
};

const update = (id, data) => Product.findByIdAndUpdate(id, data,{new: true});

const softDelete = (id) => Product.findByIdAndUpdate(id, {ativo: false}, {new: true});

const findLoteAndSubtract = (id, lotId, quantidade) => {
    return Product.findOneAndUpdate(
        { _id: id, 'lote._id': lotId },
        { $inc: { 'lote.$.quantidade': -quantidade} },
        {new: true}
    );
};

module.exports = {create, findAll, findById, findByName, update, softDelete, findExpiring, findLoteAndSubtract};