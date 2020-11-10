const connection = require("../config/connectDatabase");

class Company {
    getCompanyById(companyId, func){
        const query = `SELECT * FROM company WHERE company_id = ${companyId}`;
        connection.query(query, func);
    }
    getCompanyInfoById(companyId, func){
        const query = `SELECT * FROM company c LEFT JOIN province p ON p.province_id = c.province_id WHERE company_id = ${companyId}`;
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
    insertCompanyByAccountId(accountId, name, func){
        const query = `INSERT INTO company(account_id, company_name) VALUES(${accountId}, '${name}')`;
        connection.query(query, func);
    }
    updateCompany(companyData, companyId, coverImg, logo, func){
        let query = '';
        if(!logo && !coverImg){
            query = `UPDATE company SET firstAddress = "${companyData.address}", province_id = ${companyData.city}, description = "${companyData.description}", reason = "${companyData.reason}", treatment = "${companyData.treatment}" WHERE company_id = ${companyId}`;
        }
        else if(!logo){
            query = `UPDATE company SET firstAddress = "${companyData.address}", province_id = ${companyData.city}, description = "${companyData.description}", reason = "${companyData.reason}", treatment = "${companyData.treatment}", cover_image = "${coverImg}" WHERE company_id = ${companyId}`;
        }
        else if(!coverImg){
            query = `UPDATE company SET firstAddress = "${companyData.address}", province_id = ${companyData.city}, description = "${companyData.description}", reason = "${companyData.reason}", treatment = "${companyData.treatment}", company_avatar = "${logo}" WHERE company_id = ${companyId}`;
        }
        else{
            query = `UPDATE company SET firstAddress = "${companyData.address}", province_id = ${companyData.city}, description = "${companyData.description}", reason = "${companyData.reason}", treatment = "${companyData.treatment}", company_avatar = "${logo}", cover_image = "${coverImg}" WHERE company_id = ${companyId}`;
        }
        
        connection.query(query, func);
    }
}

module.exports = new Company();


