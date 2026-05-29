const catchAsync = require('../../utils/catchAsync');
const productService = require('./product.service');

const createProduct = catchAsync(async (req, res) => {
    const product = await productService.create(req.body);
    res.status(201).json(product);
});

const getAllProducts = catchAsync(async (req, res) => {
    const products = await productService.getAll();
    res.status(200).json(products);
});

const addLot = catchAsync(async (req, res) => {
        const { id } = req.params;
        const product = await productService.addLot(id, req.body);
    res.status(201).json(product);
});

const getExpiring = catchAsync(async (req, res) => {
    const products = await productService.getAllExpiring();
    res.status(200).json(products);
});

const remove = catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = await productService.removeProduct(id);
    res.status(200).json(product);
})

const subtractProduct = catchAsync(async (req, res) => {
    const { id, lotId } = req.params;
    const { quantidade } = req.body;
    const products = await productService.subtractItem(id, lotId, quantidade);
    res.status(200).json(products);
});

const incrementProduct = catchAsync(async (req, res) => {
    const { id, lotId } = req.params;
    const { quantidade } = req.body;
    const products = await productService.incrementProduct (id, lotId, quantidade);
    res.status(200).json(products);
})

module.exports = { createProduct, getAllProducts, addLot, getExpiring, remove, subtractProduct, incrementProduct};