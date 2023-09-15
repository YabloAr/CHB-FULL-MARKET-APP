import userModel from "../schemas/users.schema.js";

class UsersDAO {
    constructor() {
        console.log('Users DAO conected.')
    }

    //GET ALL
    async getAll() {
        try {
            const users = await userModel.find().lean()
            return users
        } catch (error) {
            throw error;
        }

    }

    //GET PRODUCT BY ID
    getUserById = async (uid) => {
        try {
            let foundUser = await userModel.findById(uid)
            if (!foundUser) return null

            return foundUser
        } catch (error) {
            throw error;
        }
    }

    createUser = async (userData) => {
        try {
            let exists = await userModel.findOne({ email: userData.email })
            if (exists) {
                return {
                    status: 409,
                    error: "Email address is already registered."
                }
            }

            const user = await userModel.create(userData)
            return ({ status: 200, message: `User created.`, payload: user })
        } catch (error) {
            throw error;
        }
    }

    deleteUser = async (uid) => {
        try {
            let exists = await userModel.findById(uid)
            let response = `User ${exists.first_name} ${exists.last_name} with ${exists.email} mail was deleted.`

            const result = await userModel.deleteOne({ _id: uid });
            if (result.deletedCount === 0) {
                return null
            }
            return { status: 'Success.', payload: response };
        } catch (error) {
            throw error;
        }
    }


    //     //NEW PRODUCT


    //     //UPDATE PRODUCT
    //     updateProduct = async (pid, updatedFields) => {
    //         try {
    //             let foundProduct = await productsModel.findById(pid)
    //             if (!foundProduct) return null
    //             const updatedProduct = await productsModel.findByIdAndUpdate(pid, updatedFields, { new: true });
    //             return updatedProduct;
    //         } catch (error) {
    //             throw error;
    //         }
    //     }

    //     //DELETE PRODUCT
    //     deleteProduct = async (pid) => {
    //         try {
    //             const result = await productsModel.deleteOne({ _id: pid });
    //             if (result.deletedCount === 0) {
    //                 return null
    //             }
    //             return { status: 'Success.', message: `Product ${pid} deleted.` };
    //         } catch (error) { return { status: 'Error', message: error.message } }
    //     };


    //     //generateNewCode 7 digits
    //     generateNewCode = async () => {
    //         const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //         let randomCode = '';
    //         for (let i = 0; i < 7; i++) {
    //             const randomIndex = Math.floor(Math.random() * characters.length);
    //             randomCode += characters[randomIndex];
    //         }
    //         return randomCode
    //     }
}

export default new UsersDAO()

