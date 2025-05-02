const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET

const login = async (email, password) => {
    try {
        const userExist = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        if (!userExist) {
            throw new Error("Acesso negado.")
        }

        if (userExist.password !== password) {
            throw new Error("Acesso negado.")
        }

        const token = jwt.sign({ userId: userExist.id }, SECRET, { expiresIn: 500 }) //18000000

        return { auth: true, token };
    } catch (error) {
        throw new Error("Erro ao fazer login: " + error.message)
    }
}

module.exports = { login };
