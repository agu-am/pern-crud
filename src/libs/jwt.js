import jwt from "jsonwebtoken"

export const createAcessToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, "bplmcfc10", { expiresIn: "1d" }, (err, token) => {
            if (err) reject(err)
            resolve(token)
        })
    })
}

