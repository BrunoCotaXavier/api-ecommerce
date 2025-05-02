const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCategory = async (props) => {
    const data = {};
    data.name = props.name;

    try {

        const categoryExist = await prisma.category.findUnique({
            where: {
                name: props.name
            }
        })

        if (categoryExist) {
            throw new Error("Categoria ja existe.")
        }

        const newCategory = await prisma.category.create({
            data
        })

        return newCategory;
    } catch (error) {
        throw new Error("Erro ao criar categoria: " + error.message)
    }

}

const uptadeCategory = async (props) => {
    const parseId = parseFloat(props.id)
    try {
        const categoryExist = await prisma.category.findUnique({
            where: { id: parseId }
        })

        if (!categoryExist) throw new Error("Categoria não existe");

        const newCategory = await prisma.category.update({
            where: {
                id: parseId
            },
            data: {
                name: props.name
            }
        });

        return newCategory;

    } catch (error) {
        throw new Error("Erro ao editar categoria: " + error.message);
    }
}

const getAllcategory = async () => {
    try {
        const categories = await prisma.category.findMany();
        return categories;
    } catch (error) {
        throw new Error("Erro ao listar categorias: " + error.message);
    }
}

const getUniqueCategory = async (props) => {
    try {
        const parseId = parseFloat(props.id);
        const category = await prisma.category.findUnique({
            where: {
                id: parseId
            }
        });

        if (!category) throw new Error("Categoria não existe");

        return category;
    } catch (error) {
        throw new Error("Erro ao buscar categoria: " + error.message);
    }
}

const deleteCategory = async (props) => {
    try {
        const parseId = parseFloat(props.id);

        const categoryExists = await prisma.category.findUnique({
            where: {
                id: parseId
            }
        })
        
        if (!categoryExists) { 
            throw new Error("Categoria não existe") 
        }
        
        //### obs: as categorias associadas a produtos não vao ser deletadas.
        const category = await prisma.category.delete({
            where: {
                id: parseId
            }
        });

        return category;
    } catch (error) {
        throw new Error("Erro ao buscar categoria: " + error.message);
    }
}

module.exports = { createCategory, uptadeCategory, getAllcategory, getUniqueCategory, deleteCategory }