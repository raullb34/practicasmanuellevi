const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deposit = require('./Deposit');

const tankSchema = new Schema({
    tankId:{type: String, unique: true},
    fromParcel: String,
    deposit:{type: Schema.ObjectId, ref: "Deposit"}
});

module.exports = mongoose.model('Tank', tankSchema);