import { Router } from "express";
import ticketsController from "../controllers/tickets.controller.js";
import { checkAdmin } from '../middlewares/auth.middleware.js'

const router = Router()

//----------------/api/tickets

router.get('/', checkAdmin, ticketsController.getAll)
router.get('/:cid/purchase', ticketsController.createTicket)

export default router