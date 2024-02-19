const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

//createEmployee model
const CreateEmployee = require('../models/CreateEmployee')
const Departements = require('../models/Departements')

router.get("/allemployees", async (req, res, next) => {
    var employers = await CreateEmployee.find();
    var boss = await CreateEmployee.find();
    var tab = [];
    for (var i = 0; i < employers.length; i++) {
        var employerGet = employers[i];
        var bossObject = {}
        if (employerGet.boss != undefined) {
            var boss = await CreateEmployee.findOne({ _id: employerGet.boss });
            if (boss != undefined) {
                bossObject = { username: boss.username, id: boss._id }
                console.log(bossObject)
            }
        }
        var departement = await Departements.findOne({
            _id: employerGet.departement
        });
        var employerSend = {
            id: employerGet._id,
            f_name: employerGet.f_name,
            l_name: employerGet.l_name,
            username: employerGet.username,
            email: employerGet.email,
            role: employerGet.role,
            gender: employerGet.gender,
            position: employerGet.position,
            boss: { username: boss.username, id: boss._id },
            departement: {
                departement_name: departement.departement_name,
                id: departement._id
            }
        };
        tab.push(employerSend);
    }

    res.status(200).json(tab);
})



router.post('/loginemployee',
    [
        check('username', 'Please provide a valid username').exists(),
        check('password', 'Please provide a password').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
        const { username, password } = req.body
         let user = await CreateEmployee.findOne({ username })
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credential' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credential' })
        }
        try {
            let user = await CreateEmployee.findOne({username})
            if (!user) {
                return res.status(400).json({msg: 'Invalid credential'})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({msg: 'Invalid credential'})
            }

            const playload = {
                user:{
                    id: user.id,
                    username: user.username,
                    departement: user.departement,
                    position: user.position
                }
            }
            jwt.sign(playload, process.env.SECRET, {
                expiresIn:31556926
            }, 
            (err,token) => {
                if (err) throw err
                res.json({token})
            })

        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error')
            
        } 
        /*if (req.body.type == "admin" && req.body.password == "123456789") {
            const token = jwt.sign({
                type: "ADMIN",
                user: {
                    username: process.env.ADMIN_USERNAME,
                    id: user.id,
                    departement: user.departement
                },
            },
                process.env.SECRET,
                {
                    expiresIn: "1h"
                }
            );
            return res.status(200).json({
                message: 'Auth successful',
                token: token
            });
        }
        else if (req.body.username == process.env.ADMIN_USERNAME && req.body.password != process.env.ADMIN_PASSWORD) {
            return res.status(401).json({
                message: 'Wrong Password'
            });
        }
        else {
            CreateEmployee.find({ username: req.body.username })
                .then(user => {
                    if (user.length < 1) {
                        return res.status(401).json({
                            message: 'User not found'
                        });
                    }
                    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                        if (err) {
                            return res.status(401).json({
                                message: 'Auth failed'
                            });
                        }
                        if (result) {
                            const token = jwt.sign({
                                type: "EMPLOYEE",
                                user: {
                                    username: user.username,
                                    id: user.id,
                                    departement: user.departement
                                },
                            },
                                process.env.SECRET,
                                {
                                    expiresIn: "1h"
                                }
                            );
                            return res.status(200).json({
                                message: 'Auth successful',
                                token: token
                            });
                        }
                        return res.status(401).json({
                            message: 'Wrong Password'
                        });
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: errors
                    });
                }); */
        }
          
        
   )

module.exports = router
 /* if(req.body.username==process.env.ADMIN_USERNAME && req.body.password==process.env.ADMIN_PASSWORD){
           const token = jwt.sign({
               type: "ADMIN",
               data:{
                   username: process.env.ADMIN_USERNAME
               },
           },
           process.env.JWT_KEY,
           {
               expiresIn: "1h"
           }
           );
           return res.status(200).json({
               message:'Auth successful',
               token: token
           });
       }
       else if(req.body.username==process.env.ADMIN_USERNAME && req.body.password!=process.env.ADMIN_PASSWORD){
           return res.status(401).json({
               message: 'Wrong Password'
           });
       }
       else{
           CreateEmployee.find({username: req.body.username})
           .then(user => {
               if(user.length < 1) {
                   return res.status(401).json({
                       message: 'User not found'
                   });
               }
               bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                   if(err){
                       return res.status(401).json({
                           message: 'Auth failed'
                       });
                   }
                   if(result){
                       const token = jwt.sign({
                           username: user[0].username,
                           id: user[0]._id
                       },
                       process.env.JWT_KEY,
                       {
                           expiresIn: "1h"
                       }
                       );
                       return res.status(200).json({
                           message:'Auth successful',
                           token: token
                       });
                   }
                   return res.status(401).json({
                       message: 'Wrong Password'
                   });
               })
           })
           .catch(err => {
               console.log(err);
               res.status(500).json({
                   error: errors
               });
           });
       }  */
       /*
       User.find({username: 'super.admin'})
          if (req.body.username=='super.admin' && req.body.password=='123456789') {
        const payload = {username: 'super.admin'};
        const token = jwt.sign({
            type: "ADMIN",
            user: {
                
                                    username: user.username,
                                    id: user.id,
                                    departement: user.departement
            },
        },  
        process.env.SECRET,
        {
            expiresIn: "1h"
        }
        );
        return res.status(200).json({token: token});
    }
    else if (req.body.username=='super.admin' && req.body.password!='123456789'){
        return res.status(401).json({
                message: 'Wrong Password'
            });
    }
    else{
    User.find({username: req.body.username})
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'User not found'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            if(result) {
                const token = jwt.sign({
                    type: "user",
                    user: {
                                                            username: user.username,
                                    id: user.id,
                                    departement: user.departement
                    },
                },  
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                }
                );
                return res.status(200).json({token: token});
            }
            return res.status(401).json({
                message: 'Wrong Password'
            });
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}
}; */