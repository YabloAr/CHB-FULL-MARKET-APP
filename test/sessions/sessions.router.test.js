import mongoose from "mongoose";
import { expect } from "chai";
import { dropUsers, connectTestDatabase, disconnectTestDatabase } from "../utils/setup.test.js";
import supertest from "supertest";

const requester = supertest("http://localhost:8080");

describe("Session router test case", async function () {

    //------error, no me conecta a esta db, nose porque, asique todos los test seran de peticiones inofensivas, porlas dudas.
    // before(async () => {
    //     const mongoTestURL = 'mongodb+srv://Yablo:qGz*785_c.Yfwcf@cluster0.hiwmxr5.mongodb.net/ecommerceTest?retryWrites=true&w=majority'
    //     await mongoose.connect(mongoTestURL,
    //         { useNewUrlParser: true, useUnifiedTopology: true })
    // })

    it("[GET] /api/users - obtener usuarios", async function () {
        const { _body, ok, statusCode } = await requester.get('/api/users')
        expect(statusCode).to.be.equal(200)
    })

    it("[POST] /api/session/login - loguear un usuario exitosamente", async function () {
        const mockUserCredentials = {
            email: "testo@mailo.com",
            password: "test",
        };
        const response = await requester
            .post("/api/sessions/login")
            .send(mockUserCredentials);

        const cookieHeader = response.headers["set-cookie"][0];
        expect(cookieHeader).to.be.ok;
    });

    // after(async () => {
    //     await mongoose.connection.close()
    // })
});
