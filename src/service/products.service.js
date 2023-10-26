import { getDAOS } from '../models/daos/index.dao.js'
import productsDao from '../models/daos/products.dao.js'

const { ProductsDAO } = getDAOS()

class ProductsService {

    async getAll() {
        try {
            return await ProductsDAO.getAll()
        } catch (error) { throw error }
    }

    async getProductById(pid) {
        try {
            const product = await ProductsDAO.getProductById(pid)
            if (product === null) return { status: 'error', message: 'Product not found' }

            return product

        } catch (error) { throw error }
    }

    async createProduct(product) {
        try {
            const response = await ProductsDAO.createProduct(product)
            return response
        } catch (error) { throw error }
    }

    async updateProduct(pid, newData, user) {
        try {

            let foundProduct = await productsDao.getProductById(pid)
            if (!foundProduct) return { status: 'error', message: 'Product not found' }

            if (user.role === 'admin' || user.email === foundProduct.owner) {
                const response = await ProductsDAO.updateProduct(pid, newData, user)
                return response
            } else {
                return { message: 'You are not an admin nor the owner of the product, forbidden.' };
            }

        } catch (error) { throw error }
    }

    async deleteProduct(pid, user) {
        try {
            const response = await ProductsDAO.deleteProduct(pid, user)
            if (response === null) return { status: 'error', message: 'Product not found' }
            return response
        } catch (error) { throw error }
    }

}

export default new ProductsService()