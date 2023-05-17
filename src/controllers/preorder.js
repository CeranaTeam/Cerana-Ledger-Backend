//const { plainToClass } = require("class-transformer");
const preorderModel = require("../models/preorder");
const { getStoreName } = require("../models/user");
const { ResPreorderFormDTO, ReqPreorderDTO, ResPreorderDTO, ResPreorderProductsDTO } = require("../dto/preorder");

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

const getPreorders = async (req, res) => {
  const userId = req.middleware.userId;
  
  try{
    let preorders = await preorderModel.getPreorders(userId);
    //console.log(preorders);
    const resPreorderDTO = new ResPreorderDTO(preorders);

    preorders = resPreorderDTO.toLowerCamelCase();
    
    for(let i = 0; i < preorders.length; i++){
      let preorder = preorders[i];
      let preorderProducts = await preorderModel.getPreorderProducts(preorder.preorderId);
      //console.log(preorderProducts)
      const resPreorderProductsDTO = new ResPreorderProductsDTO(preorderProducts);
      
      preorder.preorderProducts = resPreorderProductsDTO.toLowerCamelCase();
      //console.log(preorder.preorderProducts)
    }
    
    res.status(200).json({preorders:preorders, message:"success"});
  }
  catch(err){
    console.error("\n********** get Preorders Error in getPreorder controller **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
  

};

const completePreorder = async (req, res) => {
  
  const preorderId = req.params.preorderId;
  try{
    let result = await preorderModel.completePreorder(preorderId);
    res.status(200).json({result: result, message:"success"});
    return;
  }
  catch(err){
    console.error("\n********** head complete preorders Error in completePreorder controller **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
    return;
  }
  
 
};

const rejectPreorder = async (req, res) => {
  const preorderId = req.params.preorderId;
  try{
    let result = await preorderModel.rejectPreorder(preorderId);
    res.status(200).json({result:result, message: "success"});
    return;
  }
  catch(err){
    console.error("\n********** head reject preorders Error in rejectPreorder controller **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
    return;
  }
 
  
};


module.exports = { getPreorderForm , createPreorder, getPreorders, completePreorder, rejectPreorder};
