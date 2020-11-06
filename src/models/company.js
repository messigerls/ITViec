const connection = require("../config/connectDatabase");

class Company {
    getCompanyById(companyId, func){
        const query = `SELECT * FROM company WHERE company_id = ${companyId}`;
        connection.query(query, func);
    }
    getCompanyInfoById(companyId, func){
        const query = `SELECT * FROM company c INNER JOIN province p ON p.province_id = c.province_id WHERE company_id = ${companyId}`;
        connection.query(query, func);
    }
    getCompanyIdByAccountId(accountId, func){
        const query = `SELECT company_id FROM company WHERE account_id = ${accountId}`;
        connection.query(query, func);
    }
    getImgById(companyId, func){
        const query = `SELECT company_avatar FROM company WHERE company_id = ${companyId}`;
        connection.query(query, func);
    }
}

module.exports = new Company();


