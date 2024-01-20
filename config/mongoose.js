// require .env
require('dotenv').config()

// require mongoose
const mongoose = require('mongoose');

exports.connectMonggose =()=>{
    mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
  .then((e)=>console.log("Connected to Mongodb =>> Habit Tracker"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));
}