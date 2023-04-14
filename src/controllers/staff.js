const { plainToClass } = require("class-transformer");
const staffModel = require("../models/staff");
const { StaffDTO } = require("../dto/staff");

const getStaffList = async (req, res) => {
  const { userId } = req.middleware;
  try {
    const rows = await staffModel.getAll(userId);
    if (rows.length === 0) {
      res.status(409).json({ message: "找不到任何員工" });
      return;
    }
    const staffs = [];
    rows.forEach((row) => {
      const staff = {
        staffId: row.staff_id,
        staffName: row.staff_name,
        staffPhoneNumber: row.staff_phone_number,
        staffEmail: row.staff_email,
      };
      staffs.push(staff);
    });

    res.status(200).json({ staffList: staffs });
  } catch (err) {
    console.error("\n********** Get Staff List Error **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

const createStaff = async (req, res) => {
  const { userId } = req.middleware;
  const { staffName, staffPhoneNumber, staffEmail } = req.body;
  const staff = {
    userId: userId,
    staffName: staffName,
    staffPhoneNumber: staffPhoneNumber,
    staffEmail: staffEmail,
  };
  try {
    const staffIsExist = await staffModel.isExist(userId, null, staffName);
    if (staffIsExist) {
      res.status(409).json({ message: "員工名稱已存在" });
      return;
    }
    const staffDTO = plainToClass(StaffDTO, staff);
    await staffDTO.validate();
    const staffSQL = staffDTO.toSQL();
    const result = await staffModel.create(staffSQL);
    if (result.affectedRows === 1) {
      res.status(200).json({ message: "成功新增員工" });
    } else {
      res.status(409).json({ message: "新增員工失敗" });
    }
  } catch (err) {
    console.error("\n********** Create Staff Error **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

const updateStaff = async (req, res) => {
  const { userId } = req.middleware;
  const { staffId, staffName, staffPhoneNumber, staffEmail } = req.body;
  const staff = {
    userId: userId,
    staffId: staffId,
    staffName: staffName,
    staffPhoneNumber: staffPhoneNumber,
    staffEmail: staffEmail,
  };
  try {
    const staffIsExist = await staffModel.isExist(userId, staffId, staffName);
    if (!staffIsExist) {
      res.status(409).json({ message: "員工不存在" });
      return;
    }
    const staffNameIsExist = await staffModel.isExistName(
      userId,
      staffId,
      staffName
    );
    if (staffNameIsExist) {
      res.status(409).json({ message: "員工名稱已存在" });
      return;
    }
    const staffDTO = plainToClass(StaffDTO, staff);
    await staffDTO.validate();
    const staffSQL = staffDTO.toSQL();
    const result = await staffModel.update(staffSQL);
    if (result.affectedRows === 1) {
      res.status(200).json({ message: "成功更新員工" });
    } else {
      res.status(409).json({ message: "更新員工失敗" });
    }
  } catch (err) {
    console.error("\n********** Update Staff Error **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

const deleteStaff = async (req, res) => {
  const { userId } = req.middleware;
  const { staffId } = req.body;
  try {
    const staffIsExist = await staffModel.isExist(userId, staffId);
    if (!staffIsExist) {
      res.status(409).json({ message: "員工不存在" });
      return;
    }
    const result = await staffModel.remove(userId, staffId);
    if (result.affectedRows === 1) {
      res.status(200).json({ message: "成功刪除員工" });
    } else {
      res.status(409).json({ message: "刪除員工失敗" });
    }
  } catch (err) {
    console.error("\n********** Delete Staff Error **********\n", err);
    res.status(err.status || 500).json({ message: err.message });
  }
};

module.exports = {
  getStaffList,
  createStaff,
  updateStaff,
  deleteStaff,
};
