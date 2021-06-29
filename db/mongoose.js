const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@cluster0.02vkl.mongodb.net/covid-tracker-api", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})