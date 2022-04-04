const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deposit = require('./Deposit');

const caskSchema = new Schema({
    caskId:{type: String, unique: true},
    material: String,
    creationDate: Date,
    removeDate: Date,
    deposit:{type: Schema.ObjectId, ref: "Deposit"}
});

module.exports = mongoose.model('Cask', caskSchema);