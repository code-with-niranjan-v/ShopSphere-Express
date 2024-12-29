import mongoose from "mongoose";

const product = mongoose.Schema({
    productName: String,
    productDescription: String,
    productPrice: Number,
    productImageName: String
})

const productModel = mongoose.model("Products", product)

class ProductModel {
    constructor() {
        this.model = productModel;
    }
    async insertProduct(userData) {
        return this.model.create(userData)
    }

    async findByQueries(queries) {
        return await this.model.findOne(queries);
    }
    async findsByQueries(queries, sortBy = 'desc') {
        return await this.model.find(queries).sort({ _id: (sortBy == 'desc') ? -1 : 1 })
    }
    async findAll() {
        return await this.model.find();
    }
}

export default new ProductModel();