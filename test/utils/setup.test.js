import mongoose from "mongoose";
import productModel from "../../src/models/schemas/products.schema.js";
import cartModel from "../../src/models/schemas/carts.schema.js";
import userModel from "../../src/models/schemas/users.schema.js";

//la conexion no funciona, ni desde aca ni desde el test propio.
export const connectTestDatabase = async () => {
    await mongoose.connect('mongodb+srv://Yablo:qGz*785_c.Yfwcf@cluster0.hiwmxr5.mongodb.net/ecommerceTest?retryWrites=true&w=majority')
}

export const disconnectTestDatabase = async () => {
    mongoose.connection.close()
}


export const dropProducts = async () => {
    // await productModel.collection.drop()
}

export const dropCarts = async () => {
    // await cartModel.collection.drop()
}

export const dropUsers = async () => {
    // await userModel.collection.drop()
}