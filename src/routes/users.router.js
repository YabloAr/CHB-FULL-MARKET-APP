import { Router } from 'express'
import UsersController from '../controllers/users.controller.js'

const router = Router()

//----api/users
router.get('/', UsersController.getAll)
router.get('/:uid', UsersController.getUserById)
router.post('/generate-recovery-token', UsersController.recoveryPassToken)
router.post('/reset-password', UsersController.resetPassword)
router.post('/', UsersController.createUser)
router.delete('/:uid', UsersController.deleteUser)



export default router
