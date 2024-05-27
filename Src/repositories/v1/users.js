const userModel = require("../../Model/usersModel");
const statusModel = require("../../Model/statusModel");
const userTypesModel = require("../../Model/userTypesModel");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const createNewUser = async (data) => {
  const userData = await userModel.create(data);

  return userData;
};

const getStatuses = async (status) => {
  const activeStatus = await statusModel.findOne({
    name: status,
  });
  return activeStatus;
};
const getUserTypes = async (usersType, statusId) => {
  const usersTypeData = await userTypesModel.findOne({
    statusId,
    name: usersType,
  });

  return usersTypeData;
};

const getExitingUser = async (email, statusId) => {
  const userData = await userModel.findOne({
    email,
    statusId,
  });
  return userData;
};
const getUser = async (email, statusId,userTypeId) => {
  const userData = await userModel.findOne({
    email,
    statusId,
    userTypeId
  });
  return userData;
};

const getUsersData = async (page, pageSize, projection, search) => {
  const skip = (page - 1) * pageSize;

  const usersData = await userModel
    .find(search)
    .select(projection)
    .populate("userTypeId statusId")
    .limit(pageSize)
    .skip(skip);

  return usersData;
};

const getUserdata = async (_id, projection) => {
  const userData = await userModel
    .findById(_id)
    .select(projection)
    .populate("userTypeId statusId");
  return userData;
};

const updateUserData = async (_id, updateData) => {
  const updatedUser = await userModel.findByIdAndUpdate(
    { _id },
     updateData ,
    { new: true }
  );
  return updatedUser;
};
module.exports = {
  getStatuses,
  createNewUser,
  getUserTypes,
  getExitingUser,
  getUsersData,
  getUserdata,
  updateUserData,
  getUser
};
