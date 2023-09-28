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

    getUserByEmail = async (email) => {
        try {
            const user = await userModel.findOne({ email: email })
            return user
        } catch (error) {
            throw error
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

    updateUser = async (newData) => {
        try {
            console.log('-------------------------------------USERS DAO update User.')
            const foundUser = await userModel.findById(newData._id)
            console.log('found user is:')
            console.log(foundUser)
            const updatedUser = await userModel.findByIdAndUpdate(foundUser._id, newData, { new: true });
            return updatedUser;
        } catch (error) {
            throw error
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




}

export default new UsersDAO()

