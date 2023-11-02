import envConfig from '../config/env.config.js'
import passport from 'passport'
import local from 'passport-local'
import userModel from '../models/schemas/users.schema.js'
import { isValidPassword } from '../utils/utils.js'
import gitHubService from 'passport-github2'
import UsersDTO from '../models/DTO/user.dto.js'

const LocalStrategy = local.Strategy

passport.use('register', new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
        try {
            const userRegisterData = req.body
            let exists = await userModel.findOne({ email: userRegisterData.email })
            if (exists) {
                return done(null, false) //Retorna null, false. Porque error en si no hay.
            }

            const newUser = await UsersDTO.createUser(userRegisterData)
            let result = await userModel.create(newUser)
            return done(null, result)
        } catch (error) {
            throw error
        }
    }
))

//login strategy
passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (userEmail, password, done) => {
    try {
        const user = await userModel.findOne({ email: userEmail })
        if (!user) {
            return done(null, false)
        }
        if (!isValidPassword(user, password)) return done(null, false)
        user.last_connection = new Date();
        await user.save();

        return done(null, user) //cuando esta info sale de aca, queda guardada en req.user
    } catch (error) {
        return done(error)
    }
}))

//github
passport.use('github', new gitHubService({
    clientID: envConfig.github.CLIENT_ID,
    clientSecret: envConfig.github.CLIENT_SECRET,
    callbackURL: envConfig.github.CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let exists = await userModel.findOne({ email: profile.emails[0].value })
        if (!exists) {
            let userRegisterData = {
                first_name: profile._json.login,
                last_name: '',
                age: '',
                email: profile.emails[0].value,
                password: '',
            }
            const newUser = await UsersDTO.createUser(userRegisterData)
            let result = await userModel.create(newUser)
            done(null, result)
        } else {
            done(null, exists)
        }
    } catch (error) {
        return done(error)
    }
}))



passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id)
    done(null, user)
})

export const initPassport = () => {/*Quedo vacio despues de la sacar la estrategia 'register' de adentro hecha en clase*/ }