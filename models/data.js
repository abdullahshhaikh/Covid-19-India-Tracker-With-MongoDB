const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema({
 noOfCases: String,
 noOfDeaths: String,
 noOfRecoveries :String,
 noOfActiveCases :String,
 noOfCasesToday :String,
 noOfDeathsToday :String,
 latestUpdateTime: String
})

const Data = mongoose.model('Data',dataSchema)

module.exports = Data;