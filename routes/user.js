import express from 'express';
import UserModel from '../models/UserModel.js';
import crypto from "node:crypto";
import multer from 'multer';
import { generateFileName, uploadFile } from '../config/UploadFile.js';
import ProductModel from '../models/ProductModel.js';
import UserController from '../controllers/UserController.js';
import { tokenAuthentication } from '../config/tokenAuthentication.js';
const router = express.Router();

router.post("/loginUser", (req, res) => {
    UserController.login(req, res)
})

router.post("/registerUser", (req, res) => {

    UserController.registerUser(req, res)

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

router.post("/getAllProducts", tokenAuthentication, async (req, res) => {
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

router.post("/search", async (req, res) => {
    try {
        let productName = req.body.productName
        const productData = await ProductModel.searchProduct(
            productName
        )
        res.send({ status: "Success", products: productData })
    } catch (e) {
        res.send({ status: "Failed", Error: e.message })
    }
})

export default router;