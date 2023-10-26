import { generateNewCode } from "../../utils/utils.js"

export default class TicketDTO {
    constructor(totalPrice, purchaser) {
        this.code = generateNewCode()
        this.amount = totalPrice
        this.purchaser = purchaser
    }
}

