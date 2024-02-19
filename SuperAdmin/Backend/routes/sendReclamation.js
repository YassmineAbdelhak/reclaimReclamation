const router = require('express').Router()
const mongoose = require('mongoose')
const { check, validationResult } = require('express-validator')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname);
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
//form model
const Form = require('../models/Form')
const Departements = require('../models/Departements')
const User = require('../models/User')
const Escalation = require('../models/Escalation')


router.get("/allReclamation", async (req, res, next) => {
    let varArray = []
    Form.find().sort({dateCreated: -1})
        .populate('d_danger')
        .populate('user', 'email')
        .populate('departement')
        .populate('employee')
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


router.post('/sendReclamation', upload.single('problemImage'),
    [
        check('d_danger', 'Please provide your first name').not().isEmpty(),
        check('adresse', 'Please provide your last name').not().isEmpty(),
        check('description', 'Please provide a valid email').not().isEmpty()
    ],
    async (req, res) => {
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
                employee: req.body.employee,
            })

            await form.save()
            res.json({ form })
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error')

        }
    })

    router.patch("/userPart/:id", upload.single('problemImage'), (req, res, next) => {
        Form.findById(req.params.id)
            .then(reclamation => {
                reclamation.position = req.body.position
                reclamation.save()
                    .then(() => res.json('reclamation updated!'))
                    .catch(err => res.status(400).json('Error: ' + err))
            })
            .catch(err => res.status(400).json('Error: ' + err))
    })

router.patch("/empPart/:id", upload.single('problemImage'), (req, res, next) => {
    Form.findById(req.params.id)
        .then(reclamation => {
            reclamation.position = req.body.position
            reclamation.employee = req.body.employee
            reclamation.save()
                .then(() => res.json('reclamation updated!'))
                .catch(err => res.status(400).json({ msg: 'invalid Modification' }))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})
router.patch("/empPartWorkingOn/:id", upload.single('problemImage'), (req, res, next) => {
    Form.findById(req.params.id)
        .then(reclamation => {
            reclamation.position = req.body.position
            reclamation.save()
                .then(() => res.json('reclamation updated!'))
                .catch(err => res.status(400).json({ msg: 'invalid Modification' }))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})


router.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    Form.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Reclamation deleted'
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
    const id = req.params.id
    Form.findById(id)
        .populate('d_danger')
        .populate('user', 'email')
        .populate('departement')
        .populate('employee')
        .exec()
        .then(doc => res.json(doc))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
})



module.exports = router