import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js'
import { databaseConnect } from './config/databaseConnect.js';
const app = express();
databaseConnect()

app.use(cors())
app.use(bodyParser.urlencoded({ extented: false }))
app.use(bodyParser.json())
app.use("/uploads", express.static("uploads"));
app.use("/user", userRoutes)

const port = 4000;
app.listen(port, () => {
    console.log("Listenting on Port 4000")
})