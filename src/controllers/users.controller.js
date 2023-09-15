import usersService from "../service/users.service.js";

class UserController {

    getAll = async (req, res) => {
        try {
            let allUsers = await usersService.getAll()
            res.status(200).send({ total: allUsers.length, payload: allUsers })
        } catch (error) {
            res.status(400).send({ status: 'Error 400', message: error.message });
        }
    }

    getUserById = async (req, res) => {
        try {
            const uid = req.params.uid

            let foundUser = await usersService.getUserById(uid)
            if (!foundUser) return { status: 'failed.', message: `Product ${uid} not found in db.` }
            res.status(200).send(foundUser)
        } catch (error) {
            res.status(400).send({ status: 'Error 400', message: error.message });
        }
    }

    createUser = async (req, res) => {
        try {
            const userRegisterData = req.body
            let result = await usersService.createUser(userRegisterData)

            res.status(200).send(result)
        } catch (error) {
            throw error
        }
    }

    deleteUser = async (req, res) => {
        try {
            const uid = req.params.uid
            const response = await usersService.deleteUser(uid)
            res.status(200).send(response)
        } catch (error) {
            res.status(400).send({ status: 'Error 400', message: error.message });
        }
    }
}

export default new UserController()
