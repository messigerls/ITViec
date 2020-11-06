const connection = require("../config/connectDatabase");

class TechCompany{
    getTechByCompanyId(companyId, func){
        const query = `SELECT * FROM techcompany tc INNER JOIN  technology t ON tc.technology_id = t.technology_id WHERE company_id = ${companyId}`;
        connection.query(query, func)
    }
}

module.exports = new TechCompany();

