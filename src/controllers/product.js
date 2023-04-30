const { plainToClass } = require("class-transformer");
const productModel = require("../models/product");
const { ProductDTO } = require("../dto/product");

const getProductList = async (req, res) => {
    try{
        const rows = await productModel.getAll();
        if (rows.length === 0) {
            res.status(500).json({ message: "找不到任何商品" });
            return;
        }
        const products = [];
        rows.forEach((row) => {
            const product = {
                productID: row.product_id,
                productName: row.product_name,
                productType: row.type_name,
                productPrice: row.product_price
            };
            products.push(product);
        });
        res.status(200).json({productList: products});
    }catch (err) {
        console.error("\n************* Get Product List Error ************\n",err);
        res.status(err.status || 500).json({ message: err.message });
    }
};

const createProduct = async (req, res) => {
    const { userId } = req.middleware;
    const { productName, productType, productPrice, productSpec } = req.body;
    const product = {
        userId: userId,
        productType: productType,
        productName: productName,
        productPrice: productPrice,
        productSpec: productSpec
    };
    try {
        const productIsExist = await productModel.isExist(
            productName,
            productSpec
        );
        if (productIsExist){
            res.status(409).json({ message: "商品已存在" });
            return;
        }
        const productDTO = plainToClass(ProductDTO, product);
        await productDTO.validate();
        // console.log("***after validate***");
        // console.log(productDTO);
        const productSQL = productDTO.toSQL();
        const result = await productModel.create(productSQL);
        if (result.affectedRows === 1){
            res.status(200).json({ message: "成功新增商品"});
        } else {
            res.status(409).json({ message: "新增商品失敗"});
        }
    } catch (err) {
        console.error("\n*************** Create Product Error***********\n", err);
        res.status(err.status || 500).json({ message: err.message });
    }
};

const deleteProduct = async (req, res) => {
    const {userID} = req.middleware;
    //const 
};

module.exports = { getProductList, createProduct, deleteProduct };