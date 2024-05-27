const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION_URL,{
  // useNewUrlParser: true,
  // useCreateIndex:true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
}
)
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to database successfully");
});
