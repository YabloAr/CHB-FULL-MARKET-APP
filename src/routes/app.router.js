import { Router } from 'express'
import cartsRouter from './carts.router.js'
import productsRouter from './products.router.js'
import usersRouter from './users.router.js'
import sessionsRouter from './sessions.router.js'
import viewsRouter from './views.router.js'
import messageRouter from './message.router.js'
import ticketsRouter from './tickets.router.js'
import { checkAdmin, checkSession } from '../middlewares/auth.middleware.js'

const router = Router()

router.use('/', viewsRouter) //sin service ni controller
router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)
router.use('/api/messages', messageRouter) //sin service ni controller
router.use('/api/sessions', sessionsRouter) //sin service ni controller
router.use('/api/users', usersRouter)
router.use('/api/tickets', checkSession, ticketsRouter)

export default router