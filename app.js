require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser")
const fetch = require('node-fetch');
const { json } = require("body-parser");
const mongoose = require("mongoose")
require("./db/mongoose")
const Data = require("./models/data")

const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/",async (req,res) => {
  
  const data = await fetch('https://coronavirus-19-api.herokuapp.com/countries')
  const jsonResponse = await data.json()
  const noOfCases = jsonResponse[2].cases;
  const noOfDeaths = jsonResponse[2].deaths
  const noOfRecoveries = jsonResponse[2].recovered
  const noOfActiveCases = jsonResponse[2].active
  const noOfCasesToday = jsonResponse[2].todayCases
  const noOfDeathsToday = jsonResponse[2].todayDeaths
  
  var currentTime = new Date();
  var currentOffset = currentTime.getTimezoneOffset();
  var ISTOffset = 330;   // IST offset UTC +5:30 
  var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
  // ISTTime now represents the time in IST coordinates
  var hoursIST = ISTTime.getHours()
  var minutesIST = ISTTime.getMinutes()
  var ISTtimeFull = ISTTime.toLocaleTimeString() 



      const dataItem = new Data({
        noOfCases: noOfCases,
        noOfDeaths: noOfDeaths,
        noOfRecoveries: noOfRecoveries,
        noOfActiveCases: noOfActiveCases,
        noOfCasesToday : noOfCasesToday,
        noOfDeathsToday : noOfDeathsToday,
        latestUpdateTime:ISTtimeFull
      }) 
    
      await dataItem.save()

      Data.find({},function(err,foundData){
        if(!err){
          res.render('list',{noOfCases:foundData[foundData.length-1].noOfCases,
                             noOfDeaths:foundData[foundData.length-1].noOfDeaths,
                             noOfRecoveries:foundData[foundData.length-1].noOfRecoveries,
                             noOfActiveCases:foundData[foundData.length-1].noOfActiveCases,
                             noOfCasesToday:foundData[foundData.length-1].noOfCasesToday,
                             noOfDeathsToday:foundData[foundData.length-1].noOfDeathsToday,
                             latestUpdateTime:foundData[foundData.length-1].latestUpdateTime})
        }
      })

})



app.listen(process.env.PORT || 3000,function(req,res){
  console.log("server is up and running")
})