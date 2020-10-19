const Account = require("../models/account");
const bcrypt = require('bcrypt');
class RegisterController {
    getRegister(req, res) {
        res.render('guest/register')
    }

    postRegister = async(req, res) => {
        const body = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        // Account.getAllUsernameAndPasswordByUsername(body.username, (err, result) => {
        //     if(result.length){
        //         res.render('guest/register', {message: "Ten dang nhap da duoc dang ky"})
        //     }
        // })
        body.password = hashedPassword;
        Account.insertAccount(body, (err, result) => {
            if(err) return res.status(500).send({ err });
            res.redirect(301, '/login');
        })
    }
}

module.exports = new RegisterController();