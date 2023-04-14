const { plainToClass } = require("class-transformer");
const discountModel = require("../models/discount");
const { DiscountDTO } = require("../dto/discount");

const getDiscountList = async (req, res) => {
  const { userId } = req.middleware;
  try {
    const rows = await discountModel.getAll(userId);
    if (rows.length === 0) {
      res.status(409).json({ message: "找不到任何折扣" });
      return;
    }
    const discounts = [];
    rows.forEach((row) => {
      const discount = {
        discountId: row.discount_id,
        discountName: row.discount_name,
        discountValue: row.discount_value,
        discountNote: row.discount_note,
      };
      discounts.push(discount);
    });

    res.status(200).json({ discountList: discounts });
  } catch (err) {
    console.error("\n********** Get Discount List Error **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

const createDiscount = async (req, res) => {
  const { userId } = req.middleware;
  const { discountName, discountValue, discountNote } = req.body;
  const discount = {
    userId: userId,
    discountName: discountName,
    discountValue: discountValue,
    discountNote: discountNote,
  };
  try {
    const discountIsExist = await discountModel.isExist(
      userId,
      null,
      discountName
    );
    if (discountIsExist) {
      res.status(409).json({ message: "折扣已存在" });
      return;
    }
    const discountDTO = plainToClass(DiscountDTO, discount);
    await discountDTO.validate();
    const discountSQL = discountDTO.toSQL();
    const result = await discountModel.create(discountSQL);
    if (result.affectedRows === 1) {
      res.status(200).json({ message: "成功新增折扣" });
    } else {
      res.status(409).json({ message: "新增折扣失敗" });
    }
  } catch (err) {
    console.error("\n********** Create Discount Error **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

const deleteDiscount = async (req, res) => {
  const { userId } = req.middleware;
  const { discountId } = req.body;
  try {
    const discountIsExist = await discountModel.isExist(userId, discountId);
    if (!discountIsExist) {
      res.status(409).json({ message: "折扣不存在" });
      return;
    }
    const result = await discountModel.remove(userId, discountId);
    if (result.affectedRows === 1) {
      res.status(200).json({ message: "成功刪除折扣" });
    } else {
      res.status(409).json({ message: "刪除折扣失敗" });
    }
  } catch (err) {
    console.error("\n********** Delete Discount Error **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = { getDiscountList, createDiscount, deleteDiscount };
