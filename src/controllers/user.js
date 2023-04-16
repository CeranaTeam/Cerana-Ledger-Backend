const { plainToClass } = require("class-transformer");
const userModel = require("../models/user");
const { UserDTO } = require("../dto/user");

const getUserProfile = async (req, res) => {
  const { userId, userEmail } = req.middleware;
  try {
    const rows = await userModel.getById(userId);
    if (rows.length === 0) {
      res.status(409).json({ message: "找不到該個人檔案" });
    } else {
      const userProfile = {
        userId: rows[0].user_id,
        firstName: rows[0].user_first_name,
        lastName: rows[0].user_last_name,
        email: userEmail,
        phoneNumber: rows[0].user_phone_number,
        howToKnowUs: rows[0].user_how_to_know_us,
        createTime: rows[0].user_create_time,
      };
      res.status(200).json({
        userProfile: userProfile,
      });
    }
  } catch (err) {
    console.error("\n********** Get User Profile Error **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

const createUserProfile = async (req, res) => {
  const { userId, userEmail } = req.middleware;
  const { firstName, lastName, phoneNumber, howToKnowUs } = req.body;
  const user = {
    userId: userId,
    firstName: firstName,
    lastName: lastName,
    email: userEmail,
    phoneNumber: phoneNumber,
    howToKnowUs: howToKnowUs,
    createTime: new Date(),
  };
  try {
    const userIsExist = await userModel.isExist(userId);
    if (userIsExist) {
      res.status(409).json({ message: "您已經建立過個人檔案" });
      return;
    }
    const userDTO = plainToClass(UserDTO, user);
    await userDTO.validate();
    const userSQL = userDTO.toSQL();
    const result = await userModel.create(userSQL);
    if (result.affectedRows === 1) {
      res.status(200).json({ message: "成功新增個人檔案" });
    } else {
      res.status(409).json({ message: "新增個人檔案失敗" });
    }
  } catch (err) {
    console.error("\n********** Create User Profile Error **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

const updateUserProfile = async (req, res) => {
  const { userId, userEmail } = req.middleware;
  const { firstName, lastName, phoneNumber, howToKnowUs } = req.body;
  const user = {
    userId: userId,
    firstName: firstName,
    lastName: lastName,
    email: userEmail,
    phoneNumber: phoneNumber,
    howToKnowUs: howToKnowUs,
    createTime: new Date(),
  };
  try {
    const userIsExist = await userModel.isExist(userId);
    if (!userIsExist) {
      res.status(409).json({ message: "您尚未建立個人檔案" });
      return;
    }
    const userDTO = plainToClass(UserDTO, user);
    await userDTO.validate();
    const userSQL = userDTO.toSQL();
    const result = await userModel.update(userId, userSQL);
    if (result.affectedRows === 1) {
      res.status(200).json({ message: "成功更新個人檔案" });
    } else {
      res.status(409).json({ message: "更新個人檔案失敗" });
    }
  } catch (err) {
    console.error("\n********** Update User Profile Error **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = { getUserProfile, createUserProfile, updateUserProfile };
