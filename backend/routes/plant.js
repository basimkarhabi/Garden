const router = require('express').Router();
const Plant = require('../models/Plant');
const multer = require('multer');
const auth = require('../middleware/auth.js');
// settings for multer
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'public/images')
    },
    filename: function(req, file, callback) {
        callback(null, Date.now() +'_'+ file.originalname)
    }
});
const upload = multer({storage});

// add one plant to DB working 100% 
router.post('/add' ,auth, upload.single('plantPic'),(req, res)=>{
   
    // data from frontend UI
    const newPlant = new Plant({
        name: req.body.name,
        plantPic: '/images/'+ req.file.filename,
        // todo: this id should come from session or user login or req.body
        added_by: req.user._id
    })
    newPlant.save((err, doc)=>{
        res.json('A new Plant has been added!')
    })
});


// find all plants using async await function
router.get('/allPlants' , async (req , res) => {
    const allPlants = await Plant.find().populate('added_by').select('-password').sort({_id: -1});
    if(!allPlants){
        return res.status(400).json({ msg : 'No plant was added'})
    }
    console.log(allPlants)
    res.status(200).json(allPlants)


})

// find all plants
router.get('/all', (req, res)=>{
    Plant.find((err, plants)=>{
        res.json(plants)
    }).populate('added_by').select('-password').sort({_id: -1}).limit(5)
    // req.body.searchName = 'tomatoes'
    // find all plants name tomatoes
    // Plant.find((err, plants)=>{
    //         res.json(plants)
    //     })
    //     .where('name')
    //     .equals('Tomatoes')
})
// find one plant by id
router.get('/detail/:id', (req, res)=>{
    Plant.findById(req.params.id, (err, doc)=>{
        res.json(doc)
    }).populate('added_by');
})
// update one plant data
router.post('/update', (req, res)=>{
    console.log(req.body)
    Plant.findByIdAndUpdate(req.body.id, req.body, (err, doc)=>{
       res.json('Plant Data just updated!')
    })
})
// delete one plant by id
router.get('/delete/:id', (req, res)=>{
    Plant.findByIdAndDelete(req.params.id, (err, doc)=>{
        res.json('One plant data has been deleted!')
    })
})

module.exports = router;