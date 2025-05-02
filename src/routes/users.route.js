const express = require("express");
const routerUser = express.Router();

const { createUser, getAllUsers, updateUser, deleteUser, getUniqueUser } = require("../service/user.service");
const { validateCreateUser, validateUpdateUser } = require("../middleware/users.middleware");
const { validateToken } = require("../middleware/auth.middleware");

routerUser.post('/users', validateCreateUser, (request, response) => {
    const { name, email, password, cpf } = request.body;
    createUser(name, email, password, cpf)
        .then(user => response.status(201).json(user))
        .catch(error => response.status(400).json({ message: error.message }))
});

routerUser.patch('/users/:id', validateUpdateUser, (request, response) => {
    const { name, email, password } = request.body;
    const userId = request.params.id;
    updateUser(name, email, password, userId)
    .then(user => response.status(201).json(user))
    .catch(error => response.status(400).json({ message: error.message }))
});

routerUser.get('/users/:id', validateToken, (request, response) => {
    const userId = request.params.id;
    getUniqueUser(userId)
        .then(user => response.status(200).json(user))
        .catch(error => response.status(400).json({ message: error.message }))
});

routerUser.get('/users', validateToken, (request, response) => {
    getAllUsers()
        .then(user => response.status(200).json(user))
        .catch(error => response.status(400).json({ message: error.message }))
});

routerUser.delete('/users/:id', (request, response) => {
    const userId = request.params.id;
    deleteUser(userId)
        .then(user => response.status(200).json(user))
        .catch(error => response.status(400).json({ message: error.message }))
});

module.exports = routerUser;