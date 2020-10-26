const connection = require("../config/connectDatabase");

class TechCompany{
    getTechByCompanyId(companyId, func){
        const query = `SELECT * FROM techcompany WHERE techCompany_id = ${companyId}`;
        connection.query(query, func)
    }
}

module.exports = new TechCompany();

