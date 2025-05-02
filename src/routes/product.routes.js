const express = require("express");
const { createProduct, updateProduct, getUniqueProduct, getAllProducts } = require("../service/product.service");
const { validateCreateProduct, validateUpdateProduct } = require("../middleware/products.middleware");
const routerProduct = express.Router();

routerProduct.post("/product", validateCreateProduct, (request, response) => {
    const props = request.body;
    createProduct(props)
        .then(product => response.status(201).json(product))
        .catch(error => response.status(400).json({ message: error.message }))
})

routerProduct.patch("/product/:id", validateUpdateProduct, (request, response) => {
    const props = request.body;
    props.id = request.params.id;
    updateProduct(props)
        .then(product => response.status(201).json(product))
        .catch(error => response.status(400).json({ message: error.message }))
})

routerProduct.get("/product/:id", (request, response) => {
    const props = {};
    props.id = request.params.id;
    getUniqueProduct(props)
        .then(product => response.status(200).json(product))
        .catch(error => response.status(400).json({ message: error.message }))
})

routerProduct.get("/product", (request, response) => {
    getAllProducts()
        .then(product => response.status(200).json(product))
        .catch(error => response.status(400).json({ message: error.message }))
})

routerProduct.delete("/product/:id", (request, response) => {
    const props = {};
    props.id = request.params.id;
    updateProduct(props)
        .then(product => response.status(201).json(product))
        .catch(error => response.status(400).json({ message: error.message }))
})

module.exports = routerProduct;