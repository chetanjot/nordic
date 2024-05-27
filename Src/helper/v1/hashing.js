const bcrypt = require('bcrypt')
module.exports.comparePassword = async(password,existingUserPassword)=>{
    return await bcrypt.compare(password,existingUserPassword)

}