const mongoose = require("mongoose");
const workoutCategoryModel = require("../../Model/workoutCategoryModel");
const workoutSubCategoryModel = require("../../Model/workoutSubCategoryModel");

const getWorkoutCategoryData = async (workoutCategoryName, statusId) => {
  try {
    const WorkoutCategoryData = await workoutCategoryModel.aggregate([
      {
        $match: {
          name: workoutCategoryName,
          statusId: new mongoose.Types.ObjectId(statusId),
        },
      },
      {
        $lookup: {
          from: "workout_sub_categories",
          let: { ref_id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$workoutCategoryId", "$$ref_id"],
                },
              },
            },

            { $project: { name: 1 } },
          ],
          as: "workoutSubCategories",
        },
      },
      {
        $unwind: "$workoutSubCategories",
      },
      {
        $project: {
          workoutSubCategories: 1,
          name: 1,
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          workout_sub_categories: { $push: "$workoutSubCategories" },
        },
      },
    ]);

    return WorkoutCategoryData[0];
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = {
  getWorkoutCategoryData,
};
