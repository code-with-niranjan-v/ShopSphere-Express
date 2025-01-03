import mongoose from "mongoose";
function databaseConnect() {
    try {
        mongoose.connect(process.env.MONGODB_URI)
            .then(() => console.log('MongoDB Connected!'));

    } catch (e) {
        console.log(e);
    }
}

export { databaseConnect };