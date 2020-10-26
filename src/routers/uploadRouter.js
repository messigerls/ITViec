const router = require('express').Router();
const cloudinary = require('cloudinary');

router.post('/', (req, res) => {
    console.log(req.body.name)
    cloudinary.v2.uploader.upload(req.body.fileName, { tags: 'basic_sample' }, (err, data) => {
        
        if (err) res.status(500).json({err})
        res.send(data)
    })
})


module.exports = router;