import ticketsModel from './../schemas/tickets.schema.js';

class TicketsDAO {
    constructor() {
    }

    getAll = async () => {
        try {
            const response = await ticketsModel.find().lean()
            return response
        } catch (error) {
            throw error
        }
    }

    createTicket = async (ticket) => {
        try {
            const response = await ticketsModel.create(ticket)
            return { status: 200, message: `Ticket created.`, payload: response }
        } catch (error) {
            throw error;
        }
    }
}

export default new TicketsDAO
