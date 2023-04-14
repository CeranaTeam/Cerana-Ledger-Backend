const { isNotEmpty, isEmail, isString } = require("../utils/validator");
const { HttpError } = require("../utils/httpError");

class UserDTO {
  constructor(
    userId,
    firstName,
    lastName,
    email,
    phoneNumber,
    howToKnowUs,
    createTime
  ) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.howToKnowUs = howToKnowUs;
    this.createTime = createTime;
  }

  toSQL() {
    return {
      user_id: this.userId,
      user_first_name: this.firstName,
      user_last_name: this.lastName,
      user_email: this.email,
      user_phone_number: this.phoneNumber,
      user_how_to_know_us: this.howToKnowUs,
      user_create_time: this.createTime,
    };
  }

  async validate() {
    if (!isNotEmpty(this.userId)) throw new HttpError("麻煩提供 userId", 409);
    if (!isNotEmpty(this.firstName))
      throw new HttpError("麻煩提供 firstName", 409);
    if (!isNotEmpty(this.lastName))
      throw new HttpError("麻煩提供 lastName", 409);
    if (!isNotEmpty(this.email)) throw new HttpError("麻煩提供 email", 409);
    if (!isEmail(this.email)) throw new HttpError("email 格式錯誤", 409);
    if (!isNotEmpty(this.phoneNumber))
      throw new HttpError("麻煩提供 phoneNumber", 409);
    if (!isString(this.phoneNumber))
      throw new HttpError("phoneNumber 格式錯誤", 409);
    if (!isNotEmpty(this.howToKnowUs))
      throw new HttpError("麻煩提供 howToKnowUs", 409);
    if (!isNotEmpty(this.createTime))
      throw new HttpError("麻煩提供 createTime", 409);
  }
}

module.exports = { UserDTO };
