const Account = require("../models/account");
const Candidate = require('../models/candidate');
const Company = require('../models/company')
const bcrypt = require('bcrypt');
const { default: Axios } = require("axios");

class RegisterController {
    getRegister(req, res) {
        res.render('guest/register', {
            user : req.session.user,
            message:''
        })
    }

    postRegister = async(req, res) => {
        const body = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        let accountId = null;
        const lastId = await Axios.get('http://localhost:3000/api/account/accountIdLast')
                                    .then(result => accountId = result.data.id + 1)
                                    .catch(err => console.log(err))

        body.password = hashedPassword;
        
        new Promise((resolve, reject) => {
            console.log(accountId)
            Account.getAllUsernameAndPasswordByUsername(body.username, (err, data) => {
                if(err) reject(err)
                if(data.length){
                    res.render('guest/register', {
                        message: "Ten dang nhap da duoc dang ky",
                        user: req.session.user
                    })
                }
                console.log(body)
                if(body.role == 1){
                    Account.insertAccount(accountId, body, (err, data) => {
                        if(err) reject(err)
                        
                        Candidate.insertCandidateByAccountId(accountId, body.name, (err, result) => {
                            if(err) reject(err);
                            resolve();
                        });
                        
                    })
                }
                if(body.role == 2){
                    Account.insertAccount(accountId, body, (err, data) => {
                        if(err) reject(err)
                        
                        Company.insertCompanyByAccountId(accountId, body.name, (err, result) => {
                            if(err) reject(err);
                            resolve();
                        })
                        
                    })
                }
                
            })
        }).then(result => {
            res.redirect( '/login');
        }).catch(err => res.status(500).json({ err: err }))
        
    }
}

module.exports = new RegisterController();