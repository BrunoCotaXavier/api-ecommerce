const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOrder = async (props) => {
    try {
        const data = {};
        data.userId = props.userId;
        data.total = parseFloat(props.total || 0);

        const userExist = await prisma.user.findUnique({ where: { id: data.userId } });

        if (!userExist) throw new Error("Usuario não existe.");

        const newOrder = await prisma.order.create({ data })
        return newOrder;
    } catch (error) {
        throw new Error("Erro ao criar novo pedido: " + error.message);
    }
}

const updateOrder = async (props) => {
    try {
        const data = {};
        data.userId = props.userId;
        data.total = props.total;
        data.status = props.status;

        const userExist = await prisma.user.findUnique({ where: { id: data.userId } });

        if (!userExist) throw new Error("Usuario não existe.");
        console.log(data)
        const newOrder = await prisma.order.update({ where: { id: props.id }, data })
        return newOrder;
    } catch (error) {
        throw new Error("Erro ao alterar pedido: " + error.message);
    }
}

const getAllOrder = async () => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                items: true
            }
        });
        return orders;
    } catch (error) {
        throw new Error("Erro ao listar pedidos: " + error.message)
    }
}

module.exports = {
    createOrder,
    getAllOrder,
    updateOrder
}