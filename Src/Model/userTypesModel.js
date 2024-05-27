const mongoose = require('mongoose');

const userTypeSchema = mongoose.Schema({
    name:{type:String, required:true},
    statusId:{type:mongoose.Schema.Types.ObjectId,ref:'statuses'},

},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })


module.exports = mongoose.model('user_types',userTypeSchema);