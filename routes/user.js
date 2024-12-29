import express from 'express';
import UserModel from '../models/UserModel.js';
import crypto from "node:crypto";
import multer from 'multer';
import { generateFileName, uploadFile } from '../config/UploadFile.js';
import ProductModel from '../models/ProductModel.js';
const router = express.Router();

router.post("/loginUser", (req, res) => {
    res.send("Hello")
})

router.post("/registerUser", (req, res) => {

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
})

const upload = multer({ storage: uploadFile() })

router.use("/uploadFile", upload.single("image"), (req, res) => {
    try {
        let requestData = req.body;
        let productData = {
            productName: requestData.productName,
            productDescription: requestData.productDescription,
            productPrice: requestData.productPrice,
            productImageName: req.file.filename
        }
        ProductModel.insertProduct(productData)
        res.send({ status: "Success" })
    } catch (e) {
        res.send({ status: "Failed" })
    }
})

router.post("/getAllProducts", async (req, res) => {
    const products = await ProductModel.findAll()
    try {
        if (!products.length) {
            return res.status(404).send({ status: "Failed", message: "No products found" });

        }
        res.send({ status: "Success", products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send({ status: "Failed", error: error.message });
    }
})

export default router;