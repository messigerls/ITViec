const connection = require("../config/connectDatabase");

class JobCompany{
    getJobListByJobId(jobIdArr, func){
        const search = `(${jobIdArr.join(',')})`;
        const query = `SELECT * FROM job_company WHERE job_id IN ${search}`;
        connection.query(query, func);
    }
}   

module.exports = new JobCompany();

