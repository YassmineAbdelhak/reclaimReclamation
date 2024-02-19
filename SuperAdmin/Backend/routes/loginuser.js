const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

//user model
const User = require('../models/User')



router.get('/allusers',auth, async(req,res)=>{
    User.find().select("-password")
        .exec()
        .then(docs => {
            console.log(docs)
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
/* try {
    const user = await User.findById(req.user.id).select("-password")
    res.json(user)
} catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
} */
})



router.post('/loginuser',
    [
        check('email', 'Please provide a valid email').isEmail(),
        check('password', 'Please provide 6 character long password').exists()
    ],
    async(req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
        const { email, password } = req.body
        try {
            let user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({msg: 'Invalid credential'})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({msg: 'Invalid credential'})
            }

            const playload = {
                user:{
                    id: user.id
                }
            }
            jwt.sign(playload, process.env.SECRET, {
                expiresIn:3600
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

module.exports = router