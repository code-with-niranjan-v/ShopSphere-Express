import { generateToken } from "../config/generateToken.js";
import UserModel from "../models/UserModel.js";
import crypto from "node:crypto";
class UserController {
    registerUser(req, res) {
        try {
            let requestBody = req.body
            let getPassword = crypto.createHash("md5").update(requestBody.password).digest("hex");
            let userData = {
                name: requestBody.name,
                email: requestBody.email,
                address: requestBody.address,
                password: getPassword
            }
            UserModel.insertUser(userData)
            res.send({ status: "Success" })
        } catch (e) {
            res.send({ status: "Failed", error: e })
        }
    }

    async login(req, res) {
        try {
            let requestBody = req.body
            let getPassword = crypto.createHash("md5").update(requestBody.password).digest("hex");
            let userData = {
                email: requestBody.email,
                password: getPassword
            }
            let user = await UserModel.findByQueries(userData)
            if (user) {
                let token = generateToken(user)
                res.send({ status: "Success", token: token, uid: user._id })
                console.log(user)
            } else {
                res.send({ status: "Failed", message: "User Not Found" })
            }
        } catch (e) {
            res.send({ status: "Failed", message: e.message })
        }

    }
}

export default new UserController();