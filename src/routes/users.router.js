import { Router } from 'express'
import UsersController from '../controllers/users.controller.js'
import { checkSession, checkAdmin, checkUser, checkAdminAndPremium } from './../middlewares/auth.middleware.js';
import { uploader, userUpload } from '../utils/utils.js';

const router = Router()

//----api/users
router.get('/', UsersController.getAll)
router.get('/inactive', checkSession, checkAdmin, UsersController.deleteInactive)
router.get('/:uid', UsersController.getUserById)
router.post('/generate-recovery-token', UsersController.recoveryPassToken)
router.post('/reset-password', UsersController.resetPassword)
router.post('/', UsersController.createUser)
router.get('/premium/:uid', checkSession, checkAdmin, UsersController.changeRole)
router.delete('/:uid', checkSession, checkAdmin, UsersController.deleteUser)

//MULTER
router.post('/:uid/documents', userUpload, UsersController.uploadCredentials)



export default router

