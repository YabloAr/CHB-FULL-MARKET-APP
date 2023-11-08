import Mail from 'nodemailer/lib/mailer/index.js';
import MailingService from '../../messages/mailing.js';
import productsModel from '../schemas/products.schema.js'
import envConfig from '../../config/env.config.js';

class ProductsDAO {
    constructor() {
    }

    //GET ALL
    async getAll() {
        try {
            const products = await productsModel.find().lean()
            return products
        } catch (error) {
            throw error;
        }

    }

    //GET PRODUCT BY ID
    getProductById = async (pid) => {
        try {
            let foundProduct = await productsModel.findById(pid)
            if (!foundProduct) return null

            return foundProduct
        } catch (error) {
            throw error;
        }
    }

    //NEW PRODUCT
    createProduct = async (product) => {
        try {
            const response = await productsModel.create(product)
            return { status: 200, message: `Product added.`, payload: response }
        } catch (error) {
            throw error;
        }
    }

    //NEW PRODUCT
    createMany = async (arrayOfProducts) => {
        try {
            // await productsModel.deleteMany({});
            const response = await productsModel.insertMany(arrayOfProducts)
            return { status: 200, message: `Product added.`, payload: response }
        } catch (error) {
            throw error;
        }
    }

    //UPDATE PRODUCT
    updateProduct = async (pid, newData, user) => {
        try {
            const updatedProduct = await productsModel.findByIdAndUpdate(pid, newData, { new: true });
            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }

    //DELETE PRODUCT
    deleteProduct = async (pid, user) => {
        try {
            let foundProduct = await productsModel.findById(pid)
            if (!foundProduct) return null

            if (user.role === 'admin' || user.email === foundProduct.owner) {
                await productsModel.deleteOne({ _id: pid });

                //Mailing
                const owner = foundProduct.owner
                const serverEmail = envConfig.mailing.USER
                await MailingService.sendSimpleMail({
                    from: serverEmail,
                    to: owner,
                    subject: `Your product ${foundProduct.title}`,
                    message: `Dear Rhino, Ace (admin) saw your product ${foundProduct.title} and it sucked like guano, so it got deleted, good luck next time mate'!`,
                    attachments: []
                })

                return { status: 200, message: `Product ${pid} (${foundProduct.title}) deleted. User notified.` };
            } else {
                return { status: 401, message: 'You are not an admin nor the owner of the product, forbidden.' };
            }



        } catch (error) { return { status: 'Error', message: error.message } }
    };

    //generateNewCode 7 digits
    generateNewCode = async () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomCode = '';
        for (let i = 0; i < 7; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomCode += characters[randomIndex];
        }
        return randomCode
    }
}

export default new ProductsDAO()

