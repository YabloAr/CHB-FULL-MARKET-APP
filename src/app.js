//CODERHOUSE BACKEND 43360
//Alumno: Mellyid Salomón

//DEPENDENCIAS
import envConfig from './config/env.config.js';
import express from "express"
import { __src } from "./utils/utils.js";
import handlebars from "express-handlebars";
import appRouter from "./routes/app.router.js";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import { initPassport } from "./config/passport.config.js";
import setupSocket from "./chat/socket.js";
import cors from 'cors'
import compression from "express-compression";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import addLogger from './middlewares/logger.middleware.js';


//-----------------Comienzo configuracion de la app

//EXPRESS - Definimos el servidor y su config
const PORT = envConfig.server.PORT
const app = express()
app.use(cors())
const httpserver = app.listen(PORT, () => console.log("Server up."))

//JSON REQUEST - Agregamos el middleware de parseo de las request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//MONGO - Habilitamos conexion a nuestra db
mongoose.set('strictQuery', false) //corrige error de deprecacion del sistema
const connection = mongoose.connect(envConfig.mongo.URL,
    { useNewUrlParser: true, useUnifiedTopology: true }) //añadi estos dos parametros por docs de mongoose, evita futura deprecacion.

//SESSIONS - Indicamos el uso de sessions y su config
app.use(session({
    store: MongoStore.create({
        mongoUrl: envConfig.mongo.URL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 5000
    }),
    secret: envConfig.sessions.SECRET,
    resave: true,
    // saveUninitialized: al estar en falso, durante la vida de la session, si esta session file no cambia, no se guarda.
    //Para este proyecto, no nos interesa guardar sesiones sin registrar en la db.
    saveUninitialized: false
}))

//ROUTER con Brotli- Manejador de rutas de toda el servidor
app.use(compression({ brotli: { enabled: true, zlib: {} } })); //Config de uso global para brotli
app.use("/", appRouter)

//HANDLEBARS - Indicamos el uso de handlebars
app.engine('handlebars', handlebars.engine()) //habilitamos el uso del motor de plantillas en el servidor.
app.set('views', __src + '/views') //declaramos la carpeta con las vistas para las plantillas.
app.set('view engine', 'handlebars') //le decimos a express que use el motor de vistas de handlebars.
app.use(express.static(__src + '/public')) //estaba en socket

//PASSPORT - Indicamos el uso de passport
initPassport()
app.use(passport.initialize())
app.use(passport.session())

//LOGGER - Indicamos el uso del logger
app.use(addLogger)

//SOCKET IO - Instanciamos el socket en nuestro server
setupSocket(httpserver)

//---------------final del inicio de App

//SWAGGER Documentacion de API

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce API Doc',
            description: 'Here you can find my API documentation.',
            version: '1.0.0',
            contact: {
                name: 'Mellyid Salomon (Yablo)',
                url: 'https://www.linkedin.com/in/mellyid-salomon-873042113/',
            }
        }
    },
    apis: [`${__src}/docs/*.yaml`]
}

const swaggerSpecs = swaggerJSDoc(swaggerOptions)
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpecs))

//---------------final swagger doc