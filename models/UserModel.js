
import mongoose from "mongoose";

const user = mongoose.Schema(
    {
        name: String,
        email: String,
        address: String,
        password: String
    }

)

const userModel = mongoose.model("Users", user)

class UserModel {
    constructor() {
        this.model = userModel
    }

    async insertUser(userData) {
        return this.model.create(userData)
    }

    async findByQueries(queries) {
        return await this.model.findOne(queries);
    }
    async findsByQueries(queries, sortBy = 'desc') {
        return await this.model.find(queries).sort({ _id: (sortBy == 'desc') ? -1 : 1 })
    }
}

export default new UserModel();