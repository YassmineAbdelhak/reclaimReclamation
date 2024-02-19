const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const mongoose = require('mongoose')
//departement model
const Departements = require('../models/Departements')
const CreateEmployee = require('../models/CreateEmployee')

router.get("/allDepartements", (req, res, next) => {
    Departements.find()
    .populate('boss')
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
})


router.post('/addDepartement',
    [
        check('departement_name', 'Please provide a departement name').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
        const {departement_name, boss } = req.body
        const _id  = mongoose.Types.ObjectId()
        try {
            let dep = await Departements.findOne({ departement_name })
            if (dep) {
                return res.status(400).json({ msg: 'departement already exists' })
            }
            const departements = new Departements ({
                _id,
                departement_name,
                boss
            })

            await departements.save()
            res.json({ departements })
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error')

        }
    })

    router.patch("/:id",(req, res, next) => {
        Departements.findById(req.params.id)
            .then(dep => {
                dep.departement_name = req.body.departement_name
                dep.boss=req.body.boss
                dep.save()
                    .then(() => res.json('departement updated!'))
                    .catch(err => res.status(400).json({ msg: 'invalid username or email' }))
            })
            .catch(err => res.status(400).json('Error: ' + err))
    })

    router.delete("/:id", (req, res, next) => {
        const id = req.params.id;
        Departements.remove({ _id: id })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Departement deleted'
                });
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            })
    })

    router.get("/:id", (req, res, next) => {
        const id = req.params.id;
        Departements.findById(id)
        .populate('boss','email')
            .exec()
            .then(doc => res.json(doc))
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            })
    })

   

    

module.exports = router