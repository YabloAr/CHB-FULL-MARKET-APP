import { Router } from 'express'
import UsersController from '../controllers/users.controller.js'

const router = Router()

//----api/users
router.get('/', UsersController.getAll)
router.get('/:uid', UsersController.getUserById)
router.post('/', UsersController.createUser)
router.delete('/:uid', UsersController.deleteUser)

export default router
