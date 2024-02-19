const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const immg=require('./uploaded');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }


}

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


//user model
const User = require('../models/User')
const Form = require('../models/Form')
const { populate } = require('../models/User')
const Escalation = require('../models/Escalation')
const Departements = require('../models/Departements')





router.post('/signupuser',
    [
        check('f_name', 'Please provide your first name').not().isEmpty(),
        check('l_name', 'Please provide your last name').not().isEmpty(),
        check('email', 'Please provide a valid email').isEmail(),
        check('password', 'Please provide 6 character long password').isLength({ min: 6 })
    ],
    async(req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
        const { f_name, l_name, gender, email, password } = req.body
        const _id  = mongoose.Types.ObjectId()
        try {
            let user = await User.findOne({email})
            if (user) {
                return res.status(400).json({msg: 'user already exists'})
            }
            user = new User({
               _id,
               f_name, 
               l_name,
               gender,
               email,
               password
            })
            const salt = await bcrypt.genSalt(10)
            user.password =  await bcrypt.hash(password, salt)

            await user.save()

            const playload = {
                user:{
                    id: user.id,
                    email: user.email
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
    })

    router.get('/allReclamation/:id', async(req, res, next) =>{
       
        /* 
        .exec()
        .then(user => {
            console.log(user.reclamation)
            res.status(200).json(user.reclamation)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })  */
        const reclamation = await Form.find();
        const user = await User.findById(req.params.id).populate('reclamation')
    var tab = [];
    for (var i = 0; i < reclamation.length; i++) {
      var recGet = reclamation[i];
      var departement = await Departements.findOne({
        _id: recGet.departement
      }); 
      var d_danger = await Escalation.findOne({
        _id: recGet.d_danger
      });
      var recSend = {
        _id: recGet._id,
        adresse: recGet.adresse,
        description: recGet.description,
        problemImage: recGet.problemImage, 
        d_danger: {
            reclamation_ddanger: d_danger.reclamation_ddanger,
            timer: d_danger.timer,
            _id: d_danger._id
          } ,
        departement:  {
            departement_name: departement.departement_name,
            _id: departement._id
          }, 
        user: {
            email: user.email,
            _id: user._id
          }
        };
        tab.push(recSend);
      }
    
      res.status(200).json(tab);
    })
    router.post('/upload',[upload.single('image'),immg.uploadFile ]);
     router.post('/addReclamation/:id', upload.single('problemImage'),
    [
        check('adresse', 'Please provide your adresse ').not().isEmpty(),
        check('description', 'Please provide a description').not().isEmpty()
    ],
    async (req, res) => {

        //get the user we need
        const utilisateur = await User.findById(req.params.id).select("-password")
        
        //create a new reclamation
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
        try {
            const form = new Form({
                _id: mongoose.Types.ObjectId(),
                d_danger: req.body.d_danger,
                adresse: req.body.adresse,
                description: req.body.description,
                departement: req.body.departement,
                problemImage: req.file.filename,
                position: req.body.position,
                user: utilisateur
            })
            
             //assign the reclamation to the user
            Form.user= utilisateur
            
            console.log(Form.departement)
            //save the reclamation
            await form.populate('user').save()
            //add the reclamation to the user array
            utilisateur.reclamation.push(form)
            
            //save the user
            await utilisateur.populate('reclamation').save()
            res.json(form)
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error')

        }
    })

module.exports = router