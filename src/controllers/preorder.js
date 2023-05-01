//const { plainToClass } = require("class-transformer");
const preorderModel = require("../models/preorder");
const { getStoreName } = require("../models/user");
const { ResPreorderFormDTO, ReqPreorderDTO } = require("../dto/preorder");

const getPreorderForm = async (req, res) => {
  const  userId  = req.params.userId;
  try {
    
    const storeName = await getStoreName(userId);
    const products = await preorderModel.getAllProducts(userId);
 
    let preorderForm = new ResPreorderFormDTO(storeName, products);
    preorderForm.validate();
    preorderForm = preorderForm.toLowerCamelCase();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).json({ preorderForm: preorderForm, message: "success"});
  } catch (err) {
    console.error("\n********** Get preorder from Error in preorder controller **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

const createPreorder = async (req, res) => {
  const userId = req.body.userId;
  const preorderForm = req.body.preorderForm;

  try{
    const preorderDTO = new ReqPreorderDTO(userId, preorderForm);
    preorderDTO.validate();
    const preorderSQL = preorderDTO.toSQL();
    await preorderModel.createPreorder(preorderSQL.preorder, preorderSQL.products);
    res.status(200).json({preorderId: preorderDTO.preorderId, message: "success"});
  } catch (err) {
    console.error("\n********** create preorder Error in preorder controller **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};




module.exports = { getPreorderForm , createPreorder};
