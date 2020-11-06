const connection = require("../config/connectDatabase");

class Province{
    getAllProvince(func){
        const query = `SELECT * FROM province`;
        connection.query(query, func);
    }
    getProvinceByCompanyId(companyId, func){
        const query = `SELECT p.province_id, p.province_name FROM province p INNER JOIN company c WHERE c.company_id = ${companyId}`;
        connection.query(query, func);
    }
}

module.exports = new Province();
