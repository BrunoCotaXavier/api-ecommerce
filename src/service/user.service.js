const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (name, email, password, cpf) => {
    try {
        const userExists = await prisma.user.findUnique({
            where: {
                email: email
            },
        })

        if (userExists) {
            throw new Error("Usuario já cadastrado com este e-mail");
        }
        
        const newUser = await prisma.user.create({
            data: { name, email, password, cpf }
        });
        return newUser;
    } catch (error) {
        throw new Error('Erro ao criar usuário: ' + error.message);
    }
}

const updateUser = async (name, email, password, id) => {
    try {
        const parseId = parseInt(id);

        const userExists = await prisma.user.findUnique({
            where: {
                id: parseId
            },
        })

        const userEmailExists = await prisma.user.findUnique({
            where: {
                email: email
            },
        })

        if (!userExists) {
            throw new Error("Usuario informado não existe.");
        }

        if (userEmailExists) {
            throw new Error("E-mail ja cadastrado.");
        }

        const updateUser = await prisma.user.update({
            where: {
                id: parseId
            },
            data: {
                name,
                email,
                password
            }
        })
        return updateUser;
    } catch (error) {
        throw new Error('Erro ao alterar usuário: ' + error.message);
    }
}

const getUniqueUser = async (id) => {
    try {
        const parseId = parseInt(id);
        const user = await prisma.user.findUnique({
            where: {
                id: parseId
            }
        });

        if (!user) {
            throw new Error("Usuario informado não existe.");
        }

        return user;

    } catch (error) {
        throw new Error('Erro ao procurar usuário: ' + error.message);
    }
}

const getAllUsers = async () => {
    try {
        const users = await prisma.user.findMany()
        return users
    } catch (error) {
        throw new Error('Erro ao listar usuários: ' + error.message);
    }
}

const deleteUser = async (id) => {
    try {
        const parseId = parseInt(id);
        const userExists = await prisma.user.findUnique({
            where: {
                id: parseId
            },
        })

        if (!userExists) {
            throw new Error("Usuario informado não existe");
        }
        const user = await prisma.user.delete({
            where: {
                id: parseId
            },
        })
        return user;
    } catch (error) {
        throw new Error('Erro ao excluir usuario: ' + error.message);
    }
}

module.exports = { createUser, getAllUsers, updateUser, deleteUser, getUniqueUser };
