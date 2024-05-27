const { validate } = require("../../helper/v1/validator");
const {
  getStatuses,
  getUserTypes,
  getUser,
  getExitingUser,
} = require("../../repositories/v1/users");
const { statuses, usersTypes } = require("../../helper/v1/users");
const { comparePassword } = require("../../helper/v1/hashing");
const { createAccessToken } = require("../../Middleware/v1/middleware");

const loginUser = async (req, res) => {
  try {
    /*validations*/
    const validations = {
      email: "required",
      password: "required",
    };
    const { data, status } = await validate(req.body, validations);

    if (!status) {
      return res
        .status(422)
        .json({ status: 1, message: "validation error", data });
    }
    const {
      body: { email, password, type },
    } = req;
    let userToVerify;
    /*Get active statusId*/
    const { _id: activeStatusId } = await getStatuses(statuses.active);
    const adminData = await getUserTypes(usersTypes.admin, activeStatusId);
    if (type === usersTypes.admin) {
      userToVerify = await getUser(email, activeStatusId, adminData._id);
    } else {
      const userData = await getUserTypes(usersTypes.user, activeStatusId);
      /*Find  user exists*/
      userToVerify = await getExitingUser(email, activeStatusId);
    }
    /*if user not found*/
    if (!userToVerify) {
      return res.status(401).json({
        status: 1,
        message: "User not found",
        data: null,
      });
    }

    /*Compare user password*/
    const userPassword = await comparePassword(password, userToVerify.password);
    if (!userPassword) {
      return res.status(401).json({
        status: 1,
        message: "Invalid password",
        data: null,
      });
    } else {
      const { _id, email } = userToVerify;
      const tokenData = { _id, email };

      const accessToken = await createAccessToken(tokenData);

      return res.status(200).json({
        status: 1,
        message: "User login successfully",
        data: { accessToken },
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 0, message: "Some thing went wrong", data: null });
  }
};

module.exports = {
  loginUser,
};
