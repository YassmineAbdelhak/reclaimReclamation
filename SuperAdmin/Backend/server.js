const express = require("express")
//const jwt = require('jsonwebtoken');
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')
//routes
const loginuser = require("./routes/loginuser")
const signupuser = require("./routes/signupuser")
const loginEmployee = require("./routes/loginEmployee")
const registeremployee = require("./routes/registeremployee")
const sendReclamation = require("./routes/sendReclamation")
const manageDepartements = require("./routes/manageDepartements")
const manageEscalation = require("./routes/manageEscalation")
const escaStuff = require("./routes/escaStuff")
const CronJob = require ("./models/EscalationSys")
// const CronJob = require('cron').CronJob

//connect to db
connectDB()

//mdleware
app.use(cors())
app.use(express.json({extended: true}))
app.use(morgan('dev'))
app.use('/uploads/', express.static('uploads'))

//user routers
app.use("/loginuser", loginuser)
app.use("/signupuser", signupuser)
app.use("/loginEmployee", loginEmployee)
app.use("/registeremployee", registeremployee)
app.use("/sendReclamation", sendReclamation)
app.use("/manageDepartements", manageDepartements)
app.use("/manageEscalation", manageEscalation)
app.use("/escastuff", escaStuff)


app.use((req, res, next) => {
    const error = new Error('Not found')
    console.log(error)
    error.status = 404
    next(error)
})
 
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })
})

 //CronJob.job.start()
// var job=new CronJob (
//     "* * * * * *",
//      () => {
      
        
//     },
//     {
//       scheduled: false
//     }
//   );
//CronJob.job()
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));