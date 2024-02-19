const router = require('express').Router()
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator')

//escalation model
const Escalation = require('../models/Escalation.js')


router.get("/", (req, res, next) => {
    Escalation.find()
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


router.post('/',
    [
        check('reclamation_ddanger', 'Please provide reclamation danger degree ').not().isEmpty(),
        check('timer', 'Please provide a timer').not().isEmpty(),
        check('timer', 'Please provide a valid timer').isNumeric()
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
        const { reclamation_ddanger, timer } = req.body
        const _id  = mongoose.Types.ObjectId()
        try {
            let pp = await Escalation.findOne({ reclamation_ddanger })
            if (pp) {
                return res.status(400).json({ msg: 'reclamation type already exists' })
            }
            let mm = await Escalation.findOne({ timer })
            if (mm) {
                return res.status(400).json({ msg: 'each reclamation type has its own timer' })
            }
            escalation = new Escalation({
                _id,
                reclamation_ddanger,
                timer
            })

            await escalation.save()
            res.json({ escalation })


        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error')

        }
    })

router.patch("/:id", (req, res, next) => {
    Escalation.findById(req.params.id)
        .then(esca => {
            esca.reclamation_ddanger = req.body.reclamation_ddanger
            esca.timer = req.body.timer
            esca.save()
                .then(() => res.json('property updated!'))
                .catch(err => res.status(400).json({ msg: 'invalid danger degree or timer' }))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

router.get("/:id", (req, res, next) => {
    const id = req.params.id;
    Escalation.findById(id)
        .exec()
        .then(doc => res.json(doc))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
})

router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    Escalation.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'reclamation type deleted'
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router