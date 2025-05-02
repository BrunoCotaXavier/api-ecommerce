const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrderItem = async (props) => {
    try {
        const data = {};
        data.orderId = props.orderId;
        data.productId = props.productId;
        data.quantity = props.quantity;

        const orderExists = await prisma.order.findUnique({ where: { id: data.orderId } });
        if (!orderExists) throw new Error("Pedido não existente.");

        const productExists = await prisma.product.findUnique({ where: { id: data.productId } });
        if (!productExists) throw new Error("Produto não existente.");

        const orders = await prisma.order.findUnique({
            where: {
                id: data.orderId
            },
            include: {
                items: true
            }
        });

        const items = orders.items;

        for (let i = 0; i < items.length; i++) {
            if (items[i].productId === data.productId) {
                throw new Error("Produto já está no pedido.")
            }
        }

        const newOrderItem = await prisma.orderItem.create({ data });

        if (newOrderItem) await prisma.order.update({
            where: { id: data.orderId },
            data: { total: (orders.total + newOrderItem.quantity) }
        })

        return newOrderItem;
    } catch (error) {
        throw new Error("Erro ao adicionar item ao pedido: " + error.message);
    }
}

const deleteOrderItem = async (props) => {
    try {
        const data = {};
        data.id = props.id;

        const orderItemExist = await prisma.orderItem.findUnique({ where: { id: data.id } });
        if (!orderItemExist) throw new Error("Item do Pedido não existe");

        const deleteOrderItem = await prisma.orderItem.delete({
            where: {
                id: data.id
            }
        });

        const order = await prisma.order.findUnique({ where: { id: deleteOrderItem.orderId } });

        if (deleteOrderItem) await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                total: (order.total - deleteOrderItem.quantity)
            }
        });

        return deleteOrderItem;
    } catch (error) {
        throw new Error("Erro ao retirar item ao pedido: " + error.message);
    }
}

module.exports = { createOrderItem, deleteOrderItem };