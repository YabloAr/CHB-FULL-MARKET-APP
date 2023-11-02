import { Router } from 'express'
import ProductsController from '../controllers/products.controller.js'
import { checkAdmin, checkSession, checkUser, checkAdminAndPremium } from '../middlewares/auth.middleware.js'

const router = Router()

//--------api/products

//agregar middlewares de credentiales
router.get('/', checkSession, ProductsController.getAll)
router.get('/:pid', checkSession, ProductsController.getProductById)
router.post('/', checkSession, ProductsController.createProduct)
router.put('/:pid', checkSession, ProductsController.updateProduct)
router.delete('/:pid', checkSession, ProductsController.deleteProduct)

export default router