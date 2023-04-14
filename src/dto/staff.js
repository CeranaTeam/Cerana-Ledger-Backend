const { isNotEmpty } = require("../utils/validator");
const { HttpError } = require("../utils/httpError");
const { v4: uuidv4 } = require("uuid");

class StaffDTO {
  constructor(userId, staffName, staffPhoneNumber, staffEmail) {
    this.userId = userId;
    this.staffId = uuidv4();
    this.staffName = staffName;
    this.staffPhoneNumber = staffPhoneNumber;
    this.staffEmail = staffEmail;
  }

  toSQL() {
    return {
      staff_id: this.staffId,
      user_id: this.userId,
      staff_name: this.staffName,
      staff_phone_number: this.staffPhoneNumber,
      staff_email: this.staffEmail,
    };
  }

  async validate() {
    if (!isNotEmpty(this.staffId)) throw new HttpError("麻煩提供 staffId", 409);
    if (!isNotEmpty(this.userId)) throw new HttpError("麻煩提供 userId", 409);
    if (!isNotEmpty(this.staffName))
      throw new HttpError("麻煩提供 staffName", 409);
  }
}

module.exports = { StaffDTO };
