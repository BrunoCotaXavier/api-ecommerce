const express = require("express");
const { createOrder, getAllOrder, updateOrder } = require("../service/order.service");
const routerOrder = express.Router();

routerOrder.post("/order", (request, response) => {
    const props = request.body
    createOrder(props)
        .then(order => response.status(201).json(order))
        .catch(error => response.status(400).json({ message: error.message }))
});

routerOrder.patch("/order/:id", (request, response) => {
    const props = request.body
    props.id = request.params.id
    updateOrder(props)
        .then(order => response.status(201).json(order))
        .catch(error => response.status(400).json({ message: error.message }))
});

routerOrder.get("/order", (request, response) => {
    getAllOrder()
        .then(orders => response.status(201).json(orders))
        .catch(error => response.status(400).json({ message: error.message }))
});

module.exports = { routerOrder };