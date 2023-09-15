// import { isValidPassword } from "../utils.js";
import usersDao from "../models/daos/users.dao.js";
import UsersDTO from '../controllers/DTO/user.dto.js'

class UserService {
    getAll = async () => {
        try {
            let users = await usersDao.getAll()
            return users
        } catch (error) {
            throw error
        }

    };

    async getUserById(uid) {
        try {
            const user = await usersDao.getUserById(uid)
            return user;
        } catch (error) {
            throw error
        }
    }

    async createUser(userRegisterData) {
        try {
            const newUser = await UsersDTO.createUser(userRegisterData)
            let result = await usersDao.createUser(newUser);
            return result;
        } catch (error) {
            throw error
        }
    }

    async deleteUser(uid) {
        try {
            const response = await usersDao.deleteUser(uid)
            return response === null ? { status: 'error', message: 'User not found' } : response
        } catch (error) {
            throw error
        }
    }
}

export default new UserService();
