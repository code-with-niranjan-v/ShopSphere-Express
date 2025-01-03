import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
    {
        uid: String,
        productIds: [String],
    }
)

const cartModel = mongoose.model("Carts", cartSchema)

class CartModel {

    constructor() {
        this.model = cartModel;
    }

    async insertCart(cartData) {
        try {
            const result = await this.model.findOneAndUpdate(
                { uid: cartData.uid },
                cartData,
                { new: true, upsert: true }
            );
            return result;
        } catch (error) {
            throw new Error("Error inserting or replacing cart: " + error.message);
        }
    }

    async findById(id) {
        const uid = new mongoose.Types.ObjectId(id)
        return await this.findByQueries({ uid: uid });
    }

    async findByQueries(queries) {
        return await this.model.findOne(queries);
    }
    async findsByQueries(queries, sortBy = 'desc') {
        return await this.model.find(queries).sort({ _id: (sortBy == 'desc') ? -1 : 1 })
    }

}

export default new CartModel();