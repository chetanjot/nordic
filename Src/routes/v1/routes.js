const express = require("express");
const router = express.Router();
const {addUsers,getUsers,getUser,deleteUser}= require("../../controller/v1/usersController")
const {getPrograms,getEquipments,getmuscleGroups,geTrainingGoals,getfocuses}= require("../../controller/v1/workoutCategoryController")
const {loginUser}= require("../../controller/v1/authController")

// Authentication Routes
router.post("/login",loginUser)

/*Add user apis*/
router.post("/signup",addUsers)
router.get("/users",getUsers)
router.get("/users/:id",getUser)
router.delete("/users/:id",deleteUser);

/*workout categories apis*/

router.get("/programs",getPrograms);
router.get("/equipments",getEquipments);
router.get("/muscle-groups",getmuscleGroups);
router.get("/training-goals",geTrainingGoals);
router.get("/focuses",getfocuses);

module.exports = router;