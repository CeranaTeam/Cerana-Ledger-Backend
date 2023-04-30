//const { plainToClass } = require("class-transformer");
const preorderModel = require("../models/preorder");
const { getStoreName } = require("../models/user");
const { resPreorderFormDTO } = require("../dto/preorder");

const getPreorderForm = async (req, res) => {
  const  userId  = req.params.userId;
  try {
    
    const storeName = await getStoreName(userId);
    const products = await preorderModel.getAllProducts(userId);
 
    let preorderForm = new resPreorderFormDTO(storeName, products);
    preorderForm.validate();
    preorderForm = preorderForm.toLowerCamelCase();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).json({ preorderForm: preorderForm, message: "success"});
  } catch (err) {
    console.error("\n********** Get preorder from Error in prreorder controller **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};




module.exports = { getPreorderForm };
