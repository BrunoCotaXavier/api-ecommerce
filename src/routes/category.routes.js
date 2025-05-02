const express = require("express");
const { createCategory, uptadeCategory, getAllcategory, getUniqueCategory, deleteCategory } = require("../service/category.service");
const routerCategory = express.Router();

routerCategory.post("/category", (request, response) => {
    const props = request.body;
    createCategory(props)
        .then(category => response.status(201).json(category))
        .catch(error => response.status(400).json({ message: error.message }))
})

routerCategory.patch("/category/:id", (request, response) => {
    const props = request.body;
    props.id = request.params.id;
    uptadeCategory(props)
        .then(category => response.status(201).json(category))
        .catch(error => response.status(400).json({ message: error.message }))
})

routerCategory.get("/category", (request, response) => {
    getAllcategory()
        .then(category => response.status(200).json(category))
        .catch(error => response.status(400).json({ message: error.message }))
})

routerCategory.get("/category/:id", (request, response) => {
    const props = {};
    props.id = request.params.id;
    getUniqueCategory(props)
        .then(category => response.status(200).json(category))
        .catch(error => response.status(400).json({ message: error.message }))
})

routerCategory.delete("/category/:id", (request, response) => {
    const props = {};
    props.id = request.params.id;
    deleteCategory(props)
        .then(category => response.status(200).json(category))
        .catch(error => response.status(400).json({ message: error.message }))
})

module.exports = { routerCategory }