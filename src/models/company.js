const connection = require("../config/connectDatabase");

class Company {
    getCompanyById(id, func){
        const query = `SELECT * FROM company WHERE company_id = ${id}`;
        connection.query(query, func);
    }
}

module.exports = new Company();


