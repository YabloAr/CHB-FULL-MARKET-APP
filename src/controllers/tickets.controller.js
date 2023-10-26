import ticketsService from "../service/tickets.service.js"

class TicketsController {
    getAll = async (req, res) => {
        try {
            const response = await ticketsService.getAll()
            res.send(response)
        } catch (error) {
            throw error
        }
    }

    createTicket = async (req, res) => {
        try {
            const cid = req.params.cid
            const user = req.session.user
            if (user.cartId !== cid) return { error: 'Cart Id and cid doesnt match' };

            const response = await ticketsService.createTicket(user, cid)
            res.status(200).send(response)

        } catch (error) {
            throw error
        }
    }
}

export default new TicketsController()