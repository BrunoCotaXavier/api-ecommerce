const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createProduct = async (props) => {
    const data = {}
    data.name = props.name;
    data.description = props.description;
    data.price = props.price;
    data.stock = props.stock;
    data.imageUrl = props.imageUrl;
    data.categoryId = props.categoryId;

    try {

        const categoryExist = await prisma.category.findUnique({
            where: {
                id: props.categoryId
            }
        })

        if (!categoryExist) throw new Error("Categoria não existe")


        const newProduct = await prisma.product.create({ data });
        return newProduct;

    } catch (error) {
        throw new Error('Erro ao criar produto: ' + error.message);
    }
}

const updateProduct = async (props) => {
    const data = {}
    data.name = props.name;
    data.description = props.description;
    data.price = props.price;
    data.stock = props.stock;
    data.imageUrl = props.imageUrl;
    data.categoryId = props.categoryId;
    try {

        const producExist = await prisma.product.findUnique({
            where: {
                id: props.id
            }
        })

        if (!producExist) throw new Error("Produto não existe")
        
        if(props.categoryId){
            const categoryExist = await prisma.category.findUnique({
                where: {
                    id: props.categoryId
                }
            })
    
            if (!categoryExist) throw new Error("Categoria não existe")
        }



        const newProduct = await prisma.product.update({ 
            where: {
                id: props.id
            },
            data
        });
        return newProduct;

    } catch (error) {
        throw new Error('Erro ao editar produto: ' + error.message);
    }
}

const deleteProduct = async (props) => {
    try {
        const parseId = parseFloat(props.id)
        const productExists = await prisma.product.findUnique({
            where: {
                id: parseId
            }
        })

        if (!productExists) {
            throw new Error("Produto informado não existe");
        }

        const product = await prisma.product.delete({
            where: parseId
        });

        return product;
    } catch (error) {
        throw new Error("Erro ao deletar produto: " + error.message);
    }
}

const getUniqueProduct = async (props) => {
    try {
        const parseId = parseFloat(props.id);

        const product = await prisma.product.findUnique({
            where: {
                id: parseId
            }
        });

        if (!product) {
            throw new Error("Produto informado não existe");
        }

        return product;
    } catch (error) {
        throw new Error("Erro ao procurar produto: " + error.message);
    }
}

const getAllProducts = async () => {
    try {
        const products = await prisma.product.findMany();

        if (!products) {
            throw new Error("Produtos não encontrado");
        }

        return products;

    } catch (error) {
        throw new Error("Erro ao listar produtos: " + error.message);
    }
}

module.exports = { createProduct, updateProduct, deleteProduct, getUniqueProduct, getAllProducts };
