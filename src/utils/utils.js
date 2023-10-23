//Paso Uno, crear utils
import envConfig from "../config/env.config.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from "multer";

//--------------------------[PROJECT DIRECTORIES]

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
export const __src = dirname(__dirname)


//--------------------------[PASSWORD VALIDATION]

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);


//--------------------------[GENERATE NEW CODE] - Genera un codigo random para el productDTO y el ticketDTO

export const generateNewCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomCode = '';
    for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomCode += characters[randomIndex];
    }
    return randomCode
}


//--------------------------[JSON WEB TOKEN]  - 18.08

const KEY = envConfig.sessions.JWT_KEY

export const generateToken = (user) => {
    const token = jwt.sign({ user }, KEY, { expiresIn: '1h' })
    return token //contiene solamente un string encryptado.
}
export const authToken = (req, res, next) => {
    const headerAuth = req.headers
    console.log(req.headers.authorization)
    console.log('utils authToken headerAuth is:')
    console.log(headerAuth)
    if (!headerAuth) return res.status(401).send({ status: 'error', error: 'Not Autorized' })
    //Aplicamos split porque viene como 'Bearer {id}', con el split en el espacio queda solo el string id.
    const token = headerAuth.split(' ')[1]

    jwt.verify(token, KEY, (error, credentials) => {
        console.log(error)
        if (error) return res.status(401).send({ status: 'error', error: 'Not autorized second check.' })
        req.user = credentials.user
        next()
    })
}
export const recoveryPassToken = (req, res, next) => {
    const token = req.params.token

    jwt.verify(token, KEY, (err, decoded) => {
        if (err) {
            // Token is either invalid or expired
            return res.status(401).send('Invalid or expired token');
        }

        // Token is valid, and you can access its contents in the `decoded` object
        const userEmail = decoded.userEmail;
        const currentPassword = decoded.currentPassword;

        // Check the token's expiration
        const currentTimestamp = Math.floor(Date.now() / 1000); // Get the current time in seconds
        if (decoded.exp <= currentTimestamp) {
            // Token has expired
            return res.status(401).send('Token has expired');
        }

        // Token is valid, and it hasn't expired
        // You can attach the token data to the request for later use if needed
        req.tokenData = { userEmail, currentPassword };
        next(); // Proceed to the next middleware or route handler
    });
}


//--------------------------[MULTER: FILE MANAGER FOR USERS]

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __src + '/public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

export const uploader = multer({ storage: storage })

export const userUpload = uploader.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'adress', maxCount: 1 },
    { name: 'account', maxCount: 1 }
])