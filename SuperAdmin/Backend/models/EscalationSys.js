//kol reclamation tousel w tetbadel position min "not seen" lil "working on" ysir hatha il kol
const sendReclamation = require('../routes/sendReclamation')
const manageEscalation = require('../routes/manageEscalation')
const Form = require('./Form')
const Escalation = require('./Escalation')
const Departements = require('./Departements')
var moment = require('moment');
const nodemailer = require("nodemailer");
const CreateEmployee = require('./CreateEmployee');
const mongoose = require('mongoose')
const CronJob = require('cron').CronJob

module.exports = {
  job: () => {
    var cj = new CronJob(
      "* * * * * *",
      async () => {
        // console.log("fakher")
        var esca = await Escalation.find();
        var reclamation = await Form.find({ position: "Not Treated Yet" });
        //console.log(reclamation)
        var tab = [];
        for (var i = 0; i < reclamation.length; i++) {
          var reclamationGet = reclamation[i];
          var date1 = moment(reclamationGet.dateCreated)
          console.log("daaaate1", date1)
          var date2 = moment()
          differenceInMs = date2.diff(date1);
          console.log("=============", differenceInMs)
          var d_danger = await Escalation.findOne({
            _id: reclamationGet.d_danger
          });
          var reclaSend = {
            d_danger: {
              timer: d_danger.timer,
              id: d_danger._id
            }
          };
          var departement = await Departements.findOne({
            _id: reclamationGet.departement
          });
          var reclamationSend = {
            departement: {
              _id: departement._id,
              boss: departement.boss
            }

          };
          var b = reclaSend.d_danger.timer
          console.log("daaateee", b)
          var bb = reclamationSend.departement.boss
          var sp = await CreateEmployee.findOne({
            _id: reclamationSend.departement.boss
          });
          var rd = {
            sp: {
              _id: sp._id,
              email: sp.email
            }

          };
          console.log("BOOSSSSS", bb)
          var firstSuperVisorMail = rd.sp.email
          console.log("EMAAAAAAAAAAAAAAAIL", firstSuperVisorMail)
          if ((differenceInMs > b) && (reclamationGet.sender == null)) {
            console.log("daaaaaaaaaaaaaaaaaaate", differenceInMs)
            // let data=req.body;
            var id = reclamationGet._id
            console.log("IDDDDDDDDDDD",id)
             let smtpTransport = nodemailer.createTransport({

              service: 'gmail',
              gzip: true,
              port: 465,
              secure: true,
              auth: {
                user: process.env.GMAIL_ADMIN,
                pass: process.env.GMAIL_PASS
              },

              tls: {
                rejectUnauthorized: false,
                ciphers: 'SSLv3'
              },
            });


            let mailOptions = {
              from: 'chifcostage@gmail.com',
              to: firstSuperVisorMail,
              subject: `Message from RECLAMATION`,
              html: `
                <h3>Subject: Message from RECLAMATION </h3>
                 <h4>Email: ${firstSuperVisorMail}</h4>
                 <h5>Alert: First Supervisor  </h5> 
                <p>This Reclamation is Timed out 
                http://localhost:3000/updateRec/${id}</p>  
               
               `


            };

            smtpTransport.sendMail(mailOptions, async (error, response) => {

              if (error) {
                // res.send(error)
                console.log(error)
              }
              else {
                // res.send('Success')
                console.log("Successssssssssssssssss")
                reclamationGet.sender = mongoose.Types.ObjectId(bb)
                console.log("------------->NEW SENDER", reclamationGet.sender, reclamationGet._id)
                await Form.updateOne({ _id: mongoose.Types.ObjectId(reclamationGet._id) }, { $set: { sender: mongoose.Types.ObjectId(bb) } })
              }

              smtpTransport.close();
            }) 

          } else if ((differenceInMs > b) && (reclamationGet.sender != null)) {
            
            var id = reclamationGet._id
            console.log("IDDDDDDDDDDD",id)
           do{
              console.log("date2222222222222222", differenceInMs)
              // let data=req.body;
              //search for the boss of the department boss
                var sender = await CreateEmployee.findOne({
                _id: reclamationGet.sender
              });
              var rlSd2 = {
                sender: {
                  boss: sender.boss,
                  id: sender._id
                }
              };
              var SSupervisorSecondlevel = rlSd2.sender.boss
              console.log("BOSSSS 2LEVEEEEEEEEL", SSupervisorSecondlevel)
              var sp2 = await CreateEmployee.findOne({
                _id: rlSd2.sender.boss
              });
              var rd2 = {
                sp2: {
                  _id: sp2._id,
                  email: sp2.email
                }

              };

              var HigherSuperVisorMail = rd2.sp2.email
              console.log("EMAAAAAAAAAAAAAAAIL22222222222", HigherSuperVisorMail)
              let smtpTransport = nodemailer.createTransport({

                service: 'gmail',
                gzip: true,
                port: 465,
                secure: true,
                auth: {
                  user: process.env.GMAIL_ADMIN,
                  pass: process.env.GMAIL_PASS
                },

                tls: {
                  rejectUnauthorized: false,
                  ciphers: 'SSLv3'
                },
              });


              let mailOptions = {
                from: 'chifcostage@gmail.com',
                to: HigherSuperVisorMail,
                subject: `Message from RECLAMATION`,
                html: `
                <h3>Subject: Message from RECLAMATION</h3>
                 <h4>Email: ${HigherSuperVisorMail}</h4>
                 <h4>Dear Yasmine,</h4>
                 <h5>Alert: This Reclamation is Timed out</h5> 
                <p>there is a reclamation that hasn't been checked yet
                http://localhost:3000/updateRec/${id}</p>  
               
               `


              };

              smtpTransport.sendMail(mailOptions, async (error, response) => {

                if (error) {
                  // res.send(error)
                  console.log(error)
                }
                else {
                  // res.send('Success')
                  console.log("Successssssssssssssssss22222222222222222222")
                  reclamationGet.sender = mongoose.Types.ObjectId(bb)
                  console.log("------------->NEW SENDER", reclamationGet.sender, reclamationGet._id)
                  await Form.updateOne({ _id: mongoose.Types.ObjectId(reclamationGet._id) }, { $set: { sender: mongoose.Types.ObjectId(bb) } })
                }

                smtpTransport.close();
              })  
            } while (reclamationGet.sender !='5ef4ac80d79e9e200cd79d33')
          }
        }
      }
      //}


      ,
      {
        scheduled: false
      }
    );
    cj.start()
  }
} 
