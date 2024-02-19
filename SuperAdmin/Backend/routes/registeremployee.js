const router = require('express').Router()
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')



//CreateEmployee model
const Departements = require('../models/Departements')
const CreateEmployee = require('../models/CreateEmployee')
const Form = require('../models/Form')

router.post('/addemployee',
    [
        check('username', 'Please provide employee username').not().isEmpty(), 
        check('password', 'Please provide employee password').not().isEmpty(),
        check('f_name', 'Please provide employee first name').not().isEmpty(),
        check('l_name', 'Please provide employee last name').not().isEmpty(),
        check('role', 'Please provide employee last name').not().isEmpty(),
        check('email', 'Please provide employee email').not().isEmpty(),
        check('email', 'Please provide a valid email').isEmail(),
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
        const { f_name, l_name,  username,  password,email , departement , role ,  boss,position   , gender } = req.body
        const _id  = mongoose.Types.ObjectId()
        try {
            let employee = await CreateEmployee.findOne({ username })
            if (employee) {
                return res.status(400).json({ msg: 'user already exists' })
            }

            createEmployee = new CreateEmployee({
                _id,
                f_name,
                l_name,
                username, 
                password,
                email,
                departement, 
                role,
                boss,
                position,  
                gender
            })
            console.log(username)
            const salt = await bcrypt.genSalt(10)
            createEmployee.password = await bcrypt.hash(password, salt)

            await createEmployee.save()
            const playload = {
                createEmployee: {
                    id: createEmployee.id,
                    username: createEmployee.username,
                    departement: createEmployee.departement,
                    position: createEmployee.position
                }
            }
            jwt.sign(playload, process.env.SECRET, {
                expiresIn: 31556926
            },
                (err, token) => {
                    if (err) throw err
                    res.json({ token })
                })

        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error')

        }
    })




router.get("/:id", (req, res, next) => {
    CreateEmployee.findById(req.params.id)
        .exec()
        .then(doc => res.json(doc))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
})

router.patch("/:id", (req, res, next) => {
    CreateEmployee.findById(req.params.id)
        .then(employee => {
            employee.f_name=req.body.f_name
            employee.l_name=req.body.l_name
            employee.username = req.body.username 
            employee.email = req.body.email 
            employee.departement = req.body.departement 
            employee.role = req.body.role 
            employee.boss = req.body.boss  
            employee.gender=req.body.gender
            employee.position=req.body.position
            employee.save()
                .then(() => res.json('employee updated!'))
                .catch(err => res.status(400).json({ msg: 'invalid username or email' }))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})


router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    CreateEmployee.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'employee deleted'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router