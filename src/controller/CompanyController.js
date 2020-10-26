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
        console.log(req.params.id);
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
            Company.getCompanyById(id, (err, result) => {
                if (err) {
                    reject(err);
                } else resolve(result);
            });
        });
        Promise.all([review, techCompany, company])
            .then((result) => {
                res.json({
                    reviewData: result[0],
                    techCompanyData: result[1],
                    companyData: result[2]
                })
            })
            .catch((err) => res.status(500).json({ error }));
    };
}

module.exports = new CompanyController();
