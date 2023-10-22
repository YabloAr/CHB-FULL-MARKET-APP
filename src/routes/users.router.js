import { Router } from 'express'
import UsersController from '../controllers/users.controller.js'
import { checkSession, checkAdmin, checkUser, checkAdminAndPremium } from './../middlewares/auth.middleware.js';
import { uploader, userUpload } from '../utils/utils.js';

const router = Router()

//----api/users
router.get('/', UsersController.getAll)
router.get('/:uid', UsersController.getUserById)
router.post('/generate-recovery-token', UsersController.recoveryPassToken)
router.post('/reset-password', UsersController.resetPassword)
router.post('/', UsersController.createUser)
router.put('/premium/:uid', UsersController.changeRole)
router.delete('/:uid', UsersController.deleteUser)


router.post('/upload', userUpload, UsersController.uploadFields)
router.post('/:uid/documents/fields', userUpload, UsersController.uploadFields)
router.post('/:uid/documents', uploader.single('singleImage'), UsersController.uploadSingle)
router.post('/:uid/documents/array', uploader.array('imagesArray', 3), UsersController.uploadArray)



export default router

