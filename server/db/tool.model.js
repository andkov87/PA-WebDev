const mongoose = require("mongoose");

const { Schema } = mongoose;

const EquipmentSchema = new Schema({
    name: String,
    type: String,
    amount: String,
    
});

module.exports = mongoose.model("Equipment", EquipmentSchema);
