const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

const validateToken = (request, response, next) => {
    const token = request.headers["x-access-token"];
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) response.status(401).json({ message: "Token invalido!" }).end();

        request.userId = decoded.userId;
        next();
    })
}

module.exports = { validateToken };