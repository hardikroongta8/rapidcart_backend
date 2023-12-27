const db = require("../utils/db-config");

exports.getAllProducts = async(req, res, next) => {
    const products = await db.query('select * from products');
    res.json({
        success: true,
        products: products.rows,
        count: products.rowCount
    });
};

exports.addProduct = async(req, res, next) => {
    await db.query(
        'insert into products (product_name, price, quantity, images, description, seller_id) values ($1, $2, $3, $4, $5, $6)',
        [req.body.name, req.body.price, req.body.quantity, req.body.images, req.body.description, req.user.googleId]
    );

    res.json({
        success: true,
        message: "Product added successfully."
    });
};

exports.getProductById = async(req, res, next) => {
    const products = await db.query(
        'select * from products where id = $1', 
        [req.params.id]
    );
    res.json({
        success: true,
        products: products.rows[0],
        count: 1
    });
};

exports.addProductToWishlist = async(req, res, next) => {
    await db.query(
        'insert into wishlists (product_id, user_id) values($1, $2)', 
        [req.body.productId, req.user.googleId]
    );
    res.json({
        success: true,
        message: "Product added to wishlist."
    });
};

exports.addProductToCart = async(req, res, next) => {
    await db.query(
        'insert into carts (product_id, user_id) values($1, $2)', 
        [req.body.productId, req.user.googleId]
    );
    res.json({
        success: true,
        message: "Product added to cart."
    });
};