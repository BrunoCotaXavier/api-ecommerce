const express = require("express");
const { login } = require("../service/auth.service");
const routerAuth = express.Router();

routerAuth.post("/login", (request, response) => {
    const { email, password } = request.body;
    login(email, password, response)
        .then(auth => response.status(201).json(auth))
        .catch(error => response.status(400).json({ message: error.message }))
})

module.exports = { routerAuth };