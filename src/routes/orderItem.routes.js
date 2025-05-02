const express = require("express");
const { createOrderItem, deleteOrderItem } = require("../service/orderItem.service");
const routerOrderItem = express.Router();

routerOrderItem.post("/order-item", (request, response) => {
    const props = request.body;
    createOrderItem(props)
        .then(orderItem => response.status(201).json(orderItem))
        .catch(error => response.status(400).json({ message: error.message }))
});

routerOrderItem.delete("/order-item/:id", (request, response) => {
    const props = {};
    props.id = request.params.id;
    deleteOrderItem(props)
        .then(orderItem => response.status(201).json(orderItem))
        .catch(error => response.status(400).json({ message: error.message }))
});

module.exports = { routerOrderItem };