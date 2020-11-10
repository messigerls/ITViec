const Account = require("../models/account");
const bcrypt = require("bcrypt");
const Company = require('../models/company')
const Candidate = require('../models/candidate')
class LoginController {
    getLogin(req, res) {
        res.render("guest/login", {
            user: req.session.user,
            userMessage: ''
        });
    }

    postLogin = (req, res) => {
        const body = req.body;
        Account.getUserByUserName(body.username, async (err, result) => {
            
            if (err) return res.status(500).send({ err });

            if (!result.length)
                
                res.render("guest/login", {
                    user: req.session.user,
                    userMessage: 'Không tìm thấy tên đăng nhập'
                });
            const comparePassword = await bcrypt.compare(
                body.password,
                result[0].password
            );
            if (!comparePassword)
                res.render("guest/login", {
                    user: req.session.user,
                    userMessage: 'Bạn đã nhập sai tên đăng nhập hoặc mật khẩu'
                });
                
            new Promise((resolve, reject) => {
                if(result[0].role === 2){
                    Company.getCompanyIdByAccountId(result[0].id, (err, data) => {
                        if(err) reject(err)
                        resolve(data[0].company_id)
                    })
                }
                if(result[0].role === 1){
                    Candidate.getCandidateIdByAccountId(result[0].id, (err, data) => {
                        if(err) reject(err);
                        console.log(data)
                        resolve(data[0].candidate_id);
                    })
                }
            }).then(id => {
                const candidateId = result[0].role === 1 ? id : null;
                const companyId = result[0].role === 2 ? id : null;
                req.session.user = { 
                    role: result[0].role, 
                    userId: result[0].id,
                    candidateId,
                    companyId,
                };
                console.log(req.session.user)
                res.redirect(301, "/");
            }).catch(err => res.status(500).json({ err }))
            
        })
        
    };
}

module.exports = new LoginController();
