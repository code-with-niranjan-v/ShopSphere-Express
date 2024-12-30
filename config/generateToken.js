import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../KEYS.js";
function generateToken(user) {
    return jwt.sign({ email: user.email, name: user.name, address: user.address }, SECRET_KEY)
}

export { generateToken }