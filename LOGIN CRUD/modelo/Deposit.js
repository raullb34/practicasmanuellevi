const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const depositSchema = new Schema({
    depositId:{type: String, unique: true},
    fromTank:[{type: String, ref: "depositId"}],
    fromCask: [{type: String, ref: "depositId"}],
    fillDate: Date,
    emptyDate: Date,
});

module.exports = mongoose.model('Deposit', depositSchema);