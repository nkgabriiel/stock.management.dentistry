const express = require('express');
const router = express.Router();
const productController = require('./product.controller');
const {verifyToken} = require("../../middleware/auth.middleware");

router.get('/products', verifyToken, productController.getAllProducts);
router.get('/products/expiring', verifyToken, productController.getExpiring);
//router.get('/products/:id', productController.getById);

router.post('/products', verifyToken, productController.createProduct);
router.post('/products/:id/lots', verifyToken, productController.addLot);
router.post('/products/:id/lots/:lotId/exit', verifyToken, productController.subtractProduct);

//router.put('/products/:id', productController.update);

//router.patch('/products/:id/lots/:lotId', productController.updateLot);

router.delete('/products/:id', verifyToken, productController.remove);

module.exports = router;