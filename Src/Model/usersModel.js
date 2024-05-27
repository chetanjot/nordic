const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    address:{type:String,default:''},
    age:{type:String},
    gender:{type:String},
    mobile:{type:String,default:''},
    imageLocation:{type:String,default:''},
    statusId:{type:mongoose.Schema.Types.ObjectId,ref:'statuses'},
    userTypeId:{type:mongoose.Schema.Types.ObjectId,ref:'user_types'},

},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })


module.exports = mongoose.model('users',usersSchema);