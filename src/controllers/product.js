const { plainToClass } = require("class-transformer");
const productModel = require("../models/product");
const { ProductDTO } = require("../dto/product");

const getProductList = async (req, res) => {
  try {
    const rows = await productModel.getAll();
    if (rows.length === 0) {
      res.status(500).json({ message: "找不到任何商品" });
      return;
    }
    const products = [];
    rows.forEach((row) => {
      const product = {
        productId: row.product_id,
        productName: row.product_name,
        productType: row.type_name,
        productPrice: row.product_price
      };
      products.push(product);
    });
    res.status(200).json({ productList: products });
  } catch (err) {
    console.error("\n************* Get Product List Error ************\n", err);
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
    const productIsExist = await productModel.isExistByNameSpec(
      productName,
      productSpec
    );
    if (productIsExist) {
      res.status(409).json({ message: "商品已存在" });
      return;
    }
    const productDTO = plainToClass(ProductDTO, product);
    await productDTO.validate();
    const productSQL = await productDTO.toSQL();
    const result = await productModel.create(productSQL);
    if (result.affectedRows === 1) {
      res.status(200).json({ message: "成功新增商品" });
    } else {
      res.status(409).json({ message: "新增商品失敗" });
    }
  } catch (err) {
    console.error("\n*************** Create Product Error***********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const { userId } = req.middleware;
  const { productId } = req.params;
  try {
    const productIsExist = await productModel.isExistById(productId, userId);
    if (!productIsExist) {
      res.status(409).json({ message: "商品不存在" });
      return;
    }
    const result = await productModel.remove(userId, productId);
    if (result.affectedRows === 1) {
      res.status(200).json({ message: "成功刪除商品" });
    } else {
      res.status(409).json({ message: "刪除商品失敗" });
    }
  } catch (err) {
    console.error("\n********** Delete Product Error **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  const { userId } = req.middleware;
  const { productId } = req.params;
  const { productName, productType, productPrice, productSpec } = req.body;
  const product = {
    productId: productId,
    userId: userId,
    productType: productType,
    productName: productName,
    productPrice: productPrice,
    productSpec: productSpec,
  };
  try {
    const productIdIsExist = await productModel.isExistById(productId, userId);
    if (!productIdIsExist) {
      res.status(409).json({ message: "商品不存在" });
      return;
    }
    const productNameSpecIsExist = await productModel.isExistByNameSpec(productName, productSpec, productId);
    if (productNameSpecIsExist) {
      res.status(409).json({ message: "商品名稱及Spec已存在" });
      return;
    } 
    const productDTO = plainToClass(ProductDTO, product);
    await productDTO.validate();
    const productSQL = await productDTO.toSQL();
    const result = await productModel.update(productSQL);
    if (result.affectedRows === 1) {
      res.status(200).json({ message: "成功更新商品" });
    } else {
      res.status(409).json({ message: "更新商品失敗" });
    }
  } catch (err) {
    console.error("\n************ Update Product Error **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = { getProductList, createProduct, deleteProduct, updateProduct };