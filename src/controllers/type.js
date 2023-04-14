const { plainToClass } = require("class-transformer");
const typeModel = require("../models/type");
const { TypeDTO } = require("../dto/type");

const getTypeList = async (req, res) => {
  const { userId } = req.middleware;
  try {
    const rows = await typeModel.getAll(userId);
    if (rows.length === 0) {
      res.status(409).json({ message: "找不到任何種類" });
      return;
    }
    const types = [];
    rows.forEach((row) => {
      const type = {
        typeId: row.type_id,
        typeName: row.type_name,
      };
      types.push(type);
    });

    res.status(200).json({ typeList: types });
  } catch (err) {
    console.error("\n********** Get Type List Error **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

const createType = async (req, res) => {
  const { userId } = req.middleware;
  const { typeName } = req.body;
  const type = {
    userId: userId,
    typeName: typeName,
  };
  try {
    const typeIsExist = await typeModel.isExist(userId, null, typeName);
    if (typeIsExist) {
      res.status(409).json({ message: "種類已存在" });
      return;
    }
    const typeDTO = plainToClass(TypeDTO, type);
    await typeDTO.validate();
    const typeSQL = typeDTO.toSQL();
    const result = await typeModel.create(typeSQL);
    if (result.affectedRows === 1) {
      res.status(200).json({ message: "成功新增種類" });
    } else {
      res.status(409).json({ message: "新增種類失敗" });
    }
  } catch (err) {
    console.error("\n********** Create Type Error **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

const deleteType = async (req, res) => {
  const { userId } = req.middleware;
  const { typeId } = req.body;
  try {
    const typeIsExist = await typeModel.isExist(userId, typeId);
    if (!typeIsExist) {
      res.status(409).json({ message: "種類不存在" });
      return;
    }
    const result = await typeModel.remove(userId, typeId);
    if (result.affectedRows === 1) {
      res.status(200).json({ message: "成功刪除種類" });
    } else {
      res.status(409).json({ message: "刪除種類失敗" });
    }
  } catch (err) {
    console.error("\n********** Delete Type Error **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = { getTypeList, createType, deleteType };
