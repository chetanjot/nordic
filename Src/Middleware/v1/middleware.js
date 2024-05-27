const jwt = require("jsonwebtoken");
module.exports.createAccessToken = async (data) => {
 return  jwt.sign(
    {
      id: data._id,
      email: data.email,
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};
