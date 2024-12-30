import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../KEYS.js";
import UserModel from "../models/UserModel.js";
function tokenAuthentication(req, res, next) {
    let requestBody = req.body;
    jwt.verify(requestBody.token, SECRET_KEY, async function (err, decoded) {
        if (err) {
            res.send({ status: "FAILED", message: err.message })
        } else {
            let user = UserModel.findByQueries({ email: decoded["email"], name: decoded["name"], address: ["address"] })
            if (user) {
                next();
            } else {
                res.send({ status: "FAILED", message: "Invalid Token" })
            }
        }
    })
}

export { tokenAuthentication }