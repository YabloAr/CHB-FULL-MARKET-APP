import mongoose from "mongoose";
import { expect } from "chai";
import { dropUsers, connectTestDatabase, disconnectTestDatabase } from "../utils/setup.test.js";
import supertest from "supertest";

const requester = supertest("http://localhost:8080");

describe("Session router test case", async function () {

    before(async () => {
        try {
            await mongoose.connect('mongodb+srv://Yablo:qGz*785_c.Yfwcf@cluster0.hiwmxr5.mongodb.net/ecommerceTest?retryWrites=true&w=majority')
        } catch (error) {
            console.error("Failed to connect to the database:", error);
        }
    })

    it("[GET] /api/users - obtener usuarios", async function () {
        const { _body, ok, statusCode } = await requester.get('/api/users')
        console.log(_body)

        expect(statusCode).to.be.equal(200)
    })

    // it("[POST] /api/sessions/register - crear un usuario exitosamente", async function () {

    //     const mockUser = {
    //         first_name: "Firsto",
    //         last_name: "Lasto",
    //         age: "18",
    //         email: "testo@mailo.com",
    //         password: "test",
    //     };

    //     const response = await requester.post("/api/sessions/register").send(mockUser);

    //     expect(response.statusCode).to.be.equal(200);
    // });

    // it("[POST] /api/session/login - loguear un usuario exitosamente", async function () {
    //     const mockUserCredentials = {
    //         email: "lasto@mailo.com",
    //         password: "test",
    //     };
    //     const response = await requester
    //         .post("/api/sessions/login")
    //         .send(mockUserCredentials);

    //     const cookieHeader = response.headers["set-cookie"][0];
    //     // console.log(cookieHeader)
    //     // expect(response.statusCode).to.be.equal(200)
    //     expect(cookieHeader).to.be.ok;
    // });

    after(async () => {
        await mongoose.connection.close()
    })
});
