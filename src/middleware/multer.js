const multer = require('multer');

const multerImg = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => { // filFilter nó sẽ kiểm soát việc file nào nên tải lên và file nào không 
        if (!file.mimetype.match(/jpe|jpeg|png|gif/)) { // Nếu không đúng loại file ảnh thì sẽ không cho upload file và ngược lại 
            cb(new Error('File is not supported'), false)
            return
        }
        cb(null, true)
    }
})

const multerPdf = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => { // filFilter nó sẽ kiểm soát việc file nào nên tải lên và file nào không 
        if (!file.mimetype.match(/pdf|word|doc/)) { // Nếu không đúng loại file pdf, word thì sẽ không cho upload file và ngược lại 
            cb(new Error('File is not supported'), false)
            return
        }
        cb(null, true)
    }
})

module.exports = {
    multerImg,
    multerPdf
}