export function checkSession(req, res, next) {
    req.session.user ?
        next() : res.redirect('/login')
}

export function checkAdmin(req, res, next) {
    req.session.user.role === "admin" ?
        next() : res.status(401).send({ error: 'Not authorized for users' })
}

export function checkUser(req, res, next) {
    req.session.user.role === "user" ?
        next() : res.status(401).send({ error: 'Not authorized for admins' })
}


// middleware->entra al AbortController

// const user = monmgofind

// if(user.role === 'admin'){
//     return null

// } else {
//     if(user.role === 'user') {
//         user.role = 'premium'
//         const response = await mongodb.findUpdate({_id: user._id, role: user.role})
//         return response
//     } else {
//         user.role = 'user'
//         const response = await mongodb.findUpdate({_id: user._id, role: user.role})
//         return response
//     }
//     }