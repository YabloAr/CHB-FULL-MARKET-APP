import mailer from 'nodemailer'
import envConfig from '../config/env.config.js'

class MailingService {
    constructor() {
        //definimos el cliente y el transport como constructor
        this.client = mailer.createTransport({
            service: envConfig.mailing.SERVICE,
            port: 587, //puerto de envio seguro, recomendado
            auth: {
                // user: envConfig.mailing.USER,
                // pass: envConfig.mailing.PASSWORD
                user: "yabloprograma@gmail.com",
                pass: envConfig.mailing.PASSWORD
            }
        })
    }

    async sendSimpleMail({ from, to, subject, html, attachments: [] }) {
        let result = await this.client.sendMail({ from, to, subject, html, attachments })
        return result
    }


    //----------------ejemplo attachments
    // attachments: [{
    //     filename: 'prueba.png',
    //     path: process.cwd() + '/public/prueba.png',
    //     cid: 'prueba1'
    // }]

    resetPassword = async (email, resetLink) => {
        try {
            const mailOptions = {
                from: envConfig.mailing.USER,
                to: email,
                subject: 'Password Reset',
                html: `<p>You requested to reset your password. Click the following link to reset it:</p>
                <a href="${resetLink}">Click here to renew your Oath to the Rhino Realm</a>`,
            }

            let result = await this.client.sendMail(mailOptions);
            return result;

        } catch (error) {
            throw error
        }
    }
}


export default new MailingService()