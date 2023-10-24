import usersService from "../service/users.service.js";
import jwt from 'jsonwebtoken'
import envConfig from "../config/env.config.js";
import MailingService from "../messages/mailing.js";
import bcrypt from 'bcrypt';

class UserController {

    getAll = async (req, res) => {
        try {
            let allUsers = await usersService.getAll()
            res.status(200).send(allUsers)
        } catch (error) {
            res.status(400).send({ status: 'Error 400', message: error.message });
        }
    }

    getUserById = async (req, res) => {
        try {
            const uid = req.params.uid

            let foundUser = await usersService.getUserById(uid)
            if (!foundUser) return { status: 'failed.', message: `User ${uid} not found in db.` }
            res.status(200).send(foundUser)
        } catch (error) {
            res.status(400).send({ status: 'Error 400', message: error.message });
        }
    }

    getUserByEmail = async (req, res) => {
        try {
            const email = req.body.email
            let foundUser = await usersService.getUserByEmail(email)
            if (!foundUser) return { status: 'failed.', message: `User ${email} not found in db.` }

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

    changeRole = async (req, res) => {
        const uid = req.params.uid
        const user = await usersService.getUserById(uid)
        if (user.documents.length === 3) {
            const result = await usersService.changeRole(uid)
            res.status(200).send({ payload: result });
        }
        console.log('no paso')
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

    recoveryPassToken = async (req, res) => {
        try {
            const userEmail = req.body.email

            const user = await usersService.getUserByEmail(userEmail)
            if (!user) return { status: 'failed.', message: `User ${email} not found in db.` }

            const currentPassword = user.password
            const token = jwt.sign({ userEmail: user.email, currentPassword }, envConfig.sessions.JWT_KEY, { expiresIn: '1h' })
            const resetLink = `http://localhost:8080/reset-password/${token}`

            await MailingService.resetPassword(userEmail, resetLink)


            res.status(200).send({ message: 'Se supone que mail sent', payload: token })

        } catch (error) {
            throw error
        }

    }

    resetPassword = async (req, res) => {
        try {
            console.log('----------------------------USER CONTROLLER, resetPassword')
            const newPassword = req.body.password;
            const confirmPassword = req.body.passwordConfirmation;
            const currentPassword = req.body.currentPassword;
            const userEmail = req.body.userEmail


            // Check if the new password and confirmation match
            if (newPassword !== confirmPassword) {
                return res.status(400).send('Passwords do not match');
            }

            //Check if new is old
            const isSamePassword = bcrypt.compareSync(newPassword, currentPassword)
            if (isSamePassword) {
                return res.status(400).send('New password cannot be the same as the old password');
            }

            const user = await usersService.getUserByEmail(userEmail)
            console.log('old user')
            console.log(user)

            // Hash the new password
            const newHashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))
            user.password = newHashedPassword

            const newUserData = {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                age: user.age,
                password: newHashedPassword,
                role: user.role,
            }
            console.log('NewUserData')
            console.log(newUserData)

            await usersService.updateUser(newUserData)

            res.status(200).send({ message: 'Password updated' });

        } catch (error) {

        }
    }

    uploadCredentials = async (req, res) => {
        if (!req.files['profile'] || !req.files['address'] || !req.files['account']) {
            return res.status(400).send({ status: 'error', message: 'No se encontraron todos los archivos esperados o no se especificó el propósito.' });
        }
        //Capturamos los archivos
        const profileImage = req.files['profile'][0];
        const addressImage = req.files['address'][0];
        const accountImage = req.files['account'][0];

        //Agregamos los documentos al usuario
        const user = await usersService.getUserByEmail(req.session.user.email)
        user.documents = [
            { name: 'profile', reference: profileImage.path },
            { name: 'address', reference: addressImage.path },
            { name: 'account', reference: accountImage.path }
        ];
        const response = await usersService.updateUser(user)
        res.status(200).send({ status: 'Success', payload: response });
    }
}

export default new UserController()
