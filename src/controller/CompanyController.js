
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
        Promise.all([ techCompany, company])
        
            .then((result) => {
                console.log(result)
                res.render('guest/company', {
                    user: req.session.user,
                    
                    techCompanyData: result[0],
                    companyData: result[1][0],
                })
                
            })
            .catch((err) => res.status(500).json({ error }));
    };
}

module.exports = new CompanyController();
