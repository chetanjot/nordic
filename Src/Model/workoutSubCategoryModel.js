const mongoose = require('mongoose');
const workoutSubCategorySchema = mongoose.Schema({
    name:{type:String, required:true},
    statusId: { type: mongoose.Schema.Types.ObjectId, ref: "statuses" },
    workoutCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "workout_categories" },
    

},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports= mongoose.model('workout_sub_categories',workoutSubCategorySchema)