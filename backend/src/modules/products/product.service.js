const AppError = require("../../utils/appError");
const productRepository = require("./product.repository");

const create = async ({ nome }) => {
    const exist = await productRepository.findByName(nome);
    if (exist) throw new AppError('Produto já cadastrado.', 409);
    return productRepository.create({ nome });
}

const getAll = async () => {
    return productRepository.findAll();
};

const addLot = async (id, {loteProduto, quantidade, validade}) => {
    const produto = await productRepository.findById(id);
    if(!produto) throw new AppError('Produto não encontrado.', 404);

    const loteExiste = produto.lote.find(l => l.loteProduto === loteProduto);
    if(loteExiste) throw new AppError ('Lote já cadastrado nesse produto.', 409);

    produto.lote.push({loteProduto, quantidade, validade});
    return produto.save();
};

const getAllExpiring = async () => {
    return productRepository.findExpiring(30);
}

const removeProduct = async (id) => {
    const produto = await productRepository.softDelete(id);
    if(!produto) throw new AppError('Produto não encontrado', 404);
    return produto;
}
const subtractItem = async(id, lotId, quantidade) => {
    const produto = await productRepository.findById(id);
    if(!produto) throw new AppError('Produto não encontrado', 404);
    const lote = produto.lote.id(lotId);
    if(!lote) throw new AppError('Lote não encontrado', 404);

    if(quantidade <= 0) throw new AppError('Insira um número válido.', 400);
    if(lote.validade < new Date()) throw new AppError('Lote vencido.', 400);
    if(lote.quantidade === 0) throw new AppError('Lote sem estoque', 400);
    if(lote.quantidade < quantidade) throw new AppError('Quantidade insuficiente', 400);

    return productRepository.findLoteAndSubtract(id, lotId, quantidade);
}

module.exports = {create, getAll, addLot, getAllExpiring, removeProduct, subtractItem};