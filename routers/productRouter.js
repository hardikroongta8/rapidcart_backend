const productRouter = require('express').Router();
const productController = require('../controllers/productController');
const asyncErrorHandler = require('../handlers/asyncErrorHandler');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

productRouter.get('/all', asyncErrorHandler(productController.getAllProducts));
productRouter.get('/id/:id', asyncErrorHandler(productController.getProductById));
productRouter.post('/add/wishlist', verifyAccessToken, 
    asyncErrorHandler(productController.addProductToWishlist)
);
productRouter.post('/add/cart', verifyAccessToken, 
    asyncErrorHandler(productController.addProductToCart)
);
productRouter.post('/add', verifyAccessToken, 
    asyncErrorHandler(productController.addProduct)
);

module.exports = productRouter;