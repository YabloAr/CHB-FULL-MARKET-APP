import { Router } from 'express'
import ProductsController from '../controllers/products.controller.js'
import { checkAdmin, checkSession, checkUser, checkAdminAndPremium } from '../middlewares/auth.middleware.js'

const router = Router()

//--------api/products

//agregar middlewares de credentiales
router.get('/', ProductsController.getAll)
router.get('/:pid', ProductsController.getProductById)
router.post('/', checkSession, checkAdminAndPremium, ProductsController.createProduct)
router.put('/:pid', checkSession, checkAdminAndPremium, ProductsController.updateProduct)
router.delete('/:pid', checkSession, checkAdminAndPremium, ProductsController.deleteProduct)

export default router