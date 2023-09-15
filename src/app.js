//CODERHOUSE BACKEND 43360
//Alumno: Mellyid Salomón

//DEPENDENCIAS
import "dotenv/config";
import express from "express"
import __dirname from "./utils.js";
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

//EXPRESS - Definimos el servidor y su config
const PORT = 8080
const app = express()
app.use(cors())
const httpserver = app.listen(PORT, () => console.log("Server up."))

//JSON REQUEST - Agregamos el middleware de parseo de las request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//MONGO - Habilitamos conexion a nuestra db
mongoose.set('strictQuery', false) //corrige error de deprecacion del sistema
const connection = mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.hiwmxr5.mongodb.net/ecommerce?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }) //añadi estos dos parametros por docs de mongoose, evita futura deprecacion.

//SESSIONS - Indicamos el uso de sessions y su config
app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.hiwmxr5.mongodb.net/ecommerce?retryWrites=true&w=majority`,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 5000
    }),
    secret: process.env.SESSION_SECRET,
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
app.set('views', __dirname + '/views') //declaramos la carpeta con las vistas para las plantillas.
app.set('view engine', 'handlebars') //le decimos a express que use el motor de vistas de handlebars.
app.use(express.static(__dirname + '/public')) //estaba en socket


//PASSPORT - Indicamos el uso de passport
initPassport()
app.use(passport.initialize())
app.use(passport.session())

//SOCKET IO - Instanciamos el socket en nuestro server
setupSocket(httpserver)



