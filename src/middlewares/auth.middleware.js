import jwt from "jsonwebtoken"

export const isAuth = (req, res, next) => {
    // const token = req.cookies.token
    let token = req.headers.authorization

    token = token.split(' ')[1]

    if (!token) return res.status(401).json({ message: "No estas autorizado" })


    jwt.verify(token, "bplmcfc10", (err, decoded) => {
        if (err) return res.status(401).json({ message: "No estas autorizado" })

        req.userId = decoded.id

        next()
    })
}