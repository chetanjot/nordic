const { getStatuses } = require("../../repositories/v1/users");
const {
  getWorkoutCategoryData,
} = require("../../repositories/v1/workoutCategory");
const { statuses } = require("../../helper/v1/users");
const { workoutCategory } = require("../../helper/v1/workoutCategory");

const getPrograms = async (req, res) => {
  try {
    const { _id: activeStatusId } = await getStatuses(statuses.active);

    const program = workoutCategory.program;
    const programData = await getWorkoutCategoryData(program, activeStatusId);

    if (!programData) {
      return res
        .status(200)
        .json({ status: 1, message: "Data not found", data: null });
    }
    return res
      .status(200)
      .json({ status: 1, message: "Success", data: programData });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 0, message: "Some thing went wrong", data: null });
  }
};

const getEquipments = async (req, res) => {
  try {
    const { _id: activeStatusId } = await getStatuses(statuses.active);

    const equipments = workoutCategory.equipments;
    const equipmentsData = await getWorkoutCategoryData(
      equipments,
      activeStatusId
    );

    if (!equipmentsData) {
      return res
        .status(200)
        .json({ status: 1, message: "Data not found", data: null });
    }
    return res
      .status(200)
      .json({ status: 1, message: "Success", data: equipmentsData });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 0, message: "Some thing went wrong", data: null });
  }
};
const getmuscleGroups = async (req, res) => {
  try {
    const { _id: activeStatusId } = await getStatuses(statuses.active);

    const musclesGroup = workoutCategory.musclesGroup;
    const musclesGroupData = await getWorkoutCategoryData(
      musclesGroup,
      activeStatusId
    );

    if (!musclesGroupData) {
      return res
        .status(200)
        .json({ status: 1, message: "Data not found", data: null });
    }
    return res
      .status(200)
      .json({ status: 1, message: "Success", data: musclesGroupData });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 0, message: "Some thing went wrong", data: null });
  }
};
const geTrainingGoals = async (req, res) => {
  try {
    const { _id: activeStatusId } = await getStatuses(statuses.active);

    const goals = workoutCategory.goals;
    const goalsData = await getWorkoutCategoryData(
      goals,
      activeStatusId
    );

    if (!goalsData) {
      return res
        .status(200)
        .json({ status: 1, message: "Data not found", data: null });
    }
    return res
      .status(200)
      .json({ status: 1, message: "Success", data: goalsData });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 0, message: "Some thing went wrong", data: null });
  }
};

const getfocuses = async(req,res)=>{
  try {
    const { _id: activeStatusId } = await getStatuses(statuses.active);

    const focus = workoutCategory.focus;
    const focusData = await getWorkoutCategoryData(
      focus,
      activeStatusId
    );

    if (!focusData) {
      return res
        .status(200)
        .json({ status: 1, message: "Data not found", data: null });
    }
    return res
      .status(200)
      .json({ status: 1, message: "Success", data: focusData });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 0, message: "Some thing went wrong", data: null });
  }
}

module.exports = {
  getPrograms,
  getEquipments,
  getmuscleGroups,
  geTrainingGoals,
  getfocuses
};
