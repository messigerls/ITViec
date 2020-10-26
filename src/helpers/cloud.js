const cloudinary = require('cloudinary');
const uuid = require('uuid');

function uploadFile(filePath) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(filePath, (err, data) => {
            if(err) return reject(err);
            resolve(data);
        })
    })
}

module.exports = { uploadFile }