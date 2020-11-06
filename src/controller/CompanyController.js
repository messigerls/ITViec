const Review = require("../models/review");
const TechCompany = require("../models/techcompany");
const Company = require("../models/company");

class CompanyController {
    index = (req, res) => {
        res.render("guest/company", {
            user: req.session.user,
        });
    };
    getCompanyById = (req, res) => {
        
        const id = req.params.id;
        const review = new Promise((resolve, reject) => {
            Review.getReviewByCompanyId(id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
        const techCompany = new Promise((resolve, reject) => {
            TechCompany.getTechByCompanyId(id, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
        const company = new Promise((resolve, reject) => {
            Company.getCompanyInfoById(id, (err, result) => {
                if (err) {
                    reject(err);
                } else resolve(result);
            });
        });
        Promise.all([review, techCompany, company])
        
            .then((result) => {
                console.log(result)
                res.render('guest/company', {
                    user: req.session.user,
                    reviewData: result[0][0],
                    techCompanyData: result[1],
                    companyData: result[2][0],
                })
                
            })
            .catch((err) => res.status(500).json({ error }));
    };
}

module.exports = new CompanyController();
