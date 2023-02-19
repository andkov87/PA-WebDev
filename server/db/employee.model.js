// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  present: Boolean,
  created: {
    type: Date,
    default: Date.now,
  },
  height: Number,
});

module.exports = mongoose.model("Employee", EmployeeSchema);
