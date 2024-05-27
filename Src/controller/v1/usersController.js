const { validate } = require("../../helper/v1/validator");
const { statuses, usersTypes } = require("../../helper/v1/users");
const { getSignedUrlFromS3 } = require("../../helper/v1/aws");
const {
  getStatuses,
  createNewUser,
  getUserTypes,
  getExitingUser,
  getUsersData,
  getUserdata,
  updateUserData,
} = require("../../repositories/v1/users");
const { imageUploadToS3 } = require("../../helper/v1/aws");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const addUsers = async (req, res) => {
  try {
    const validations = {
      name: "required|maxLength:100",
      email: "required|email|maxLength:255",
      password: "required|minLength:8|maxLength:45",
      age: "required",
      gender: "required",
    };
    const { data, status } = await validate(req.body, validations);

    if (!status) {
      return res
        .status(422)
        .json({ status: 1, message: "validation error", data });
    }

    const { _id: statusId } = await getStatuses(statuses.active);

    const { _id: userTypeId } = await getUserTypes(usersTypes.user, statusId);

    const { name, email, password, address, age, gender, mobile } = req.body;

    const existingUser = await getExitingUser(email, statusId);

    if (existingUser) {
      return res.status(400).json({
        status: 1,
        message: "Please use another email address",
        data: null,
      });
    }
    let hashPassword = await bcrypt.hash(password, saltRounds);
    let profileImageLocation = "";

    if (req.files) {
      const imageLocation = await imageUploadToS3(
        req.files.image,
        process.env.AWS_S3_USERS_PHOTOS_FOLDER_NAME
      );

      if (imageLocation) {
        profileImageLocation = imageLocation.Key;
      } else {
        return res.status(400).json({
          status: 1,
          message: "Some thing went wrong during upload image",
          data: null,
        });
      }
    }
    const userData = {
      name,
      email:email.toLowerCase(),
      password: hashPassword,
      address: address || "",
      age: parseInt(age),
      gender,
      mobile: mobile || "",
      statusId,
      userTypeId,
      imageLocation: profileImageLocation,
    };

    const createdUser = await createNewUser(userData);

    if (!createdUser) {
      return res
        .status(400)
        .json({ status: 1, message: "Some thing went wrong", data: null });
    }
    return res.status(200).json({
      status: 1,
      message: "User created successfully",
      data: {},
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 0, message: "Some thing went wrong", data: null });
  }
};
const getUsers = async (req, res) => {
  try {
    const validations = {
      page: "required",
      pageSize: "required",
    };
    const { data, status } = await validate(req.query, validations);

    if (!status) {
      return res
        .status(422)
        .json({ status: 1, message: "validation error", data });
    }
    const {
      query: { page, pageSize, searchFilter },
    } = req;

    let search = {};
    if (searchFilter) {
      search.$or = [
        { name: { $regex: new RegExp(searchFilter), $options: "i" } },
        { email: { $regex: new RegExp(searchFilter), $options: "i" } },
      ];
    }

    const projection = {
      name: 1,
      email: 1,
      address: 1,
      age: 1,
      gender: 1,
      statusId: 1,
      userTypeId: 1,
    };

    const usersdata = await getUsersData(page, pageSize, projection, search);
    if (usersdata.length) {
      return res.status(200).json({
        status: 1,
        message: "Users data found successfully",
        data: { page, pageSize, count: usersdata.length, usersdata },
      });
    }
    return res.status(200).json({
      status: 1,
      message: " Data not found",
      data: {},
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 0, message: "Some thing went wrong", data: null });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const projection = {
      name: 1,
      email: 1,
      address: 1,
      age: 1,
      gender: 1,
      statusId: 1,
      userTypeId: 1,
      imageLocation:1
    };
    let userData = await getUserdata(id, projection);
    if (userData) {
      if(userData?.imageLocation){
        userData.imageLocation = await getSignedUrlFromS3(userData.imageLocation);
      }
      return res.status(200).json({
        status: 1,
        message: "User data found successfully",
        data: userData,
      });
    }
    return res.status(200).json({
      status: 1,
      message: " Data not found",
      data: {},
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 0, message: "Some thing went wrong", data: null });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: inActiveStatusId } = await getStatuses(statuses.inActive);

    const updateData = {
      statusId:inActiveStatusId
    }

    const deletedUser = await updateUserData(id, updateData);

    if (deletedUser) {
      return res.status(200).json({
        status: 1,
        message: "User deleted successfully",
        data: {},
      });
    }
    return res.status(200).json({
      status: 1,
      message: " Data not found",
      data: {},
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 0, message: "Some thing went wrong", data: null });
  }
};

module.exports = {
  addUsers,
  getUsers,
  getUser,
  deleteUser,
};
