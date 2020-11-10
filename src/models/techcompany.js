const connection = require("../config/connectDatabase");

class TechCompany{
    getTechByCompanyId(companyId, func){
        const query = `SELECT * FROM techcompany tc INNER JOIN  technology t ON tc.technology_id = t.technology_id WHERE company_id = ${companyId}`;
        connection.query(query, func)
    }
    deleteTechByCompanyId(companyId, func){
        const query = `DELETE FROM techcompany WHERE company_id = ${companyId}`;
        connection.query(query, func);
    }
    insertTechByCompanyId(techArr, companyId, func){
        let values = '';
        let techJobs = [];
        Array.isArray(techArr) ? techJobs = [...techArr] : techJobs = [techArr];
        techJobs.forEach(e => {
            values += `( ${companyId}, ${Number.parseInt(e, 10)}),`
        })
        
        const query = `INSERT INTO techcompany(company_id, technology_id) VALUES ${values.substring(0, values.length - 1)};`;
        connection.query(query, func);
    }
}

module.exports = new TechCompany();

